import React, { useState } from "react";
import styles from "./index.module.css";

export interface ExplorerItem {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerItem[];
}

interface FileExplorerProps {
  explorer: ExplorerItem;
  handleInsertNode: (
    explorerId: string,
    inputValue: string,
    isFolder: boolean
  ) => void;
  handleUpdateNode: (explorerId: string, newName: string) => void;
  handleDeleteNode: (explorerId: string) => void;
  addFolderIcon?: React.ReactNode;
  addFileIcon?: React.ReactNode;
  renameIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
}

const FileExplorer = ({
  explorer,
  handleInsertNode,
  handleUpdateNode,
  handleDeleteNode,
  addFolderIcon,
  addFileIcon,
  renameIcon,
  deleteIcon,
}: FileExplorerProps) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const [renameInput, setRenameInput] = useState({
    visible: false,
    newName: "",
  });

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (e.key === "Enter" && inputValue) {
      // function to add folder or file
      handleInsertNode(explorer.id, inputValue, showInput.isFolder);
      // hide file/folder name input
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleRename = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setRenameInput({ visible: true, newName: explorer.name });
  };

  const onRenameNode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && renameInput.newName) {
      handleUpdateNode(explorer.id, renameInput.newName);
      setRenameInput({ visible: false, newName: "" });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className={styles["folder"]} onClick={toggleExpand}>
          <span
            className={`${styles["folder-name-and-rename-input"]} ${
              renameInput.visible ? styles["rename-input-visible"] : ""
            }`}
          >
            📁
            {renameInput.visible ? (
              <input
                type="text"
                value={renameInput.newName}
                className={styles["rename-input"]}
                onChange={(e) =>
                  setRenameInput({ ...renameInput, newName: e.target.value })
                }
                onKeyDown={onRenameNode}
                autoFocus
                onBlur={() => setRenameInput({ visible: false, newName: "" })}
              />
            ) : (
              <span className={styles["folder-name"]}>{explorer.name}</span>
            )}
          </span>

          {!renameInput.visible && (
            <div className={styles["action-buttons"]}>
              {addFolderIcon ? (
                <span
                  onClick={(e) => handleNewFolder(e, true)}
                  className={styles["user-icon"]}
                >
                  {addFolderIcon}
                </span> // Render the icon as a clickable span
              ) : (
                <button onClick={(e) => handleNewFolder(e, true)}>
                  Folder +
                </button>
              )}
              {addFileIcon ? (
                <span
                  onClick={(e) => handleNewFolder(e, false)}
                  className={styles["user-icon"]}
                >
                  {addFileIcon}
                </span> // Render the icon as a clickable span
              ) : (
                <button onClick={(e) => handleNewFolder(e, false)}>
                  File +
                </button>
              )}
              {renameIcon ? (
                <span onClick={handleRename} className={styles["user-icon"]}>
                  {renameIcon}
                </span> // Render the icon as a clickable span
              ) : (
                <button onClick={handleRename}>Edit</button>
              )}
              {deleteIcon ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(explorer.id);
                  }}
                  className={styles["user-icon"]}
                >
                  {deleteIcon}
                </span> // Render the icon as a clickable span
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(explorer.id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        <div
          className={`${styles["sub-folders"]} ${
            expand ? styles["expand-folder"] : styles["hide-folder"]
          }`}
        >
          {showInput.visible && (
            <div className={styles["input-container"]}>
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className={styles["input"]}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <FileExplorer
                key={exp.id}
                explorer={exp}
                handleInsertNode={handleInsertNode}
                handleUpdateNode={handleUpdateNode}
                handleDeleteNode={handleDeleteNode}
                addFolderIcon={addFolderIcon}
                addFileIcon={addFileIcon}
                renameIcon={renameIcon}
                deleteIcon={deleteIcon}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className={styles["file"]}>📄 {explorer.name}</div>;
  }
};

export default FileExplorer;
