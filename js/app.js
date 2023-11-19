class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class CaloriesTracker {
  constructor() {
    this._caloriesLimit = 2200;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
  // public methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  //private methods
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById("calories-limit");
    caloriesLimitEl.innerHTML = this._caloriesLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");
    //using array reduce!!!
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");
    //using array reduce!!!
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const remaining = this._caloriesLimit - this._totalCalories;
    const progressEl = document.getElementById("calorie-progress");
    caloriesRemainingEl.innerHTML = remaining;
    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-success");
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._caloriesLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  //JS requires manually render
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class App {
  constructor() {
    this._tracker = new CaloriesTracker();
    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newMeal.bind(this));

    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    console.log(this);
    const name = document.getElementById("meal-name");
    const calories = document.getElementById("meal-calories");

    //validate input
    if (name.value === "" || calories.value === "") {
      alert("Please input");
      return;
    }
    const meal = new Meal(name.value, parseInt(calories.value));
    this._tracker.addMeal(meal);

    //clear the form
    name.value = "";
    calories.value = "";
    //close collapse form after input
    const collapseForm = document.getElementById("collapse-meal");
    const collapse = new bootstrap.Collapse(collapseForm, { toggle: true });
  }

  _newWorkout(e) {
    e.preventDefault();

    const name = document.getElementById("workout-name");
    const calories = document.getElementById("workout-calories");

    //validate input
    if (name.value === "" || calories.value === "") {
      alert("Please input");
      return;
    }
    const workout = new Workout(name.value, parseInt(calories.value));
    this._tracker.addWorkout(workout);

    //clear the form
    name.value = "";
    calories.value = "";

    //close collapse form after input
    const collapseForm = document.getElementById("collapse-workout");
    const collapse = new bootstrap.Collapse(collapseForm, { toggle: true });
  }
}
const app = new App();
const tracker = new CaloriesTracker();

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);
const lunch = new Meal("Lunch", 350);
tracker.addMeal(lunch);
const run = new Workout("1 Mile Run", 320);
tracker.addWorkout(run);
