import { useState } from "react";
import useCommentTree from "src/components/NestedComments/hooks/use-comment-tree";
import styles from "./index.module.css";
import CommentComponent, { Comment } from "./Comment";

interface NestedCommentProps {
  comments: Comment[];
  onSubmit: (addedComment: string) => void;
  onEdit: (updatedComment: string) => void;
  onDelete: (commentId: number) => void;
  onUpVote: (commentId: number) => void;
  onDownVote: (commentId: number) => void;
}

const NestedComments = ({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  onUpVote,
  onDownVote,
}: NestedCommentProps) => {
  const [comment, setComment] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
    upDownVoteComment,
    sortComments,
  } = useCommentTree(comments);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => [
    setComment(e.target.value),
  ];

  const handleUpVote = (commentId: number) => {
    upDownVoteComment(true, commentId);
    onUpVote(commentId);
    if (sortOrder === "most-voted") sortComments(sortOrder);
  };

  const handleDownVote = (commentId: number) => {
    upDownVoteComment(false, commentId);
    onDownVote(commentId);
    if (sortOrder === "most-voted") sortComments(sortOrder);
  };

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

  const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value;
    setSortOrder(sortOrder);
    sortComments(sortOrder);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className={styles["add-comment"]}>
        <textarea
          className={styles["comment-textarea"]}
          onKeyDown={handleKeyDown}
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

      <div>
        <label htmlFor="sortOrder">Sort By:</label>
        <select
          name="sort"
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortOrder}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="most-voted">Most Voted</option>
        </select>
      </div>

      {commentsData.map((comment) => {
        return (
          <CommentComponent
            key={comment.id}
            comment={comment}
            onSubmitComment={handleReply}
            onEditComment={handleEdit}
            onDeleteComment={handleDelete}
            onUpVoteComment={handleUpVote}
            onDownVoteComment={handleDownVote}
          />
        );
      })}
    </>
  );
};

export default NestedComments;
