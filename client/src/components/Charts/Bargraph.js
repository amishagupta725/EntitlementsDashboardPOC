import React, {useState, useEffect} from 'react'
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
  

const Bargraph = ({fetcheddata}) => {
    const [data, setData] = useState([]); 
    useEffect(()=>{
        const arraydata = [];
        if(fetcheddata.length) fetcheddata.forEach((d)=>{
            d.group_by_month.buckets.forEach((month)=>{
                const temp = month.group_by_Type.buckets;
                const data = {};
                temp.forEach((type)=>{
                    data[type.key] = type.total_count.value;
                })
                arraydata.push({"name": month.key_as_string.slice(0,7),"Casper": data['Casper'], "Cirrus": data['Cirrus'], "VIS": data['VIS'], "Gemini": data['Gemini']})
            })
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
          top: 50,
          right: 80,
          left: 30,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" wrapperStyle={{top: 80, left: 540}}/>
        <Bar dataKey="Casper" stackId="d" fill="#0088FE" />
        <Bar dataKey="Cirrus" stackId="d" fill="#00C49F" />
        <Bar dataKey="Gemini" stackId="d" fill="#FFBB28" />
        <Bar dataKey="VIS" stackId="d" fill="#FF8042" />
      </BarChart>
      </ResponsiveContainer>
    )
}

export default Bargraph;
