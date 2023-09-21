import React, { useRef, useState } from "react";
import styles from "src/components/FileUpload/index.module.css";
import fileUpload from "src/assets/file-upload.svg";
import fileIcon from "src/assets/file-icon.svg";
import deleteFile from "src/assets/delete-file.svg";

function FileUpload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const formRef = useRef();

  return (
    <div className={styles["file-upload"]}>
      <form onClick={() => formRef.current.click()}>
        <input
          ref={formRef}
          type="file"
          accept="image/*"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <img
            style={{ objectFit: "cover", border: "1px solid #f6f6f6" }}
            src={image}
            height={200}
            width={180}
            alt={fileName}
          />
        ) : (
          <>
            <img src={fileUpload} height={30} width={30} />
            <p>Browse files to upload</p>
          </>
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
              setImage(null);
            }}
          />
        </span>
      </section>
    </div>
  );
}

export default FileUpload;
