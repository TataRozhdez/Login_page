import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const MyCard = ({ card }) => {
  return (
    <Card className='mb-2'>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>{card.date}</Card.Subtitle>
        <Card.Title>
          <small className='text-secondary'>
            <i>Company:</i>
          </small>
          &nbsp;
          {card.company.name}
        </Card.Title>
        <Card.Link href='#'>Flight Link</Card.Link>
        <Card.Link href='#'>Book Link</Card.Link>
      </Card.Body>
    </Card>
  )
}

Card.propTypes = {
  card: PropTypes.object,
}

export default MyCard
