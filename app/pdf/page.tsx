'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, FileText, BookOpen, FileSearch } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function PdfAnalysisPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('summarize');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setResult(''); // Clear previous result when a new file is selected
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please upload a PDF file',
        variant: 'destructive',
      });
    }
  };

  const processPdf = async () => {
    if (!pdfFile) {
      toast({
        title: 'No PDF file',
        description: 'Please upload a PDF file first',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (limit to 10MB)
    if (pdfFile.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a PDF file smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      const { processPdf } = await import('@/lib/pdf-utils');
      const result = await processPdf(pdfFile, {
        action: activeTab as any,
      });
      setResult(result);
    } catch (error: any) {
      console.error('Error processing PDF:', error);
      
      let errorMessage = error.message || 'Failed to process PDF';
      
      // Handle specific error cases
      if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
        errorMessage = 'Authentication error. Please check your API key.';
      } else if (errorMessage.includes('file format') || errorMessage.includes('invalid')) {
        errorMessage = 'Invalid PDF file. Please check the file and try again.';
      } else if (errorMessage.includes('size') || errorMessage.includes('too large')) {
        errorMessage = 'File is too large. Please upload a smaller PDF file.';
      }
      
      toast({
        title: 'Processing failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Analysis</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload PDF Document</CardTitle>
          <CardDescription>
            Upload a PDF file to analyze its contents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={triggerFileInput}
              className="flex-1"
            >
              <Upload className="mr-2 h-4 w-4" />
              {pdfFile ? pdfFile.name : 'Select PDF File'}
            </Button>
          </div>
          
          {pdfFile && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                <span className="font-medium">{pdfFile.name}</span>
                <span className="text-muted-foreground text-sm ml-2">
                  ({(pdfFile.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summarize">Summarize</TabsTrigger>
          <TabsTrigger value="extract-text">Extract Text</TabsTrigger>
          <TabsTrigger value="generate-notes">Generate Notes</TabsTrigger>
          <TabsTrigger value="qna">Q&A</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">
                {activeTab === 'qna' ? 'Ask a Question' : activeTab.replace('-', ' ')}
              </CardTitle>
              <CardDescription>
                {activeTab === 'summarize' && 'Get a concise summary of the document'}
                {activeTab === 'extract-text' && 'Extract all text from the PDF'}
                {activeTab === 'generate-notes' && 'Generate organized study notes'}
                {activeTab === 'qna' && 'Ask questions about the document'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTab === 'qna' && (
                  <div className="space-y-2">
                    <label htmlFor="question" className="text-sm font-medium">
                      Your Question
                    </label>
                    <textarea
                      id="question"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your question about the document..."
                      rows={3}
                    />
                  </div>
                )}
                
                <Button 
                  onClick={processPdf} 
                  disabled={!pdfFile || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {activeTab === 'summarize' && <BookOpen className="mr-2 h-4 w-4" />}
                      {activeTab === 'extract-text' && <FileText className="mr-2 h-4 w-4" />}
                      {activeTab === 'generate-notes' && <FileText className="mr-2 h-4 w-4" />}
                      {activeTab === 'qna' && <FileSearch className="mr-2 h-4 w-4" />}
                      {activeTab === 'qna' ? 'Ask Question' : `Generate ${activeTab.replace('-', ' ')}`}
                    </>
                  )}
                </Button>

                {result && (
                  <div className="mt-6 p-4 bg-muted rounded-md">
                    <h3 className="font-semibold mb-2">
                      {activeTab === 'qna' ? 'Answer:' : 'Result:'}
                    </h3>
                    <div className="whitespace-pre-wrap">{result}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
