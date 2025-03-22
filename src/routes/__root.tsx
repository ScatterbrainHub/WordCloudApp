import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState, useEffect } from "react";
import HeaderTheme from '../components/ui/Theme';

export const Route = createRootRoute({
  component: () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }, [theme]);

    return (
      <>
        <div className="p-2 flex justify-center items-center gap-4"> {/* Use justify-between */}
          <div className="flex gap-4 text-gray-700 dark:text-gray-300"> {/* Container for links */}
            <Link to="/"  activeOptions={{ exact: true }}>
              Home
            </Link>
            <Link to="/About" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <HeaderTheme  theme={theme} setTheme={setTheme}  /> {/* HeaderTheme at the end */}
        </div>
        <Outlet />
      </>
    );
  },
});