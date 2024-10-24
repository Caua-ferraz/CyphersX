import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const docsDirectory = path.join(process.cwd(), 'public', 'docs');
  
  try {
    const files = fs.readdirSync(docsDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    const fileNames = markdownFiles.map(file => file.replace('.md', ''));
    
    return NextResponse.json(fileNames);
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return NextResponse.json({ error: 'Failed to read documentation files' }, { status: 500 });
  }
}