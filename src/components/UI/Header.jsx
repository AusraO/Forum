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

 
  return (
    <>
  
      <HeaderStyled>
        <img src="https://e7.pngegg.com/pngimages/273/915/png-clipart-school-psychology-psychologist-social-psychology-health-psychology-psicologa-orange-logo.png" alt="logo"/>
       <button>Home</button>
       <button>About</button>
       <button>My activity</button>
       <button>My profile</button>
<img src="https://cdn-icons-png.flaticon.com/512/994/994615.png" alt="user avatar"/>
<p>User name</p>
       <button>Log out</button>


      </HeaderStyled>

    </>
  );
}

export default Header;