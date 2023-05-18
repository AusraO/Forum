import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';
import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledPostDiv = styled.div`
  padding: 0 50px;
  border: 1px solid black;
  > h1{
    text-align: center;
  }

`;

const StyledUserInfo = styled.div`
  >img{
    width: 70px;
  }
  display: flex;
  justify-content: flex-start;
`





const PostPage = () => {
  const { postId } = useParams();
  const { posts } = useContext(PostsContext);
  const { users, currentUser } = useContext(UsersContext); // Assuming the current user is available in the UsersContext
  const { replies, addReply } = useContext(RepliesContext); // Assuming the replies and addReply function are available in the RepliesContext
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userAction, setUserAction] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [postReplies, setPostReplies] = useState([]);

  useEffect(() => {
    const post = posts.find((post) => post.id.toString() === postId.toString());
    if (post) {
      setSelectedPost(post);
      setLikes(post.likes || 0);
      setDislikes(post.dislikes || 0);
    }
  }, [postId, posts]);

  useEffect(() => {
    const filteredReplies = replies.filter((reply) => reply.questionId.toString() === postId.toString());
    setPostReplies(filteredReplies);
  }, [postId, replies]);

  if (!selectedPost) {
    return <div>Post not found!</div>;
  }

  const postUser = users.find((user) => user.id === selectedPost.userId);

  const handleLike = () => {
    if (currentUser) {
      if (userAction === "like") {
        setLikes(likes - 1);
        setUserAction(null);
      } else if (userAction === "dislike") {
        setLikes(likes + 1);
        setDislikes(dislikes - 1);
        setUserAction("like");
      } else {
        setLikes(likes + 1);
        setUserAction("like");
      }
    } else {
      // Handle case when user is not logged in
      console.log("User not logged in. Please log in to perform this action.");
    }
  };

  const handleDislike = () => {
    if (currentUser) {
      if (userAction === "dislike") {
        setDislikes(dislikes - 1);
        setUserAction(null);
      } else if (userAction === "like") {
        setLikes(likes - 1);
        setDislikes(dislikes + 1);
        setUserAction("dislike");
      } else {
        setDislikes(dislikes + 1);
        setUserAction("dislike");
      }
    } else {
      // Handle case when user is not logged in
      console.log("User not logged in. Please log in to perform this action.");
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (currentUser && replyContent.trim() !== "") {
      const newReply = {
        id: replies.length + 1, // Generate a unique ID for the new reply
        userId: currentUser.id,
        questionId: postId,
        content: replyContent,
        likes: 0,
        dislikes: 0
      };
      addReply(newReply);
      setReplyContent("");
    }
  };

  return (
    <StyledPostDiv>
      <StyledUserInfo>
        <img src={postUser.avatarURL} alt="user avatar" />
        <p>{postUser.userName}</p>
      </StyledUserInfo>
      <div>
        <button onClick={handleLike} className={userAction === "like" ? "active" : ""} disabled={!currentUser}>
          Like
        </button>
        <span>{likes}</span>
        <button onClick={handleDislike} className={userAction === "dislike" ? "active" : ""} disabled={!currentUser}>
          Dislike
        </button>
        <span>{dislikes}</span>
      </div>
      <h2>{selectedPost.title}</h2>
      <p>{selectedPost.content}</p>
      <div>
        <h3>Replies:</h3>
        {postReplies.length === 0 ? (
          <p>No replies yet.</p>
        ) : (
          <ul>
            {postReplies.map((reply) => (
              <li key={reply.id}>
                <p>{reply.content}</p>
                <p>Likes: {reply.likes}</p>
                <p>Dislikes: {reply.dislikes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleReplySubmit}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write a reply..."
        ></textarea>
        <button type="submit" disabled={!currentUser}>
          Reply
        </button>
      </form>
    </StyledPostDiv>
  );
};

export default PostPage;