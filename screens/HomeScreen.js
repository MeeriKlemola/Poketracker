import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import PokeFinder from '../components/PokeFinder';

export default function HomeScreen({ lists, setLists }) {

  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <PokeFinder lists={lists} setLists={setLists} />
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 45
  },
});