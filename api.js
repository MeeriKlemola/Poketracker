export function getPokemon(keyword) {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetch:" + response.statusText);

            return response.json();
        })
}