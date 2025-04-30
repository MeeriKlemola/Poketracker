import { useState } from 'react';
import { View, TextInput, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PokeDisplay from './PokeDisplay.tsx';
import { getPokemon } from '../apiGetPokemon.js';
import { useEffect } from 'react';

export default function PokeFinder({ lists, setLists }) {

    const [keyword, setKeyword] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Listojen tila päivittyi:", lists);
        console.log(" ");
    }, [lists]);

    const addToList = (listName, pokemon, setLists) => {
        setLists(prev => ({
            ...prev,
            [listName]: [...prev[listName], pokemon]
        }));
    };

    const handleFetch = () => {
        if (!keyword) {
            Alert.alert("Warning", "Enter a pokemon first");
        }
        else {
            setLoading(true);
            getPokemon(keyword)
                .then(data => setPokemon([data]))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }

    return (
        <View>
            <TextInput
                placeholder='Enter a pokemon'
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleFetch}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            {
                loading ? <ActivityIndicator size="large" /> :
                    <PokeDisplay
                        pokemon={pokemon}
                        addToList={(listName, pokemon) => addToList(listName, pokemon, setLists)}
                        lists={lists}
                    />
            }
        </View>
    )
}
const styles = StyleSheet.create({
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