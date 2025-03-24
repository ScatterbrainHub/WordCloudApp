import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState, useEffect } from "react";
import Theme from '../components/ui/Theme';
import Footer from '../components/ui/Footer';
import "../styles/globals.css";

export const Route = createRootRoute({
  component: () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }, [theme]);

    return (
      <div className="flex flex-col min-h-screen">
        <div className="p-2 flex justify-center sm:justify-between items-center">
          <div className="flex gap-4 text-gray-500 dark:text-gray-400 no-underline">
            <Link to="/" activeOptions={{ exact: true }} className="no-underline text-gray-500 dark:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="no-underline [&.active]:font-bold dark:text-white">
              About
            </Link>
          </div>

          <Theme theme={theme} setTheme={setTheme} />
        </div>
        
        <main className="flex-1 p-4">
         <hr /> <Outlet />
        </main>
        <Footer />
      </div>
    );
  },
});
