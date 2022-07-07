
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const FlightCard = ({  numberOfPassengers, type, classType, locationD, locationA, dateD, dateA, priceMin, priceMax, sortOrder }) => {

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>
                        <span className="card-name">{classType}</span>
                    </CardTitle>
                    <CardText>
                    {type}
                    {numberOfPassengers}
                    {locationD}
                    {locationA}
                    {dateD}
                    {dateA} 
                    {priceMin}
                    {priceMax} 
                    {sortOrder}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )

}

export default FlightCard;