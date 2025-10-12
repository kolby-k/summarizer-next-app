"use client";

import {
  type Summary,
  useSummaries,
} from "../../../src/context/SummarizeContext";
import SummaryCard from "../../../src/components/SummaryCard";
import styles from "../bookmarks.module.css";
import Modal from "@/components/Modal";
import ModalSummary from "@/components/ModalSummary";

type BookmarkListProps = {
  modalContent: Summary | null;
  setModal: React.Dispatch<React.SetStateAction<Summary | null>>;
};

function BookmarkList({ modalContent, setModal }: BookmarkListProps) {
  const { bookmarks } = useSummaries();

  const setModalContent = (summaryId: string) => {
    const summary = bookmarks.find((bookmark) => summaryId === bookmark.id);
    return summary ? setModal(summary) : handleCloseModal();
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <>
      {!!modalContent && (
        <Modal>
          <ModalSummary data={modalContent} onClose={handleCloseModal} />
        </Modal>
      )}
      <div className={`${styles.bookmarkList}`}>
        {bookmarks &&
          bookmarks.map((b) => {
            return (
              <div className={styles.summaryWrapper} key={b.id}>
                <SummaryCard data={b} handleShowModal={setModalContent} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default BookmarkList;
