import React, { useEffect, useState } from 'react'

const Space = ({array, storeSpace}) => {
    const [basementSpace, setbasementSpace] = useState(null)

    const occupiedSpaceCubic = (arr) => {      
        let occupiedInCubicMeters = 0
        for (let i = 0; i < arr.length; i++) {
            occupiedInCubicMeters += parseFloat((arr[i].length * arr[i].height * arr[i].width)/1000000)
        }
        occupiedInCubicMeters = occupiedInCubicMeters.toFixed(4)
        return occupiedInCubicMeters
    }

    const occupiedSpacePercentage = (totalSpace, itemsSpace) => {      
      let occupiedSpace = parseInt((itemsSpace * 100) / totalSpace)
      return occupiedSpace
    }

    useEffect(()=>{
        setbasementSpace(storeSpace)
        occupiedSpaceCubic(array)
    }, [storeSpace, array])

  return (
    <div className='space-component'>
        {basementSpace && <span>Storage/basement space: <b>{basementSpace} m3</b></span>}
        <span>Available space: <b>{(basementSpace - (occupiedSpaceCubic(array))).toFixed(4)} m3</b></span>
        {/* PROGRESS BAR */}
          <div 
            className="progress-bar"
            style={{'--width': occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(array))}}
          >
            <span id='single-storage-avail'>{`Used space: ${occupiedSpacePercentage(basementSpace, occupiedSpaceCubic(array))}%`}</span>
          </div>
    </div>
  )
}

export default Space