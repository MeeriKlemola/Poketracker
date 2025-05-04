import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import ListofLists from '../components/ListofLists'

export default function MyListsScreen({ lists, setLists, removeList}) {

  const [newListName, setNewListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const listNames = Object.keys(lists);

  const addList = (name) => {
    if (!name.trim()) return;

    if (lists[name]) {
      alert('List already exists!');
      return;
    }

    setLists({ ...lists, [name]: [] });
    setNewListName('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ListofLists listNames={listNames} lists={lists} removeList={removeList} />

      <TouchableOpacity style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add a New List</Text>
      </TouchableOpacity>

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
    padding: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    color: '#3498db',
    borderRadius: 8
  },
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
  },
});