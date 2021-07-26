import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDayOfWeek } from '../utils';
import MealCard from './MealCard';

const DayPlanContainer = ({ dayPlan, navigation }) => {
  const renderItem = ({ item }) => (
    <MealCard meal={item} navigation={navigation} />
  );

  {
    /* <View>
      <Text>Meal: {item.meal}</Text>
      <Text>Calories: {Math.floor(item.calories)}</Text>
      <Text>{item.recipe.name}</Text>
    </View> */
  }
  return (
    <View style={styles.dayPlanContainer}>
      <Text>
        Day {dayPlan.day} ({getDayOfWeek(dayPlan.date)})
      </Text>
      <Text>Date: {dayPlan.date.substring(0, 10)}</Text>
      <Text>Calories: {Math.floor(dayPlan.calories)}</Text>
      <View style={styles.mealsContainer}>
        <FlatList
          data={dayPlan.meals}
          renderItem={renderItem}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPlanContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,
    marginBottom: 10,

    backgroundColor: 'linen',
  },
  mealsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 10,
  },
});

export default DayPlanContainer;
