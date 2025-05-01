export function getPokemon(keyword) {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Pokémon not found. Check name.");
                } else {
                    throw new Error(`Error in fetch: ${response.status} ${response.statusText}`);
                }
            }
            return response.json();
        })
}