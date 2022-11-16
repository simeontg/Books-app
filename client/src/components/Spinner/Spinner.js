import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

const Spinner = () => {
  return (
    <ClipLoader loading={true} cssOverride={override}/>
  )
}

export default Spinner