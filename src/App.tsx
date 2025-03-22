// import { useState, useEffect } from "react";
// import "./styles/globals.css";
// import { RouterProvider, createBrowserRouter } from '@tanstack/react-router';
// import Home from "./routes/Home";
// import About from "./routes/About";
// import Header from "./components/ui/header";


// const routes = [{
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/about',
//     element: <About />,
//   },
// ];

// const router = createBrowserRouter({ routes });

// function App() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <RouterProvider router={router}>
//       <div className="App">
//         <Header theme={theme} setTheme={setTheme} />
//       </div>
//     </RouterProvider>
//   );
// }

// export default App;

import { RouterProvider } from '@tanstack/react-router';
import { router } from './lib/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;