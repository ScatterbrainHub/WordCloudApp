import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/404')({
  component: NotFound,
});

function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg mb-4">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;