import React, { ChangeEvent, useRef, useState } from "react";
import styles from "src/components/FileUpload/index.module.css";
import fileIcon from "src/assets/file-icon.svg";
import deleteFile from "src/assets/delete-file.svg";

export interface FileType {
  url: string;
  name: string;
  id: string;
  size: number;
  type: string;
}

export interface FileUploadProps {
  multiple: boolean;
  getFiles: (allSelectedFiles: FileType[]) => void;
}

function FileUpload({ multiple, getFiles }: FileUploadProps) {
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

  return (
    <div className={styles["file-upload"]}>
      <section>
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
        <span className={styles["delete-icon"]}>
          <img
            src={deleteFile}
            height={30}
            width={30}
            onClick={() => setAllSelectedFiles([])}
          />
        </span>
      </section>
      <div className={styles["uploaded-image-and-message"]}>
        {allSelectedFiles.length !== 0 ? (
          <div className={styles["images-container"]}>
            {allSelectedFiles.map((file) => (
              <div
                className={styles["image-container"]}
                onClick={() => removeFile(file.id)}
              >
                <img
                  style={{ objectFit: "cover", border: "1px solid #f6f6f6" }}
                  src={file.url}
                  alt={file.name}
                />
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
    </div>
  );
}

export default FileUpload;
