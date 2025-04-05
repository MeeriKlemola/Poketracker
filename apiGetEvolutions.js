export async function getEvolutions(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    if (!response.ok) {
      throw new Error("Error in fetch: " + response.statusText);
    }
    return await response.json();
  }

