import React from 'react'

class ConfigBox extends React.Component {
    constructor(props) {
        super(props)

        this.onClickBtn = this.onClickBtn.bind(this)
    }

    onClickBtn(value){
      const {press} = this.props
      press(value)
    }

    render() {
        const {title,minute} = this.props

        return (
          <div className="config-box">
            <p>{title}</p>
            <div className="config-bar">
              <i className="glyphicon glyphicon-minus config-sign" onClick={() => this.onClickBtn(-1)}></i>
              <span className="config-number">{minute}</span>
              <i className="glyphicon glyphicon-plus config-sign" onClick={() => this.onClickBtn(1)}></i>
            </div>
          </div>
        )
    }
}

export default ConfigBox
