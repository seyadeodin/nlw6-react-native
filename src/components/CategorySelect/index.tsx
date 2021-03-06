import React from 'react';
import { ScrollView } from 'react-native';

import { Category } from '../Category';
import { categories } from '../../utils/categories';

type Props = {
  categorySelected?: string;
  setCategory: (categoryId : string) => void;
  hasCheckBox?: boolean;
}

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function CategorySelect({
  categorySelected, 
  setCategory,
  hasCheckBox = false,
}: Props) {
  console.log(categories)

  return(
    <ScrollView
      style={styles.container} 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
      >
        {
          categories.map(category => (
            <Category
              key={category.id}
              title={category.title}
              icon={category.icon}
              hasCheckBox={hasCheckBox} 
              checked={category.id === categorySelected}
              onPress={() => setCategory(category.id)}
            />
          ))
        } 
      </ScrollView>
  )
}