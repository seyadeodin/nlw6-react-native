import React, {useState} from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform, 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import uuid from 'react-native-uuid'

import { Guilds } from '../Guilds';
import { CategorySelect } from '../../components/CategorySelect';
import { ModalView } from '../../components/Modal';
import { Background } from '../../components/Background'
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { GuildProps } from '../../components/Guild';

import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import {styles} from './styles'
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function AppointmentCreate(){
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleOpenGuilds(){
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps){
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]),
    )

    navigation.navigate('Home');
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <Background>
      <ScrollView>
          <Header
            title='Detalhes'
            />

          <Text style={[
            styles.label, 
            { marginLeft: 24, marginTop: 36, marginBottom:18}]}
            >
            Categoria
          </Text>


          <CategorySelect
            hasCheckBox
            setCategory={setCategory}
            categorySelected={category}
          />
          <View style={styles.form}>

            <RectButton onPress={handleOpenGuilds}>

              <View style={styles.select}>

                {
                  guild.icon ?
                  <GuildIcon
                    guildId={guild.id}
                    iconId={guild.icon}
                  /> :
                  < View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {
                    guild.name 
                    ? guild.name 
                    : 'Selectione um servidor'
                    } 
                  </Text> 
                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />

                </View>
            </RectButton>

            <View style={styles.field}>
              <View >
                <Text style={[styles.label, {marginBottom: 4}]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput 
                    maxLength={3}
                    onChangeText={setDay}
                  />

                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput 
                    maxLength={3}
                    onChangeText={setMonth}  
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, {marginBottom: 4}]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput 
                    maxLength={3}
                    onChangeText={setHour}   
                  />

                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput 
                    maxLength={3}
                    onChangeText={setMinute}  
                  />
                </View>
              </View>


            </View>
            <View style={[styles.field, { marginBottom: 4}]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.characterLimit}>
                Max 100 caracteres
              </Text>
            </View>
            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button 
                title="Agendar"
                onPress={handleSave}
              />
            </View>
          </View>

      </ScrollView>
        </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>

    </KeyboardAvoidingView>
  )
}