import { View, Text } from "react-native"

export default function ListofLists({ lists }) {

  return (
    <View>
      {Object.entries(lists).map(([listName, pokemons]) => (
        <View key={listName}>
          <Text style={{ fontWeight: 'bold' }}>{listName}</Text>
          {pokemons.map(p => (
            <Text key={p.id}>- {p.name}</Text>
          ))}
        </View>
      ))}
    </View>
  )
}