import { useState, useContext } from 'react';
import styled from 'styled-components';
import UsersContext from '../../../contexts/UsersContext';
import RepliesContext from '../../../contexts/RepliesContext';
import { Link } from 'react-router-dom';

const StyledPostDiv = styled.div`
  border: 1px solid black;
`;
const StyledUserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const StyledLikesDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
const StyledLikeButton = styled.button`
  color: ${({ active }) => (active ? 'blue' : 'black')};
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
          <div>
            <h3>{data.content}</h3>
          </div>
          <StyledLikesDiv>
            <StyledLikeButton active={liked} onClick={handleLike}>
              Like {likes}
            </StyledLikeButton>
            <StyledLikeButton active={disliked} onClick={handleDislike}>
              Dislike {dislikes}
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