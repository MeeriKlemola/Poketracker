import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign, Feather } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import MyListsScreen from "./screens/MyListsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SingularListScreen from './screens/SingularListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabScreens({ lists, setLists, removeList }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <AntDesign name='home' size={size} color={color} />;
          } else if (route.name === 'My Lists') {
            return <AntDesign name="book" size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <Feather name="settings" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen lists={lists} setLists={setLists} />}
      </Tab.Screen>
      <Tab.Screen name="My Lists">
        {() => <MyListsScreen lists={lists} setLists={setLists} removeList={removeList} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [lists, setLists] = useState({
    Favorites: [],
    Caught: [],
  });

  const removePokemon = (listName, nameToRemove) => {
    setLists(prevLists => ({
      ...prevLists,
      [listName]: prevLists[listName].filter(p => p.name !== nameToRemove),
    }));
  };

  const removeList = (listName) => {
    setLists(prevLists => {
      const updatedLists = { ...prevLists };
      delete updatedLists[listName];
      return updatedLists;
    });
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Tabs"
            options={{ headerShown: false }}>

            {() => <TabScreens lists={lists} setLists={setLists} removePokemon={removePokemon} removeList={removeList}/>}
          </Stack.Screen>

          <Stack.Screen
            name="SingularList"
            options={{ title: 'List' }}>

            {props => (
              <SingularListScreen
                {...props}
                lists={lists}
                removePokemon={removePokemon}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
