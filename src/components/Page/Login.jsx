import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../contexts/UsersContext";


const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
min-height: 67vh;
  > h1 {
    margin-top: 0;
    padding: 10px;
    font-family: monospace;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: #f8f5ed;
    padding: 15px;
    width: 400px;
    margin-bottom: 10px;

    > div {
      display: flex;
      flex-direction: column;

      > label {
        margin-bottom: 5px;
      }

      > input {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
  }
`;

const SubmitButton = styled.input`
  background-color: #ffeaa5;
  border: none;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #e6c963;
    cursor: pointer;
  }
`;


const Login = () => {
  const [formInputs, setFormInputs] = useState({
    userName: '',
    password: ''
  });
  const [failedLogIn, setFailedLogIn] = useState(false);
  const { users, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const inputHandler = e => {
    setFormInputs({
      ...formInputs,
      [e.target.name]:e.target.value
    });
    setFailedLogIn(false);
  }

  const formSubmit = e => {
    e.preventDefault();
    const loggedInUser = users.find(
      user =>
        user.userName === formInputs.userName &&
        user.password === formInputs.password
    );
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      navigate('/home');
      
    } else {
      setFailedLogIn(true);
    }
  };

  return (
    <StyledMain>
      <h1>Log in to our amazing comunity!</h1>
      <form onSubmit={(e) => {formSubmit(e)}}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            name="userName" id="userName"
            value={formInputs.userName}
            onChange={(e)=>{inputHandler(e)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            value={formInputs.password}
            onChange={(e)=>{inputHandler(e)}}
          />
        </div>
        <SubmitButton type="submit" value="Log In" />
      </form>
      {
        failedLogIn &&
        <p
          style={{ color:'red' }}
        >
          Wrong user name and/or password
        </p>
      }
    </StyledMain>
  );
}
 
export default Login;