import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"
import sonic from '../../assets/images/sonic.png'

export const Hero = () => {
    return (
        <Section>
                <Info>
                    <h1>Thousands of new videogames</h1>
                    <p>Dive into the universe of unexplored worlds,
                        bright locations and unique characters
                    </p>
                    <Link to='/catalog'>Go to the catalog</Link>
                </Info>
                <Picture src={sonic} alt="" />
            </Section>
    )
    
}

const show = keyframes`

from {
    left: -100%
}

to {
    left: 0
}
`

const Section = styled.section`
    background-color: transparent;
    background-size: cover;
    // padding: 100px 0;
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;
    
    @media screen and (min-width: 768px){
        padding: 100px 0;
    };
    

    @media screen and (max-width: 767px){
        height: 100vh;
    };

   

     & a{
        display: block;
        font-family: 'Nunito', sans-serif;
        width: fit-content;
        box-sizing: border-box;
        padding: 10px 20px;
        background-color: #080D2B;
        font-size: 20px;
        animation: ${show} 800ms ease;
        position: relative;
        background-color: orange;
        border: 1px solid red;
        clip-path: polygon(5% 0, 100% 0, 100% 10%, 100% 91%, 95% 100%, 0 100%, 0 71%, 0 10%);
     }

`

const titleAnim = keyframes`
     0% {
        text-shadow: red 2px 5px;
     }

     50%{
        text-shadow: red 3px 6px;
     }

     100% {
        text-shadow: red 2px 5px;

     }
`

const Info = styled.div`
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 29px;
    padding: 0 5px;

    @media screen and (min-width: 1440px){
        align-items: flex-start;
        padding: 0 20px;
    }
    
    & h1{
    font-weight: 900;
    font-size: 35px;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    text-align: center;
    animation: ${show} 500ms ease, ${titleAnim} 3000ms ease infinite;

    @media screen and (min-width: 768px){
        font-size: 50px;
    }


    @media screen and (min-width: 1440px){
        font-size: 100px;
        text-align: left
    }

}

    & p{
        font-weight: 400;
        font-size: 17px;
        line-height: 140%;
        letter-spacing: 0.05em;
        font-family: 'Nunito', sans-serif;
        color: #FFF;
        text-align: center;
        animation: ${show} 700ms ease;
        position: relative;
    }
`

const moving = keyframes`
    0% {
        transform: scale(0)
    }

    100% {
        transform: scale(1)
    }
`

const Picture = styled.img`

@media screen and (max-width: 1700px) {
    display: none
}
    height: 600px;
    position: absolute;
    top: 20px;
    right: 50px;
    // animation-delay: 1000ms;
    animation: ${moving} 500ms ease-in-out
`