import React from "react"
import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div>
      <Spinner
        animation='border'
        role='status'
        variant='light'
        style={{
          width: "140px",
          height: "140px",
          margin: "auto",
          display: "block",
        }}
      >
        <span className='sr-only primary'> Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
