import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const HeaderStyled = styled.header`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  background-color: #f5e1a1;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;

  > div {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
    align-items: center;
  }

  > div > button {
    width: 70px;
    height: 35px;
    background-color: #F3CC9B;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
    color: #4b3832;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e0b37f;
    }
  }

  img {
    height: 80px;
    width: auto;
    border-radius: 30%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  button {
  width: 100px;
  height: 40px;
  background-color: #f5e1a1;;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #4e3c00;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
   
    border-bottom: 1px solid black;
    animation: hoverAnimation 0.3s forwards;
  }

  @keyframes hoverAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0);
    }
  }
}
`;


const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  return (
    <>

      <HeaderStyled>
      {
          !currentUser &&
          <Link to="/about"><img src="https://static.vecteezy.com/system/resources/previews/017/476/523/original/rubber-duck-logo-flat-design-logo-illustration-logo-template-isolated-on-white-background-vector.jpg" alt="logo" /></Link>
        }
        {
          currentUser &&
          <Link to="/home"><img src="https://static.vecteezy.com/system/resources/previews/017/476/523/original/rubber-duck-logo-flat-design-logo-illustration-logo-template-isolated-on-white-background-vector.jpg" alt="logo" /></Link>
        }
        
        <Link to="/home"><button>Home</button></Link>
        <Link to="/about"><button>About</button></Link>
     
        {
          !currentUser ?
            <>
              <Link to={'/login'}> <button >Log in</button></Link>
              <Link to="/register"> <button>Register</button></Link>
            </> :
            <>
              {
                currentUser &&
                <Link to="/activity"><button>My activity</button></Link>
              }
                   
              <div>
                <img style={{ width: "70px", height: "auto" }} src={currentUser.avatarURL} alt="user avatar" />
                <p>{currentUser.userName}</p>

                <button
                  onClick={() => {
                    setCurrentUser(null);
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </>
        }



      </HeaderStyled>

    </>
  );
}

export default Header;