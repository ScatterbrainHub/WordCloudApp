import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/About')({
  component: RouteComponent,
});

export default function RouteComponent() {
  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 text-sleepy-moon-yellow">About Us: The Sleep Translators</h2>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Ever wondered how many ways you can say "zzzz"? We did! So, we built this little linguistic playground. Think of it as a global pillow fight, but with words.
      </p>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        We're a motley crew of language lovers and sleep enthusiasts (yes, that's a job title now). Our mission? To showcase the beautiful, bewildering, and downright hilarious ways humans express the universal concept of slumber.
      </p>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Each "sleep" you submit adds a thread to our collective word cloud. It's a visual symphony of snoozing, a testament to the world's shared need for a good night's rest. Plus, you might just learn a new word to impress your sleepy friends.
      </p>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        So, join the slumber party! Add your "sleep," explore the cloud, and maybe learn a thing or two. Because who knew learning could be this... well, nap-worthy?
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Created with a pinch of whimsy and a whole lot of caffeine.
      </p>
    </div>
  );
}