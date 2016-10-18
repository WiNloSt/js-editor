import React from 'react'
import style from './style.scss'
import AcceptStyleAndClassName from '../../containers/AcceptStyleAndClassName'

const Console = () => (
  <div className={style.container}>
    <textarea className={style.editor}>some code here</textarea>
  </div>
)

export default AcceptStyleAndClassName(Console)
