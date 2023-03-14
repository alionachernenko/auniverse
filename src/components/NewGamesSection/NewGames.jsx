import styled from "styled-components";
import { Loader } from "components/Loader/Loader";
import { SwiperSlide } from "swiper/react"
import { GameCard } from "components/GameCard/GameCard"
import { Slider } from "../../components/Slider/Slider"
import { useState, useEffect } from "react";
import { getNewGames } from "services/games-api";

export const NewGames = () => {
    
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

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
    }, [])

    return (
        <Section>
        <div style={{
                    margin: 'auto',
                    display: 'flex',
                }}>
                    <Span>New 2023</Span>
                   <Div>
                        <h2>What will you choose this time?</h2>
                        {isLoading ? <Loader className={'loader-homepage'} color={'darkblue'} /> : ( isError ? <p>Something wen wrong</p> : 
                        <Slider>
                            {games.map((game => 
                                     
                                         <SwiperSlide style={{
                                            width: 'fit-content',
                                            margin: 0,
                                            }
                                         } key={game.id}><GameCard data={game} width={255} className={'gamecard_slider'}/></SwiperSlide>
                                  
                          ))}
                        </Slider>
                        )}
                    </Div>
                </div>
            </Section>
    )
   
    }


    const Section = styled.section`
    display: flex;
    gap: 30px;
    overflow: hidden;
    background-color: #ffffff;

    & h2{
        margin-bottom: 60px;
        font-size: 40px;
        line-height: 34px;
        margin-left: 60px
    }
    
    & span {
        writing-mode: vertical-lr;
        background-color: blue;
        width: 90px;
    }

    @media screen and (max-width: 1439px){
        display: none
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