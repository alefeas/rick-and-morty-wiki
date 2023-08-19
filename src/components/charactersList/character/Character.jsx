import { Link } from "react-router-dom"

export const Character = (character) => {
  return (
      <Link className="item" to={`/character/${character.id}`}>
        <img src={character.image} alt={character.name} />
        <h3 key={character.id}>{character.name}</h3>
      </Link>
    )
}
