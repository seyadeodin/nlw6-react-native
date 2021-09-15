import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text} from 'react-native';

import { RectButtonProps } from 'react-native-gesture-handler';
import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories'; 

import CalendarSvg from '../../assets/calendar.svg'
import PlayerSvg from '../../assets/player.svg';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type AppointmentProps = {
  id: string;
  guild: GuildProps;
  category: string;
  date: string;
  description: string;
}

export type GuildProps = {
  id: string;
  name: string;
  icon: null;
  owner: true;
}

export type Props = RectButtonProps & {
  data: AppointmentProps;
}

export function Appointment({ data, ...rest }: Props) {
  const [category] = categories.filter(item => item.id === data.category);
  const { owner } = data.guild;
  const {primary, on} = theme.colors;
  
  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon/>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>

            <Text style={styles.category}>
              { category.title }
            </Text>
          </View>

          <View style={styles.footer}>
            <View styles={styles.dateInfo}>
              <View style={styles.dateInfo}>
              <CalendarSvg />    
              <Text style={styles.date}>{data.date}</Text>
            </View>
          </View>

          <View style={styles.playersInfo}>
            <PlayerSvg fill={owner ? primary : on} />

            <Text style={[
              styles.player, 
              { color: owner ? primary : on}
            ]}>
              { owner ? 'Anfitrião ' : 'Visitante'}
            </Text>
            
            </View>
          </View>
        </View>
      </View>
    </RectButton>  
  )
}