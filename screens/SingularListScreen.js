import React from 'react';
import { FlatList, View, Text } from "react-native"

export default function SingularListScreen({ listName }) {

    return (
        <View>
            {Object.entries(listName).map(([pokemons]) => (
                <View key={listName}>
                    <Text style={{ fontWeight: 'bold' }}>{listName}</Text>
                    {pokemons.map(p => (
                        <Text key={p.id}>- {p.name}</Text>
                    ))}
                </View>

            ))}
        </View>)
}  