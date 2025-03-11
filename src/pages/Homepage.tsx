import WordCloudApp from "../components/WordCloudApp";

export default function Homepage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6">

        <WordCloudApp />;
      </div>
    </div>
  )
}
