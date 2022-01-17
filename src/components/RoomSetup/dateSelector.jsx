import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
      startDate: "17-01-2022",
      endDate: "18-01-2022",
    };
  }

  handleDayClick(day, { selected }) {
    const selectedDays = this.state.selectedDays.concat();
    let startDate = this.state.startDate
    let endDate = this.state.endDate
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    const formattedDays = selectedDays.map(date => date.toISOString().split('T')[0]);
    const sortedArray = formattedDays.sort();
    console.log(sortedArray);
    this.setState({ selectedDays });
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          startDate={this.state.selectedDays[0]}
          endDate={this.state.selectedDays[-1]}
        />
      </div>
    );
  }
}