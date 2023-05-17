import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";

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

const Home = () => {

  const { posts } = useContext(PostsContext);
  const { currentUser } = useContext(UsersContext);
 

  return (
    <StyledMain>
      {
        currentUser &&
        <Link to="/posts/newPost">
          <button>Add New Post</button>
        </Link>
      }
      <h1>All Posts</h1>
     <div>
        {
          posts.map(post => (
            <Link key={post.id} to={(`/posts/${post.id}`)}>
          
            <Post data={post}/>  
            </Link>
          )
          )
        }
      </div>
    </StyledMain>
  );
}
 
export default Home;