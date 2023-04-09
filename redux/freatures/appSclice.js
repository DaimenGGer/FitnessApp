import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed: [],
  workout: 0,
  cal: 0,
  munite: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addWorkout: (state, aciton) => {
      state.workout += aciton.payload;
    },
    addCal: (state, aciton) => {
      state.cal += aciton.payload;
    },
    addMunite: (state, aciton) => {
      state.munite += aciton.payload;
    },
    addCompleWorkout: (state, action) => {
      state.completed = [...state.completed, action.payload];
    },
    startAgain: (state, action) => {
      state.completed = [];
    },
    intialCompleted: (state, action) => {
      state.completed = action.payload;
    },
    intialCal: (state, action) => {
      state.cal = action.payload;
    },
    intialWorkout: (state, action) => {
      state.workout = action.payload;
    },
    intialmunite: (state, action) => {
      state.munite = action.payload;
    },
  },
});
export const {
  addWorkout,
  addCal,
  addMunite,
  addCompleWorkout,
  startAgain,
  intialCompleted,
  intialCal,
  intialWorkout,
  intialmunite,
} = appSlice.actions;

export const selectWorkout = (state) => state.app.workout;
export const selectCal = (state) => state.app.cal;
export const selectMunite = (state) => state.app.munite;
export const selectCompleted = (state) => state.app.completed;

export default appSlice.reducer;
