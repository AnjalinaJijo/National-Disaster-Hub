import React from 'react';
import styled from 'styled-components';

const HomePage = () => {

  return (
        <Container>
        <Logo>N   D   H <Txt>National Disaster Hub</Txt></Logo>
        <Wrapper>
        <A href="/find" ><p style={{'position':'absolute','top':'15%','left':'15%'}}>Find a person</p><Image src="./images/find_a_person.jpg" alt="find A person"  /></A>
        <A href="/disaster"><p style={{'position':'absolute','top':'15%','left':'65%'}}>Disaster Status</p><Image src="./images/disaster.avif" alt="disaster"/></A>
        <A href="/check-in"><p style={{'position':'absolute','top':'65%','left':'15%'}}>Check in</p><Image src="./images/checkin.avif" alt="checkin" /></A>
        <A href="/partner"><p style={{'position':'absolute','top':'65%','left':'65%'}}>Become a Partner</p><Image src="./images/become partner.avif" alt="become partner"/></A>
        </Wrapper>
        </Container>


  )
}
const Container= styled.div`
position:relative;
text-align:center;
`;
const Logo= styled.div`
position: absolute;
top: 40%;
left: 38.5%;
border:5px solid white;
width:300px;
height:120px;
font-size:50px;
text-align:center;
background-color:black;
color:white;
padding:10px;
z-index:5;
`;
const Txt= styled.p`
font-size:20px;
text-align:center;
color:white;
`;
const Wrapper=styled.div`
display: grid;
height:100vh;
grid-template-columns:1fr 1fr;
grid-template-rows:1fr 1fr;
overflow:hidden;
z-index:-1;
`;
const A=styled.a`
p{
 visibility:hidden;
  font-size:40px;
  border:2px solid white;
  height:50px;
  width:300px;
  color:black;
  font-size:bold;
  z-index:3;
}
&:hover{
  p{
    visibility:visible;
  }
}
`;
const Image=styled.img`
  float: left;
  width:  50vw;
  height: 50vh;
  object-fit: cover;
  z-index:-1;

  &:hover{
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  transform: scale(1.05);
  border-color: rgba(249, 249, 249, 0.8);
  opacity:0.9;
  .p{
    visibility:visible;
  }

  }
`;



export default HomePage
