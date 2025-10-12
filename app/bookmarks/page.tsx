"use client";

import BookmarkList from "app/bookmarks/ui/BookmarkList";
import TitleSection from "@/components/TitleSection";
import styles from "./bookmarks.module.css";
import { useState } from "react";
import type { Summary } from "@/context/SummarizeContext";

export default function Bookmarks() {
  const [modalContent, setModalContent] = useState<Summary | null>(null);

  return (
    <div className={`${styles.page} ${!!modalContent && styles.modalVisible}`}>
      <TitleSection
        title="Your Bookmarks"
        subTitle="Review your saved summaries"
        actionButton={{ path: "/summarize", label: "Back" }}
      />
      <BookmarkList modalContent={modalContent} setModal={setModalContent} />
    </div>
  );
}
