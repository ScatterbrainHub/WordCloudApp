import { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import "../styles/globals.css";
import firebaseConfig from '../lib/firebase';

// Initialize Firebase app and Firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function WordCloudApp() {
    // State variables
    const [word, setWord] = useState(""); // Stores user input
    const [words, setWords] = useState([]); // Stores words from Firestore
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Manages light/dark theme
    const [WordCloud, setWordCloud] = useState(null); // Stores WordCloud library dynamically

    const wordCloudRef = useRef(null); // Reference to canvas element

    // Load theme from localStorage when component mounts
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    // Apply theme changes and persist to localStorage
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Fetch words from Firestore and update state
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
            let wordCounts = {};
            snapshot.forEach(doc => {
                let text = doc.data().text;
                wordCounts[text] = (wordCounts[text] || 0) + 1;
            });
            setWords(Object.entries(wordCounts));
        });
        return () => unsubscribe();
    }, []);

    // Dynamically import WordCloud for browser compatibility
    useEffect(() => {
        import("wordcloud").then((mod) => {
            setWordCloud(() => mod.default);
        }).catch((err) => console.error("Failed to load WordCloud:", err));
    }, []);

    // Render WordCloud when words update
    useEffect(() => {
        if (WordCloud && words.length > 0 && wordCloudRef.current) {
            WordCloud(wordCloudRef.current, { list: words });
        }
    }, [WordCloud, words]);

    // Function to handle word submission
    const submitWord = async () => {
        if (word.trim()) {
            await addDoc(collection(db, "words"), { text: word.trim() });
            setWord(""); // Clear input field after submission
        }
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200">
            {/* Header section */}
            <div className="flex flex-col items-center w-full max-w-md text-center">
                <h1 className="text-2xl font-bold">Enter 'Sleep' in Your Language</h1>
                <button
                    onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                    className="mt-2 px-3 py-1 rounded bg-sleepy-moon-yellow dark:bg-midnight-blue text-gray-900 dark:text-gray-200"
                >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>

            {/* Input Section */}
            <div className="w-full max-w-md flex flex-col items-center gap-2 mt-4">
                <input 
                    type="text" 
                    value={word} 
                    onChange={(e) => setWord(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && submitWord()}
                    className="border p-2 w-full rounded dark:border-gray-800 text-center" 
                    placeholder="Type here..." 
                />
                
                <button 
                    onClick={submitWord} 
                    className="bg-soothing-lavender text-white px-4 py-2 rounded w-full"
                >
                    Submit
                </button>
            </div>
            
            {/* WordCloud Canvas */}
            <div className="w-full max-w-md mt-6">
                <canvas ref={wordCloudRef} className="w-full h-64 border dark:border-gray-800"></canvas>
            </div>
        </div>
    );
}
