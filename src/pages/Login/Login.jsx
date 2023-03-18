import { Suspense, useContext, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { NavLink} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'
import { EffectCreative } from 'swiper'
import { getGames } from 'services/games-api'
import 'swiper/css';
import authContext from '../../context/context'
import styled from 'styled-components';
import { LoadingPage } from "components/LoadingPage/LoadingPage";


const Login = () => {
    const {isLoggedIn} = useContext(authContext)
    
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames(1).then((res) => {
            console.log(res)
            setGames(res.data.results.slice(0, 5))
        })
    }, [])
    useEffect(() => {
        if (isLoggedIn === true) {
           navigate(`/profile`)
        }
    }, [isLoggedIn, navigate])
    
    return (
        <Page>
            <Tabs>
                <Tab to='login-page'>Log In</Tab>
                <Tab to='sign-page'>Sign Up</Tab>
            </Tabs>
            <SliderWrapper>
                <Swiper className="slider" style={{
                    height: '100%',
                    width: 500,
                    borderRadius: '20px 0 0 20px'
                }}
                modules={[Autoplay, EffectCreative]}
                effect={'creative'}
                creativeEffect={ {
                    prev: {
                        shadow: true,
                        translate: ["-20%", 0, -50],
                      },
                      next: {
                        translate: ["100%", 0, 0],
                      },
                }  
                }
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    speed={1000}
                    spaceBetween={0}
                    slidesPerView={1}
                    >
                        {games.map(game => {
                            return (<SwiperSlide key={game.id} style={{width: '100%', overflow: 'hidden'}}><img
                            
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 0'
                            }}
                             src={game.background_image} alt="" /></SwiperSlide>)
                        }
                            )}
                </Swiper>
                <Outlet/>
            </SliderWrapper>
        </Page>
    )
}


//==============STYLES==============//


const Page = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    background: rgb(15,14,15);
    background: linear-gradient(59deg, rgba(15,14,15,1) 18%, rgba(0,0,175,1) 100%);
`
const Tabs = styled.div`
    margin-bottom: 5vh;
    display: flex;

    & :not(:last-child) {
        margin-right: 100px;
    }

`

const Tab = styled(NavLink)`
    color: #090E2F;
    font-weight: 500;
    padding: 10px 30px;
    background-color: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    cursor: pointer;
    color: white;
    border: none;
    position: relative;
    display: block;

    &.active::after{
        position: absolute;
        width: 100%;
        display: block;
        bottom: 0;
        left: 0;
        height: 3px;
        border-radius: 4px;
        content: '';
        background-color: #FF6600;
    }
`

const SliderWrapper = styled.div`
    & .slider{
        @media screen and (max-width: 1199px){
            display: none;
        }
    }

    @media screen and (max-width: 1199px){
        max-width: 100%;
    }
    
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    width: auto;
    border-radius: 20px;


`

export default Login