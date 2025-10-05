import Link from "next/link";
import React from "react";
import Image from "next/image";
import LOGO from "../../public/logo.png";

function TitleSection({
  title,
  subTitle,
  actionButton,
  opts,
}: {
  title: string;
  subTitle: string;
  actionButton?: {
    path: string;
    label: string;
  };
  opts?:
    | {
        smallTitle: boolean;
      }
    | undefined;
}) {
  const { path, label } = actionButton
    ? actionButton
    : { path: null, label: null };

  const showBackButton = label === "Back";

  return (
    <div className="flex flex-col min-w-[600px]">
      {!showBackButton && (
        <Link href={"/"} className="absolute top-0 left-4 z-1000">
          <Image
            src={LOGO}
            alt="Summarizer Logo"
            width={50}
            height={50}
            className="w-16 h-auto m-4"
          />
        </Link>
      )}
      <div className="title-container">
        <h1
          className={`max-w-[50vw] mx-auto ${
            opts?.smallTitle ? "small-title" : ""
          }`}
        >
          {title}
        </h1>
        {opts?.smallTitle ? <h4>{subTitle}</h4> : <h3>{subTitle}</h3>}
        {path && label && (
          <div
            className={`absolute top-8 ${
              showBackButton ? "left-4" : "right-4"
            }`}
          >
            <Link
              href={path}
              title={label}
              className="text-lg font-bold self-center text-(--accent-orange-light) hover:text-(--accent-orange)"
            >
              {label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleSection;
