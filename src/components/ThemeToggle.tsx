import { useEffect, useState } from "react";
import { Button } from "./ui/button";


export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-sleepy-moon-yellow dark:bg-midnight-blue text-gray-900 dark:text-gray-200"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </Button>
  );
}
