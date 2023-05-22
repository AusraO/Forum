import styled from "styled-components";
import { Link } from "react-router-dom";


const StyledMain = styled.main`
  background-color: #F3CC9B;
  text-align: center;
  position: relative;

  > h1 {
    margin-top: 0;
    padding-top: 10px;
  }
>div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
  > h3 {
   
    margin: 0;
    padding: 0;
    width: 80%;
    font-size: 24px;
    color: #4e3c00;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  > img {
    width: 100%;
    height: 500px;
    object-fit: cover;

  }
  a{
    text-decoration: none;
    color: #720b0b;
    :hover{
        color:#000000;
    }
  }
`;

const About = () => {

    return (
        <StyledMain>
            <div>
        <h1>Welcome to the duck forum!</h1>
        <h3>
        To join our community please{' '}
        <Link to="/login">log in</Link> or <Link to="/register">register</Link>!
      </h3>
        <p>Our wide community will help you get all the answers in regards to rubber ducks!</p>
        </div>
        <img src="https://www.thestar.com/content/dam/thestar/news/gta/2017/06/30/giant-rubber-duck-makes-a-splash-in-toronto/secondary-art.jpg" alt="rubber ducks"/>
        </StyledMain>
    );
}

export default About;