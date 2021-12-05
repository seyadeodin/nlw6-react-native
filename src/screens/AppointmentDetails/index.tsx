
import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';

import {
  ImageBackground, Text, View,
} from 'react-native';

import { Background } from '../../components/Background'
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';

import BannerImg from '../../assets/banner.png'
import { theme } from '../../global/styles/theme';
import {styles} from './styles'
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useNavigation } from '@react-navigation/native';

export function AppointmentDetails(){
  const navigation = useNavigation();
  const members = [
    {
      id: '1',
      username: 'Rodrigo',
      avatar_url: 'http://github.com/rodrigorgtic.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'LangleyAsuka',
      avatar_url: 'https://github.com/seyadeodin.png',
      status: 'busy',
    }
  ]

  return(
    <Background>
      <Header
        title='Detalhes'
        action={
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
              />
          </BorderlessButton>
        }
        />

      <ImageBackground style={styles.banner}
        source={BannerImg}
        >

      <View style={styles.bannerContent}>
        <Text style={styles.title}>Legendários</Text>
        
        <Text style={styles.subtitle}>
          É hoje que vamos chegar ao challenger sem perder uma partida da md10
        </Text>
      </View>
    </ImageBackground>

    <ListHeader
      title="Jogadores"
      subtitle="Total 3"/>

    <FlatList
      data={members}
      keyExtractor={item => item.id}
      renderItem={({ item }) => ( 
        <Member data={item} />
      )}
      ItemSeparatorComponent={() => <ListDivider/>}
      style={styles.members}
    />

    <View style={styles.footer}>
      <ButtonIcon title="Entrar na partida" />
    </View>
    
    </Background>
  )
}