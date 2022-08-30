import React, { Component } from "react";
import Axios from "axios";

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "MM/DD/YYYY",
      editing: false
    };

    this.initEditor();
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }

  initEditor() {
    this.editor = (
      <input
        type="date"
        // type="text"
        className="date-change-input"
        defaultValue={this.props.date}
        onKeyPress={event => {
          const key = event.which || event.keyCode;
          if (key === 13) {
            // if user hits the "enter" key, save input value
            this.save(event.target.value);
            this.props.handleInputChange(event.target.value);
          }
        }}
        autoFocus={true}
      />
    );
  }

  edit() {
    this.setState({
      date: this.state.date,
      editing: true
    });
  }

  save(value) {
    this.setState({
      date: value,
      editing: false
    });
    Axios.put(`/date/${this.props.tripId}`, {
      date: value
    }).then(res => {
      if (this.state.date !== res.data.date) {
        this.setState({ date: res.data.date });
      }
    });
  }

  componentDidUpdate(prevProps) {
    this.initEditor();
    if (
      prevProps.tripId !== this.props.tripId ||
      this.props.date !== this.state.date
    ) {
      if(this.props.tripId){
        Axios.get(`/getdate/${this.props.tripId}`).then(res => {
          this.setState({ date: res.data.date });
        });
      }
    }
  }

  render() {
    return this.state.editing ? (
      this.editor
    ) : (
      <p className="vacation-date" onClick={this.edit}>
        {this.state.date} <i className="fas fa-pen pencil"></i>
      </p>
    );
  }
}

export default DateInput;