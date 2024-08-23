import { ChangeEvent, useState } from "react";
import styles from "../index.module.css";

export interface CommentType {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  onSubmitComment: (commentId: number, content: string) => void;
  onEditComment: (commentId: number, updatedComment: string) => void;
  onDeleteComment: (commentID: number) => void;
}

const Comment = ({
  comment,
  onSubmitComment,
  onEditComment,
  onDeleteComment,
}: CommentProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [expand, setExpand] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setEditedContent(comment.content);
  };

  const handleEditSubmit = () => {
    onEditComment(comment.id, editedContent);
    setEditMode(false);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (editMode) {
      setEditedContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  return (
    <div className={styles["comment"]}>
      {!editMode ? (
        <>
          <p className={styles["comment-content"]}>{comment.content}</p>
          <p className={styles["comment-content"]}>Votes: {comment.votes}</p>
          <p className={styles["comment-content"]}>
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className={styles["add-comment"]}>
          <textarea
            className={styles["comment-textarea"]}
            value={editedContent}
            rows={3}
            cols={50}
            placeholder={"Add a new comment..."}
            onChange={handleChange}
          />
          <button
            className={styles["comment-button"]}
            onClick={handleEditSubmit}
          >
            Save Edit
          </button>
          <button className={styles["comment-button"]} onClick={toggleEditMode}>
            Cancel Edit
          </button>
        </div>
      )}

      <div className={styles["comment-actions"]}>
        <button className={styles["comment-button"]} onClick={toggleExpand}>
          {expand ? "Hide Replies" : "Reply"}
        </button>
        <button className={styles["comment-button"]} onClick={toggleEditMode}>
          Edit
        </button>
        <button
          className={styles["comment-button"]}
          onClick={() => onDeleteComment(comment.id)}
        >
          Delete
        </button>
      </div>

      {expand && (
        <div className={styles["comment-replies"]}>
          <div className={styles["add-comment"]}>
            <textarea
              className={styles["comment-textarea"]}
              value={replyContent}
              rows={3}
              cols={50}
              placeholder={"Add a new comment..."}
              onChange={handleChange}
            />
            <button
              className={styles["comment-button"]}
              onClick={handleReplySubmit}
            >
              Add Comment
            </button>
          </div>

          {comment?.replies?.map((reply) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onSubmitComment={onSubmitComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
