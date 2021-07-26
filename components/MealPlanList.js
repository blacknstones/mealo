import React, { useEffect } from 'react';
import DayPlanContainer from './DayPlanContainer';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { sortMealPlanByDay } from '../utils';

const MealPlanList = ({ mealPlan, navigation }) => {
  const renderItem = ({ item }) => (
    <DayPlanContainer dayPlan={item} navigation={navigation} />
  );

  return (
    <View>
      <FlatList
        data={sortMealPlanByDay(mealPlan)}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
};

export default MealPlanList;
