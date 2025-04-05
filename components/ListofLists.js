import { View, Text } from "react-native"

export default function ListofLists({listNames}) {

    return (
        <View>
        {listNames.map((name, index) => (
          <Text key={index}>• {name}</Text>
        ))}
      </View>
    )
}