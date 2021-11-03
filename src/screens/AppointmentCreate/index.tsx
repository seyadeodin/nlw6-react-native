import React, {useState} from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { Guilds } from '../Guilds';
import { CategorySelect } from '../../components/CategorySelect';
import { ModalView } from '../../components/Modal';
import { Background } from '../../components/Background'
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';

import { theme } from '../../global/styles/theme';
import {styles} from './styles'
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate(){
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleOpenGuilds(){
    setOpenGuildsModal(true);
  }

  function handleGuildSelect(guildSelect: GuildProps){
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Background>
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
                guild.icon
                ? <View style={styles.image} />
                : <GuildIcon/>
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
                  Dia e Mês
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={3}/>

                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={3}/>
                </View>
              </View>

              <View>
                <Text style={[styles.label, {marginBottom: 4}]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={3}/>

                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={3}/>
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
            />
            <View style={styles.footer}>
              <Button title="Agendar"/>
            </View>
          </View>

        </Background>
      </ScrollView>

      <ModalView visible={openGuildsModal}>
        <Guilds handleGuildSelect={handleGuildSelect}/>
      </ModalView>

    </KeyboardAvoidingView>
  )
}