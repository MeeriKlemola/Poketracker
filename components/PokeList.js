import { FlatList, View, Text, StyleSheet, Image } from "react-native"
import { getEvolutions } from "../apiGetEvolutions";
import EvolutionList from "./EvolutionsList";
import GameList from "./GameList";

export default function PokeList({ pokemon }) {

    return (
        <FlatList
            data={pokemon}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <View>
                    <Text style={styles.titleText}>
                        {item.forms[0].name.charAt(0).toUpperCase() + item.forms[0].name.slice(1).toLowerCase()}
                    </Text>
                    <Text>Height: {item.height}</Text>
                    <Text>Weight: {item.weight}</Text>
                    <Text>
                        Type: {item.types.map(t => t.type.name).join(' / ')}
                    </Text>

                    {item.sprites?.front_default ? (
                        <Image
                            source={{ uri: item.sprites.front_default }}
                            style={styles.image}
                            onError={() => console.log("Image failed to load")}
                        />
                    ) : (
                        <Text style={{ color: "red", fontSize: 16 }}>No Image Available</Text>
                    )}

                    <Text>Where to find:</Text>
                    <GameList gameIndices={item.game_indices}/>

                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",

    },
    titleText: {
        fontSixe: 22,
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 10
    }
})