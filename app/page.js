import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold text-primary">MedicGPT</h1>
            <p className="py-6 text-lg leading-loose">
              Your AI-powered medical study companion. Get instant answers to clinical questions and understand complex medical concepts with ease.
            </p>
            <Link href='/chat' className="btn btn-secondary">Start Learning</Link>
          </div>
        </div>
      </div>
    </>
  );
}
