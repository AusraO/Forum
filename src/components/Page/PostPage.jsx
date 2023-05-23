import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import PostsContext from '../../contexts/PostsContext';
import styled from 'styled-components';
import UsersContext from '../../contexts/UsersContext';
import AddRepliesContext from '../../contexts/AddReplyContext';
import RepliesContext from '../../contexts/RepliesContext';
import Reply from '../UI/Molecules/Reply';
import "../Page/EditPostModalStyles.css"
import { GrLike, GrDislike } from 'react-icons/gr';


const StyledPostDiv = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #f8f5ed;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
width: 90%;
  .post{
   padding-left: 10px;
    background-color: #F5E1A1
  }
.postlikes{
  width: 100%;
  .likes > button {
    width: 60px;
    background-color: #f5e09a;
    border: none;
    font-size: 15px;
    :hover{
      background-color: #e6c963;
      cursor: pointer;
    }
  }
}
  > button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #f5e09a;
    border: none;
    font-size: 15px;
    cursor: pointer;
    :hover{
      background-color: #e6c963;
    }
  }
`;

const StyledUserInfo = styled.div`
    display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: #ffeaa5;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  > p {
    font-size: 17px;
    font-weight: bold;
  }
  > img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const StyledAnswerDiv = styled.div`
    width: 90%;
  >h2{
    font-family: monospace;
  }
`
const StyledPage = styled.div`
min-height: 67vh;
  display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
margin-top: 1rem;
>form{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  background-color:  #f8f5ed;
  padding: 15px;
}
>form>button{
  width: 80px;
  background-color:#ffeaa5 ;
  border: none;
  height: 30px;
  :hover{
    cursor: pointer;
    background-color: #e6c963;
  }
}
>form>textarea{
  width: 500px;
  height: 100px;
}
`

const PostPage = () => {
  const { postId } = useParams();
  const { posts } = useContext(PostsContext);
  const { users, currentUser } = useContext(UsersContext);
  const { replies } = useContext(RepliesContext);
  const { addReply } = useContext(AddRepliesContext);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userAction, setUserAction] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [postReplies, setPostReplies] = useState([]);
  const [modal, setModal] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const post = posts.find((post) => post.id.toString() === postId.toString());
    if (post) {
      setSelectedPost(post);
      setLikes(post.likes || 0);
      setDislikes(post.dislikes || 0);
      setEditedContent(post.content);
    }
  }, [postId, posts]);

  useEffect(() => {
    const filteredReplies = replies.filter(
      (reply) => reply.questionId.toString() === postId.toString()
    );
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
      console.log("User not logged in. Please log in to perform this action.");
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (currentUser && replyContent.trim() !== "") {
      const newReply = {
        id: replies.length + 1,
        userId: currentUser.id,
        questionId: postId,
        content: replyContent,
        likes: 0,
        dislikes: 0,
      };
      addReply(newReply);
      setReplyContent("");
    }
  };

  const toggleModal = () => {
    if (modal) {
      setSelectedPost({ ...selectedPost, content: editedContent });
    } else {
      setEditedContent(selectedPost.content);
    }
    setModal(!modal);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    if (currentUser) {
      const updatedPost = {
        id: selectedPost.id,
        userId: selectedPost.userId,
        title: selectedPost.title,
        content: editedContent,
        likes: selectedPost.likes,
        dislikes: selectedPost.dislikes
      };
     
      fetch(`http://localhost:8080/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
      })
        .then(() => {
          setSelectedPost(updatedPost);
          toggleModal();
        })
        .catch((error) => {
          console.log("Error updating post:", error);
        });
    }
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const isCurrentUserOwner = currentUser && currentUser.id === postUser.id;

  return (
    <StyledPage>
      <StyledPostDiv>
        <StyledUserInfo>
          <img src={postUser.avatarURL} alt="user avatar" />
          <p>{postUser.userName}</p>
        </StyledUserInfo>
        <div className='postlikes'>
          <div className='post'>
            <h2>{selectedPost.title}</h2>
            {modal ? (
              <input
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Edit content..."
              />
            ) : (
              <p>{selectedPost.content}</p>
            )}
          </div>
          <div className='likes'>
            <button
              onClick={handleLike}
              className={userAction === "like" ? "active" : ""}
              disabled={!currentUser}
            >
              <GrLike />   {likes}
            </button>
            <button
              onClick={handleDislike}
              className={userAction === "dislike" ? "active" : ""}
              disabled={!currentUser}
            >
              <GrDislike />   {dislikes}
            </button>
          </div>
        </div>
        {isCurrentUserOwner && <button onClick={toggleModal}>Edit post</button>}
      </StyledPostDiv>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <form onSubmit={handleEditSubmit}>
              <textarea
                className="modal-textarea"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Edit content..."
              ></textarea>
              <button
                className="modal-button"
                type="submit"
                disabled={!currentUser}
              >
                Edit
              </button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
      <StyledAnswerDiv>
        <h2>Replies:</h2>
        {postReplies.length === 0 ? (
          <p>No replies yet.</p>
        ) : (
          <div>
            {postReplies.map((reply) => (
              <Reply key={reply.id} data={reply} />
            ))}
          </div>
        )}
      </StyledAnswerDiv>

      <form onSubmit={handleReplySubmit}>
        <textarea
          className='textArea'
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write a reply..."
        ></textarea>
        <button type="submit" disabled={!currentUser}>
          Reply
        </button>
      </form>
    </StyledPage>
  );
};

export default PostPage;