import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

export const Hero = () => {
    return (
        <Section>
                <Info>
                    <Title>Thousands of new videogames</Title>
                    <Subtitle>Dive into the universe of unexplored worlds,
                        bright locations and unique characters
                    </Subtitle>
                    <CatalogLink to='/catalog'>Go to the catalog</CatalogLink>
                </Info>
            </Section>
    )
    
}

const showInfo = keyframes`
    from {
        left: -100%
    }

    to {
        left: 0
    }
`

const titleAnimation = keyframes`
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

const Section = styled.section`
    padding: 100px 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    
    background-color:  #00021A;
    
    @media screen and (min-width: 768px){
        padding: 100px 0;
    }
`

const CatalogLink = styled(Link)`
        display: block;
        box-sizing: border-box;
        padding: 10px 20px;
    
        position: relative;

        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        
        background-color: orange;
        box-shadow: red 2px 3px;
        
        transition: 100ms all linear;
        animation: ${showInfo} 800ms ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: red 4px 5px;

            color: orange;
            background-color: white;
        }

        &::before {
            content: '';
            height: 20px;
            border-top: 2px solid orange;
            border-right: 2px solid orange;

            position: absolute;
            top: 0px;
            right: 0px;
            width: 20px;

            background-color: transparent;
            
            transition: 100ms all linear;
        }

        &::after{
            content: '';
            height: 20px;
            border-bottom: 2px solid orange;
            border-left: 2px solid orange;

            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 20px;
            
            background-color: transparent;
            transition: 100ms all linear
        }

        &:hover::after{
            bottom: -15px;
            left: -13px;
        }

        &:hover::before {
            top: -13px;
            right: -15px;
        }
`



const Info = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 29px;

    color: #FFF;
    

    @media screen and (min-width: 1200px){
        padding: 0 20px;
        align-items: flex-start;
    }
`

const Title = styled.h1`
    position: relative;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 40px;
    font-weight: 900;
    line-height: 140%;

    animation: ${showInfo} 500ms ease, ${titleAnimation} 3000ms ease infinite;

    @media screen and (min-width: 420px){
        font-size: 50px
    }

    @media screen and (min-width: 768px){
        font-size: 70px;
    }

    @media screen and (min-width: 1200px){
        font-size: 100px;
        text-align: left
    }
        
`

const Subtitle = styled.p`
    position: relative;

    text-align: center;
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0.05em;
    
    color: #FFF;

    animation: ${showInfo} 700ms ease;
`