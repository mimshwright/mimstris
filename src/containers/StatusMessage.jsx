import React from 'react'
import {connect} from 'react-redux'
import {getMessage} from '../stores/message'

import ModalText from '../components/ModalText'

const mapStateToProps = (state) => {
  return ({
    text: getMessage(state)
  })
}

const StatusMessage = props => (
  <ModalText {...props} />
)

export default connect(mapStateToProps)(StatusMessage)
