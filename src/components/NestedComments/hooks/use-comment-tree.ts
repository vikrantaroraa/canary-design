import { useState } from "react";
import { CommentType } from "src/components/NestedComments/Comment";

const useCommentTree = (initialComments: CommentType[]) => {
  const [comments, setComments] = useState(initialComments);

  // DFS algorithm to insert (or add) a new comment/reply
  const insertNode = (
    tree: CommentType[],
    commentId: number,
    newComment: CommentType
  ) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, newComment),
        };
      }

      return comment;
    });
  };

  const insertComment = (commentId: number | undefined, content: string) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  // DFS algorithm to edit a comment/reply
  const editNode = (
    tree: CommentType[],
    commentId: number,
    updatedComment: string
  ) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: updatedComment,
          timestamp: new Date().toISOString(),
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, updatedComment),
        };
      }

      return comment;
    });
  };

  const editComment = (commentId: number, updatedComment: string) => {
    setComments((prevComments) =>
      editNode(prevComments, commentId, updatedComment)
    );
  };

  // DFS algorithm to delete a comment/reply
  const deleteNode = (tree: CommentType[], commentId: number) => {
    return tree.reduce((acc, comment) => {
      if (comment.id === commentId) {
        return acc;
      } else if (comment.replies && comment.replies.length > 0) {
        comment.replies = deleteNode(comment.replies, commentId);
      }

      return [...acc, comment];
    }, []);
  };

  const deleteComment = (commentId: number) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
