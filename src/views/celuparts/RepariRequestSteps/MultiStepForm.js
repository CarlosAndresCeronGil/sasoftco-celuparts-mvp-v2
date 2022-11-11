/* eslint-disable */
import React from 'react'
import { Form } from "react-bootstrap";


export default function MultiStepForm(props) {
    return (
        <div className='next-left'>
            {
                props.list[0].items?.map((item, index) => {
                    return (
                        <div key={index}>
                           {item.label}
                        </div>
                    )
                })
            }
        </div>
    )
}
