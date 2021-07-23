import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
  

const Bargraph = ({fetcheddata,year}) => {
    const history = useHistory();
    const [data, setData] = useState([]); 
    //Getting the data in required format for Re-charts as per the docs
    useEffect(()=>{
        const arraydata = [];
        if(fetcheddata.length) fetcheddata.forEach((d)=>{
          if(d.key_as_string.slice(0,4)==year){
            d.group_by_month.buckets.forEach((month)=>{
                const temp = month.group_by_Type.buckets;
                const data = {};
                temp.forEach((type)=>{
                    data[type.key] = type.total_count.value;
                })
                arraydata.push({"name": month.key_as_string.slice(0,7),"Casper": data['Casper'], "Cirrus": data['Cirrus'], "VIS": data['VIS'], "Gemini": data['Gemini']})
            })}
        })
        setData(arraydata);
    },[fetcheddata])
    console.log(data);
 
    return (
        <ResponsiveContainer width={600} height={500}>
        <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 80,
          left: 30,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" wrapperStyle={{top: 80, left: 530}}/>
        <Bar dataKey="Casper" stackId="d" fill="#0088FE" />
        <Bar dataKey="Cirrus" stackId="d" fill="#00C49F" />
        {/* Using history.push to push the year-month to URL to further create tables */}
        <Bar dataKey="Gemini" stackId="d" fill="#FFBB28" onClick={(data,index)=>{return window.open(`/table/${data.name}`)}}/>
        <Bar dataKey="VIS" stackId="d" fill="#FF8042" />
      </BarChart>
      </ResponsiveContainer>
    )
}

export default Bargraph;
