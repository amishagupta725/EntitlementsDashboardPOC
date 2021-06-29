import React, {Fragment, useEffect} from 'react'
import * as d3 from 'd3';

const Piechart = ({fetcheddata}) => {

if({fetcheddata})console.log({fetcheddata});

  var arrdata = [];
  var counttype = [];
    fetcheddata.forEach((d)=>{
        d.group_by_Type.buckets.forEach((bucket)=>{
        counttype.push({'total':bucket.total_count.value,'type':bucket.key});
    })  
      arrdata.push({
        "key" : d.key_as_string,
        "count" : counttype
      })
    })
    console.log(arrdata[0]);

 return (
        <Fragment>
            
        </Fragment>      
    )
}

export default Piechart;
