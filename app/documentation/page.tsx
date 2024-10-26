"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import useUser from "@/app/hook/useUser";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from "@/components/fadein";

async function getDocContent(filePath: string) {
  try {
    const response = await fetch(`/api/docs?file=${filePath}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error("Failed to fetch doc content:", error);
    return null;
  }
}

async function getDocFiles() {
  try {
    const response = await fetch('/api/docs-list');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch doc files:", error);
    return [];
  }
}

export default function DocumentationPage() {
  const { data: user, isLoading: userLoading } = useUser();
  const [docFiles, setDocFiles] = useState<string[]>([]);
  const [selectedDoc, setSelectedDoc] = useState('index');
  const [docHtml, setDocHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user?.subscription?.subscription_id) {
      redirect("/");
    }
  }, [user, userLoading]);

  useEffect(() => {
    setIsLoading(true);
    getDocFiles().then(files => {
      if (files.length === 0) {
        setError("No documentation files found. Please check the server configuration.");
      } else {
        setDocFiles(files);
        setSelectedDoc(files[0]); // Select the first document by default
        setError(null);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedDoc) {
      setIsLoading(true);
      getDocContent(selectedDoc).then(content => {
        if (content === null) {
          setError(`Failed to load documentation for "${selectedDoc}". Please check if the file exists on the server.`);
        } else {
          setDocHtml(content);
          setError(null);
        }
        setIsLoading(false);
      });
    }
  }, [selectedDoc]);

  if (userLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="flex h-screen bg-gray-900">
        {/* Left sidebar menu */}
        <Card className="w-64 h-full rounded-none border-r border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <nav>
              <ul className="space-y-2">
                {docFiles.map((file) => (
                  <li key={file}>
                    <button 
                      onClick={() => setSelectedDoc(file)}
                      className={`block w-full text-left py-2 px-4 rounded transition-colors ${
                        selectedDoc === file 
                          ? 'bg-blue-600 text-white font-medium' 
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {file.charAt(0).toUpperCase() + file.slice(1).replace('_', ' ')}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-8 bg-gray-900 text-white">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p>{error}</p>
              <p className="mt-4">
                If this issue persists, please contact support or check the server logs for more information.
              </p>
            </div>
          ) : docHtml ? (
            <div 
              className="prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: docHtml }} 
            />
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-6">Documentation</h1>
              <p>Select a document from the sidebar to view its content.</p>
            </div>
          )}
        </main>
      </div>
    </FadeIn>
  );
}
