import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const GameList = ({ gameIndices }) => {
  const gameNames = gameIndices.map((game) => game.version.name);

  return (
    <View style={styles.container}>
      <FlatList
        data={gameNames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>• {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</Text>
          </View>
        )}
        numColumns={3} //harkitse vielä, onko kolme vai kaksi parempi
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No games found {'\u003A\u0028'}</Text> 
          </View> //unicode suruhymiölle
        }
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
  },
  listItem: {
    fontSize: 15,
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  row: {
    flexDirection: 'row',
  },
  listItemContainer: {
    width: '34%',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default GameList;