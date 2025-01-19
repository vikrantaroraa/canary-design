import { useState } from "react";
import useTraverseTree from "src/components/FileExplorer/hooks/use-traverse-tree";
import FileExplorer, { ExplorerItem } from "src/components/FileExplorer";
// import { FilePlus, FolderPlus, SquarePen, Trash2 } from "lucide-react";

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
  const [explorerData, setExplorerData] = useState<ExplorerItem>(explorer);
  const { insertNode, deleteNode, updateNode, deleteFile } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId: string) => {
    const updatedTree = deleteNode(explorerData, nodeId);
    setExplorerData(updatedTree); // Update tree without the deleted node
  };

  const handleUpdateNode = (nodeId: string, newName: string) => {
    const updatedTree = updateNode(explorerData, nodeId, newName);
    setExplorerData(updatedTree);
  };

  const handleDeleteFile = (fileId: string) => {
    const updatedTree = deleteFile(explorerData, fileId);
    setExplorerData(updatedTree);
  };

  return (
    <div className="App">
      <h2>File Explorer Component</h2>
      {explorerData.id !== "" ? (
        <FileExplorer
          explorer={explorerData}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateNode={handleUpdateNode}
          handleDeleteFile={handleDeleteFile}
          // addFolderIcon={<FolderPlus color="#000" size={18} />}
          // addFileIcon={<FilePlus color="#000" size={18} />}
          // renameIcon={<SquarePen color="#000" size={18} />}
          // deleteIcon={<Trash2 color="#000" size={18} />}
        />
      ) : (
        <div>
          <h3>No files or folders available.</h3>
          <button
            onClick={() => setExplorerData(explorer)} // Reset to initial data
          >
            Reset Tree
          </button>
        </div>
      )}
    </div>
  );
}
