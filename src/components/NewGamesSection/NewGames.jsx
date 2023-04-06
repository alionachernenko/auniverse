import styled from "styled-components";
import { Loader, Slider, GameList } from "components";
import { useState, useEffect, useContext } from "react";
import { fetchNewGames } from "utils";
import { breakpointContext } from 'context'

const NewGames = () => {
    const { breakpoint } = useContext(breakpointContext)
    
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
            fetchNewGames(1).then(({data}) => {
            const { results } = data
                
            setGames(results.filter(game => game.slug !== 'atomic-heart'))
            setIsLoading(false)
        }).catch(error => {
            setIsError(true)
            setIsLoading(false)

            console.log(error)
        }
        )
    }, [breakpoint])

    return (
        <Section>
            <OuterWrapper>
            <Subtitle>New 2023</Subtitle>
                   <InnerWrapper>
                        <Title>What will you choose this time?</Title>
                        {isLoading ? <Loader className='loader-homepage' color='#00021A' /> : ( isError ? 
                        <p>Something went wrong</p> : 
                        breakpoint === 'desktop' ?
                            <Slider games={games} /> :
                            <GameList games={games} />
                        )}
                    </InnerWrapper>
            </OuterWrapper>
        </Section>
    )
}


const Section = styled.section`
    padding-top: 20px;
    overflow: hidden;
    background-color: #ffffff;

    @media screen and (min-width: 1200px) {
        padding-top: 0;
        display: flex;
        gap: 30px;
        height: 644px;
    }
`

const Title = styled.h2`
    margin-bottom: 60px;
    margin-left: 60px;

    font-size: 40px;
    line-height: 34px;

    @media screen and (max-width: 1199px){
        display: none
    }   
`


const InnerWrapper = styled.div`
padding: 40px 0;

    @media screen and (min-width: 1200px) {
        padding: 100px 0;
    }
`

const OuterWrapper = styled.div`
    @media screen and (min-width: 1200px) {
        display: flex
    }
`

const Subtitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 50px;
    font-weight: 900;
    line-height: 91px;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #ffffff;
    
    background-color: #00021A;

    @media screen and (min-width: 420px) {
        font-size: 72px
    }

    @media screen and (min-width: 1200px) {
        writing-mode: vertical-rl;
    }
`

export default NewGames