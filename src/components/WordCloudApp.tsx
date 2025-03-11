import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/globals.css";
import firebaseConfig from '../lib/firebase';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Initialize Firebase app and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function WordCloudApp() {
    // State variables
    const [word, setWord] = useState(""); // Stores user input
    const [words, setWords] = useState<Array<[string, number]>>([]); // Stores words from Firestore
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light"); // Manages light/dark theme
    const [WordCloud, setWordCloud] = useState<((element: HTMLElement, options: any) => void) | null>(null); // Stores WordCloud library dynamically

    // Effect to handle dark mode theme persistence
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Effect to fetch words from Firestore and update state
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
            let wordCounts: Record<string, number> = {};
            snapshot.forEach(doc => {
                let text = doc.data().text as string;
                wordCounts[text] = (wordCounts[text] || 0) + 1;
            });
            setWords(Object.entries(wordCounts));
        });
        return () => unsubscribe(); // Cleanup function to prevent memory leaks
    }, []);

    // Dynamically import WordCloud only in the browser (fixes SSR issues)
    useEffect(() => {
        import("wordcloud").then((mod) => {
            setWordCloud(() => mod.default);
        }).catch((err) => console.error("Failed to load WordCloud:", err));
    }, []);

    // Effect to render WordCloud when words update
    useEffect(() => {
        if (WordCloud && words.length > 0) {
            WordCloud(document.getElementById("wordCloud") as HTMLElement, { list: words });
        }
    }, [WordCloud, words]);

    // Function to handle word submission
    const submitWord = async () => {
        if (word.trim()) { // Ensure input is not empty
            await addDoc(collection(db, "words"), { text: word.trim() });
            setWord(""); // Clear input field after submission
        }
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
            {/* Header section with title and theme toggle button */}
            <div className="flex flex-col items-center w-full max-w-md text-center">
                <h1 className="text-2xl font-bold">Enter 'Sleep' in Your Language</h1>
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="mt-2 px-3 py-1 rounded bg-sleepy-moon-yellow dark:bg-midnight-blue text-gray-900 dark:text-gray-200"
                >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>

            {/* Input and submit section */}
            <div className="w-full max-w-md flex flex-col items-center gap-2 mt-4">
                <Input 
                    type="text" 
                    value={word} 
                    onChange={(e) => setWord(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && submitWord()}
                    className="border p-2 w-full rounded dark:border-gray-800 text-center" 
                    placeholder="Type here..." 
                />
                
                <Button 
                    onClick={submitWord} 
                    className="bg-soothing-lavender text-white px-4 py-2 rounded w-full"
                >Submit</Button>
            </div>
            
            {/* WordCloud canvas where words will be displayed */}
            <div className="w-full max-w-md mt-6">
                <canvas id="wordCloud" className="w-full h-300 border dark:border-gray-800"></canvas>
            </div>
        </div>
    );
}
