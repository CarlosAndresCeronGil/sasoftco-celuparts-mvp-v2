/* eslint-disable */
import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import MultiStepPorgressBar from './MultiStepPorgressBar'
import { Data } from './RepairData'
import MultiStepForm from './MultiStepForm'

export default function RequestSteps() {
    const [index, setIndex] = useState(1)

    const prevButton = () => {
        if(index > 1) {
            setIndex(prevIndex => prevIndex - 1)
        }
    }

    const nextButton = () => {
        if(index < 3) {
            setIndex(prevIndex => prevIndex + 1)
        }
    }

    return (
        <div className='main'>
            <Container className="h-100">
                <Row className="h-100">
                    <Col className="align-self-center">
                        <MultiStepPorgressBar step={index} />
                    </Col>
                </Row>
                <Row>
                    <Card>
                        <Card.Body>
                            <MultiStepForm list={Data} />
                        </Card.Body>
                        <Card.Footer className='d-flex justify-content-between'>
                            <Button disabled={index===1} onClick={prevButton}>Anterior</Button>
                            <Button disabled={index===3} onClick={nextButton}>Siguiente</Button>
                        </Card.Footer>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}
