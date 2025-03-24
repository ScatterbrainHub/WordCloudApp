import React, { useState, useEffect } from "react";

interface ThemeProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const HeaderTheme: React.FC<ThemeProps> = ({ theme, setTheme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [theme, setTheme]);

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="relative">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="mt-4 px-4 py-2 rounded bg-soothing-lavender text-white"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
};

export default HeaderTheme;