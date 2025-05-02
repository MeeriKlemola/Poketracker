import { Pokemon } from "../types/types";

export const buildPokemonObject = (item: any): Pokemon => {
  return {
    id: item.id,
    name: item.forms[0].name,
    sprite: item.sprites.front_default,
    types: item.types.map((t: any) => t.type.name),
    cryUrl: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${item.id}.ogg`,
  };
};

export const addPokemonToList = (
  listName: string,
  item: any,
  addToList: (listName: string, pokemon: Pokemon) => void
) => {
  if (!listName) {
    console.warn("Pick a list!");
    return;
  }

  const myPokemon = buildPokemonObject(item);
  addToList(listName, myPokemon);
  console.log(`Pokemon lisätty listaan "${listName}":`, myPokemon.name);
};