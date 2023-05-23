import { useState, useContext } from 'react';
import styled from 'styled-components';
import UsersContext from '../../../contexts/UsersContext';
import RepliesContext from '../../../contexts/RepliesContext';
import { Link } from 'react-router-dom';
import { GrLike, GrDislike } from 'react-icons/gr';

const StyledPostDiv = styled.div`
   position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #F8F5ED;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
.content{
 width: 90%;
  
}
  > div > a {
    text-decoration: none;
    color: black;
    :hover {
      color: #635029;
      cursor: pointer;
    }
  }

  > button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: #f5e09a;
    border: none;
    font-size: 15px;
    :hover{
    cursor: pointer;
    background-color: #e6c963;
  }
  }
`;
const StyledUserInfoDiv = styled.div`
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
const StyledLikesDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
 >button{
  background-color:#F5E1A1 ;
  border: none;
  :hover{
    cursor: pointer;
    background-color: #e6c963;
  }
 } 
`;
const StyledLikeButton = styled.button`
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const Reply = ({ data }) => {
  const { users, currentUser } = useContext(UsersContext);
  const { replies, setReplies, RepliesActionTypes } = useContext(RepliesContext);
  const user = users.find((el) => el.id === data.userId);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(data.likes);
  const [dislikes, setDislikes] = useState(data.dislikes);

  const handleLike = () => {
    if (currentUser) {
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
        setReplies({
          type: RepliesActionTypes.updateLikes,
          id: data.id,
          likes: likes - 1,
          dislikes: dislikes,
        });
      } else {
        if (disliked) {
          setDislikes(dislikes - 1);
          setDisliked(false);
        }
        setLikes(likes + 1);
        setLiked(true);
        setReplies({
          type: RepliesActionTypes.updateLikes,
          id: data.id,
          likes: likes + 1,
          dislikes: dislikes,
        });
      }
    }
  };

  const handleDislike = () => {
    if (currentUser) {
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
        setReplies({
          type: RepliesActionTypes.updateLikes,
          id: data.id,
          likes: likes,
          dislikes: dislikes - 1,
        });
      } else {
        if (liked) {
          setLikes(likes - 1);
          setLiked(false);
        }
        setDislikes(dislikes + 1);
        setDisliked(true);
        setReplies({
          type: RepliesActionTypes.updateLikes,
          id: data.id,
          likes: likes,
          dislikes: dislikes + 1,
        });
      }
    }
  };

  return (
    <StyledPostDiv>
      {currentUser && data.userId === currentUser.id && (
        <button onClick={() => setReplies({ type: RepliesActionTypes.delete, id: data.id })}>
          Delete Post
        </button>
      )}

      {users.length ? (
        <>
          <StyledUserInfoDiv>
            <img src={user.avatarURL} alt="user avatar" />
            <p>{user.userName}</p>
          </StyledUserInfoDiv>
          <div className='content'>
            <h4>{data.content}</h4>
          </div>
          <StyledLikesDiv>
            <StyledLikeButton active={liked} onClick={handleLike}>
              <GrLike/> {likes}
            </StyledLikeButton>
            <StyledLikeButton active={disliked} onClick={handleDislike}>
             <GrDislike/> {dislikes}
            </StyledLikeButton>
          </StyledLikesDiv>
        </>
      ) : (
        <p>loading user...</p>
      )}
    </StyledPostDiv>
  );
};

export default Reply;