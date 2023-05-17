import PostsContext from "../../contexts/PostsContext";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import Post from "../UI/Molecules/Post";
const Activity = () => {
    const { posts } = useContext(PostsContext);
  const { currentUser } = useContext(UsersContext);

  return (
    <StyledMain>
      <Link to="/posts/newPost">
        <button>Add New Post</button>
      </Link>
      <h1>{currentUser.userName} Posts</h1>
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