import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Detail from './Screens/Detail';
import "./localization/i18n"; // <-- this line added
import { ROUTE_DETAIL, ROUTE_HOME } from './config';
import { ItemWithId } from './types/item';


type RootStackParamList = {
  detail: {
    data: ItemWithId
  },
  list: undefined,
};

export type StackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            component={Home}
            name={ROUTE_HOME}
            options={{}}
          />
          <Stack.Screen
            name={ROUTE_DETAIL}
            component={Detail}
            options={{}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

