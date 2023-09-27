export interface FileType {
  url: string;
  name: string;
  id: string;
  size: number;
  type: string;
}
// props for the main FileUpload component.
export interface FileUploadProps {
  multiple: boolean;
  getFiles: (allSelectedFiles: FileType[]) => void;
  showImageWall?: boolean;
  showDeleteIcon?: boolean;
  dragging?: boolean;
}
// props for the DragAndDrop component
export interface DragAndDropProps {
  multiple: boolean;
  getFiles: (allSelectedFiles: FileType[]) => void;
}
