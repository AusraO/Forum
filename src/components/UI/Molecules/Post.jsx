import { useContext } from 'react';
import styled from 'styled-components';
import UsersContext from '../../../contexts/UsersContext';
import PostsContext from '../../../contexts/PostsContext';
import { Link } from 'react-router-dom';

const StyledPostDiv = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #faf9f7;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
      background-color: #e6c963;
      cursor: pointer;
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

const Post = ({ data }) => {

  const { users, currentUser } = useContext(UsersContext);
  const { setPosts, PostsActionTypes } = useContext(PostsContext);
  const user = users.find(el => el.id === data.userId);

  return (
    <StyledPostDiv>
    
      
      { users.length ?
        <StyledUserInfoDiv>
          <img src={user.avatarURL} alt="user avatar" />
          <p>{user.userName}</p>
        </StyledUserInfoDiv>: <p>loading user...</p>
      }
      <div>
      <Link to={`/posts/${data.id}`}>  <h3>{data.title}</h3></Link>
      </div>
      
      
          
      {
        currentUser && data.userId === currentUser.id &&
        <button
          onClick = { () => setPosts({
            type: PostsActionTypes.delete,
            id: data.id
          }) }
        >Delete Post</button>
      }
    </StyledPostDiv>
  );
}
 
export default Post;