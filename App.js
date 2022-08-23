import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { TailwindProvider } from 'tailwindcss-react-native';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
              <Stack.Navigator>
                <Stack.Screen 
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ presentation: 'fullScreenModal', headerShown: false }}
                />

                <Stack.Screen 
                  name="MapScreen"
                  component={MapScreen}
                  options={{ presentation: 'fullScreenModal', headerShown: false }}
                />
              </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>


  );
};
