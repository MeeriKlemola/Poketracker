import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import PokeList from './PokeList.tsx';
import { getPokemon } from '../apiGetPokemon.js';

export default function PokeFinder() {

    const [keyword, setKeyword] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

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
        } }

        return (
            <View style={styles.inputForm}>
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
                        <PokeList pokemon={pokemon} />
                }
            </View>
        )
    }

const styles = StyleSheet.create({
    inputForm: {
        flex: 1,
    },
})