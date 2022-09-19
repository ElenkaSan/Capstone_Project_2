import React from "react";
import { Button } from "reactstrap";

const Trip = ({ trip, index, removeTrip, remove }) => {
  return (
    <tbody>
      <tr>
        <td>{trip.title}</td>
        <td>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(trip.amount.$numberDecimal)}
        </td>
        <td>
          {remove ? (
            <Button
              className="remove-button"
              size="sm"
              onClick={() => removeTrip(index)}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          ) : (
            <div></div>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Trip;