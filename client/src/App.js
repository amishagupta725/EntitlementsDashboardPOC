import React, {useState, useEffect, Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Piechart from './components/Charts/Piechart';
import './App.css';
import axios from 'axios';

function App () {
  const [data, setData] = useState([]);

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
      < Piechart fetcheddata={data} />
    </Fragment>
)};

export default App;
