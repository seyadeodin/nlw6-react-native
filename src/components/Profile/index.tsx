import React from 'react';
import { View, Text} from 'react-native';

import { Avatar } from '../Avatar'

import { styles } from './styles';

export function Profile() {
  return (
    <View style={styles.container}>

      <Avatar urlImage="https://avatars.githubusercontent.com/u/54055854?v=4"/>

      <View>
        <View style={styles.user}> 
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
           Lucas 
          </Text>

        </View>
        <View>

        </View>

        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>

    </View>
  )
}