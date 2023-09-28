import React from "react";
import { FileUploadProps } from "src/components/FileUpload/index.interface";
import { DragAndDrop } from "src/components/FileUpload/DragAndDrop";
import { SelectFile } from "src/components/FileUpload/SelectFile";

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
