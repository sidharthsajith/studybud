'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Upload, Mic, Play, StopCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AudioAnalysisPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('transcribe');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    } else {
      toast({
        title: 'Invalid file',
        description: 'Please upload an audio file',
        variant: 'destructive',
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        setAudioFile(audioFile);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: 'Microphone access error',
        description: 'Please allow microphone access to record audio',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudio = async () => {
    if (!audioFile) {
      toast({
        title: 'No audio file',
        description: 'Please upload or record an audio file first',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      const { processAudio } = await import('@/lib/audio-utils');
      const result = await processAudio(audioFile, {
        action: activeTab as any,
      });
      setResult(result);
    } catch (error: any) {
      console.error('Error processing audio:', error);
      toast({
        title: 'Processing failed',
        description: error.message || 'Failed to process audio',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Audio Analysis</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload or Record Audio</CardTitle>
          <CardDescription>
            Upload an audio file or record directly from your microphone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-upload"
                />
                <Button variant="outline" className="w-full" asChild>
                  <div>
                    <Upload className="mr-2 h-4 w-4" />
                    {audioFile ? audioFile.name : 'Upload Audio File'}
                  </div>
                </Button>
              </label>
              
              {isRecording ? (
                <Button variant="destructive" onClick={stopRecording}>
                  <StopCircle className="mr-2 h-4 w-4" />
                  Stop Recording
                </Button>
              ) : (
                <Button variant="outline" onClick={startRecording}>
                  <Mic className="mr-2 h-4 w-4" />
                  Record Audio
                </Button>
              )}
            </div>
            
            {audioFile && (
              <div className="mt-4">
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
          <TabsTrigger value="summarize">Summarize</TabsTrigger>
          <TabsTrigger value="generate-notes">Generate Notes</TabsTrigger>
          <TabsTrigger value="extract-key-points">Key Points</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{activeTab.replace('-', ' ')}</CardTitle>
              <CardDescription>
                {activeTab === 'transcribe' && 'Get a text transcription of your audio'}
                {activeTab === 'summarize' && 'Get a concise summary of the audio content'}
                {activeTab === 'generate-notes' && 'Generate organized study notes from the audio'}
                {activeTab === 'extract-key-points' && 'Extract the main points from the audio'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={processAudio} 
                disabled={!audioFile || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Generate ${activeTab.replace('-', ' ')}`
                )}
              </Button>

              {result && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <div className="whitespace-pre-wrap">{result}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
