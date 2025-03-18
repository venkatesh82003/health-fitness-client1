import {SET_CALORIES,SET_WORKOUTS} from './Actions';
const initialState={
    calories:[],
    workouts:[]
}

const fitnessReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_CALORIES:
            return{
                ...state,
                calories:action.payload
            };
        case SET_WORKOUTS:
            return{
                ...state,
                workouts:action.payload
            };
        default:
            return state;
    }
}
export default fitnessReducer;