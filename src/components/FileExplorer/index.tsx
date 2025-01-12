import { useState } from "react";
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
}

const FileExplorer = ({
  explorer,
  handleInsertNode,
  handleUpdateNode,
  handleDeleteNode,
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
    e: React.MouseEvent<HTMLButtonElement>,
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
          <span>
            📁
            {renameInput.visible ? (
              <input
                type="text"
                value={renameInput.newName}
                onChange={(e) =>
                  setRenameInput({ ...renameInput, newName: e.target.value })
                }
                onKeyDown={onRenameNode}
                autoFocus
                onBlur={() => setRenameInput({ visible: false, newName: "" })}
              />
            ) : (
              explorer.name
            )}
          </span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button onClick={handleRename}>Edit</button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNode(explorer.id);
              }}
            >
              Delete
            </button>
          </div>
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
                handleInsertNode={handleInsertNode}
                handleUpdateNode={handleUpdateNode}
                handleDeleteNode={handleDeleteNode}
                explorer={exp}
                key={exp.id}
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
