import { Swiper, SwiperSlide } from "swiper/react"
import { GameCard } from "components";

import { Autoplay } from "swiper";

import 'swiper/css';


export const Slider = ({ games }) => {
    console.log('render')
    return (
        <Swiper style={{marginLeft: 0,
                        paddingLeft: 60}}
            spaceBetween={30}
            speed={3000}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
                delay: 1000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
            }}
            modules={[Autoplay]}
        > 
            {games.map((game => 
                <SwiperSlide style={{
                    width: 'fit-content',
                    margin: 0,
                    }
                }key={game.id}>
                    <GameCard data={game} className={'gamecard_slider'} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

