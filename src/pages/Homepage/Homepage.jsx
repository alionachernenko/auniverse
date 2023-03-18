import { Hero } from "components/HeroSection/Hero"
import styled from "styled-components"
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
    background-color:  #00021A;
    background-size: cover;
    background-attachment: fixed;
`
export default Homepage
