import { Hero } from "HeroSection/Hero"
import styled from "styled-components"
import background from 'assets/images/homepage-background.jpg'
import { lazy, Suspense } from "react"

const NewGames = lazy(() => import('../../components/NewGamesSection/NewGames'))

const Homepage = () => {
    return (
        <Page>
            <Hero/>
            <Suspense fallback={<p>Loading</p>}>
                <NewGames/>
            </Suspense>
            
        </Page>
    )
}
const Page = styled.div`
    // background-image: url(${background});
    background-color: darkblue;
    background-size: cover;
    background-attachment: fixed;
`
export default Homepage
