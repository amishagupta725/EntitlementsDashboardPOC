import React, {useState, useEffect, Fragment} from 'react';
import * as d3 from 'd3';
import Navbar from './components/layout/Navbar';
import Bargraph from './components/Charts/Bargraph';
import Piechart from './components/Charts/Piechart';
import './App.css';
import axios from 'axios';

function App () {
  const [data, setData] = useState({});

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi= async () => {
    try {
        await axios.get("http://localhost:5000/api/fetchdataperyear").then((res)=>{
        setData(res.data.aggregations.group_by_year.buckets);
      });
    } catch (err) {
      console.log(err);
    }
  }

return (
    <Fragment>
      < Navbar />
      <svg width="500" height="500">
      < Piechart fetcheddata={data} x={250} y={250}/>
      </svg>
    </Fragment>
)};

export default App;
