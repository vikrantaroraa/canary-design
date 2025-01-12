import { ExplorerItem } from "src/components/FileExplorer/index";
const useTraverseTree = () => {
  const insertNode = (
    tree: ExplorerItem,
    folderId: string,
    item: string,
    isFolder: boolean
  ): ExplorerItem => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: `${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .substring(2, 6)}`,
        name: item,
        isFolder,
        items: [],
      });

      return tree;
    }

    let updatedItemsArray = [];
    updatedItemsArray = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: updatedItemsArray };
  };

  const deleteNode = (
    tree: ExplorerItem,
    nodeId: string
  ): ExplorerItem | null => {
    // Handle the case where the root node itself is being deleted
    if (tree.id === nodeId) {
      return null; // Returning null signifies the entire tree is deleted
    }

    const updatedItems = tree.items
      .map((child) => deleteNode(child, nodeId)) // Recursively delete
      .filter((child) => child !== null); // Remove deleted nodes

    return { ...tree, items: updatedItems };
  };

  const updateNode = (
    tree: ExplorerItem,
    nodeId: string,
    newName: string
  ): ExplorerItem => {
    // If the node to update is found, update its name
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }

    // Traverse children and update the node if found
    const updatedItemsArray = tree.items.map((item) =>
      updateNode(item, nodeId, newName)
    );

    return { ...tree, items: updatedItemsArray };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
