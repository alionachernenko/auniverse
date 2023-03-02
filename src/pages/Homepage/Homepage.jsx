import { Link } from "react-router-dom"
import { getNewGames } from "../../services/games-api"
import { useState, useEffect } from "react"
import { Slider } from "../../components/Slider/Slider"
import styled from "styled-components"
import background from '../../image/homepage-background.png'
import { Loader } from "../../components/Loader/Loader"



export const Homepage = () => {

    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    window.scroll({
    top: 0,
    });

    useEffect(() => {
        getNewGames(1).then(res => {
            console.log(res.data.results)
            setGames(res.data.results)
        }).catch(error => {
            console.log(error)
            setIsError(true)
        }
        ).finally(setTimeout(() => {setIsLoading(false)}, 500))
    }, [])


    return (
        <Page>
            <Hero>
            <Info>
                <h1>Thousands of new videogames</h1>
                <p>Dive into the universe of unexplored worlds,
                    bright locations and unique characters
                </p>
                <Link to='/auniverse/catalog'>Go to the catalog</Link>
                </Info>
        </Hero>
            <SliderSection>
                <div style={{
                    margin: 'auto',
                    display: 'flex',
                }}>
                    <Span>New 2023</Span>
                   <Div>
                        <h2>What will you choose this time?</h2>
                        {isLoading ? <Loader page={'homepage'} /> : ( isError ? <p>Check your connection</p> :<Slider games={games}/> )}
                        
                </Div>
                </div>
                
        </SliderSection>
        </Page>
    )
}
const Page = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-attachment: fixed;
`
const Hero = styled.section`
    background-color: transparent;
    background-size: cover;
    padding: 100px 0;
    position: relative;
    margin-top: 61px
`

const Info = styled.div`
    max-width: 1500px;
    margin: auto;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 29px;
    // position: absolute;
    top: 0;
    

    & h1{
        // font-weight: 900;
    font-size: 100px;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    }

    & p{
        font-weight: 400;
        font-size: 15px;
        line-height: 140%;
        letter-spacing: 0.05em;
        font-family: 'Nunito', sans-serif;
        color: #FFFFFF;
    }
`

const SliderSection = styled.section`
    
    display: flex;
    gap: 30px;
    overflow: hidden;
    background-color: #ffffff;
    // padding-left: 123px;


    & h2{
        // margin-left: 307px;
        margin-bottom: 60px;
        font-size: 40px;
        line-height: 34px;
        margin-left: 60px
    }
    
    & span {
        writing-mode: vertical-lr;
        background-color: blue;
        // transform: rotate(90deg);
        // display: block;
        width: 90px;
        // margin-left: 123px;
    }
`
const Div = styled.div`
    padding: 100px 0;
`

const Span = styled.div`
    writing-mode: vertical-rl;
    background-color: #080D2B;
    // margin-left: 123px;
    color: #ffffff;
    font-weight: 900;
    font-size: 72px;
    line-height: 91px;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`