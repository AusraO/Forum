import PostsContext from "../../contexts/PostsContext";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMain = styled.main`
  padding: 10px 50px;
  text-align: center;
  min-height: 67vh;
  > h1{
    text-align: center;
    font-family: monospace;
  }
  >div{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  >a>button{
    background-color:#FFEAA5 ;
    border: none;
    width: 100px;
    height: 40px;
    margin-bottom: 10px;
    :hover{
      background-color: #e6c963;
      cursor: pointer;
    }
  }
`;

const Activity = () => {

    const { posts } = useContext(PostsContext);
    const { currentUser } = useContext(UsersContext);
  
    return (
      <StyledMain>
        <h1>My Posts</h1>
        <Link to="/posts/newPost">
          <button>Add New Post</button>
        </Link>
        
        <div>
          {
            posts.map(post => 
              post.userId === currentUser.id && 
                <Post 
                  key={post.id}
                  data={post}
                />
            )
          }
        </div>
      </StyledMain>
    );
  }
   
  export default Activity;