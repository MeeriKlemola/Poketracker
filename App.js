import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather} from '@expo/vector-icons';
import HomeScreen from "./screens/HomeScreen";
import MyListsScreen from "./screens/MyListsScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
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
        })}>

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Lists" component={MyListsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer >

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
