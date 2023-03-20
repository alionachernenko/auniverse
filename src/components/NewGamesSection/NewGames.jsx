import styled from "styled-components";
import { Loader } from "components/Loader/Loader";
import { SwiperSlide } from "swiper/react"
import { GameCard } from "components/GameCard/GameCard"
import { Slider } from "../../components/Slider/Slider"
import { useState, useEffect, useContext } from "react";
import { getNewGames } from "services/games-api";
import breakpointContext from '../../context/contextBr'
import { GameList } from "components/GameList/GameList";

const NewGames = () => {
    const {breakpoint} = useContext(breakpointContext)
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log(breakpoint)

    useEffect(() => {
             getNewGames(1).then(({data}) => {
            const { results } = data
            setGames(results)

            setIsLoading(false)
        }).catch(error => {

            console.log(error)
            setIsError(true)
            setIsLoading(false)
        }
        )
    }, [breakpoint])

    return (


        <Section>
        <div>
                    <Span>New 2023</Span>
                   <Div>
                        <h2>What will you choose this time?</h2>
                        {isLoading ? <Loader className={'loader-homepage'} color={'darkblue'} /> : ( isError ? 
                        <><p>Something went wrong</p></> : 
                        breakpoint === 'desktop' ? <Slider>
                            {games.map((game => 
                                     
                                         <SwiperSlide style={{
                                            width: 'fit-content',
                                            margin: 0,
                                            }
                                         } key={game.id}><GameCard data={game} width={255} className={'gamecard_slider'}/></SwiperSlide>
                                  
                          ))}
                        </Slider> : <GameList games={games}/>
                        )}
                    </Div>
                </div>
            </Section>
    )
   
    }


    const Section = styled.section`
    gap: 30px;
    padding-top: 20px;
    overflow: hidden;
    background-color: #ffffff;

    @media screen and (min-width: 1200px) {
        display: flex;
        padding-top: 0
    }

    & h2{
        margin-bottom: 60px;
        font-size: 40px;
        
   
        line-height: 34px;
        margin-left: 60px;

        @media screen and (max-width: 1199px){
            display: none
        }
    }
    
    & span {
        writing-mode: vertical-lr;
        background-color: blue;
        width: 90px;
    }

    & :first-child{
        @media screen and (min-width: 1200px) {
            display: flex
        }
    }
`


const Div = styled.div`
padding: 40px 0;

    @media screen and (min-width: 1200px) {
        padding: 100px 0;
    }
`

const Span = styled.div`
    background-color: #00021A;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 900;
    font-size: 50px;
    line-height: 91px;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @media screen and (min-width: 420px) {
        font-size: 72px
    }

    @media screen and (min-width: 1200px) {
        writing-mode: vertical-rl;

    }
`

export default NewGames