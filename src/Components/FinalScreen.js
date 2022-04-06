import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FetchButton from './FetchButton'

function FinalScreen() {
  const score = useSelector((state) => state.score)
  const amount = useSelector((state) => state.amount)
  let grade = (score < amount/3) ? "Not good enough, You should try again":
              (score > 2*(amount/3) && score !== amount) ? "Very good!":
              (score === amount) ? "Perfect!":
              "OK, But you can do better";
  let img = (score < amount/3) ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGpW8L4aD9XCoDmeHKykOt8Ue95Lf2nEDLQ&usqp=CAU':
            (score > 2*(amount/3)) ? 'data:image/png;base64,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':
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABcCAMAAADd2oIQAAAA4VBMVEX//wD39/cAAAD////n5wD8/Pzv7wBSUgD19QD6+gC8vABJSUm3t7ddXQDGxsby8gDY2Njh4eEmJiacnJyKigCkpADExADX1wCrq6sxMTGRkQDr6+vR0QCbmwBcXFzi4gA+PgC0tAALCwBHRwAsLAA0NACCggCrqwBRUVF0dHT//2BBQUE5OTlqamqGhoaOjo4cHBwQEBAYGABpaQAeHgB0dACNjR4SEgCamjMnJwrBwTFBQRNgYBrp6UIHBxJ7eyGZmSL//zVlZSvu7jXm5lKNjTXExEvV1VH//05PTyGwsEbvxsVzAAAEgUlEQVRYhe2Z+XfaOBDH5RHiMJhwgyE4BhJKE47QNE2P3XaTbbfZ/f//oJVsI18jX8Db9/b1++Mgf5DHmtFoRLQzifxPwYxRKcZOA+ZIrd3sbjf1daezrm+23WZb4/jjwJza6lodiKhjdVtp7CQwo62dS7KNXl/XBwNd7/cM27XtWoloNZjRRl0AKtNhmYRUHk4r4pd6IwGtAjNtJJ419BrBpRvi95GmQivAtGnyx8YlBdVRacyHmA2aA0wnK4D5NInqqv8EsGqjaAxMhReW1XQuIdWe8AdGjoOZZgEsrrJgHYcsACzE0zEwm3DvjrNihaZ8YU9i5CiYNvm7XebhEjKcAzSj7iBx7nU5nRVW+SZOJjFuJS9WqBIjh8CsVZDrkFtMBWbtwlyH3GYKsNaBG1UEp6pmw71ixnQDcFGUS8gFX88UA4t4y7nOwroMxaAEswlAhuyQpGnQzRJMLbCP4xJiw4pGwawBkDk/qFQCaLAImN7D8lguIT3Y0zCYdgEKr7SAALo0POMO/uWqy8ViHP1H3bANxfrpy8VMDh5+h0146G7IYec/ODbccbX3MGIBMDXRFFz16oh50NjzjG9Q8hhM6oNF8sFi7vFQofR8W0mWLWiUVg/JyAHTLRjIoAvJ+OT7qSeN+JQfYEt9V5igI2MGflHle3khbQ8oeAAd6QruiTn2XlMfPJOv+l7ablDwxdz1hQPuop4gH3xw/2Ar+7YnFEwM2FEPTFf+g0F99CHSn3xC0vE4uA91CQYYYkM++2A/Hr5I2284mK/9gyv4joQO+V0yvvob9zdp/AMH87BuuWAedvh3eH45MH4g//b1TwXYdlIccRLQIz7k+wESYNQO//ZDlbQenUQkwG+DkRWa8l8u42fQ+Pq3Y3t5VXB5VL/1wBa+KAT5J5/fy/fnkPH14zv49I+SS944mypxVhsWdy759fY2huC222dstCsd6q6PWR0G6mH5dQl3HvjuuG0/Dl5rZwafyxVJH6+I5MdLWG6F5C83ZYAUkx8gypAuJhnSyiRUUDIJKdNmQcm0qUz0xcQTfdrWVEyBrYlvpoXPNHEZbl3obf+Q+9CoUnD7VxUshRQsWOIl1gyyK5LAjGCJFSsKp+k8qfC7hotCja4jZWwpsyIfJ1zGiuB7OsVJIVZ4K48KeRU9KjjH0vMcbk51HLuPHMdOc4C8Qg6QJzryWrEjr6ZNcjav4sIP6Rrlzjhqt1a0FdxGyBG5iJ+xNmgjhH9AE64zNR4x1W687IOBz9ZsOld77HwNPa8FmdiOxlS6TmtBcnIrnrvTxNcZtFKapl6bN1fJNQYw09u8ojHN17OdOW9c2Xz9ZmlMa24MwjJT07C6hMytdEGeWJCpvSf2RmuSufkv0M01f6aXfF0heiJmrNWdDNYYa+z5c5WZYl+pzcTlzT73BYvmXAmtxPa+GF/Gr4ScPsuqyJWQi27v9k7tYFeW/ZnONesvvUus/a5d8BLrwB5ZZrRG6VjdNlX4NiPYYWvt5mi7Wd2Z5t3KuyhMv4X87642i+oX+PzgfwGbtE1eNI4xcgAAAABJRU5ErkJggg==';

  const dispatch = useDispatch()

  const settings = () => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: [],
    })

    dispatch({
      type: 'SET_SCORE',
      score: 0,
    })
  }

  return (
    <div className='bg'>
      <h3>Final Score: {score*100/amount}%</h3>
      <img className='img' src={img} width="200" alt=""></img>
      <h3>{grade}</h3>
      <FetchButton text="New Game" />
      <button onClick={settings}>Home</button>
      <p></p>
    </div>
  )
}
export default FinalScreen