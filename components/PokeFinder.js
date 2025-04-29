import { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import PokeDisplay from './PokeDisplay.tsx';
import { getPokemon } from '../apiGetPokemon.js';

export default function PokeFinder() {

    const [keyword, setKeyword] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [lists, setLists] = useState({
        Favorites: [],
        Caught: [],
    });

    const addToList = (listName, pokemon) => {
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

            <Button
                title='Search'
                onPress={handleFetch}
            />
            {
                loading ? <ActivityIndicator size="large" /> :
                    <PokeDisplay pokemon={pokemon} addToList={addToList} />
            }
        </View>
    )
}