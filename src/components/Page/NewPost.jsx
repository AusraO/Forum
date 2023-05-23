import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as generateId } from 'uuid';
import UsersContext from '../../contexts/UsersContext';
import PostsContext from '../../contexts/PostsContext';
import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  > h2 {
    font-family: monospace;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: #f8f5ed;
    padding: 15px;
    >  input[type="submit"] {
      width: 80px;
      background-color: #ffeaa5;
      border: none;
      height: 30px;

      :hover {
        cursor: pointer;
        background-color: #e6c963;
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      > textarea {
        width: 500px;
        height: 100px;
        padding: 5px;
        border: 1px solid #ccc; 
        border-radius: 5px; 
        resize: vertical; 
      }
      > .titleArea {
        width: 500px;
        padding: 5px; 
        border: 1px solid #ccc; 
        border-radius: 5px; 
      }
    }
  }
`;


const NewPost = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(UsersContext);
    const { setPosts, PostsActionTypes } = useContext(PostsContext);
    const [formInputs, setFormInputs] = useState({
        title: '',
        content: ''
    });

    const inputHandler = e => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        });
    }

    const formHandler = e => {
        e.preventDefault();
        const newPost = {
            id: generateId(),
            userId: currentUser.id,
            title: formInputs.title,
            content: formInputs.content
        }
        setPosts({
            type: PostsActionTypes.add,
            data: newPost
        });
        navigate(-1);
    }

    return (
        <StyledMain>
            <h2>Add New Post</h2>
            <form onSubmit={(e) => { formHandler(e) }}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                    className='titleArea'
                        required
                        name="title" id="title"
                        value={formInputs.title}
                        onChange={(e) => { inputHandler(e) }}
                    />
                </div>
                <div>
                    <label htmlFor='content'>Description:</label>
                    <textarea
                    className='textArea'
                        name="content"
                        id="content"
                        required
                        value={formInputs.content}
                        onChange={(e) => inputHandler(e)}
                    ></textarea>
                </div>
                <input type="submit" value="Create Post" />
            </form>
        </StyledMain>
    );
}

export default NewPost;