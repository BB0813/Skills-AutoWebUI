import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'output');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('file');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Basic security check to prevent directory traversal
  const safeFilename = path.basename(filename);
  const filePath = path.join(OUTPUT_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type
    let contentType = 'text/plain';
    if (safeFilename.endsWith('.zip')) {
        contentType = 'application/zip';
    } else if (safeFilename.endsWith('.json') || safeFilename.endsWith('.code-snippets')) {
        contentType = 'application/json';
    } else if (safeFilename.endsWith('.md') || safeFilename.endsWith('.mdc')) {
        contentType = 'text/markdown';
    }

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${safeFilename}"`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download Error:", error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
