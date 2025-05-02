import React from 'react';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from "react-native"
import GameList from "../utils/GameList";
import { playCrySoundById } from '../utils/audio';
import { addPokemonToList } from '../utils/ListManager';
import { useState } from 'react';

export default function PokeDisplay({ pokemon, addToList, lists }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const openModal = (item) => {
        setSelectedPokemon(item);
        setModalVisible(true);
    };

    const handleAdd = () => {
        addPokemonToList(selectedList, selectedPokemon, addToList);
        setModalVisible(false);
        setSelectedList(null);
        setSelectedPokemon(null);
    };

    return (
        <>
            <FlatList
                data={pokemon}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.padding}>
                                <Text style={styles.titleText}>
                                    {item.forms.map((form) =>
                                        form.name.charAt(0).toUpperCase() + form.name.slice(1).toLowerCase()
                                    ).join('\n')}
                                </Text>
                                <Text style={styles.text}>Type: {item.types.map(t => t.type.name).join(' / ')}</Text>
                                <Text style={styles.text}>Height: {item.height}</Text>
                                <Text style={styles.text}>Weight: {item.weight}</Text>
                            </View>

                            <View style={{ width: '55%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => playCrySoundById(item.id)}>
                                    {item.sprites?.front_default ? (
                                        <Image style={styles.image} source={{ uri: item.sprites.front_default }} resizeMode="contain" />
                                    ) : (
                                        <Text style={{ fontSize: 15 }}>Picture of pokemon not found :(</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ paddingLeft: 5, fontSize: 15 }}>Where to catch:</Text>
                        <GameList gameIndices={item.game_indices} />

                        <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
                            <Text style={styles.buttonText}>Add this Pokémon to a list</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select a list</Text>

                    <FlatList
                        data={Object.keys(lists)}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedList(item)}
                                style={[
                                    styles.listButton,
                                    selectedList === item && { backgroundColor: 'lightgray' }
                                ]}
                            >
                                <Text style={styles.listButtonText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <View style={styles.modalButtons}>
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        <Button title="Add" onPress={handleAdd} disabled={!selectedList} />
                    </View>
                </View>
            </Modal>
        </>
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
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 6,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
    },
    listButtonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    }
})