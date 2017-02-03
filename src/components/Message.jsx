import React, {PropTypes} from 'react'

const Message = props => {
  const style = {visibility: (props.message === '') ? 'hidden' : ''}
  return <div style={style} id='message'>{props.message}</div>
}

Message.propTypes = {
  message: PropTypes.string
}

export default Message
