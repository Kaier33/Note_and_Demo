import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      {items.map((item, index) => {
        return (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <span className="badge badge-primary col-1">
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#007bff', padding: '5px' }}
                color={'#fff'}
                icon={item.category.iconName}
              />
            </span>
            <span className="col-5">{item.title}</span>
            <span className="col-2 font-weight-bold">
              {item.category.type === 'outcome' ? '-' : '+'}
              {item.price}元
            </span>
            <span className="col-2">{item.date}</span>
            <span className="col-1" onClick={() => onModifyItem(item.id)}>
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#28a745', padding: '5px' }}
                color={'#fff'}
                icon="ios-create-outline"
              />
            </span>
            <span className="col-1" onClick={() => onDeleteItem(item.id)}>
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#dc3545', padding: '5px' }}
                color={'#fff'}
                icon="ios-close"
              />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// 类型检查
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
}
// 给定默认值
PriceList.defaultProps = {
  onDeleteItem: () => {}
}

export default PriceList
