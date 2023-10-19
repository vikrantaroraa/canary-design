import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "src/components/FileUpload";

/**
 * Upload the file by selecting or dragging.
 * Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.
 * - When you need to upload one or more files.
 * - When you need to show the process of uploading.
 * - When you need to upload files by dragging and dropping.
 */
const meta = {
  title: "Example/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const getFiles = (files: unknown) => {
  console.log("files from getFiles: ", files);
};

export const ExampleFileUpload: Story = {
  args: {
    multiple: true,
    getFiles: getFiles,
    showImageWall: true,
    showDeleteIcon: true,
    dragging: true,
  },
};
