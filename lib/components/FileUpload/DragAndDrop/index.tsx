// @ts-nocheck
import React, { ChangeEvent, useRef, useState } from "react";
import styles from "./index.module.css";
import imageIcon from "../../../../src/assets/image-icon.svg";
import { DragAndDropProps, FileType } from "../index";

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

    if (files) {
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
    }
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
        <div className={styles["all-files-container"]}>
          {allSelectedFiles.map((file) => (
            <FileComponent file={file} key={file.id} removeFile={removeFile} />
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

export { DragAndDrop, FileComponent };

const FileComponent = ({
  file,
  removeFile,
}: {
  file: FileType;
  removeFile: (id: string) => void;
}) => {
  let FILE: JSX.Element;
  switch (file.type) {
    case "application/pdf":
    case "text/plain":
      FILE = () => {
        return <iframe src={file.url}></iframe>;
      };
      break;
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "image/webp":
    case "image/svg":
    case "image/avif":
      FILE = () => {
        return <img src={file.url} alt={file.name}></img>;
      };
      break;
    case "video/mp4":
      FILE = () => {
        return (
          <video width="100%" height="100%" controls>
            <source src={file.url} type="video/mp4" />
          </video>
        );
      };
      break;
    default:
      FILE = () => {
        return <iframe src={file.url}></iframe>;
      };
      break;
  }
  return (
    <div className={styles["file-container"]}>
      <FILE />
      <span
        className={styles["close-file-icon"]}
        onClick={() => removeFile(file.id)}
      >
        <span>x</span>
      </span>
    </div>
  );
};
