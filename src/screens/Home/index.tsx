import React, { useState } from 'react';
import { View, FlatList, Text, _Image} from 'react-native';

import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect'
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointments';
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles' 
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [category, setCategory] = useState('')

  const appointments = [
    {
      id:'1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida nenhuma'
    },
    {
      id:'2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida nenhuma'
    }
  ]

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  const navigation = useNavigation();

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  function handleAppointmentDetails(){
    navigation.navigate('AppointmentDetails')
  }

  return(
    <Background>
     <View style={styles.header}>
        <Profile/> 
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View> 
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      <ListHeader
        title="Partidas agendadas"
        subtitle={`Total ${appointments.length}`}
      />

    <FlatList
      data={appointments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Appointment 
        onPress={handleAppointmentDetails}
        data={item} />
      )}
      ItemSeparatorComponent={ListDivider}
      style={styles.matches}
      contentContainerStyle={{ paddingBottom: 69}}
      showsVerticalScrollIndicator={false}
    />
    </Background>
  );
}