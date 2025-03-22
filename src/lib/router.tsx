import { createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { RootRoute, Route, NotFoundRoute } from "@tanstack/react-router";
import NotFound from "../routes/404";
import RouteComponent from "../routes";

// Define the root route
const rootRoute = new RootRoute();

// Define the home route
const index = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RouteComponent,
});



// Define a catch-all route for 404
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  notFoundRoute, // Add the catch-all route
]);

// Create the router
const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // Optional: Preload routes for better performance
});

export  { router, RouterProvider };
