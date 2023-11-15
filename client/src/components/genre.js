import React from 'react'
import '../scss/genre.scss'
const Genre = () => {
  return (
    <div className="genre">
        <h1>Genre</h1>
        <div className="container">
          <div className="box" id='box1'>
            <div className="item">
                <h2>pop</h2>
            </div>
          </div>
          <div className="box" id='box2'>
          <div className="item">
                <h2>chill</h2>
            </div>
          </div>
          <div className="box" id='box3'>
          <div className="item">
                <h2>podcast</h2>
            </div>
          </div>
          <div className="box" id='box4'>
          <div className="item">
                <h2>romance</h2>
            </div>
          </div>
          <div className="box" id='box5'>
          <div className="item">
                <h2>hip hop</h2>
            </div>
          </div>
          <div className="box" id='box6'>
          <div className="item">
                <h2>rock</h2>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Genre