import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <container style={{padding:"0px 0px"}}>
        <nav className="navbar fixed-top navbar-dark bg-dark">
        <container style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{paddingLeft:"25px",paddingRight:"3px"}}>
                <Link to="/" style={{textDecoration:'none', color:'white', fontSize:'20px'}}>Month</Link>
            </div>
            <div style={{paddingLeft:"5px",paddingRight:"30px"}}>
                <Link to="/year" style={{textDecoration:'none', color:'white', fontSize:'20px'}}>Year</Link>
            </div>
            <div>
            <a style={{marginLeft:"400px"}} className="navbar-brand"> Entitlements Dashboard</a>
            </div>
            </container>
        </nav>
        </container>        
    )
}

export default Navbar
