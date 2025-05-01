import React from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import GameList from "../utils/GameList";
import { playCrySoundById } from '../utils/audio';
import { Pokemon } from '../types/types';

export default function PokeDisplay({ pokemon, addToList, lists }) {

    return (
        <FlatList
            data={pokemon}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {

                const handleAdd = (item: any) => {

                    const myPokemon: Pokemon = {
                        id: item.id,
                        name: item.forms[0].name,
                        sprite: item.sprites.front_default,
                        types: item.types.map(t => t.type.name),
                        cryUrl: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${item.id}.ogg`,
                    };

                    addToList("Favorites", myPokemon);
                    console.log("Pokemon lisätty:", myPokemon.name);
                    console.log(" ");

                };

                return (
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.padding}>
                                <Text style={styles.titleText}>
                                    {item.forms
                                        .map((form: { name: string }) => form.name.charAt(0).toUpperCase()
                                            + form.name.slice(1).toLowerCase())
                                        .join('\n')}
                                </Text>
                                <Text style={styles.text}>
                                    Type: {item.types.map(t => t.type.name).join(' / ')}
                                </Text>
                                <Text style={styles.text}>Height: {item.height}</Text>
                                <Text style={styles.text}>Weight: {item.weight}</Text>
                            </View>

                            <View style={{ width: '55%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => playCrySoundById(item.id)}>
                                    {item.sprites?.front_default ? (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.sprites.front_default }}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Text style={{ fontSize: 15 }}>
                                            Picture of pokemon not found {'\u003A\u0028'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Where to catch:</Text>
                        <GameList gameIndices={item.game_indices} />

                        <TouchableOpacity style={styles.button} onPress={() => handleAdd(item)}>
                            <Text style={styles.buttonText}>Add this Pokémon to a list</Text>
                        </TouchableOpacity>
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
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 10,
    },
    padding: {
        paddingLeft: 5,
    },
    text: {
        fontSize: 15
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})