import styled from "styled-components"
import { Link } from "react-router-dom"
export const Hero = () => {
    return (
        <Section>
                <Info>
                    <h1>Thousands of new videogames</h1>
                    <p>Dive into the universe of unexplored worlds,
                        bright locations and unique characters
                    </p>
                    <Link to='/auniverse/catalog'>Go to the catalog</Link>
                </Info>
            </Section>
    )
    
}

const Section = styled.section`
    background-color: transparent;
    background-size: cover;
    padding: 100px 0;
    position: relative;
    

     & a{
        display: block;
        font-family: 'Nunito', sans-serif;
        width: fit-content;
        box-sizing: border-box;
        padding: 10px 20px;
        background-color: #080D2B;
        font-size: 20px
     }
`

const Info = styled.div`
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 29px;
    padding: 0 5px;

    @media screen and (min-width: 1441px){
        align-items: flex-start;
        padding: 0 20px;
    }
    
    & h1{
    font-weight: 900;
    font-size: 35px;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;

    @media screen and (min-width: 1441px){
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
    }
`