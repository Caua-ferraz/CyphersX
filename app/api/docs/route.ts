import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'docs', `${file}.md`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Convert Markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return new NextResponse(contentHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error(`Error reading or processing file ${filePath}:`, error);
    return NextResponse.json({ error: 'Failed to read or process documentation file' }, { status: 500 });
  }
}