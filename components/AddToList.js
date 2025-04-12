export const addToList = (listName, myPokemon) => {
    const list = lists[listName];
    list.set([...list.pokemon, myPokemon]);
};