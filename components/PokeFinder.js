import { useState, useEffect } from 'react';
import { View, TextInput, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import PokeDisplay from './PokeDisplay.tsx';
import { getPokemon } from '../apiGetPokemon.js';
import { Snackbar } from 'react-native-paper';

export default function PokeFinder({ lists, setLists }) {

    const [keyword, setKeyword] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        console.log("Listojen tila päivittyi:", lists);
        console.log(" ");
    }, [lists]);

    const addToList = (listName, pokemon, setLists) => {
        setLists(prev => {
            const alreadyExists = prev[listName].some(p => p.name === pokemon.name);

            if (alreadyExists) {
                setSnackbarMessage('Pokémon is already on the list!');
                setVisible(true);
                return prev;
            }

            setSnackbarMessage('Pokémon added successfully to the list! :)');
            setVisible(true);
            return {
                ...prev,
                [listName]: [...prev[listName], pokemon]
            };
        });
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
        <View style={{ flex: 1, alignItems: 'center'  }}>
            <TextInput
                style={{alignItems: 'left', width: '100%'}}
                placeholder='Enter a pokemon'
                value={keyword}
                onChangeText={text => setKeyword(text)}
            />

            <TouchableOpacity style={styles.button}
                onPress={() => {
                    Keyboard.dismiss();
                    handleFetch();
                }}>
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
            <Snackbar
                visible={visible}
                duration={2000}
                onDismiss={() => setVisible(false)}>
                {snackbarMessage}
            </Snackbar>
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
        width: '100%',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})