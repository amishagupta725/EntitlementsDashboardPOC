import React, { useState, useEffect } from 'react'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = ({fetcheddata}) => {

    const arrdata = [];
    if(fetcheddata.length) fetcheddata[0].group_by_month.buckets[0].group_by_day.buckets.forEach((day)=>{
        const temp = day.group_by_Type.buckets;
            const data = {};
            temp.forEach((type)=>{
                 data[type.key] = type.total_count.value;
            })
        arrdata.push({"Day":day.key_as_string.slice(0,10),"Casper": data['Casper'], "Cirrus": data['Cirrus'], "VIS": data['VIS'], "Gemini": data['Gemini']})
    })
    console.log(arrdata);
   
    return (
        <div  className="ag-theme-alpine" style={{height: 700, width: 1000}}>
           <AgGridReact
               rowData={arrdata}>
               <AgGridColumn field="Day"></AgGridColumn>
               <AgGridColumn field="Casper"></AgGridColumn>
               <AgGridColumn field="Cirrus"></AgGridColumn>
               <AgGridColumn field="VIS"></AgGridColumn>
               <AgGridColumn field="Gemini"></AgGridColumn>
           </AgGridReact>
       </div>
    )
}

export default Table;
