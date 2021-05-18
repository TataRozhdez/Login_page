import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <div className='plug d-flex align-items-center justify-content-center'>
      <Spinner animation='grow' variant='info' className='text-center' />
    </div>
  )
}
