import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <container style={{padding:"0px 0px"}}>
        <nav className="navbar fixed-top navbar-dark bg-dark">
        <container style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{paddingLeft:"15px",paddingRight:"15px", marginRight:"5px"}} class="navlinks">
                <Link to="/year" style={{textDecoration:'none', color:'white', fontSize:'18px'}}><span className="navtext">Yearly View</span></Link>
            </div>
            {/* <div style={{borderLeft:"2px solid white"}}></div> */}
            <div style={{paddingLeft:"15px",paddingRight:"15px"}} class="navlinks">
                <Link to="/" classname="navtext" style={{textDecoration:'none', color:'white', fontSize:'18px'}}><span className="navtext">Monthly View</span></Link>
            </div>
            <div>
            <a style={{marginLeft:"250px"}} className="navbar-brand"> Entitlements Dashboard</a>
            </div>
            </container>
        </nav> 
        </container>       
    )
}

export default Navbar
