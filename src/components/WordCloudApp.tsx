import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";

export default function WordCloudApp() {
  const [word, setWord] = useState("");
  const [words, setWords] = useState<[string, number][]>([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Handle Theme Toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Fetch Words from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
      let wordCounts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        let text = doc.data().text;
        wordCounts[text] = (wordCounts[text] || 0) + 1;
      });
      setWords(Object.entries(wordCounts));
    });

    return () => unsubscribe();
  }, []);

  // Submit Word to Firestore
  const submitWord = async () => {
    if (word.trim()) {
      await addDoc(collection(db, "words"), { text: word.trim() });
      setWord("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
      <div className="flex flex-col items-center p-6 w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        {/* Header */}
        <h1 className="text-xl font-bold">Enter 'Sleep' in Your Language</h1>

        {/* Theme Toggle */}
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="mt-2 bg-sleepy-moon-yellow dark:bg-midnight-blue text-gray-900 dark:text-gray-200"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>

        {/* Input & Submit */}
        <Card className="w-full p-4 mt-4">
          <Input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Type here..."
            className="w-full border dark:border-gray-700"
          />
          <Button onClick={submitWord} className="w-full mt-2 bg-soothing-lavender text-white">
            Submit
          </Button>
        </Card>

        {/* Word Cloud Preview */}
        <div className="mt-4 w-full">
          <h2 className="text-lg font-semibold">Words Submitted:</h2>
          <ul className="list-disc pl-5">
            {words.map(([text, count], index) => (
              <li key={index}>
                {text} ({count})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
