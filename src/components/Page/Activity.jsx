import PostsContext from "../../contexts/PostsContext";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMain = styled.main`
  padding: 0 50px;
  > h1{
    text-align: center;
  }
  >div{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Activity = () => {

    const { posts } = useContext(PostsContext);
    const { currentUser } = useContext(UsersContext);
  
    return (
      <StyledMain>
        <Link to="/posts/newPost">
          <button>Add New Post</button>
        </Link>
        <h1>My Posts</h1>
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