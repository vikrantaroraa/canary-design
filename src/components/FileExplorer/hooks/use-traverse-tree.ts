import { ExplorerItem } from "src/components/FileExplorer/index";

const useTraverseTree = () => {
  const insertNode = (
    tree: ExplorerItem,
    folderId: string,
    item: string,
    isFolder: boolean
  ): ExplorerItem => {
    // If we found the target folder
    if (tree.id === folderId && tree.isFolder) {
      // Create and return a new object with the new item prepended to items array
      const newNode = {
        id: `${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .substring(2, 6)}`,
        name: item,
        isFolder,
        items: [],
      };

      return {
        ...tree,
        items: [newNode, ...tree.items],
      };
    }

    // If this is a file or we haven't found the target folder yet
    if (!tree.isFolder) {
      return tree;
    }

    // Return new object with recursively updated items array
    const updatedItemsArray = tree.items.map((obj) =>
      insertNode(obj, folderId, item, isFolder)
    );

    return { ...tree, items: updatedItemsArray };
  };

  // old logic of deleteNode where we return null for a deleted node. Replaced this code because due to this we
  // require to add null checks in the code when reading explorerData because that data can be also null i.e in case
  // when the entire tree is deleted by the user

  // const deleteNode = (
  //   tree: ExplorerItem,
  //   nodeId: string
  // ): ExplorerItem | null => {
  //   // Handle the case where the root node itself is being deleted
  //   if (tree.id === nodeId) {
  //     return null; // Returning null signifies the entire tree is deleted
  //   }

  //   const updatedItems = tree.items
  //     .map((child) => deleteNode(child, nodeId)) // Recursively delete
  //     .filter((child) => child !== null); // Remove deleted nodes

  //   return { ...tree, items: updatedItems };
  // };

  // new logic of deleteNode where we keep the tree structure (or form) but replace the data with empty string
  // for a deleted node

  const deleteNode = (tree: ExplorerItem, nodeId: string): ExplorerItem => {
    // If this is the node to delete, return an empty tree structure
    if (tree.id === nodeId) {
      return { id: "", name: "", isFolder: true, items: [] }; // Empty tree
    }

    // If this is a file, return as is
    if (!tree.isFolder) {
      return tree;
    }

    // Recursively delete the node in the children array
    const updatedItemsArray = tree.items
      .map((child) => deleteNode(child, nodeId)) // Recursively delete
      .filter((child) => child.id !== ""); // Remove deleted nodes i.e. only keep nodes with valid id (i.e. id !== empty string)

    // Return new object with filtered and recursively updated items array
    return { ...tree, items: updatedItemsArray };
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

  const deleteFile = (tree: ExplorerItem, fileId: string): ExplorerItem => {
    if (tree.id === fileId && !tree.isFolder) {
      return { id: "", name: "", isFolder: false, items: [] };
    }

    if (tree.isFolder) {
      const updatedItemsArray = tree.items
        .map((child) => deleteFile(child, fileId))
        .filter((child) => child.id !== "");

      return { ...tree, items: updatedItemsArray };
    }

    return tree;
  };

  return { insertNode, deleteNode, updateNode, deleteFile };
};

export default useTraverseTree;
