import { useState } from "react";
import styles from "./index.module.css";

// use the below three icon paths when adding this component to the lib folder
// import folderIcon from "../../../../src/assets/folder-icon.svg";
// import fileIcon from "../../../../src/assets/file-icon.svg";
// import caretRight from "../../../../src/assets/caret-right-black.svg";

import folderIcon from "src/assets/folder-icon.svg";
import fileIcon from "src/assets/file-icon.svg";
import caretRight from "src/assets/caret-right-black.svg";

export interface FolderStructureProps {
  name: string;
  folders?: FolderStructureProps[];
}

const Folder = ({ folder }: { folder: FolderStructureProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={styles["list-item"]}>
      <span className={styles["data-container"]}>
        {folder.folders && (
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className={styles["caret-container"]}
          >
            <img
              className={`${isOpen ? styles["rotate-90-deg"] : ""}`}
              src={caretRight}
              height={14}
              width={14}
              alt="folder-icon"
            />
          </span>
        )}
        {folder.folders ? (
          <img src={folderIcon} height={25} width={25} alt="folder icon" />
        ) : (
          <img
            src={fileIcon}
            height={25}
            width={25}
            alt="folder icon"
            className={styles["file-icon"]}
          />
        )}

        {folder.name}
      </span>

      {isOpen && (
        <ul className={styles["internal-list"]}>
          {folder.folders?.map((folder, index) => (
            <Folder folder={folder} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Folder;
