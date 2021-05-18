import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Container, Form, Button } from 'react-bootstrap'
import MyNavbar from '../components/MyNavbar'
import MyCard from '../components/MyCard'
import imgBck from '../resources/header-img.svg'
import { loadUser, getAllFlights } from '../redux/appActions'

export const Main = ({ store, history }) => {
  const dispatch = useDispatch()

  const { token, flights } = store

  const [search, setSearch] = useState('')
  const [flightSearch, setFlightSearch] = useState([])

  const handleSearch = (e) => {
    const target = e.target.value
    setSearch(target)

    if (target.length > 0) {
      const arr = []

      flights.map((f) => {
        if (
          f.company.alternativeNames.length > 0 &&
          f.company.alternativeNames.filter(
            (fly) => fly.toLowerCase() === target.toLowerCase()
          )
        ) {
          return arr.push(f)
        } else if (
          f.company.name.toLowerCase().includes(target.toLowerCase())
        ) {
          return arr.push(f)
        }
        return f
      })
      setFlightSearch(arr)
    } else {
      handleClearSearch()
    }
  }

  const handleClearSearch = () => {
    setSearch('')
    setFlightSearch(flights)
  }

  useEffect(() => {
    !token && loadUser(store, history, dispatch)
    token && !flights.length && getAllFlights(token.token, dispatch)

    flights.length > 0 && setFlightSearch(flights)
  }, [token, flights])

  return (
    <>
      <MyNavbar history={history} />
      <Container>
        {flights.length && (
          <div className='w-100 d-flex flex-row mb-3'>
            <Form.Control
              type='text'
              className='py-1'
              value={search}
              onChange={handleSearch}
              placeholder='Search company'
            />
            {search.length > 0 && (
              <Button
                variant={`outline-secondary`}
                onClick={handleClearSearch}
                className='ms-1 py-1'
              >
                Clear
              </Button>
            )}
          </div>
        )}

        {flights.length > 0 &&
          flightSearch.map((f, index) => <MyCard key={index} card={f} />)}
        {!flights.length && <h3>Sorry, no flights</h3>}
      </Container>
      <div className='bck-img'>
        <img src={imgBck} alt='' />{' '}
      </div>
    </>
  )
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (store) => {
  return {
    store,
  }
}

export default connect(mapStateToProps)(Main)
