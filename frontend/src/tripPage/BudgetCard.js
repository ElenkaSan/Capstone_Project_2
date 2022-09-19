import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody} from "reactstrap";
import "./style.css";

const BudgetCard = props => {
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    let arr = [];
    if (props.flightTrip.amount !== 0) {
      let newFlight = {
        title: props.flightTrip.title,
        amount: { $numberDecimal: props.flightTrip.amount.$numberDecimal || 0 }
      };
      arr.push(newFlight);
    }

    if (props.hotelTrip.amount !== 0) {
      let newHotel = {
        title: props.hotelTrip.title,
        amount: { $numberDecimal: props.hotelTrip.amount.$numberDecimal || 0 }
      };
      arr.push(newHotel);
    }

    arr = [...arr, ...props.trip];
    let totalExpenses = 0;
    arr.forEach(element => {
      totalExpenses += parseFloat(element.amount.$numberDecimal);
    });
    setExpenses(totalExpenses);
  }, [props]);


  return (
    <div>
      <Card className="J card px-4 text-center">
        <CardHeader className="T text-light font-weight-bold">Total Trip Cost:</CardHeader>
        <CardBody className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
              {/* <h5 className="T text-light money-saved">Total Trip Cost:</h5> */}
              <h4 className="T text-light card date-num"
            //   className="trip-cost"
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(expenses)}
              </h4>
          <br></br>
        </CardBody>
      </Card>
    </div>
  );
};

export default BudgetCard;