import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import PostsContext from '../../contexts/PostsContext';







const PostPage = () => {
    const { postId } = useParams();
    const { posts } = useContext(PostsContext);
  
    const selectedPost = posts.find((post) => post.id.toString() === postId.toString());
  
    if (!selectedPost) {
      return <div>Post not found!</div>;
    }

  return (
    <div>
      <h2>{selectedPost.title}</h2>
      <p>{selectedPost.content}</p>
      
    </div>
  );
};

export default PostPage;