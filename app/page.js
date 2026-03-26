import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Play. Win. Give Back.</h1>
      <p className="mt-4">Track scores. Win prizes. Support charities.</p>

      <Link href="/login">
        <button className="mt-6 px-6 py-3 bg-black text-white">
          Get Started
        </button>
      </Link>
    </div>
  );
}