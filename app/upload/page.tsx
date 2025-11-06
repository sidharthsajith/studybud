'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import FileUpload from '@/components/file-upload/FileUpload';

export default function UploadPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Upload & Process Files</h1>
          <p className="text-muted-foreground">Upload images, audio files, or PDFs for analysis</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <Icons.arrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Tabs 
        defaultValue="upload" 
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
          <TabsTrigger value="upload">
            <Icons.upload className="mr-2 h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Icons.history className="mr-2 h-4 w-4" />
            Recent Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload a File</CardTitle>
              <CardDescription>
                Upload an image, audio file, or PDF to analyze its content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
              <CardDescription>
                Your recently processed files will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Icons.folder className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recent files</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Processed files will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
