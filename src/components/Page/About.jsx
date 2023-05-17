import styled from "styled-components";



const StyledMain = styled.main`
background-color: #F3CC9B;
text-align: center;
>h1{
    margin-top: 0px;
    padding-top: 10px;
}
`
const About = () => {

    return (
        <StyledMain>
        <h1>Welcome to the duck forum!</h1>
        <h3>To join our community please log in or register!</h3>
        <img src="https://images.squarespace-cdn.com/content/v1/51c8b108e4b050e44c477323/1415353939028-5G2XDLXILR0K9INX7HOI/Greysuitcase+-+Rubber+Duck+Project+Seoul+01.jpg" alt="rubber ducks"/>
        </StyledMain>
    );
}

export default About;