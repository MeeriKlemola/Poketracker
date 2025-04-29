import { Audio } from 'expo-av';

export async function playCrySoundById(id: number) {
    try {
        const { sound } = await Audio.Sound.createAsync({
            uri: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
        });
        await sound.setVolumeAsync(0.2);
        await sound.playAsync();
    } catch (error) {
        console.error(`Failed to play cry for id ${id}:`, error);
    }
}