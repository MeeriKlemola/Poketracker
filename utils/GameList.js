import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const GameList = ({ gameIndices }) => {
  const gameNames = gameIndices.map((game) => game.version.name);

  return (
    <View style={styles.container}>
      <FlatList
        data={gameNames}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>• {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</Text>
          </View>
        )}
        numColumns={3}
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
    paddingBottom: 10,
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
    width: '33%',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 340,
  },
  emptyText: {
    fontSize: 15,
    color: 'gray',
  },
});

export default GameList;