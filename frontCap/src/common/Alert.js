import React from "react";

function Alert({ type = "danger", messages = [] }) {
  console.log(messages);
  // console.debug("Alert", "type=", type, "messages=", messages);
  return (
      <div className={`alert alert-dismissible fade show alert-${type}`} role="alert">
        {messages.map(error => (
            <p className="mb-0 small" key={error}>
              {error}
            </p>
        ))}
      </div>
  );
}

export default Alert;
