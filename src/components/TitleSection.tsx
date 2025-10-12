import React from "react";
import Logo from "./Logo";
import CustomLink from "./CustomLink";

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
    <div className="title-section">
      {!showBackButton && <Logo />}
      <div className="title-container">
        <h1>{title}</h1>
        <h4>{subTitle}</h4>
      </div>
      {path && label && (
        <div className={`title-link-button ${showBackButton && "left-shift"}`}>
          <CustomLink path={path} label={label} variant="link" />
        </div>
      )}
    </div>
  );
}

export default TitleSection;
