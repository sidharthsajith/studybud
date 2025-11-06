'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export function StudyFlashcards() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Sample flashcards data - replace with your actual data
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What is the capital of France?',
      answer: 'Paris'
    },
    {
      id: '2',
      question: 'What is 2 + 2?',
      answer: '4'
    },
    {
      id: '3',
      question: 'What is the largest planet in our solar system?',
      answer: 'Jupiter'
    }
  ]);

  const currentCard = flashcards[currentCardIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const shuffleCards = () => {
    setFlashcards([...flashcards].sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const addNewCard = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: 'New question',
      answer: 'Answer'
    };
    setFlashcards([...flashcards, newCard]);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="mb-4 text-slate-500 dark:text-slate-400">No flashcards yet. Create your first one!</p>
        <Button onClick={addNewCard}>
          <Plus className="w-4 h-4 mr-2" />
          Add Flashcard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Flashcards</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shuffleCards}>
            <RotateCw className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
          <Button variant="outline" size="sm" onClick={addNewCard}>
            <Plus className="w-4 h-4 mr-2" />
            New Card
          </Button>
        </div>
      </div>

      <div className="relative">
        <Card 
          className="min-h-[300px] flex flex-col cursor-pointer transition-all duration-300 transform"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardHeader>
            <CardTitle className="text-center">
              {isFlipped ? 'Answer' : 'Question'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center text-center p-6">
            <div className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 absolute'}`}>
              {currentCard.answer}
            </div>
            <div className={`transition-opacity duration-300 ${!isFlipped ? 'opacity-100' : 'opacity-0 absolute'}`}>
              {currentCard.question}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={prevCard}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-slate-500 self-center">
            {currentCardIndex + 1} of {flashcards.length}
          </span>
          <Button variant="outline" onClick={nextCard}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
