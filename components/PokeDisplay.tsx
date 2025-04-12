import React from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native"
import GameList from "./GameList";
import { Audio } from 'expo-av';
import { Pokemon } from '../types/types';

export default function PokeDisplay({ pokemon }) {

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

                const myPokemon: Pokemon = {
                    id: item.id,
                    name: item.forms[0].name,
                    sprite: item.sprites.front_default,
                    types: item.types.map(t => t.type.name),
                    cryUrl: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${item.id}.ogg`,
                };

                return (
                    <View>
                        <View style={{ flexDirection: 'row'}}> 
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
                                <TouchableOpacity onPress={playCrySound}>
                                    {item.sprites?.front_default ? (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.sprites.front_default }}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Text style={{ color: "red", fontSize: 15 }}>
                                            Picture of pokemon not found {'\u003A\u0028'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Where to catch:</Text>
                        <GameList gameIndices={item.game_indices} />

                        <Button
                            title='Add this pokémon to a list'
                        />
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
})