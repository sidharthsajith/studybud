"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, VolumeIcon as VolumeUp, ArrowRight, ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react"

// Sample vocabulary data
const vocabularySets = [
  {
    id: "1",
    language: "spanish",
    title: "Common Spanish Phrases",
    words: [
      { term: "Buenos días", definition: "Good morning", example: "Buenos días, ¿cómo estás?" },
      { term: "Gracias", definition: "Thank you", example: "Gracias por tu ayuda." },
      { term: "Por favor", definition: "Please", example: "Por favor, pásame el libro." },
      { term: "Lo siento", definition: "I'm sorry", example: "Lo siento, no puedo ir hoy." },
      { term: "¿Cómo estás?", definition: "How are you?", example: "Hola, ¿cómo estás hoy?" },
    ],
  },
  {
    id: "2",
    language: "japanese",
    title: "Basic Japanese Greetings",
    words: [
      { term: "おはようございます", definition: "Good morning", example: "おはようございます、元気ですか？" },
      { term: "こんにちは", definition: "Hello/Good afternoon", example: "こんにちは、田中さん。" },
      { term: "ありがとう", definition: "Thank you", example: "ありがとう、助かりました。" },
      { term: "すみません", definition: "Excuse me/I'm sorry", example: "すみません、トイレはどこですか？" },
      { term: "さようなら", definition: "Goodbye", example: "さようなら、また明日。" },
    ],
  },
]

export function LanguageVocabulary() {
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [activeSet, setActiveSet] = useState<any>(vocabularySets[0])
  const [savedWords, setSavedWords] = useState<string[]>([])

  const filteredSets =
    selectedLanguage === "all" ? vocabularySets : vocabularySets.filter((set) => set.language === selectedLanguage)

  const handleNextCard = () => {
    if (currentCardIndex < activeSet.words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setFlipped(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setFlipped(false)
    }
  }

  const toggleSaveWord = (term: string) => {
    if (savedWords.includes(term)) {
      setSavedWords(savedWords.filter((word) => word !== term))
    } else {
      setSavedWords([...savedWords, term])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Vocabulary Builder</CardTitle>
              <CardDescription>Learn and practice new words and phrases</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                  <SelectItem value="mandarin">Mandarin Chinese</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search vocabulary..."
              className="pl-8 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="flashcards">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="saved">Saved Words</TabsTrigger>
            </TabsList>

            <TabsContent value="flashcards" className="mt-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium">{activeSet.title}</h3>
                  <p className="text-sm text-slate-500">
                    Card {currentCardIndex + 1} of {activeSet.words.length}
                  </p>
                </div>

                <div className="w-full max-w-md h-64 cursor-pointer mb-4" onClick={() => setFlipped(!flipped)}>
                  <div className="relative w-full h-full transition-all duration-500">
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
                        flipped ? "hidden" : ""
                      }`}
                    >
                      <div className="text-xl font-medium text-center">{activeSet.words[currentCardIndex].term}</div>
                      <Button variant="ghost" size="sm" className="mt-4">
                        <VolumeUp className="h-4 w-4" />
                      </Button>
                      <p className="text-xs text-slate-500 mt-4">Click to flip</p>
                    </div>
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
                        flipped ? "" : "hidden"
                      }`}
                    >
                      <div className="text-lg font-medium mb-2">{activeSet.words[currentCardIndex].definition}</div>
                      <div className="text-sm text-slate-500 text-center">
                        {activeSet.words[currentCardIndex].example}
                      </div>
                      <p className="text-xs text-slate-500 mt-4">Click to flip</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={handlePrevCard} disabled={currentCardIndex === 0}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSaveWord(activeSet.words[currentCardIndex].term)}
                  >
                    {savedWords.includes(activeSet.words[currentCardIndex].term) ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextCard}
                    disabled={currentCardIndex === activeSet.words.length - 1}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <div className="space-y-6">
                {filteredSets.map((set) => (
                  <div key={set.id} className="space-y-3">
                    <h3 className="text-lg font-medium">{set.title}</h3>
                    <div className="space-y-2">
                      {set.words
                        .filter(
                          (word) =>
                            word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            word.definition.toLowerCase().includes(searchTerm.toLowerCase()),
                        )
                        .map((word, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium">{word.term}</div>
                                <div className="text-sm text-slate-500">{word.definition}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <VolumeUp className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => toggleSaveWord(word.term)}>
                                {savedWords.includes(word.term) ? (
                                  <BookmarkCheck className="h-4 w-4 text-primary" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-4">
              {savedWords.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No saved words yet. Bookmark words to see them here.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {vocabularySets
                    .flatMap((set) => set.words)
                    .filter((word) => savedWords.includes(word.term))
                    .map((word, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{word.term}</div>
                            <div className="text-sm text-slate-500">{word.definition}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <VolumeUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toggleSaveWord(word.term)}>
                            <BookmarkCheck className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Spanish</Badge>
            <Badge variant="outline">Japanese</Badge>
            <Badge variant="outline">Beginner</Badge>
            <Badge variant="outline">Phrases</Badge>
            <Badge variant="outline">Greetings</Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
