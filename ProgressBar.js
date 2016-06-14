import React from 'react'

class ProgressBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
      const {percent} = this.props
      const prgStyle = {
        width: percent+'%'
      }

        return (
          <div className="progress">
            <div className="progress-bar progress-bar-striped active" style={prgStyle}></div>
          </div>
        )
    }

}

export default ProgressBar
