import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import PokeFinder from '../components/PokeFinder';

export default function App() {
  return (
    <View style={styles.container}>
      <PokeFinder />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});