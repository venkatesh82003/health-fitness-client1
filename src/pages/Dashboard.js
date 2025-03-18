import React from "react";

function Dashboard() {
  const userName = localStorage.getItem("uname");

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="p-4 text-center">
            <h2 className="fw-bold text-primary">Welcome, {userName}! </h2>
            <p className="fs-5 text-muted">
              We are glad to have you on board. Stay fit and track your progress!
            </p>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card bg-light p-3 shadow-sm">
                  <h5 className="fw-bold text-success">Track Your Workouts </h5>
                  <p>Log your daily exercises and stay on top of your fitness goals.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light p-3 shadow-sm">
                  <h5 className="fw-bold text-info">Monitor Your Diet </h5>
                  <p>Keep track of your calories and maintain a balanced diet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
