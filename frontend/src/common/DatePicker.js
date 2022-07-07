import React, { Component } from "react";
import "react-dates/initialize";
import {
  DateRangePicker
  // SingleDatePicker,
  // DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  onDatesChange = (startDate, endDate) => {};

  render() {
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={
            ({ startDate, endDate }) => {
              this.setState({ startDate, endDate });
              this.props.onEvent(startDate, endDate);
            }

            //this.props.setDate(startDate, endDate)
          } // PropTypes.func.isRequired,
          onClose={this.onDatesChange}
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => {
            this.setState({ focusedInput });
          }} // PropTypes.func.isRequired,
         />
      </div>
    );
  }
}

export default DatePicker;