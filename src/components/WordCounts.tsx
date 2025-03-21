import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./ToroSleepCloud";
// import { db } from "../firebase";

function WordCounts() {
    const [wordCounts, setWordCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "words"), (snapshot) => {
            const counts: Record<string, number> = {};
            snapshot.forEach((doc) => {
                const word = doc.data().text as string;
                counts[word] = (counts[word] || 0) + 1;
            });
            setWordCounts(counts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Word Counts</h2>
            <ul>
                {Object.entries(wordCounts).map(([word, count]) => (
                    <li key={word}>
                        {word}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WordCounts;