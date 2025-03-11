import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/globals.css";
import firebaseConfig from "../lib/firebaseConfig";

// Initialize Firebase app and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function WordCloudApp() {
    // State variables
    const [word, setWord] = useState(""); // Stores user input
    const [words, setWords] = useState<[string, number][]>([]); // Stores words from Firestore
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Manages light/dark theme
    const [WordCloud, setWordCloud] = useState<null | ((element: HTMLElement, options: any) => void)>(null);

    // Effect to handle dark mode theme persistence
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Effect to fetch words from Firestore and update state
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
            let wordCounts: Record<string, number> = {};
            snapshot.forEach((doc) => {
                let text = doc.data().text;
                wordCounts[text] = (wordCounts[text] || 0) + 1;
            });
            setWords(Object.entries(wordCounts));
        });
        return () => unsubscribe(); // Cleanup function to prevent memory leaks
    }, []);

    // Dynamically import WordCloud only in the browser (fixes SSR issues)
    useEffect(() => {
        import("wordcloud")
            .then((mod) => {
                setWordCloud(() => mod.default);
            })
            .catch((err) => console.error("Failed to load WordCloud:", err));
    }, []);

    // Effect to render WordCloud when words update
    useEffect(() => {
        if (WordCloud && words.length > 0) {
            const canvas = document.getElementById("wordCloud") as HTMLCanvasElement;
            WordCloud(canvas, { list: words });
        }
    }, [WordCloud, words]);

    // Function to handle word submission
    const submitWord = async () => {
        if (word.trim()) {
            await addDoc(collection(db, "words"), { text: word.trim() });
            setWord(""); // Clear input field after submission
        }
    };

    // Handle enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            submitWord();
        }
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
            {/* Header section with title and theme toggle button */}
            <div className="flex justify-between w-full max-w-md">
                <h1 className="text-xl font-bold">Enter 'Sleep' in Your Language</h1>
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="px-3 py-1 rounded bg-sleepy-moon-yellow dark:bg-midnight-blue text-gray-900 dark:text-gray-200"
                >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>

            {/* Input field for user to enter word */}
            <input 
                type="text" 
                value={word} 
                onChange={(e) => setWord(e.target.value)} 
                onKeyPress={handleKeyPress} 
                className="border p-2 mt-4 w-full max-w-md rounded dark:border-gray-800" 
                placeholder="Type here..." 
            />
            
            {/* Submit button to add word to Firestore */}
            <button 
                onClick={submitWord} 
                className="bg-soothing-lavender text-white px-4 py-2 mt-2 rounded"
            >Submit</button>
            
            {/* WordCloud canvas where words will be displayed */}
            <canvas id="wordCloud" className="mt-4 w-full h-64 text-dark border dark:border-gray-800"></canvas>
        </div>
    );
}
