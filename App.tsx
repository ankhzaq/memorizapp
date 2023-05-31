import { ApplicationProvider } from '@ui-kitten/components';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home';
import Detail from './Screens/Detail';
import { ROUTE_DETAIL, ROUTE_LIST } from './config';


type RootStackParamList = {
  detail: undefined,
  list: undefined,
};

export type StackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              component={Home}
              name={ROUTE_LIST}
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
    </ApplicationProvider>
  );
}

