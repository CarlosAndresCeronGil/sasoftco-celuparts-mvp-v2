/* eslint-disable */
import { Form } from "react-bootstrap"

export const FormItem = ({ item }) => {

    switch(item.type) {
        case 'text':
        return (
            <>
                <Form.Label>{item.label}</Form.Label>
                <Form.Control 
                    type="text"
                    id={item.label}
                />
            </>
        )
    }

}