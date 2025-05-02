import React from 'react';
import { FlatList, View, Text, Button, StyleSheet, Image } from "react-native";

export default function SingularListScreen({ route, navigation }) {
    const { listName, pokemons } = route.params;

    const renderItem = ({ item }) => {
        console.log('TYPES:', item.types);
        console.log('KOKO ITEM:', JSON.stringify(item));

        return (
            <View style={styles.listContainer}>
                <View style={{
                    flex: 3, justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexShrink: 2
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                    </Text>

                    <Text style={styles.text}>
                        Type: {Array.isArray(item.types) && item.types.length > 0
                            ? item.types.join(' / ')
                            : 'Unknown'}
                    </Text>
                </View>

                <View style={{
                    flex: 5, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={styles.image} source={{ uri: item.sprite }} resizeMode="contain" />
                </View>

                <View style={{
                    borderRadius: 8, alignItems: 'center', flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button title="x" color="red"></Button>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>{listName}</Text>

            <FlatList
                data={pokemons}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={renderItem}
            />

            <Button title="Add a Pokémon" onPress={() => { }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    listContainer: {
        backgroundColor: '#f0f4f7',
        marginBottom: 16,
        padding: 12,
        borderRadius: 10,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        paddingVertical: 8,
        fontSize: 17,
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
});
