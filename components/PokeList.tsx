import React from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { getEvolutions } from "../apiGetEvolutions";
import EvolutionList from "./EvolutionsList";
import GameList from "./GameList";
import { Audio } from 'expo-av';
import { Pokemon } from '../types/types';

export default function PokeList({ pokemon }) {

    return (
        <FlatList
            data={pokemon}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {

                const playCrySound = async () => {
                    try {
                        const { sound } = await Audio.Sound.createAsync({
                            uri: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${item.id}.ogg`,
                        });
                        await sound.setVolumeAsync(0.2);
                        await sound.playAsync();

                    } catch (error) {
                        console.error(`Failed to play cry for ${item.forms[0].name}:`, error);
                    }
                };

                return (
                    <View>
                        <Text style={styles.titleText}>
                            {item.forms[0].name.charAt(0).toUpperCase() + item.forms[0].name.slice(1).toLowerCase()}
                        </Text>
                        <Text>Height: {item.height}</Text>
                        <Text>Weight: {item.weight}</Text>
                        <Text>
                            Type: {item.types.map(t => t.type.name).join(' / ')}
                        </Text>

                        <TouchableOpacity onPress={playCrySound}>
                            {item.sprites?.front_default ? (
                                <Image
                                    source={{ uri: item.sprites.front_default }}
                                    style={styles.image}
                                    onError={() => console.log("Image failed to load")}
                                />
                            ) : (
                                <Text style={{ color: "red", fontSize: 16 }}>No Image Available</Text>
                            )}
                        </TouchableOpacity>

                        <Text>Where to find:</Text>
                        <GameList gameIndices={item.game_indices} />
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",

    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 10
    }
})