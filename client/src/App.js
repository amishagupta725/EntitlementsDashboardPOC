import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import NestedPieChart from './components/Charts/NestedPieChart';
import Bargraph from './components/Charts/Bargraph'
import Table from './components/Tables/Table';
import './App.css';
import axios from 'axios';

function App () {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFromApi();
  }, []);

  const[bargraphdata, setBarGraphData] = useState([]);
  useEffect(()=> {
    getDataForBarGraph();
  },[])

  const[fetcheddata, setTableData] = useState([]);
  useEffect(()=> {
    getDataForTable();
  },[])

  const getDataForTable= async () => {
    try {
        await axios.get("http://localhost:5000/api/fetchdataperyearpermonth").then((res)=>{
        setTableData(res.data.aggregations.group_by_year.buckets);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const getDataFromApi= async () => {
    try {
        await axios.get("http://localhost:5000/api/fetchdataperyear").then((res)=>{
        setData(res.data.aggregations.group_by_year.buckets);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const getDataForBarGraph= async () => {
    try {
        await axios.get("http://localhost:5000/api/fetchdata").then((res)=>{
        setBarGraphData(res.data.aggregations.group_by_year.buckets);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Router>
      <Switch>
      <Route path = '/table'>
        <Table fetcheddata={fetcheddata} />
      </Route>
      <Route path="/">
      <Fragment>
        < Navbar />
        <container style={{display:"flex",flexWrap:"wrap",marginTop:"100px",justifyContent:"space-evenly"}}>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"550px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center", marginTop:"20px"}}>Yearwise Category-wise Count</h5>
        < NestedPieChart fetcheddata={data} />
        </div>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"600px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center",marginTop:"20px"}}>Yearwise Month-wise Category-wise Count</h5>
        < Bargraph fetcheddata={bargraphdata} />
        </div>
        </container>
      </Fragment>
      </Route>
      </Switch>
      </Router>
  )
};

export default App;
