import styled from "styled-components"
import { memo, useState } from "react"
import { Modal } from "components/Modal/Modal"
import { Backdrop } from "components/Backdrop/Backdrop"

export const GameScreenshots = memo(({ screenshots }) => {
    const [showModal, setShowModal] = useState(false)
    const [activeScreenshot, setActiveImage] = useState()

        return (
            <>
                <Screenshots>
                    {screenshots.map(({image, id}, index) => 
                        <ScreenshotWrapper key={id}>
                            <Screenshot src={image} alt='fdff' loading="lazy" onClick={() => {
                                setShowModal(true)
                                setActiveImage(index)
                            }} />
                        </ScreenshotWrapper>)
                    }
                </Screenshots>
                {showModal &&
                <Backdrop onClick={() => setShowModal(false)}>
                    <Modal image={screenshots[activeScreenshot].image} onClick={() => setShowModal(false)}/>
                </Backdrop>}
            </>
        )
    } 
)
const Screenshots = styled.ul`
    width: 100%;
    height: auto;
    margin-bottom: 60px;

    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    backdrop-filter: blur(10px);
`

const Screenshot = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const ScreenshotWrapper = styled.li`
    width: 100%;
    transition: 250ms all ease;
    cursor: zoom-in;

    clip-path: polygon(5% 0, 100% 0, 100% 10%, 100% 91%, 95% 100%, 0 100%, 0 71%, 0 10%);

    &:hover {
        transform: scale(1.01);
        clip-path:none;
        z-index: 1111
    }

    @media screen and (min-width: 768px) {
        width: calc((100% - 10px)/2);
    }

    @media screen and (min-width: 1200px) {
        width: calc((100% - 20px)/3);
    }

    @media screen and (min-width: 1440px) {
        width: calc((100% - 30px)/4);
    }
`

