import { View, Text, ScrollView, StyleSheet } from "react-native"

export default function ListofLists({ lists }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {Object.entries(lists).map(([listName, pokemons]) => (
        
        <View key={listName} style={styles.listContainer}>

          <Text style={styles.listTitle}>{listName}</Text>
          <Text style={styles.countText}>
            {pokemons.length} Pokémon{pokemons.length !== 1 }
          </Text>

        </View>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 45,
    alignItems:'center',
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
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  countText: {
    fontStyle: 'italic',
    color: '#aaa',
    paddingLeft: 5,
  }
});