import React, { useState, useEffect } from 'react'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const Table = ({fetcheddata}) => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

    const [year, setYear] = useState(); 
    const [month, setMonth] = useState(); 
    // Using use-effect hook to get the data in required format for ag-grid table
    useEffect(() => {
        setYear(window.location.pathname.slice(7,11));
        setMonth(window.location.pathname.slice(12,14));
    }, [])

    const arrdata = [];
    if(fetcheddata.length) fetcheddata.forEach((d)=>{
        if(d.key_as_string.slice(0,4)==year){
        d.group_by_month.buckets.forEach((bucket)=>{
        if(bucket.key_as_string.slice(5,7)==month){
        bucket.group_by_day.buckets.forEach((day)=>{
        const temp = day.group_by_Type.buckets;
            const data = {};
            temp.forEach((type)=>{
            data[type.key] = type.total_count.value;
        })
        arrdata.push({"Day":day.key_as_string.slice(0,10),"Casper": data['Casper'], "Cirrus": data['Cirrus'], "VIS": data['VIS'], "Gemini": data['Gemini']})
    })
    console.log(arrdata);
    }
    })}})

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    
        const updateData = (arrdata) => {
          setRowData(arrdata);
        };
    
            updateData(arrdata);
      };
    
      const onBtExport = () => {
        gridApi.exportDataAsExcel();
      };
    
   
    return (
        <container style={{display:"flex"}}>
        <div  className="ag-theme-alpine" style={{marginRight:"15px",height: 700, width: 1000, marginLeft: "130px", marginTop:"70px"}}>
           <AgGridReact
            modules={AllModules}
            defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 100,
                flex: 1,
            }}
            onGridReady={onGridReady}
               rowData={arrdata}>
               <AgGridColumn field="Day"></AgGridColumn>
               <AgGridColumn field="Casper"></AgGridColumn>
               <AgGridColumn field="Cirrus"></AgGridColumn>
               <AgGridColumn field="VIS"></AgGridColumn>
               <AgGridColumn field="Gemini"></AgGridColumn>
           </AgGridReact>
       </div>
       <div className="btn btn-dark" style={{height:"40px", marginTop:"70px"}}>
                <i className="fas fa-download" onClick={() => onBtExport()}/>
        </div>
       </container>
    )
}

export default Table;
