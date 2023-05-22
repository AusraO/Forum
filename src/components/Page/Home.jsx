import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostsContext from "../../contexts/PostsContext";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";

const StyledMain = styled.main`
  padding: 0 50px;
  text-align: center;
  >a >button{
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
  > h1{
    text-align: center;
    font-family: monospace;
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

      <h1>Comunity questions</h1>
      {
        currentUser &&
        <Link to="/posts/newPost">
          <button>Add New Post</button>
        </Link>
      }
     <div>
        
       {
       posts.length === 0 ? (<p>No posts available..</p>) : (

        posts.map(post =>
            <Post
                key={post.id}
                data={post}
            />
        )
    ) }
        
      </div>
    </StyledMain>
  );
}
 
export default Home;