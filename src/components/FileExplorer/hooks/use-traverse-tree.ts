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
    // Case where the root node itself is being deleted
    if (tree.id === nodeId) {
      return { id: "", name: "", isFolder: true, items: [] }; // Empty tree
    }

    // Recursively delete the node in the children array
    const updatedItems = tree.items
      .map((child) => deleteNode(child, nodeId)) // Recursively delete
      .filter((child) => child.id !== ""); // Remove deleted nodes i.e. only keep nodes with valid id (not empty string)

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
