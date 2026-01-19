import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const OUTPUT_DIR = path.join(process.cwd(), 'output');

export async function POST(request: Request) {
  try {
    const { filename, content } = await request.json();
    
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = path.join(OUTPUT_DIR, safeFilename);

    if (safeFilename.endsWith('.zip')) {
      // Handle Zip creation for Trae
      const skillName = safeFilename.replace('.zip', '');
      const output = fs.createWriteStream(filePath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      // Good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          console.warn(err);
        } else {
          throw err;
        }
      });

      // Good practice to catch this error explicitly
      archive.on('error', function(err) {
        throw err;
      });

      // Pipe archive data to the file
      archive.pipe(output);

      // append content from string, using a name like 'skill-name/SKILL.md'
      // The user requested structure: skill-name/SKILL.md
      archive.append(content, { name: `${skillName}/SKILL.md` });

      // Finalize the archive (ie we are done appending files but streams have to finish yet)
      await archive.finalize();

      return new Promise((resolve, reject) => {
        output.on('close', function() {
          // Return the filename instead of absolute path for client-side download link
          resolve(NextResponse.json({ success: true, filename: safeFilename }));
        });
        output.on('error', function(err) {
           console.error("Zip Write Error:", err);
           resolve(NextResponse.json({ error: 'Zip creation failed' }, { status: 500 }));
        });
      });

    } else {
      // Normal file save
      fs.writeFileSync(filePath, content);
      // Return the filename instead of absolute path
      return NextResponse.json({ success: true, filename: safeFilename });
    }

  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
