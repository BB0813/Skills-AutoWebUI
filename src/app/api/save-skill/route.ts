import { NextResponse } from 'next/server';
import archiver from 'archiver';
import { PassThrough } from 'stream';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { filename, content } = await request.json();
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    if (safeFilename.endsWith('.zip')) {
      // Handle Zip creation for Trae
      const skillName = safeFilename.replace('.zip', '');
      
      const passThrough = new PassThrough();
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      archive.pipe(passThrough);
      archive.append(content, { name: `${skillName}/SKILL.md` });
      await archive.finalize();

      // Convert stream to buffer (Vercel Edge/Serverless friendly)
      const chunks = [];
      for await (const chunk of passThrough) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${safeFilename}"`,
        },
      });

    } else {
        // Should not be reached for text files if frontend handles them, 
        // but as a fallback, return the content as a file
        return new NextResponse(content, {
            headers: {
                'Content-Type': 'text/plain',
                'Content-Disposition': `attachment; filename="${safeFilename}"`,
            }
        });
    }

  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
