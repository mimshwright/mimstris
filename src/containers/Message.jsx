import React from 'react'
import {connect} from 'react-redux'

import ModalText from '../components/ModalText'

const mapStateToProps = (state) => {
  return ({
    text: state.message
  })
}

const Message = props => (
  <ModalText text={props.text} />
)

export default connect(mapStateToProps)(Message)
