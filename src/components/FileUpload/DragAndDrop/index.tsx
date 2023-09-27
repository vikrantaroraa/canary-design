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

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log("all files selected: ", files);
    let update = allSelectedFiles;
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
    const _allFilesSelected = [...update];
    setAllSelectedFiles(_allFilesSelected);
    // console.log("new Files data: ", update);
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
    const files = event.dataTransfer?.files;
    console.log(files);
    let update = allSelectedFiles;
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
    const _allFilesSelected = [...update];
    setAllSelectedFiles(_allFilesSelected);
    // console.log("new Files data: ", update);
    getFiles(update);
  };

  return (
    <div
      className={styles["file-upload"]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <form>
        {allSelectedFiles.length !== 0 ? (
          <div className={styles["all-images-container"]}>
            {allSelectedFiles.map((file) => (
              <div className={styles["image-container"]}>
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
      </form>
      {/* <section>
        <img src={deleteFile} height={30} width={30} />
        <span className={styles["filename-and-delete-icon"]}>
          <img
            className={styles["delete-icon"]}
            src={deleteFile}
            height={30}
            width={30}
          />
        </span>
      </section> */}
    </div>
  );
}

export { DragAndDrop };
