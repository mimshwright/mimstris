import React from 'react'
import {connect} from 'react-redux'

import ModalText from '../components/ModalText'

const mapStateToProps = (state) => {
  return ({
    text: state.message
  })
}

const StatusMessage = props => (
  <ModalText text={props.text} />
)

export default connect(mapStateToProps)(StatusMessage)
