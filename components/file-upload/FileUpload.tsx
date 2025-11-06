import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, X, FileText, Image as ImageIcon, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import useFileProcessing from '@/hooks/useFileProcessing';

const FileUpload = () => {
  const { processFile, result, error, processingState, reset, isProcessing } = useFileProcessing();
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  const handleProcess = async () => {
    if (file) {
      await processFile(file);
    }
  };

  const handleReset = () => {
    setFile(null);
    reset();
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-12 w-12 text-blue-500" />;
    } else if (file.type.startsWith('audio/')) {
      return <Headphones className="h-12 w-12 text-purple-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-12 w-12 text-red-500" />;
    }
    
    return <FileText className="h-12 w-12 text-gray-500" />;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload File for Processing</CardTitle>
        <CardDescription>
          Upload an image, audio file, or PDF to analyze its content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!file ? (
            <div
              {...getRootProps()}
              className={cn(
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400',
                isProcessing && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-10 w-10 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag & drop a file here, or click to select'}
                </p>
                <p className="text-xs text-gray-500">
                  Supports images (JPG, PNG, GIF), audio (MP3, WAV), and PDFs
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getFileIcon()}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB · {file.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isProcessing}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {processingState === 'processing' && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Processing your file...</p>
                  <Progress value={50} className="h-2" />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {file && processingState === 'idle' && (
              <>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing || !file}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Process File'
                  )}
                </Button>
              </>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Analysis Result:</h3>
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="whitespace-pre-line">{result}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
