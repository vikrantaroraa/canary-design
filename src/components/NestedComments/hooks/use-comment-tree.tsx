import { useState } from "react";
import { Comment } from "src/components/NestedComments/Comment";

const useCommentTree = (initialComments: Comment[]) => {
  const [comments, setComments] = useState(initialComments);

  // DFS algorithm to insert (or add) a new comment/reply
  const insertNode = (
    tree: Comment[],
    commentId: number,
    newComment: Comment
  ): Comment[] => {
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
    tree: Comment[],
    commentId: number,
    updatedComment: string
  ): Comment[] => {
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
  // const deleteNode = (tree: Comment[], commentId: number) => {
  //   return tree.reduce((acc, comment) => {
  //     if (comment.id === commentId) {
  //       return acc;
  //     } else if (comment.replies && comment.replies.length > 0) {
  //       comment.replies = deleteNode(comment.replies, commentId);
  //     }

  //     return [...acc, comment];
  //   }, []);
  // };

  // const deleteComment = (commentId: number) => {
  //   setComments((prevComments) => deleteNode(prevComments, commentId));
  // };

  const deleteNode = (tree: Comment[], commentId: number): Comment[] => {
    return tree.reduce<Comment[]>((acc, comment) => {
      if (comment.id === commentId) {
        // Skip this comment by not adding it to the accumulator
        return acc;
      } else {
        // If the comment has replies, apply deleteNode recursively
        const updatedReplies =
          comment.replies && comment.replies.length > 0
            ? deleteNode(comment.replies, commentId)
            : [];

        // Return the comment with updated replies
        return [...acc, { ...comment, replies: updatedReplies }];
      }
    }, []);
  };

  const deleteComment = (commentId: number): void => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };

  // DFS algorithm to upvote or downvote a comment/reply
  const upDownVoteNode = (
    tree: Comment[],
    upvote: boolean,
    commentId: number
  ): Comment[] => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          votes: upvote ? comment.votes + 1 : comment.votes - 1,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: upDownVoteNode(comment.replies, upvote, commentId),
        };
      }

      return comment;
    });
  };

  const upDownVoteComment = (upvote = true, commentId: number) => {
    setComments((prevComments) =>
      upDownVoteNode(prevComments, upvote, commentId)
    );
  };

  // sort the order of comments
  const sortNodes = (tree: Comment[], sortOrder: string) => {
    return tree.slice().sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      } else if (sortOrder === "oldest") {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      } else if (sortOrder === "most-voted") {
        return b.votes - a.votes;
      }
      return 0;
    });
  };

  const sortComments = (sortOrder: string) => {
    setComments((prevComments) => sortNodes(prevComments, sortOrder));
  };

  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
    upDownVoteComment,
    sortComments,
  };
};

export default useCommentTree;
