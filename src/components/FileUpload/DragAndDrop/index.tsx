import React, { ChangeEvent, useRef, useState } from "react";
import styles from "src/components/FileUpload/index.module.css";
import fileUpload from "src/assets/file-upload.svg";
import fileIcon from "src/assets/file-icon.svg";
import deleteFile from "src/assets/delete-file.svg";

export interface FileType {
  url: string;
  name: string;
  id: number;
  size: number;
  type: string;
}

export interface FileUploadProps {
  multiple: boolean;
  getFiles: (allSelectedFiles: FileType[]) => void;
}

function FileUpload({ multiple, getFiles }: FileUploadProps) {
  const [allSelectedFiles, setAllSelectedFiles] = useState<FileType[]>([]);
  const [image, setImage] = useState<string>("");
  const [fileName, setFileName] = useState("No File Selected");
  const formRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.ceil(Math.random() * 1000000);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log("all files selected: ", files);
    let update = allSelectedFiles;
    for (const file of files) {
      const { name, size, type } = file;
      const fileData: FileType = {
        url: URL.createObjectURL(file),
        name: name,
        id: generateId(),
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

    // Here we replaced files[0] with files because if files !== null then files[0] will definitely
    // be non-null. Also it takes care of the error 'files' is possibly 'null'
    // files && setFileName(files[0].name);
    // if (files) {
    //   setImage(URL.createObjectURL(files[0]));
    // }
  };

  return (
    <div className={styles["file-upload"]}>
      <form onClick={() => formRef.current?.click()}>
        <input
          ref={formRef}
          type="file"
          accept="image/*"
          hidden
          multiple={multiple}
          onChange={fileHandler}
        />
        {allSelectedFiles.length !== 0 ? (
          <div className={styles["images-container"]}>
            {allSelectedFiles.map((file) => (
              <div className={styles["image-container"]}>
                <img
                  style={{ objectFit: "cover", border: "1px solid #f6f6f6" }}
                  src={file.url}
                  alt={fileName}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["upload-button"]}>
            <img src={fileUpload} height={30} width={30} />
            <p>Upload</p>
          </div>
        )}
      </form>
      <section>
        <img src={fileIcon} height={30} width={30} />
        <span className={styles["filename-and-delete-icon"]}>
          {fileName}
          <img
            className={styles["delete-icon"]}
            src={deleteFile}
            height={30}
            width={30}
            onClick={() => {
              setFileName("No File Selected");
              setImage("");
            }}
          />
        </span>
      </section>
    </div>
  );
}

export default FileUpload;
