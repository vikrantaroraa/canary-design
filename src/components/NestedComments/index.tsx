import { ChangeEvent, useState } from "react";
import useCommentTree from "src/components/NestedComments/hooks/use-comment-tree";
import styles from "./index.module.css";
import Comment, { CommentType } from "./Comment";

interface NestedCommentProps {
  comments: CommentType[];
  onSubmit: (addedComment: string) => void;
  onEdit: (updatedComment: string) => void;
  onDelete: (commentId: number) => void;
}

const NestedComments = ({
  comments,
  onSubmit,
  onEdit,
  onDelete,
}: NestedCommentProps) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
  } = useCommentTree(comments);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => [
    setComment(e.target.value),
  ];

  const handleReply = (commentId: number | undefined, content: string) => {
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handleEdit = (commentId: number, updatedComment: string) => {
    editComment(commentId, updatedComment);
    onEdit(updatedComment);
  };

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    onDelete(commentId);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };

  return (
    <>
      <div className={styles["add-comment"]}>
        <textarea
          className={styles["comment-textarea"]}
          value={comment}
          rows={3}
          cols={50}
          placeholder={"Add a new comment..."}
          onChange={handleChange}
        />
        <button className={styles["comment-button"]} onClick={handleSubmit}>
          Add Comment
        </button>
      </div>

      {commentsData.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
          />
        );
      })}
    </>
  );
};

export default NestedComments;
