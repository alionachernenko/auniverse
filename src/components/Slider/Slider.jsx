/* eslint-disable array-callback-return */
import { Swiper, SwiperSlide } from "swiper/react"
import { GameCard } from "../GameCard/GameCard";
import 'swiper/css';
import 'swiper/css/pagination'


export const Slider = ({games}) => {
    return (
        <Swiper style={{marginLeft: 0,
                        paddingLeft: 60}}
            spaceBetween={30}
            slidesPerView={'auto'}
            loop={true}

        >
            {games.map((game) => {
                
                    return <>
                        <SwiperSlide style={{
                            maxWidth: 255,
                            margin: 0,
                            }
                        } key={game.id}><GameCard data={game} width={255} className={'gamecard_slider'} /></SwiperSlide>
                    </>
                
            })}
        </Swiper>
    )
}