import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn'
import { Background } from '../components/Background';
import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return(
    <Navigator
      screenOptions={{
        headerMode: "none",
        cardStyle: {
          backgroundColor: theme.colors.secondary80
        },
      }}
    >
      <Screen
      
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="Home"
        component={Home}
      />
    </Navigator>
  )
}