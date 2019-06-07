import React from 'react'
import PropTypes from 'prop-types'

import { padLeft, range } from '../utility'

class MonthPick extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
      selectedMonth: this.props.month
    }
  }
  toggleDropdown = event => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  selectYear = year => {
    this.setState({
      selectedYear: year
    })
  }

  selectMonth = month => {
    this.setState({
      selectedMonth: month,
      isOpen: false
    })
    this.props.onChange(this.state.selectedYear, this.state.selectedMonth)
  }
  render() {
    const { year } = this.props
    const { isOpen, selectedYear, selectedMonth } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(num => num + year)
    return (
      <div className="dropdown month-picker-component">
        <h5>选择月份</h5>
        <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggleDropdown}>
          {`${selectedYear}年 ${padLeft(selectedMonth)}月`}
        </button>
        {isOpen && (
          <div className="dropdown-menu" style={{ display: 'block' }}>
            <div className="row">
              <div className="col border-right">
                {yearRange.map((yearNumber, index) => {
                  return (
                    <span
                      key={index}
                      className={yearNumber === selectedYear ? 'dropdown-item active' : 'dropdown-item'}
                      onClick={() => this.selectYear(yearNumber)}
                    >
                      {yearNumber} 年
                    </span>
                  )
                })}
              </div>
              <div className="col">
                {monthRange.map((monthNumber, index) => {
                  return (
                    <span
                      className={monthNumber === selectedMonth ? 'dropdown-item active' : 'dropdown-item'}
                      key={index}
                      onClick={() => this.selectMonth(monthNumber)}
                    >
                      {padLeft(monthNumber)} 月
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MonthPick
