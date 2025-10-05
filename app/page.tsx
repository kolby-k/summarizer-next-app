import DemoCard from "@/components/DemoCard";
import HowItWorks from "@/components/HowItWorks";
import TitleSection from "@/components/TitleSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page bg-texture">
      <TitleSection
        title="Summarize Any Article Instantly"
        subTitle="Paste a link and get a clear, concise summary in seconds!"
      />

      <div className="flex flex-col flex-1 justify-around items-center min-w-[550px]">
        <DemoCard />

        <Link href={"/login"} className="login-redirect mt-10">
          <button> Login</button>
        </Link>
      </div>
    </div>
  );
}
