
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const FlightCard = ({   
    origin,
    destination,
    startDate,
    endDate,
    adults,
    oneWay,
    nonStop
 }) => {

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>
                        <span className="card-name">{origin}</span>
                    </CardTitle>
                    <CardText>
                    {origin}
                    {destination}
                    {startDate}
                    {endDate}
                    {adults}
                    {oneWay}
                    {nonStop}
                    {/* {type}
                    {numberOfPassengers}
                    {locationD}
                    {locationA}
                    {dateD}
                    {dateA} 
                    {priceMin}
                    {priceMax} 
                    {sortOrder} */}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )

}

export default FlightCard;