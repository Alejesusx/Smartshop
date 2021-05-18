import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <div className='input-group mb-0'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-0 ml-sm-3'
        ></Form.Control>
        <Button type='submit' variant='secondary' className='py-1 px-3'>
          Search <i className='fas fa-search ml-1'></i>
        </Button>
      </div>
    </Form>
  )
}

export default SearchBox
