import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';
import ListofLists from '../components/ListofLists'

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [caught, setCaught] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  //  const [lists, setLists] = useState({});

  const lists = {
    Favorites: favorites,
    Caught: caught,
  };
  
  const listNames = Object.keys(lists);

  // const addList = (name) => {
  //   if (name) {
  //    setModalVisible(false);
  //   setNewListName('');
  //  setLists(prev => ({
  //    ...prev, [name]: [],
  //   }));
  //  }
  // }; //ratkaise tämä


  // const addToFavorites = (pokemon) => {
  //   setFavorites((prev) => [...prev, pokemon]);
  // };

  // const addToCaught = (pokemon) => {
  //  setCaught((prev) => [...prev, pokemon]);
  // };

  return (
    <View style={styles.container}>
      <Text>Here are your current lists! </Text>

      <ListofLists listNames={listNames} />

      <Button
        title="Add a new list"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"

        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>What should we call your new list?</Text>

          <TextInput
            style={styles.input}
            placeholder="List Name"
            value={newListName}
            onChangeText={setNewListName}
          />

          <View style={styles.modalButtons}>
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
            />
            <Button
              title="Save"
              onPress={() => addList(newListName)}
            />
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    color: 'white',
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});