import React, { ChangeEvent, useRef, useState } from "react";
import styles from "src/components/FileUpload/DragAndDrop/index.module.css";
import imageIcon from "src/assets/image-icon.svg";
import {
  DragAndDropProps,
  FileType,
} from "src/components/FileUpload/index.interface";

function DragAndDrop({ multiple, getFiles }: DragAndDropProps) {
  const [allSelectedFiles, setAllSelectedFiles] = useState<FileType[]>([]);
  const formRef = useRef<HTMLInputElement>(null);

  // might later use this function
  // const generateId = () => Math.ceil(Math.random() * 1000000);

  // Note:- Here we do not need to use any boolean variable like "isDragAndDropUsed" to check whether drag-and-drop
  // was used or not because we can find that from the type of event itself
  const fileHandler = (
    event: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let update = allSelectedFiles;
    let files;
    console.log("event ka type:", event.type);
    console.log({ event });

    if (event.type === "drop") {
      files = event.dataTransfer.files;
      // console.log("all files selected on drag and drop: ", files);
    } else {
      files = event.target.files;
      // console.log("all files selected on file selection: ", files);
    }

    for (const file of files) {
      const { name, size, type } = file;
      const fileData: FileType = {
        url: URL.createObjectURL(file),
        name: name,
        id: name,
        size: size / 1024,
        type: type,
      };
      if (multiple) {
        update.push(fileData);
      } else {
        update = [fileData];
      }
    }
    // console.log("new Files data: ", update);
    const _allFilesSelected = [...update];
    setAllSelectedFiles(_allFilesSelected);
    getFiles(update);
  };

  const removeFile = (id: string) => {
    const newFileList = allSelectedFiles.filter((file) => file.id !== id);
    setAllSelectedFiles(newFileList);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    fileHandler(event);
  };

  return (
    <div
      className={styles["drag-and-drop-container"]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {allSelectedFiles.length !== 0 ? (
        <div className={styles["all-images-container"]}>
          {allSelectedFiles.map((file) => (
            <div className={styles["image-container"]} key={file.id}>
              <img src={file.url} alt={file.name} />
              <p
                className={styles["close-image-icon"]}
                onClick={() => removeFile(file.id)}
              >
                x
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={styles["upload-button"]}
          onClick={() => formRef.current?.click()}
        >
          <input
            ref={formRef}
            type="file"
            accept="image/*"
            hidden
            multiple={multiple}
            onChange={fileHandler}
          />
          <img src={imageIcon} height={40} width={40} />
          <p className={styles["browse-or-drop-message"]}>
            Browse or drop files
          </p>
        </div>
      )}
    </div>
  );
}

export { DragAndDrop };
