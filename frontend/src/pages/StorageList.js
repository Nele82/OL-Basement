import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const StorageList = () => {
  const user = useSelector(state => state.loggedin.value)

  useEffect(()=>{

  }, [])
  
  return (
    <div>StorageList</div>
  )
}

export default StorageList