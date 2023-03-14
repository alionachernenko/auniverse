import { Hero } from "HeroSection/Hero"
import { NewGames } from "components/NewGamesSection/NewGames"
import styled from "styled-components"
import background from 'assets/images/homepage-background.png'

export const Homepage = () => {
    return (
        <Page>
            <Hero/>
            <NewGames/>
        </Page>
    )
}
const Page = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-attachment: fixed;
`

