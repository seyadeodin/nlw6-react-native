
import React, { useEffect, useState } from 'react';
import {
  ImageBackground, 
  Text, 
  View, 
  Alert,
  Share,
  Platform,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/core';
import * as Linking from 'expo-linking'


import { Background } from '../../components/Background'
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';
import { AppointmentProps } from '../../components/Appointments';

import BannerImg from '../../assets/banner.png'
import { api } from '../../../services/api';
import { theme } from '../../global/styles/theme';
import {styles} from './styles'

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails(){
  const [ widget, setWidget ] = useState<GuildWidget>({} as GuildWidget);
  const [ loading, setLoading ] = useState(true)

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try{
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor.', 'Será que o widget está habilitado?')
    } finally {
      console.log(widget)
      setLoading(false);
    }
  }

  function handleShareInvitation(){
      const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;
      
      Share.share({
        message,
        url: widget.instant_invite,
      })
  }

  function handleOpenGuild(){
    widget.instant_invite && Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget();
  }, [])

  return(
    <Background>
      <Header
        title='Detalhes'
        action={ !loading && widget.instant_invite &&
          <BorderlessButton 
            onPress={handleShareInvitation}
          >
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
        <Text style={styles.title}>{ guildSelected?.guild.name }</Text>
        
        <Text style={styles.subtitle}>
          { guildSelected?.description }
        </Text>
      </View>
    </ImageBackground>

    {loading ? <Load/>:
      <>
      <ListHeader
        title="Jogadores"
        subtitle={`Total ${widget.members && widget.members.length || '?' }`}/>

      <FlatList
        data={widget.members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => ( 
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered/>}
        style={styles.members}
      />
      </>
    }

    {widget.instant_invite &&  
      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida" 
          onPress={handleOpenGuild}  
        />
      </View>
    } 
    </Background>
  )
}