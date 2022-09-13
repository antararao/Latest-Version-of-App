import React from 'react' 
import Home from './home'
import Popular from './popular'
import Recommendations from './recommendations'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {RFValue} from 'react-native-responsive-fontsize'

export default function App() {
  return (
   <AppContainer></AppContainer> 
  );
}

const AppTopNavigation = createMaterialTopTabNavigator({
  Recommendations:{
    screen: Recommendations,
    navigationOptions : { 
      tabBarLabel: 'Recommended', 
      tabBarOptions:{
        tabStyle: {backgroundColor: 'blue'}, 
        labelStyle: {color: 'white'}, 
        indicatorStyle: {backgroundColor: 'purple'}
      }
    }
  }, 
  Popular:{
    screen: Popular,
    navigationOptions : { 
      tabBarLabel: 'Popular', 
      tabBarOptions:{
        tabStyle: {backgroundColor: 'blue'}, 
        labelStyle: {color: 'white'}, 
        indicatorStyle: {backgroundColor: 'purple'}
      }
    }
  }, 
})

const AppStackNavigator = createStackNavigator({
  Home:{
    screen: Home, 
    navigationOptions: {
      headerShown: false 
    }
  }, 
  AppTop: {
    screen: AppTopNavigation, 
    navigationOptions : {
      headerTitle: 'Recommended Movies', 
      headerBackTitle: null, 
      headerTintColor: 'white', 
      headerTitleStyle: {
        color: 'black', 
        fontWeight: 'bold',
        fontSize: RFValue(18)
      }
    }
  }
}, {
  initialRouteName: "Home"
})

const AppContainer = createAppContainer(AppStackNavigator)