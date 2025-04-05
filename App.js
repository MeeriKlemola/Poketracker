import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from "./screens/HomeScreen";
import MyLists from "./screens/MyLists";

const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return <Ionicons name='home' size={size} color={color} />;

            } else if (route.name === 'My Lists') {
              return <AntDesign name="book" size={size} color={color} />;
            }

          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Lists" component={MyLists} />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
