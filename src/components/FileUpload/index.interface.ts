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
