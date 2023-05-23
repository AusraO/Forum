import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import { Link , useNavigate} from "react-router-dom";


const StyledFooter = styled.footer`
  height: 120px;
  width: 100%;
  background-color: #351f10;
  padding: 0;
  text-align: center;
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 12px;
    color: #886754;
    padding-top: 20px;
  }

  > nav ul li a {
    text-decoration: none;
    font-size: 15px;
    color: #886754;

    &:hover {
      color: #ffd966;
    }
  }

  > nav ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
    margin: 0;
  }

  > nav ul li {
    padding-right: 40px;
  }

  button {
    width: 70px;
    height: 35px;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    font-size: 15px;
    color: #886754;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      color: #ffd966;
    }
  }
`;
const Footer = () => {
    const { currentUser, setCurrentUser } = useContext(UsersContext);
    const navigate = useNavigate();
    return (
        <>
            <StyledFooter>
                <nav>
                    <ul>
                        <li><NavLink to='/about'>About us</NavLink></li>
                        <li><NavLink to='/home'>Home</NavLink></li>
                        {
                            !currentUser ?
                                <>
                                    <Link to={'/login'}> <button >Log in</button></Link>
                                    <Link to="/register"> <button>Register</button></Link>
                                </> :
                                <>
                                    <div>
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
                    </ul>
                </nav>

                <p>©ForumOfDucks.inc</p>
            </StyledFooter>
        </>
    );
}

export default Footer;