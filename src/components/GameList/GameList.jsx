import { GameCard } from "../GameCard/GameCard"

export const GameList = ({games}) => {
    return (
        <ul style={{
                display: "flex", flexWrap: 'wrap', listStyle: 'none', gap: 30, marginBottom: 20
        }}>{games.map((game) => <li><GameCard data={game} key={game.id} width={500} className={'gamecard_catalog'} /></li>)}
        </ul>
    )
}
