import { useState } from "react";
import useTraverseTree from "src/components/FileExplorer/hooks/use-traverse-tree";
import FileExplorer, { ExplorerItem } from "src/components/FileExplorer";

const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "public nested 1",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              items: [],
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              items: [],
            },
          ],
        },
        {
          id: "6",
          name: "public_nested_file",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "App.js",
          isFolder: false,
          items: [],
        },
        {
          id: "9",
          name: "Index.js",
          isFolder: false,
          items: [],
        },
        {
          id: "10",
          name: "styles.css",
          isFolder: false,
          items: [],
        },
      ],
    },
    {
      id: "11",
      name: "package.json",
      isFolder: false,
      items: [],
    },
  ],
};

export default function ExampleFileExplorer() {
  const [explorerData, setExplorerData] = useState<ExplorerItem | null>(
    explorer
  );
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    if (explorerData) {
      const finalTree = insertNode(explorerData, folderId, item, isFolder);
      setExplorerData(finalTree);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (explorerData) {
      const updatedTree = deleteNode(explorerData, nodeId);
      if (updatedTree === null) {
        setExplorerData(null); // Entire tree deleted
      } else {
        setExplorerData(updatedTree); // Update tree without the deleted node
      }
    }
  };

  const handleUpdateNode = (nodeId: string, newName: string) => {
    if (explorerData) {
      const updatedTree = updateNode(explorerData, nodeId, newName);
      setExplorerData(updatedTree);
    }
  };

  return (
    <div className="App">
      <h2>File Explorer Component</h2>
      {explorerData ? (
        <FileExplorer
          explorer={explorerData}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateNode={handleUpdateNode}
        />
      ) : (
        <div className="empty-state">
          <h3>No files or folders available.</h3>
          <button
            onClick={() => setExplorerData(explorer)} // Reset to initial data
            className="reset-btn"
          >
            Reset Tree
          </button>
        </div>
      )}
    </div>
  );
}
