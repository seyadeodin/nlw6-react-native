import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, _Image} from 'react-native';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect'
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointments';
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load'

import { styles } from './styles' 
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home() {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);


  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  const navigation = useNavigation();

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate('AppointmentDetails', { guildSelected })
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category){
      setAppointments(storage.filter(item => item.category === category))
    } else{
      setAppointments(storage)
    }

    setLoading(false);
  }

  //useFocusEffect is an alternative to useEffect that reaload the
  //component everytime we return to a screen
  useFocusEffect(useCallback(() => {
    loadAppointments();
}, [category]));

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
      { loading ? <Load/> :
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />

        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment 
            onPress={() => handleAppointmentDetails(item)}
            data={item} />
          )}
          ItemSeparatorComponent={ListDivider}
          style={styles.matches}
          contentContainerStyle={{ paddingBottom: 69}}
          showsVerticalScrollIndicator={false}
        />
      </>
    }
    </Background>
  );
}