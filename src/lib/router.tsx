import { createRouter, RouterProvider } from "@tanstack/react-router";
import { RootRoute, Route, NotFoundRoute } from "@tanstack/react-router";
import HomePage from "../pages/Homepage";

// Define the root route
const rootRoute = new RootRoute();

// Define the home route
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Define the Not Found route (this fixes your issue)
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <h1 className="text-center text-red-500">404 - Page Not Found</h1>,
});

// Combine all routes into a tree
const routeTree = rootRoute.addChildren([homeRoute, notFoundRoute]);

// Create the router
const router = createRouter({
  routeTree,
});

export { router, RouterProvider };
