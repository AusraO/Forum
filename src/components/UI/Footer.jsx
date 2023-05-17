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

     >nav ul li a{
            text-decoration: none;
           font-size: large;
            color: #886754;
            
        :hover{
            color: #050301;
        }
        }
>nav ul{
    list-style-type: none;
    padding-right: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 10px;
    margin: 0;
}
>nav ul li{
    padding-right: 40px;
}
`

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