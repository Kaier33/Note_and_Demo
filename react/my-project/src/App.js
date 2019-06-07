import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { LIST_VIEW, CHART_VIEW } from './utility'

import PriceList from './components/PriceList'
import ViewTabs from './components/ViewTab'
import MonthPick from './components/MonthPick'
import TotalPrice from './components/TotalPrice'

const items = [
  {
    id: 1,
    title: '去日本旅游',
    price: 20000,
    date: '2019-05-03',
    category: {
      id: '1',
      name: '旅游',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  },
  {
    id: 2,
    title: '去北欧旅游',
    price: 40000,
    date: '2019-10-03',
    category: {
      id: '1',
      name: '旅游',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  },
  {
    id: 3,
    title: '理财收入',
    price: 200,
    date: '2019-10-05',
    category: {
      id: '2',
      name: '理财',
      type: 'income',
      iconName: 'logo-yen'
    }
  }
]

function onModifyItem(id) {
  alert(id)
}

function onDeleteItem(id) {
  alert(id)
}

function App() {
  return (
    <div className="App">
      <TotalPrice />
      <PriceList items={items} onModifyItem={onModifyItem} onDeleteItem={onDeleteItem} />
      <ViewTabs activeTab={LIST_VIEW} onTabChange={data => console.log(data)} />
      <MonthPick year={2019} month={5} onChange={(y, m) => console.log(y, m)} />
    </div>
  )
}

export default App
