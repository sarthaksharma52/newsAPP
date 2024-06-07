import React, { Component } from 'react'
import Spinner from './Spinner.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Spinner} alt="loading" />
        
      </div>
    )
  }
}
