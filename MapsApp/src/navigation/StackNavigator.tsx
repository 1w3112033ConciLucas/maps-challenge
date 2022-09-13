import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeCallout from '../screens/ChangeCallout';
import Map from '../screens/Map';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: '#A607F8', }, headerTintColor:'#fff'}}>
            <Stack.Screen name="Mapa" component={Map}/>
            <Stack.Screen name="ChangeCallout" component={ChangeCallout}/>
        </Stack.Navigator>
    );
}