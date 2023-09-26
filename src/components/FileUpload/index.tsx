import React, { ChangeEvent, useRef, useState } from "react";
import styles from "src/components/FileUpload/index.module.css";
import fileIcon from "src/assets/file-icon.svg";
import deleteFile from "src/assets/delete-file.svg";
import {
  FileType,
  FileUploadProps,
} from "src/components/FileUpload/index.interface";

function FileUpload({
  multiple,
  getFiles,
  showImageWall = true,
  showDeleteIcon = true,
}: FileUploadProps) {
  const [allSelectedFiles, setAllSelectedFiles] = useState<FileType[]>([]);
  const formRef = useRef<HTMLInputElement>(null);

  // might later use this function
  // const generateId = () => Math.ceil(Math.random() * 1000000);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
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
    // storing the value of "update" array variable in another array "_allFilesSelected" because react does not re-render on
    // updating the array even if it is a state variable because it is reference by address.
    const _allFilesSelected = [...update];
    setAllSelectedFiles(_allFilesSelected);
    getFiles(update);
  };

  const removeFile = (id: string) => {
    const newFileList = allSelectedFiles.filter((file) => file.id !== id);
    setAllSelectedFiles(newFileList);
  };

  return (
    <div className={styles["file-upload"]}>
      <div className={styles["upload-and-delete-file"]}>
        <div
          onClick={() => formRef.current?.click()}
          className={styles["upload-file"]}
        >
          <input
            ref={formRef}
            type="file"
            accept="image/*"
            hidden
            multiple={multiple}
            onChange={fileHandler}
          />
          <span className={styles["upload-files-message"]}>
            <img src={fileIcon} height={30} width={30} />
            Upload Files
          </span>
        </div>
        {showDeleteIcon && (
          <span
            className={styles["delete-icon"]}
            onClick={() => setAllSelectedFiles([])}
          >
            <img src={deleteFile} height={30} width={30} />
          </span>
        )}
      </div>
      {showImageWall && (
        <div className={styles["uploaded-image-and-message"]}>
          {allSelectedFiles.length !== 0 ? (
            <div className={styles["all-images-container"]}>
              {allSelectedFiles.map((file) => (
                <div
                  className={styles["image-container"]}
                  onClick={() => removeFile(file.id)}
                >
                  <img src={file.url} alt={file.name} />
                  <p className={styles["close-image-icon"]}>x</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles["no-files-message"]}>
              <p>Your files will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { FileUpload };
