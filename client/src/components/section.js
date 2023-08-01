import React from 'react'
import '../scss/section.scss';
import Trending from '../images/trending.jpg';
import Chill from '../images/chill.jpg';
import Hindi from '../images/hindi.jpg';
import English from '../images/english.jpg';
import Tamil from '../images/tamil.jpg';
import kpop from '../images/k-pop.jpg';
import { useNavigate } from 'react-router-dom';
const Section = () => {
    const navigate = useNavigate();
  return (
    <div className="section">
      <h1>Categories</h1>
      <div className="boxes">
        <div className="box" style={{backgroundColor:"#E13300"}} onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/trending`)
        }}>
            <h2>Trending</h2>
            <div className="image">
                <img src={Trending} alt="trend" />
            </div>
        </div>
        <div className="box" style={{backgroundColor:"#7358FF"}}  onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/chill`)
        }}>
            <h2>Chill</h2>
            <div className="image">
                <img src={Chill} alt="rbrt" />
            </div>
        </div>
        <div className="box" style={{backgroundColor:"#1E3264"}}  onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/english`)
        }}>
            <h2>English</h2>
            <div className="image">
                <img src={English} alt="trend" />
            </div>
        </div>
        <div className="box" style={{backgroundColor:"#E8125C"}}  onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/tamil`)
        }} >
            <h2>Tamil</h2>
            <div className="image">
                <img src={Tamil} alt="erhrt" />
            </div>
        </div>
        <div className="box" style={{backgroundColor:"#E9142A"}}  onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/hindi`)
        }}>
            <h2>hindi</h2>
            <div className="image">
                <img src={Hindi} alt="trend" />
            </div>
        </div>
        <div className="box" style={{backgroundColor:"#B02897"}} onClick={(e)=>{
            e.preventDefault();
            navigate(`/categories/kpop`)
        }}>
            <h2>k-pop</h2>
            <div className="image">
                <img src={kpop} alt="rgrg" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Section;