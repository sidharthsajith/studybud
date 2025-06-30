// MotivationalQuote component
"use client"
import { useState } from "react"
import { RefreshCcw } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const quotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
  "It always seems impossible until it’s done. — Nelson Mandela",
  "The future depends on what you do today. — Mahatma Gandhi",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis",
  "Dream big and dare to fail. — Norman Vaughan",
  "Quality is not an act, it is a habit. — Aristotle",
  "The only way to achieve the impossible is to believe it is possible. — Charles Kingsleigh",
  "The purpose of our lives is to be happy. — Dalai Lama",
  "Don't let yesterday take up too much of today. — Will Rogers",
  "Opportunities don't happen, you create them. — Chris Grosser",
  "Perseverance is failing 19 times and succeeding the 20th. — Julie Andrews",
  "Whether you think you can or you think you can't, you're right. — Henry Ford",
  "I never dreamed about success. I worked for it. — Estée Lauder",
  "Act as if what you do makes a difference. It does. — William James",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. — Ralph Waldo Emerson",
  "Setting goals is the first step in turning the invisible into the visible. — Tony Robbins",
  "The best way to predict the future is to create it. — Peter Drucker",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "All our dreams can come true if we have the courage to pursue them. — Walt Disney",
  "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "If you are not willing to risk the usual, you will have to settle for the ordinary. — Jim Rohn",
  "Great things are done by a series of small things brought together. — Vincent Van Gogh",
  "The harder you work for something, the greater you'll feel when you achieve it. — Unknown",
  "Do something today that your future self will thank you for. — Unknown",
  "It's going to be hard, but hard does not mean impossible. — Unknown",
  "Believe in yourself and all that you are. — Christian D. Larson",
  "If you want to achieve greatness stop asking for permission. — Unknown",
  "We generate fears while we sit. We overcome them by action. — Dr. Henry Link",
  "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart. — Roy T. Bennett",
  "Everything you’ve ever wanted is on the other side of fear. — George Addair",
  "Success is stumbling from failure to failure with no loss of enthusiasm. — Winston Churchill",
  "Do what you can with all you have, wherever you are. — Theodore Roosevelt",
  "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
  "Little minds are tamed and subdued by misfortune; but great minds rise above them. — Washington Irving",
  "The way to get started is to quit talking and begin doing. — Walt Disney",
  "If you can dream it, you can do it. — Walt Disney",
  "Don't count the days, make the days count. — Muhammad Ali",
  "The pain you feel today will be the strength you feel tomorrow. — Unknown",
  "Doubt kills more dreams than failure ever will. — Suzy Kassem",
  "Failure will never overtake me if my determination to succeed is strong enough. — Og Mandino",
  "You don’t have to be great to start, but you have to start to be great. — Zig Ziglar",
  "Either you run the day or the day runs you. — Jim Rohn",
  "Strength does not come from physical capacity. It comes from an indomitable will. — Mahatma Gandhi",
  "The only place where success comes before work is in the dictionary. — Vidal Sassoon",
  "The successful warrior is the average man, with laser-like focus. — Bruce Lee",
  "The difference between ordinary and extraordinary is that little extra. — Jimmy Johnson",
  "You miss 100% of the shots you don't take. — Wayne Gretzky",
  "Your limitation—it's only your imagination. — Unknown",
  "Push yourself, because no one else is going to do it for you. — Unknown",
  "Sometimes later becomes never. Do it now. — Unknown",
  "Great things never come from comfort zones. — Unknown",
  "Dream it. Wish it. Do it. — Unknown",
  "Success doesn't just find you. You have to go out and get it. — Unknown",
  "The harder you work, the luckier you get. — Gary Player",
  "Don't stop when you're tired. Stop when you're done. — Unknown",
  "Wake up with determination. Go to bed with satisfaction. — Unknown",
  "Do something today that your future self will thank you for. — Sean Patrick Flanery",
  "Little things make big days. — Isadora Duncan",
  "It's not whether you get knocked down, it's whether you get up. — Vince Lombardi",
  "If you keep going, you won't regret it. If you give up, you will. — Unknown",
  "Go the extra mile. It's never crowded. — Wayne Dyer",
  "Discipline is the bridge between goals and accomplishment. — Jim Rohn",
  "Stay hungry, stay foolish. — Steve Jobs",
  "If you cannot do great things, do small things in a great way. — Napoleon Hill",
  "Action is the foundational key to all success. — Pablo Picasso",
  "Success seems to be connected with action. Successful people keep moving. — Conrad Hilton",
  "Don’t wait. The time will never be just right. — Napoleon Hill",
  "A winner is a dreamer who never gives up. — Nelson Mandela",
  "Courage is one step ahead of fear. — Cole Todd",
  "Aim for the moon. If you miss, you may hit a star. — W. Clement Stone",
  "Make each day your masterpiece. — John Wooden",
  "Your passion is waiting for your courage to catch up. — Isabelle Lafleche",
  "Magic is believing in yourself. If you can make that happen, you can make anything happen. — Johann Wolfgang von Goethe",
  "If something is important enough, even if the odds are against you, you should still do it. — Elon Musk",
  "Work hard in silence, let success make the noise. — Frank Ocean",
  "Challenges are what make life interesting. Overcoming them is what makes life meaningful. — Joshua J. Marine",
  "Follow your dreams. They know the way. — Kobe Yamada",
  "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
  "Success is the sum of small efforts, repeated day-in and day-out. — Robert Collier",
  "There is no substitute for hard work. — Thomas Edison",
  "Don't wish it were easier. Wish you were better. — Jim Rohn",
  "If you’re going through hell, keep going. — Winston Churchill",
  "What we achieve inwardly will change outer reality. — Plutarch",
  "I am not a product of my circumstances. I am a product of my decisions. — Stephen Covey",
  "You can waste your lives drawing lines. Or you can live your life crossing them. — Shonda Rhimes",
  "The mind is everything. What you think you become. — Buddha",
  "Success is getting what you want, happiness is wanting what you get. — W. P. Kinsella",
  "We may encounter many defeats but we must not be defeated. — Maya Angelou",
  "Try not to become a man of success, but rather become a man of value. — Albert Einstein",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. — Zig Ziglar",
  "The only person you are destined to become is the person you decide to be. — Ralph Waldo Emerson",
  "Everything you can imagine is real. — Pablo Picasso",
  "It always seems impossible until it is done. — Nelson Mandela",
  "Success is not how high you have climbed, but how you make a positive difference to the world. — Roy T. Bennett",
  "Hustle beats talent when talent doesn't hustle. — Ross Simmonds",
  "Energy and persistence conquer all things. — Benjamin Franklin",
  "If you want to lift yourself up, lift up someone else. — Booker T. Washington",
  "Be so good they can't ignore you. — Steve Martin",
  "If opportunity doesn't knock, build a door. — Milton Berle",
  "In the middle of difficulty lies opportunity. — Albert Einstein",
  "The best revenge is massive success. — Frank Sinatra",
  "Great spirits have always encountered violent opposition from mediocre minds. — Albert Einstein",
  "You don’t need to see the whole staircase, just take the first step. — Martin Luther King Jr.",
  "Nothing will work unless you do. — Maya Angelou",
  "Don’t let what you cannot do interfere with what you can do. — John Wooden",
  "Success isn’t about greatness. It’s about consistency. Consistent hard work gains success. — Dwayne Johnson",
  "Do not wait to strike till the iron is hot; but make it hot by striking. — William Butler Yeats",
  "Great people do things before they’re ready. — Amy Poehler",
  "Learning never exhausts the mind. — Leonardo da Vinci",
  "Your present circumstances don’t determine where you can go; they merely determine where you start. — Nido Qubein",
  "Keep your face always toward the sunshine—and shadows will fall behind you. — Walt Whitman",
  "Once you choose hope, anything’s possible. — Christopher Reeve",
  "Everything you’ve ever learned is just practice for the next step. — Unknown",
  "The expert in anything was once a beginner. — Helen Hayes",
  "Success is liking yourself, liking what you do, and liking how you do it. — Maya Angelou",
  "Don’t limit your challenges; challenge your limits. — Jerry Dunn",
  "The beautiful thing about learning is nobody can take it away from you. — B.B. King",
  "Motivation is what gets you started. Habit is what keeps you going. — Jim Rohn"
]

export function MotivationalQuote() {
  const [index, setIndex] = useState(0)
  const nextQuote = () => setIndex((i) => (i + 1) % quotes.length)
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Motivation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="italic">"{quotes[index]}"</p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="ghost" size="icon" onClick={nextQuote}>
          <RefreshCcw className="w-4 h-4" />
          <span className="sr-only">New quote</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
