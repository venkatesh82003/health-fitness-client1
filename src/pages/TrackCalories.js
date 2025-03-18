import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiManager } from "../services/ApiManager";

function TrackCalories() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieEntries, setCalorieEntries] = useState([]);
  const [showModal,setShowModal]=useState(false);

  useEffect(() => {
    const fetchCalories = async () => {
      try{
        const uid=localStorage.getItem('uid');
        const url = `http://localhost:5090/api/Calory/${selectedDate}/${uid}`;
        const response = await ApiManager.GetApiCall(url);
        if (response.ok) {
          const data = await response.json();
          setCalorieEntries(data);
          const total = data.reduce((sum, entry) => sum + entry.calories, 0);
          setTotalCalories(total);
        }
        else{
          alert("something went wrong");
        }
      }
      catch(error){
        console.log(error);
      }
    };
    fetchCalories();
  }, [selectedDate]);
  const [uid,setUid]=useState(localStorage.getItem('uid'));
  const formik = useFormik({
    
    initialValues: {
      UserId: uid,
      FoodItem: "",
      Calories: "",
      EntryDate: "",
    },
    validationSchema: Yup.object({
      UserId: Yup.number().required("User Id is required"),
      FoodItem: Yup.string().required("Food item is required"),
      Calories: Yup.number().required("Calories is required"),
      EntryDate: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const url = "http://localhost:5090/api/Calory";
      const response = await ApiManager.PostApiCall(url, values);
      if (!response.ok) {
        alert("Not Logged");
      } else {
        const newEntry = await response.json();
        if (newEntry.entryDate === selectedDate) {
            setCalorieEntries((prev) => [...prev, newEntry]);
            setTotalCalories((total) => total + newEntry.calories);
        }
        setSubmitting(false);
        resetForm();
        formik.UserId=uid;
        setShowModal(true);
      }
    },
  });
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4 text-primary">Track Your Calories</h1>

      <div className="mb-4">
        <label className="fw-bold">Select Date: </label>
        <input type="date" className="form-control w-25" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
      </div>

      <div className="card shadow p-4 mb-4">
        <h4 className="text-center text-secondary">Log Calories</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="fw-bold">User Id</label>
            <input type="text" className="form-control" value={uid} disabled/>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Food Item</label>
            <input type="text" className="form-control" {...formik.getFieldProps("FoodItem")}/>
            {formik.touched.FoodItem && formik.errors.FoodItem && (<div className="text-danger">{formik.errors.FoodItem}</div>)}
          </div>

          <div className="mb-3">
            <label className="fw-bold">Calories</label>
            <input type="number" className="form-control" {...formik.getFieldProps("Calories")}/>
            {formik.touched.Calories && formik.errors.Calories && (<div className="text-danger">{formik.errors.Calories}</div>)}
          </div>

          <div className="mb-3">
            <label className="fw-bold">Date</label>
            <input type="date" className="form-control" {...formik.getFieldProps("EntryDate")}/>
            {formik.touched.EntryDate && formik.errors.EntryDate && (<div className="text-danger">{formik.errors.EntryDate}</div>)}
          </div>

          <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging..." : "Log Calories"}
          </button>
        </form>
      </div>
      {showModal && (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Calories</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>Calories Added Successfully</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

      <div className="card shadow p-4 mb-4">
        <h4 className="text-center text-success">Calories Summary</h4>
        <p className="fs-5 text-center">
          <strong>Total Calories for {selectedDate}:</strong>{" "}
          <span className="text-danger fw-bold">{totalCalories} kcal</span>
        </p>
      </div>

      <div className="card shadow p-4">
        <h4 className="text-center text-secondary">Calorie Entries</h4>
        {calorieEntries.length > 0 ? (
          <table className="table table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Food Item</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {calorieEntries.map((entry, index) => (
                <tr key={entry.calorieId}>
                  <td>{index + 1}</td>
                  <td>{entry.foodItem}</td>
                  <td>{entry.calories}</td>
                  <td>{entry.entryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">No entries found.</p>
        )}
      </div>
    </div>
  );
}

export default TrackCalories;
