import React,{useState, useEffect} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
// import { AllModules } from 'ag-grid-enterprise';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Yearlytable = ({fetcheddata}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

    const [year, setYear] = useState(); 
    useEffect(()=>{
        setYear(window.location.pathname.slice(11,15));
    },[])

 
    const arrdata = [];
    if(fetcheddata.length) fetcheddata.forEach((d)=>{
        if(d.key_as_string.slice(0,4)==year){
        d.group_by_month.buckets.forEach((bucket)=>{
            var Casper = 0;
            var VIS = 0;
            var Gemini = 0;
            var Cirrus = 0;
        bucket.group_by_day.buckets.forEach((day)=>{
        day.group_by_Type.buckets.forEach((type)=>{
            if(type.key=="Casper") Casper+=type.total_count.value;
            else if(type.key=="Cirrus") Cirrus+=type.total_count.value;
            else if(type.key=="Gemini") Gemini+=type.total_count.value;
            else VIS+=type.total_count.value
        })
    })
    arrdata.push({"Month":bucket.key_as_string.slice(0,7),"Casper": Casper, "Cirrus": Cirrus, "VIS": VIS, "Gemini": Gemini})

})
    console.log(arrdata);
}})

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
               <AgGridColumn field="Month"></AgGridColumn>
               <AgGridColumn field="Casper"></AgGridColumn>
               <AgGridColumn field="Cirrus"></AgGridColumn>
               <AgGridColumn field="VIS"></AgGridColumn>
               <AgGridColumn field="Gemini"></AgGridColumn>
           </AgGridReact>
       </div>
       <div className="btn btn-dark" style={{height:"40px", marginTop:"70px"}} onClick={() => onBtExport()}>
            <i className="fas fa-download" />
        </div>
       </container>
    )
}

export default Yearlytable;
