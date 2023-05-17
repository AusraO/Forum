import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";


const HeaderStyled = styled.header`
    height: 110px;
    width:100%;
    display: flex;
    justify-content: space-around;
    gap:20px; 
    background-color:  rgba(11, 7, 13, 1);
    align-items: center;
    color:white;
    >div{
      display: flex;
      gap: 2rem;
      justify-content: flex-end;
      align-items: center;
    
   >button{
      width: 90px;
      height: 40px;
      background-color: #F3CC9B;
      border: none;
      border-radius: 3px;
      font-size: 16px;
    }
  }
    img{
    
        height: 80px;
        width: auto;
}
button{
      width: 90px;
      height: 35px;
      background-color:rgba(38, 36, 41, 1);
      border: none;
      border-radius: 3px;
      font-size: 16px;
      color: white
      
    }
`


const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  return (
    <>

      <HeaderStyled>
      {
          !currentUser &&
          <Link to="/about"><img src="https://e7.pngegg.com/pngimages/273/915/png-clipart-school-psychology-psychologist-social-psychology-health-psychology-psicologa-orange-logo.png" alt="logo" /></Link>
        }
        {
          currentUser &&
          <Link to="/home"><img src="https://e7.pngegg.com/pngimages/273/915/png-clipart-school-psychology-psychologist-social-psychology-health-psychology-psicologa-orange-logo.png" alt="logo" /></Link>
        }
        
        <button>Home</button>
        <button>About</button>
        <img src="https://cdn-icons-png.flaticon.com/512/994/994615.png" alt="user avatar" />
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
                    {
                currentUser &&
                <Link to="/profile"><button>My profile</button></Link>
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