import React, {PropTypes} from 'react'

const ModalText = ({text}) => {
  const style = {visibility: (text === '') ? 'hidden' : ''}
  return <div style={style} className='modalText'>{text}</div>
}

ModalText.propTypes = {
  text: PropTypes.string
}

export default ModalText
