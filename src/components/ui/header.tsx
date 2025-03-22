import React, { useState, useEffect } from "react";
import { Link, useMatch } from "@tanstack/react-router";

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
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
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="px-4 py-2 rounded bg-soothing-lavender text-white"
        >
          {theme === "light" ? "☀️ Light" : theme === "dark" ? "🌙 Dark" : "⚙️ System"}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg overflow-hidden">
            <button
              onClick={() => toggleTheme("light")}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              ☀️ Light
            </button>
            <button
              onClick={() => toggleTheme("dark")}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              🌙 Dark
            </button>
            <button
              onClick={() => toggleTheme("system")}
              className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              ⚙️ System
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;