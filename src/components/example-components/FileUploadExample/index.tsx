import React from "react";
import { FileUpload } from "src/components/FileUpload";

function FileUploadExample() {
  return (
    <div
    // style={{ width: 500 }}
    >
      <FileUpload
        multiple
        getFiles={(files: unknown) => {
          console.log("files from getFiles: ", files);
        }}
        // showImageWall={false}
        // showDeleteIcon={false}
        dragging
      />
    </div>
  );
}

export default FileUploadExample;
