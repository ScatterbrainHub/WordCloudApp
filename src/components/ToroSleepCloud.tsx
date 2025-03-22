import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/globals.css";
import firebaseConfig from '../lib/firebase';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WordCounts from "./WordCounts";

// Initialize Firebase app and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export default function WordCloudApp() {
    const [word, setWord] = useState("");
    const [words, setWords] = useState<[string, number][]>([]);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [WordCloud, setWordCloud] = useState<((element: HTMLElement, options: any) => void) | null>(null);
    const [inputtedWords, setInputtedWords] = useState<string[]>([]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
            let wordCounts: Record<string, number> = {};
            snapshot.forEach(doc => {
                let text = doc.data().text as string;
                wordCounts[text] = (wordCounts[text] || 0) + 1;
            });
            setWords(Object.entries(wordCounts));
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        import("wordcloud").then((mod) => {
            setWordCloud(() => mod.default);
        }).catch((err) => console.error("Failed to load WordCloud:", err));
    }, []);

    useEffect(() => {
        if (WordCloud && words.length > 0) {
            WordCloud(document.getElementById("wordCloud") as HTMLElement, {
                list: words,
                weightFactor: (size: number) => size * 5, // Adjust this factor as needed
            });
        }
    }, [WordCloud, words]);

    const submitWord = async () => {
        if (word.trim()) {
            await addDoc(collection(db, "words"), { text: word.trim() });
            setInputtedWords(prev => [...prev, word.trim()]);
            console.log(inputtedWords); // Debugging
            setWord("");
        }
    };

    return (
        <div className="min-h-screen p-4 flex flex-col sm:flex-row"> {/* Stack on small screens, row on larger */}
            <div className="flex-1 flex flex-col items-center bg-gray-50 dark:bg-midnight-blue text-gray-900 dark:text-gray-200"> {/* Removed me-8 */}
                <div className="text-center w-full max-w-md mb-6">
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="mt-4 px-4 py-2 rounded bg-soothing-lavender text-white"
                    >
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                    <h1 className="text-2xl font-bold text-sleepy-moon-yellow">Enter 'Sleep' in Your Language</h1>
                </div>

                <div className="w-full max-w-md flex flex-col gap-4">
                    <Input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitWord()}
                        className="p-3 rounded border dark:border-gray-800 text-center"
                        placeholder="Type here..."
                    />
                    <Button
                        onClick={submitWord}
                        className="bg-sleepy-moon-yellow text-midnight-blue px-4 py-3 rounded w-full"
                    >
                        Submit
                    </Button>
                </div>
                

                <div className="w-full max-w-md mt-8">
                    <canvas id="wordCloud" className="w-full h-[300px] border dark:border-gray-800"></canvas>
                </div>                
            </div>
            <div className="w-full max-w-md flex flex-col gap-4">
                 <WordCounts />
                </div>

        </div>
    );
}