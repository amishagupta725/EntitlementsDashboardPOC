import React, {useState, useEffect, Fragment} from 'react';
import api from './utils/api';
import Navbar from './components/layout/Navbar';
import './App.css';
import axios from 'axios';

function App () {
  const [data, setData] = useState({});

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi= async () => {
    try {
        await axios.get("http://localhost:5000/api/fetchdata").then((res)=>{
        console.log(res.data);
        setData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
return (
    <Fragment>
      < Navbar />
    </Fragment>
)};

export default App;
