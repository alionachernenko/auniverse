/* eslint-disable array-callback-return */
import { Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination'
import { Autoplay, Pagination } from "swiper";


export const Slider = ({children}) => {
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
            modules={[Autoplay, Pagination]}
        > 
            {children}
        </Swiper>
    )
}

