import React, {useState, useEffect, Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Piechart from './components/Charts/Piechart';
import NestedPieChart from './components/Charts/NestedPieChart';
import Bargraph from './components/Charts/Bargraph'
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
      <Fragment>
        < Navbar />
        <container style={{display:"flex",flexWrap:"wrap"}}>
        < Piechart fetcheddata={data} />
        < NestedPieChart fetcheddata={data} />
        </container>
        < Bargraph fetcheddata={bargraphdata} />
      </Fragment>
  )
};

export default App;
