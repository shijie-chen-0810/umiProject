import React from 'react'

export default function Myinput({value,onChange}) {
  return (
    <input type="text" value={value} onChange={onChange}/>
  )
}
