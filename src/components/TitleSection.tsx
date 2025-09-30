import Link from "next/link";
import React from "react";
import Image from "next/image";
import LOGO from "../public/logo.png";

function TitleSection({
  title,
  subTitle,
  actionButton,
}: {
  title: string;
  subTitle: string;
  actionButton?: {
    path: string;
    label: string;
  };
}) {
  const { path, label } = actionButton
    ? actionButton
    : { path: null, label: null };

  const showBackButton = label === "Back";

  return (
    <div className="title-container">
      {!showBackButton && (
        <Link href={"/"}>
          <Image
            src={LOGO}
            alt="Summarizer Logo"
            width={50}
            height={50}
            className="w-16 h-auto m-4 absolute -top-2 -left-2 box-shadow-main"
          />
        </Link>
      )}
      <h1>{title}</h1>
      <h3>{subTitle}</h3>
      {path && label && (
        <div
          className={`absolute top-2 ${showBackButton ? "left-4" : "right-4"}`}
        >
          <Link
            href={path}
            title={label}
            className="text-lg font-bold text-(--secondary) hover:text-(--secondary-hover)"
          >
            {label}
          </Link>
        </div>
      )}
    </div>
  );
}

export default TitleSection;
