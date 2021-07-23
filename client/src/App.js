import React, {useState, useEffect, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import NestedPieChart from './components/Charts/NestedPieChart';
import Bargraph from './components/Charts/Bargraph'
import Table from './components/Tables/Table';
import MonthPieChart from './components/Charts/MonthPieChart';
import YearPieChart from './components/Charts/YearPieChart';
import YearBarGraph from './components/Charts/YearBarGraph';
import Yearlytable from './components/Tables/Yearlytable';
import { Dropdown, Option } from "./components/Dropdown";
import './App.css';
import axios from 'axios';

//Functions to fetch the data from API using axios
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

//Slicing the URL to get the year from drop-down
  const [year, setYear] = useState(); 
  useEffect(() => {
      setYear(window.location.href.slice(28,32));
  }, [])


// Rendering the components and using Routers and Switch to get multiple components on different URLs
  return (
    <Router>
      <Switch>
      <Route path="/year">
      <Fragment>
        < Navbar />
        <container style={{display:"flex",flexWrap:"wrap",marginTop:"100px",justifyContent:"space-evenly"}}>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"600px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center", marginTop:"20px"}}>Yearly Count</h5>
        {/* < NestedPieChart fetcheddata={data} /> */}
        <YearPieChart fetcheddata={data} year={year?year:2021} />
        </div>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"600px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center",marginTop:"20px"}}>Yearly Count by Type [{year?year:2021}]</h5>
        <YearBarGraph fetcheddata={bargraphdata} year={year?year:2021}/>
        </div>
        </container>
      </Fragment>
      </Route>
      <Route path = '/table'>
      <Navbar />
        <Table fetcheddata={fetcheddata} />
      </Route>
      <Route path= '/yeartable'>
        <Navbar />
        <Yearlytable fetcheddata={fetcheddata} />
      </Route>
      <Route path="/">
      <Fragment>
        < Navbar />
        <Dropdown
        formLabel="Year"
        buttonText="Submit"
        action="/"
        >
        <Option selected value="Year" />
        <Option value="2017" />
        <Option value="2018" />
        <Option value="2019" />
        <Option value="2020" />
        <Option value="2021" />
      </Dropdown>
        <container style={{display:"flex",flexWrap:"wrap",marginTop:"10px",justifyContent:"space-evenly"}}>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"600px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center", marginTop:"20px"}}>Monthly Count [{year?year:2021}]</h5>
        {/* < NestedPieChart fetcheddata={data} /> */}
        <MonthPieChart fetcheddata={bargraphdata} yeardata={data} year={year?year:2021}/>
        </div>
        <div style={{boxShadow: "5px 10px 18px #888888",height:"400px", width:"600px",marginLeft:"20px"}}>
        <h5 style={{textAlign:"Center",marginTop:"20px"}}>Monthly Count by Type [{year?year:2021}]</h5>
        < Bargraph fetcheddata={bargraphdata} year={year?year:2021}/>
        </div>
        </container>
      </Fragment>
      </Route>
      </Switch>
      </Router>
  )
};

export default App;
