import { useParams } from 'react-router-dom';
import { useContext } from 'react';

const PostPage = () => {
  const { postId } = useParams();
  const { posts } = useContext(PostsContext);

  const post = posts.find((post) => post.id === postId);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* Additional post details */}
    </div>
  );
};

export default PostPage;