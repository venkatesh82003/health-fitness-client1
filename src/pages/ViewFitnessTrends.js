import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCalories, setWorkouts } from "../redux/Actions";
import { ApiManager } from "../services/ApiManager";

function ViewFitnessTrends() {
    const dispatch = useDispatch();
    const calories = useSelector((state) => state.calories);
    const workouts = useSelector((state) => state.workouts);
    const uid = localStorage.getItem("uid");

    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const response = await ApiManager.GetApiCall(`http://localhost:5090/api/Calory/${uid}`);
                const data = await response.json();
                dispatch(setCalories(data));
            } catch (error) {
                console.error("Error fetching calories:", error);
            }
        };

        const fetchWorkouts = async () => {
            try {
                const response = await ApiManager.GetApiCall(`http://localhost:5090/api/LogWorkout/${uid}`);
                const data = await response.json();
                dispatch(setWorkouts(data));
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        fetchCalories();
        fetchWorkouts();
    }, [dispatch]);

    const totalCalories = calories.reduce((sum, entry) => sum + entry.calories, 0);
    const totalWorkouts = workouts.length;
    const avgWorkoutDuration = workouts.length > 0 ? (workouts.reduce((sum, entry) => sum + entry.duration, 0) / workouts.length).toFixed(2) : 0;
    const avgCalories = calories.length > 0 ? (totalCalories / calories.length).toFixed(2) : 0;

    return (
        <div className="mt-4">
            <h2 className="text-center mb-4">Fitness Trends</h2>

            <div className="row text-center mb-4">
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5>Total Calories</h5>
                        <h3>{totalCalories}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5>Total Workouts</h5>
                        <h3>{totalWorkouts}</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5>Avg Workout Duration</h5>
                        <h3>{avgWorkoutDuration} mins</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 shadow-sm">
                        <h5>Avg Calories per Day</h5>
                        <h3>{avgCalories}</h3>
                    </div>
                </div>
            </div>
            <div className="card p-3 mb-4 shadow-sm">
                <h4>Calories Intake</h4>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                        <th>Date</th>
                        <th>Food Item</th>
                        <th>Calories Consumed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calories.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.entryDate}</td>
                            <td>{entry.foodItem}</td>
                            <td>{entry.calories}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card p-3 shadow-sm">
                <h4>Workout Log</h4>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                        <th>Date</th>
                        <th>Workout Type</th>
                        <th>Duration (mins)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.workoutDate}</td>
                            <td>{entry.workoutType}</td>
                            <td>{entry.duration}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewFitnessTrends;
