export const Character = (character) => {
  return (
    <div>
        <img src={character.image} alt={character.name} />
        <span key={character.id}>{character.name}</span>
    </div>  
    )
}
