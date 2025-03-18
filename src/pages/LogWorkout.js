import React ,{useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LogWorkout = () => {
  const [uid,setUid]=useState(localStorage.getItem('uid'));
  const[showModal,setShowModal]=useState(false);
  const formik = useFormik({
    initialValues: {
      type: "",
      userid:uid,
      duration: "",
      caloriesBurned: "",
      date: "",
    },

    validationSchema: Yup.object({
      type: Yup.string().required("Workout Type is required"),
      userid: Yup.number().required("User Id required"),
      duration: Yup.number()
        .positive("Duration must be positive")
        .required("Duration is required"),
      caloriesBurned: Yup.number()
        .positive("Calories must be positive")
        .required("Calories Burned is required"),
      date: Yup.date().required("Date is required")
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const workout={
          UserId:values.userid,
          WorkoutType:values.type,
          Duration:values.duration,
          CaloriesBurned:values.caloriesBurned,
          WorkoutDate:values.date
      }
      try {
        const response = await fetch("http://localhost:5090/api/LogWorkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        });

        if (response.ok) {
          setSubmitting(false);
          resetForm();
          formik.userid=uid;
        } else {
          alert("Failed to log workout.");
        }
      } catch (error) {
        console.error("Error logging workout:", error);
        alert("Something went wrong!");
      }

      setShowModal(true);
    },
  });
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="mt-4">
      <h2>Log Your Workout</h2>

      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">User Id</label>
          <input type="number" name="userid" className="form-control" value={uid} disabled/>
        </div>

      <div className="mb-3">
          <label className="form-label">Workout Type</label>
          <select name="type" className="form-control" {...formik.getFieldProps("type")}>
            <option value="">Select Workout type</option>
            <option value="Cycling">Cycling</option>
            <option value="Jogging">Jogging</option>
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Yoga">Yoga</option>
          </select>
          {formik.touched.type && formik.errors.type ? (<div className="text-danger">{formik.errors.type}</div>) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Duration (minutes)</label>
          <input type="number" name="duration" className="form-control" {...formik.getFieldProps("duration")}/>
          {formik.touched.duration && formik.errors.duration ? (<div className="text-danger">{formik.errors.duration}</div>) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Calories Burned</label>
          <input type="number" name="caloriesBurned" className="form-control" {...formik.getFieldProps("caloriesBurned")}/>
          {formik.touched.caloriesBurned && formik.errors.caloriesBurned ? (<div className="text-danger">{formik.errors.caloriesBurned}</div>) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Workout Date</label>
          <input type="date" name="date" className="form-control" {...formik.getFieldProps("date")}/>
          {formik.touched.date && formik.errors.date ? (<div className="text-danger">{formik.errors.date}</div>) : null}
        </div>

        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Logging..." : "Log Workout"}
        </button>
      </form>
      {showModal && (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log Workout</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>Workout has been logged successfully</p>
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
    </div>
  );
};

export default LogWorkout;
