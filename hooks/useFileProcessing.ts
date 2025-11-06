import { useState, useCallback } from 'react';
import { readFileAsBase64, isImageFile, isAudioFile, isPdfFile, getFileExtension } from '@/lib/utils/file-utils';

type MessageContent = {
  type: 'text' | 'image_url' | 'input_audio' | 'file';
  text?: string;
  image_url?: {
    url: string;
  };
  input_audio?: {
    data: string;
    format: string;
  };
  file?: {
    filename: string;
    file_data: string;
  };
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: MessageContent[];
};

type OpenRouterResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
};

type ProcessingState = 'idle' | 'processing' | 'success' | 'error';

const useFileProcessing = () => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');

  const processFile = useCallback(async (file: File) => {
    setProcessingState('processing');
    setError(null);
    
    try {
      if (isImageFile(file.name)) {
        await processImage(file);
      } else if (isAudioFile(file.name)) {
        await processAudio(file);
      } else if (isPdfFile(file.name)) {
        await processPdf(file);
      } else {
        throw new Error('Unsupported file type');
      }
      setProcessingState('success');
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setProcessingState('error');
    }
  }, []);

  const processImage = async (file: File) => {
    const base64Data = await readFileAsBase64(file);
    
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: "What's in this image?" 
          },
          {
            type: 'image_url',
            image_url: {
              url: base64Data,
            },
          },
        ],
      },
    ];

    const response = await callOpenRouter('google/gemini-2.0-flash-001', messages);
    setResult(response.choices[0]?.message?.content || 'No description available');
  };

  const processAudio = async (file: File) => {
    const base64Data = (await readFileAsBase64(file)).split(',')[1]; // Remove data URL prefix
    const format = getFileExtension(file.name).toLowerCase();
    
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: 'Please transcribe this audio file.' 
          },
          {
            type: 'input_audio',
            input_audio: {
              data: base64Data,
              format,
            },
          },
        ],
      },
    ];

    const response = await callOpenRouter('google/gemini-2.5-flash', messages);
    setResult(response.choices[0]?.message?.content || 'No transcription available');
  };

  const processPdf = async (file: File) => {
    const base64Data = (await readFileAsBase64(file)).split(',')[1]; // Remove data URL prefix
    const dataUrl = `data:application/pdf;base64,${base64Data}`;
    
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: 'Please summarize this document.' 
          },
          {
            type: 'file',
            file: {
              filename: file.name,
              file_data: dataUrl,
            },
          },
        ],
      },
    ];

    const response = await callOpenRouter('google/gemini-2.0-flash-001', messages, [
      {
        id: 'file-parser',
        pdf: {
          engine: 'pdf-text', // or 'mistral-ocr' for scanned documents
        },
      },
    ]);

    setResult(response.choices[0]?.message?.content || 'No content available');
  };

  const callOpenRouter = async (model: string, messages: ChatMessage[], plugins: any[] = []) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'StudyBud',
      },
      body: JSON.stringify({
        model,
        messages,
        ...(plugins.length > 0 && { plugins }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'Failed to process request');
    }

    return response.json() as Promise<OpenRouterResponse>;
  };

  const reset = () => {
    setResult('');
    setError(null);
    setProcessingState('idle');
  };

  return {
    result,
    error,
    processingState,
    processFile,
    reset,
    isProcessing: processingState === 'processing',
  };
};

export default useFileProcessing;
