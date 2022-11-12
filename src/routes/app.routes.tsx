import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NewPool from '../screens/NewPool/NewPool';
import Pools from '../screens/Pools/Pools';
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import FindPool from '../screens/FindPool/FindPool';
import Details from '../screens/Details/Details';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){

    const { colors, sizes } = useTheme();

    const size = sizes[6];

    return(
        <Navigator screenOptions={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                position: 'absolute',
                height: 87,
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle: {
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            },
            tabBarLabelPosition: 'beside-icon'
        }}>
            <Screen name='newpool' component={NewPool} options={{tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>, tabBarLabel: 'Novo bolão'}}/>
            <Screen name='pools' component={Pools} options={{tabBarIcon: ({color}) => <SoccerBall color={color} size={size}/>, tabBarLabel: 'Meus bolões'}}/>
            <Screen name='findpool' component={FindPool} options={{tabBarButton: () => null}}/>
            <Screen name='details' component={Details} options={{tabBarButton: () => null}}/>
        </Navigator>
    )
}