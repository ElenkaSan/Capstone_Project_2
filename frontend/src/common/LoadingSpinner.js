import React from "react";

function LoadingSpinner() {
  return (
      <div className="card text-warning lead font-weight-bold text-center bg-secondary">
        Loading ... Please wait
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
        </div>
      </div>
  );
}

export default LoadingSpinner;