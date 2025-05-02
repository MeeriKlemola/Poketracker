import React from 'react';
import { FlatList, View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native"

export default function SingularListScreen({ route, navigation }) {
    const { listName, pokemons } = route.params;

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginBottom: 5, fontWeight: 'bold'}}>{listName}</Text>

            <FlatList
                data={pokemons}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.text}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</Text>   
                    </View>
                )}
            />

            <Button title="Add a Pokémon" onPress={() => {/* Lisää toiminto kunhan pystyt */ }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 45,
    },
    listContainer: {
        backgroundColor: '#f0f4f7',
        marginBottom: 16,
        padding: 12,
        borderRadius: 10,
        elevation: 2,
        width: '100%',
        alignSelf: 'center',
    },
    text: {
        paddingVertical: 8,
        fontSize: 20,
    }
})