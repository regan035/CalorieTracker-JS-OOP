class Meal {
  constructor(name, calories) {
    this.id = Date.now();
    this.name = name;
    this.calories = calories;
  }
}

console.log(Date.now());
class CaloriesTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workousts = [];
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
  }
}
