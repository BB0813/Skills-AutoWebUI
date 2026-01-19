import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'config.json');

// Helper to ensure config file exists
const ensureConfig = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    // Check if data directory exists
    const dataDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const initialConfig = {
      providers: [],
      activeProvider: null
    };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(initialConfig, null, 2));
    return initialConfig;
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
};

export async function GET() {
  try {
    const config = ensureConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Ensure data directory exists
    const dataDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true, config: body });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
