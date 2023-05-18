import { createContext, useReducer, useEffect } from "react";

const RepliesContext = createContext();
const RepliesActionTypes = {
  get: 'get_all_replies',
  add: 'add_new_reply',
  delete: 'remove_specific_reply'
};

const reducer = (state, action) => {
  switch(action.type){
    case RepliesActionTypes.get:
      return action.data;
    case RepliesActionTypes.add:
      fetch(`http://localhost:8080/replies`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [ ...state, action.data ];
    case RepliesActionTypes.delete:
      fetch(`http://localhost:8080/replies/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id !== action.id);
    default:
      return state;
  }
}

const RepliesProvider = ({ children }) => {

  const [replies, setReplies] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/replies`)
      .then(res => res.json())
      .then(data => setReplies({
        type: RepliesActionTypes.get,
        data: data
      }));
  }, []);

  return (
    <RepliesContext.Provider
      value={{
        replies,
        setReplies,
        RepliesActionTypes
      }}
    >
      { children }
    </RepliesContext.Provider>
  );
}
 
export { RepliesProvider };
export default RepliesContext;