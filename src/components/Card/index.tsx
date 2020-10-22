import React from 'react';
import './styles.css'

function Card({children}:any) {
    return(
        <div className='main'>{children}</div>
    )
}



export default Card;