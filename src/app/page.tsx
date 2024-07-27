import Footer from "@/components/Footer";
import HomePageHeader from "@/components/HomePageHeader";
import Sparkles from "@/components/icons/Sparkles";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-bg-backdrop">
      <HomePageHeader />
      <main className="mb-12">
        <h1 className="mt-20 flex flex-wrap justify-center items-center text-5xl md:text-6xl gap-2 md:gap-4 font-semibold">
          <span className="heading-pop-up animation-delay-200">Plan,</span>
          <span className="heading-pop-up animation-delay-400">Analyse,</span>
          <span className="heading-pop-up animation-delay-600">Create,</span>
          <span className="heading-pop-up animation-delay-800">Excel</span>
        </h1>
        <h2 className="fade-in-animation animation-delay-1200 text-center mt-6 text-2xl font-[500] flex flex-col items-center mx-auto text-zinc-900">
          <span>Smart Scheduling for Your Projects,</span>
          <span className="text-purple-800">Powered by AI</span>
        </h2>
        <div className="flex justify-center items-center gap-6">
          <Link
            href="/ai"
            className="w-fit mt-4 flex items-center gap-4 bg-purple-800 fade-in-animation animation-delay-1200 text-white py-1.5 px-4 rounded-md"
          >
            <Sparkles />
            Try TrackIt AI
          </Link>
          <Link
            href="/timer"
            className="block w-fit mt-4 bg-purple-600 fade-in-animation animation-delay-1200 text-white py-1.5 px-6 rounded-md"
          >
            Go to timer
          </Link>
        </div>
        <div className="fade-in-animation mb-36 animation-delay-1200 relative w-[90%] md:w-[75%] md:mx-auto mt-8">
          <div className="w-[80%] bg-white mx-auto outline outline-1 outline-zinc-200 rounded-md shadow-lg py-2 px-4">
            <div className="flex gap-1 my-1">
              <div className="size-2 bg-red-500 rounded-full"></div>
              <div className="size-2 bg-yellow-300 rounded-full"></div>
              <div className="size-2 bg-green-500 rounded-full"></div>
            </div>
            <img src="assets/images/timer.png" />
          </div>
          <div className="w-[20%] absolute top-[30%] left-[80%] p-2 bg-white outline outline-1 outline-zinc-200 rounded-md shadow-lg">
            <img className="rounded-md" src="assets/images/ai-project.png" />
          </div>
        </div>

        <div className=" w-[90%] md:w-[80%] fade-in-animation animation-delay-400 py-16 md:py-24 bg-white outline outline-1 outline-zinc-100 shadow-lg rounded-md mx-auto flex flex-col gap-16 md:gap-24">
          <div className="flex justify-center flex-col md:flex-row items-center gap-4">
            <div className="w-[100%] text-center md:text-left md:w-[30%] flex flex-col items-center md:items-start justify-center gap-4  md:pl-8">
              <p className="text-2xl font-[500] flex gap-2">
                <span className=" text-green-700">1.</span>
                <span className="text-green-900">Create Schedule</span>
              </p>
              <p className="w-[80%] pl-4 text-zinc-700">
                Add all the details of your project to create an amazing
                schedule
              </p>
            </div>
            <div className="w-[80%] md:w-[45%] shadow-sm outline outline-1 outline-zinc-200 rounded-md">
              <img src="assets/images/create-project.png" />
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-center gap-4">
            <div className="w-[100%] text-center md:text-left md:w-[30%] flex flex-col items-center md:items-start justify-center gap-4  md:pl-8">
              <p className="text-2xl font-[500] flex gap-2">
                <span className=" text-blue-700">2.</span>
                <span className="text-blue-900">Review Schedule</span>
              </p>
              <p className="w-[80%] pl-4 text-zinc-700">
                Go through the schedule to see if you like it and add the
                project
              </p>
            </div>
            <div className="w-[80%] md:w-[45%] shadow-sm outline outline-1 outline-zinc-200 rounded-md">
              <img src="assets/images/review-project.png" />
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-center gap-4">
            <div className="w-[100%] text-center md:text-left md:w-[30%] flex flex-col items-center md:items-start justify-center gap-4  md:pl-8">
              <p className="text-2xl font-[500] flex gap-2">
                <span className=" text-red-700">3.</span>
                <span className="text-red-500">Track Task</span>
              </p>
              <p className="w-[80%] pl-4 text-zinc-700">
                Go through the schedule to see if you like it and add the
                project
              </p>
            </div>
            <div className="w-[80%] md:w-[45%] shadow-sm outline outline-1 outline-zinc-200 rounded-md">
              <img src="assets/images/timer.png" />
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row items-center gap-4">
            <div className="w-[100%] text-center md:text-left md:w-[30%] flex flex-col items-center md:items-start justify-center gap-4  md:pl-8">
              <p className="text-2xl font-[500] flex gap-2">
                <span className=" text-orange-400">4.</span>
                <span className="text-yellow-500">Analyse</span>
              </p>
              <p className="w-[80%] pl-4 text-zinc-700">
                Go through the schedule to see if you like it and add the
                project
              </p>
            </div>
            <div className="w-[80%] md:w-[45%] shadow-sm outline outline-1 outline-zinc-200 rounded-md">
              <img src="assets/images/analysis-page.png" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
