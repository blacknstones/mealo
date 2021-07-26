import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  RECIPE_SWAP_OPTIONS,
  SWAP_MEALPLAN_RECIPE,
} from '../queries/DBqueries';
import { SwapCard } from '../components';
import { UpdateMealPlanState } from '../redux/slices/userSlice';

const Swap = ({ navigation, route }) => {
  const { recipe, mealId } = route.params;
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(RECIPE_SWAP_OPTIONS, {
    variables: { recipeId: recipe.id, userId: user.databaseId },
  });
  const [
    confirmSwap,
    { loading: confirmLoading, error: confirmError, data: confirmData },
  ] = useMutation(SWAP_MEALPLAN_RECIPE);
  const [selectedId, setSelectedId] = useState(recipe.id);

  const onPressSelect = id => {
    setSelectedId(id);
  };

  const onConfirm = () => {
    confirmSwap({
      variables: {
        recipeId: selectedId,
        mealId: mealId,
        userId: user.databaseId,
      },
    });
  };

  useEffect(() => {
    if (confirmData && confirmData.swapMealPlanRecipe) {
      dispatch(UpdateMealPlanState(confirmData.swapMealPlanRecipe.mealPlan));
      navigation.navigate('MealPlanner');
    }
  }, [confirmData]);

  if (loading && !data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Oops! Couldn't find any similar recipes</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Swap Recipes HERE</Text>
      <Text>mealId: {mealId}</Text>
      <Text>selected ID: {selectedId}</Text>
      <SwapCard
        recipe={recipe}
        selectedId={selectedId}
        onPressSelect={onPressSelect}
        isOriginal={true}
      />
      <View>
        <Text>Swap your meal out with one of these options!</Text>
        <FlatList
          data={data.recipeSwapOptions}
          renderItem={({ item }) => (
            <SwapCard
              recipe={item}
              selectedId={selectedId}
              onPressSelect={onPressSelect}
              isOriginal={false}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
        />
      </View>

      {confirmLoading ? (
        <Text>Updating meal plan. Please wait...</Text>
      ) : (
        <Button title='Confirm' onPress={() => onConfirm()} />
      )}
    </View>
  );
};

export default Swap;
