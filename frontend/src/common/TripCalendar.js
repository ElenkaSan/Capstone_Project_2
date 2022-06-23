import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TripCalendar() {

    const [date, setDate] = useState(new Date());
    const onDateChange = (newDate) => {
        setDate(newDate);
        console.log(newDate);
    }
    
    return (
        <>
        <Calendar
        onChange={onDateChange}
        value={date}
        showNeighboringMonth={true}
        locale={"en-US"}
        selectRange={true}
            />
            </>
    )
}