import React from 'react';
import { View, Text } from 'react-native';

const GameList = ({ gameIndices }) => {
  const gameNames = gameIndices.map((game) => game.version.name);

  return (
    <View>
      <Text>{gameNames.join(', ')}</Text>
    </View>
  );
};

export default GameList;