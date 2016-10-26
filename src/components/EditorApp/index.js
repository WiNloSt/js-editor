import React, { Component } from 'react'
import Editor from '../Editor'
import Console from '../Console'
import Resizer from '../Resizer'
import CodeKelvin from '../CodeKelvin'

import style from './style.scss'

class App extends Component {
  state = {
    resizerPositionPercentage: 60
  }

  setResizerPosition = (percentage) => {
    const screenWidth = screen.availWidth
    const editorSize = percentage / 100 * screenWidth
    const consoleSize = (100 - percentage) / 100 * screenWidth
    if (editorSize < 100 || consoleSize < 250) return
    this.setState({
      resizerPositionPercentage: percentage
    })
  }

  render() {
    return (
      <div className={style.container}>
        <Editor style={{
          display: 'inline-block',
          width: `${this.state.resizerPositionPercentage}%`,
          verticalAlign: 'top'
        }} />
        <Resizer left={`${this.state.resizerPositionPercentage}%`} setResizerPosition={this.setResizerPosition} />
        <Console style={{
          display: 'inline-block',
          width: `${100 - this.state.resizerPositionPercentage}%`,
          verticalAlign: 'top'
        }} />
        <CodeKelvin />
      </div>
    )
  }
}

export default App
