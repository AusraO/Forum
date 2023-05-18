import { useContext } from 'react';
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
  >img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Reply = ({ data }) => {

  const { users, currentUser } = useContext(UsersContext);
  const { setReplies, RepliesActionTypes } = useContext(RepliesContext);
  const user = users.find(el => el.id === data.userId);

  return (
    <StyledPostDiv>
      {
        currentUser && data.userId === currentUser.id &&
        <button
          onClick = { () => setReplies({
            type: RepliesActionTypes.delete,
            id: data.id
          }) }
        >Delete Post</button>
      }
      
      { users.length ?
        <StyledUserInfoDiv>
          <img src={user.avatarURL} alt="user avatar" />
          <p>{user.userName}</p>
        </StyledUserInfoDiv>: <p>loading user...</p>
      }
      <div>
        <h3>{data.content}</h3>
      </div>
    </StyledPostDiv>
  );
}
 
export default Reply;