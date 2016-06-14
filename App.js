import React from 'react'
import ConfigBox from './ConfigBox'
import ProgressBar from  './ProgressBar'

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      mode: 'S', //S for SESSION and B for BREAK
      title: 'SESSION',
      time: 25 * 60, //in seconds
      sessionLength: 25, //in minutes
      breakLength: 5, //in minutes
      percent: 0,
      interalId: ''
    }

    this.handleChangeSession = this.handleChangeSession.bind(this)
    this.handleChangeBreak = this.handleChangeBreak.bind(this)
    this.handlePressTime = this.handlePressTime.bind(this)
    this.countDown = this.countDown.bind(this)
    this.resetDisplay = this.resetDisplay.bind(this)

  }

  getDisplayTime(){
    const {time} = this.state
    let minute = parseInt(time / 60)
    let second = time % 60

    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second

    return minute + ':' + second
  }

  countDown(){
    let {time, mode, sessionLength, breakLength, intervalId} = this.state

    if(time > 0){
      time--
    }

    //caculate percentage
    //100% = SESSION LENGTH
    let length = mode === 'S' ? sessionLength : breakLength;
    let percent = (1 - (time / (length * 60))) * 100
    percent = percent.toFixed(2)
    console.log(percent)

    if(time === 0){
      //to BREAK or SESSION?
      this.changeMode()
      return
    }

    this.setState({
      time: time,
      percent: percent
    })

  }

  handlePressTime(){
    let {intervalId} = this.state

    // start or pause?
    if(intervalId){
      //running --> pause
      clearInterval(intervalId)
      intervalId = ''
    }else{
      //start
      intervalId = setInterval(this.countDown,1000)
    }

    this.setState({
      intervalId: intervalId
    })

  }

  handleChangeSession(value){
    let {sessionLength, time, intervalId} = this.state

    this.resetDisplay()

    sessionLength += value
    if(sessionLength > 60 || sessionLength === 0){
      return
    }

    this.setState({
      sessionLength: sessionLength,
      time: sessionLength * 60,
      intervalId: intervalId
    })

  }

  handleChangeBreak(value){
    let {breakLength} = this.state

    this.resetDisplay()

    breakLength += value
    if(breakLength > 60 || breakLength === 0){
      return
    }

    this.setState({
      breakLength: breakLength
    })

  }

  changeMode(){
    let {mode, title, time, percent} = this.state
    const {sessionLength, breakLength} = this.state

    switch(mode){
      case 'S':
        //from SESSION to BREAK
        mode = 'B'
        time = breakLength * 60
        title = 'BREAK'
        break;
      case 'B':
        //from BREAK to SESSION
        mode = 'S'
        time = sessionLength * 60
        title = 'SESSION'
        break;
    }

    percent = 0

    this.setState({
      mode: mode,
      title: title,
      time: time,
      percent: percent
    })
  }

  resetDisplay(){

    const {intervalId, sessionLength} = this.state

    if(intervalId){
      //stop counting and reset progress if any
      clearInterval(intervalId)
    }

    this.setState({
      mode: 'S',
      title: 'SESSION',
      intervalId: '',
      percent: 0,
      time: sessionLength * 60
    })

  }

  render(){
    const {title, sessionLength, breakLength, percent} = this.state
    const display = this.getDisplayTime()

    return (
      <div className="container-fluid clock">
        <div className="row">
          <div className="col-xs-8 timer show-grid">
            <div className="status">{title}</div>
            <div className="timer-text" onClick={this.handlePressTime}>{display}</div>
            <ProgressBar percent={percent}/>
          </div>
          <div className="col-xs-4 show-grid">
            <ConfigBox title='SESSION LENGTH' minute={sessionLength} press={this.handleChangeSession}/>
            <ConfigBox title='BREAK LENGTH' minute={breakLength} press={this.handleChangeBreak}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
