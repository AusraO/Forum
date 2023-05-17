import { useContext } from 'react';
import styled from 'styled-components';
import UsersContext from '../../../contexts/UsersContext';
import PostsContext from '../../../contexts/PostsContext';

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

const Post = ({ data }) => {

  const { users, currentUser } = useContext(UsersContext);
  const { setPosts, PostsActionTypes } = useContext(PostsContext);
  const user = users.find(el => el.id === data.userId);

  return (
    <StyledPostDiv>
      {
        currentUser && data.userId === currentUser.id &&
        <button
          onClick = { () => setPosts({
            type: PostsActionTypes.delete,
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
        <h3>{data.title}</h3>
      </div>
    </StyledPostDiv>
  );
}
 
export default Post;