export const SET_CALORIES="SET_CALORIES";
export const SET_WORKOUTS="SET_WORKOUTS";

export const setCalories=(calories)=>({
    type:SET_CALORIES,
    payload:calories
});
export const setWorkouts=(workouts)=>({
    type:SET_WORKOUTS,
    payload:workouts
});