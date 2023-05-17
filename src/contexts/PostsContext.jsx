import { createContext, useReducer, useEffect } from "react";

const PostsContext = createContext();
const PostsActionTypes = {
  get: 'get_all_posts',
  add: 'add_new_post',
  delete: 'remove_specific_post'
};

const reducer = (state, action) => {
  switch(action.type){
    case PostsActionTypes.get:
      return action.data;
    case PostsActionTypes.add:
      fetch(`http://localhost:8080/posts`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [ ...state, action.data ];
    case PostsActionTypes.delete:
      fetch(`http://localhost:8080/posts/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id !== action.id);
    default:
      return state;
  }
}

const PostsProvider = ({ children }) => {

  const [posts, setPosts] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
      .then(res => res.json())
      .then(data => setPosts({
        type: PostsActionTypes.get,
        data: data
      }));
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        PostsActionTypes
      }}
    >
      { children }
    </PostsContext.Provider>
  );
}
 
export { PostsProvider };
export default PostsContext;