import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Button, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';

export default function ListofLists({ lists, removeList }) {
  const navigation = useNavigation();

  const confirmDelete = (listName) => {
    Alert.alert(
      "Delete List",
      `Are you sure you want to delete ${listName}?`,
      [
        { text: "Cancel" },
        { text: "Delete" , onPress: () => removeList(listName) }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {Object.entries(lists).map(([listName, pokemons]) => (

        <TouchableOpacity key={listName} onPress={() =>
          navigation.navigate("SingularList", { listName, pokemons })}>

          <View style={styles.listContainer}>

            <View>
              <Text style={styles.listTitle}>{listName}</Text>
              <Text style={styles.countText}>{pokemons.length} Pokémon</Text>
            </View>

            <View>
              <Button title="x" color="red" onPress={() => confirmDelete(listName)}></Button>
            </View>

          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 30,
  },
  listContainer: {
    backgroundColor: '#f0f4f7',
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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