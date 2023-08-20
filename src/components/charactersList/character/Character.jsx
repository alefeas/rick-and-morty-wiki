import { Link } from "react-router-dom"

export const Character = (character) => {
  return (
      <Link className="item" to={`/characters/${character.id}`}>
        <div>
        <img src={character.image} alt={character.name} />
        </div>
        <h3 key={character.id}>{character.name}</h3>
      </Link>
    )
}
