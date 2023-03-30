import { lazy, Suspense } from "react"

import { Hero, LoadingPage } from "components"

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
