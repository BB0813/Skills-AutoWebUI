import { NextResponse } from 'next/server';
import { SupportedIDE, IDE_CONFIG } from '@/lib/types';
import { constructSystemPrompt, cleanLLMResponse } from '@/lib/prompts';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { prompt, ide, skillName, providerConfig } = await request.json();
    const targetIDE = (ide as SupportedIDE) || 'vscode';
    const ideSettings = IDE_CONFIG[targetIDE];
    
    if (!providerConfig) {
      return NextResponse.json({ error: 'No provider configuration provided' }, { status: 400 });
    }

    const baseUrl = providerConfig.baseUrl.replace(/\/$/, '');
    const url = `${baseUrl}/chat/completions`;

    const systemPrompt = constructSystemPrompt(targetIDE, skillName);

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    console.log(`Calling ${url} with model ${providerConfig.model}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${providerConfig.apiKey}`
      },
      body: JSON.stringify({
        model: providerConfig.model,
        messages: messages,
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Provider Error:", errorText);
        return NextResponse.json({ error: `Provider error: ${response.status} ${errorText}` }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    content = cleanLLMResponse(content);

    return NextResponse.json({ content, extension: ideSettings.extension });

  } catch (error) {
    console.error("Generate Error:", error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
