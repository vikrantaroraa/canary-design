import { DragAndDrop } from "./DragAndDrop/index";
import { SelectFile } from "./SelectFile/index";

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

export interface SelectFileProps {
  multiple: boolean;
  getFiles: (allSelectedFiles: FileType[]) => void;
  showImageWall?: boolean;
  showDeleteIcon?: boolean;
}

function FileUpload({
  multiple,
  getFiles,
  showImageWall = true,
  showDeleteIcon = true,
  dragging = false,
}: FileUploadProps) {
  if (dragging) {
    return <DragAndDrop getFiles={getFiles} multiple={multiple} />;
  }

  return (
    <SelectFile
      getFiles={getFiles}
      multiple={multiple}
      showImageWall={showImageWall}
      showDeleteIcon={showDeleteIcon}
    />
  );
}

export { FileUpload };
