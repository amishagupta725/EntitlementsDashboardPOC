import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
    <container style={{padding:"0px 2px", marginBottom: "20px"}}>
    <nav className="navbar fixed-top navbar-dark bg-dark">
        <a style={{marginLeft:'500px'}} className="navbar-brand">Entitlements Dashboard</a>
        <container style={{display:'flex', justifyContent:'space-around'}}>
        <div style={{paddingLeft:"5px",paddingRight:"3px"}}>
            <Link to="/" style={{textDecoration:'none', color:'white'}}>Month</Link>
        </div>
        <div style={{paddingLeft:"5px",paddingRight:"30px"}}>
            <Link to="/year" style={{textDecoration:'none', color:'white'}}>Year</Link>
        </div>
        </container>
    </nav>
    </container>    
    )
}

export default Navbar
