import React from 'react'
import {useHistory} from 'react-router-dom'
import './Button.css'

function Button({children,route}) {
    const {push} = useHistory();
    return (
            <button className='btn' onClick={()=> push(route)}> {children}</button>
    )
}

export default Button
