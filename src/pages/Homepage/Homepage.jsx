import { lazy, Suspense } from "react"

import { Hero } from "components/HeroSection/Hero"
import { LoadingPage } from "components/LoadingPage/LoadingPage"

const NewGames = lazy(() => import('../../components/NewGamesSection/NewGames'))

const Homepage = () => {
    return (
        <div>
            <Hero/>
            <Suspense fallback={<LoadingPage/>}>
                <NewGames/>
            </Suspense>
        </div>
    )
}

export default Homepage
