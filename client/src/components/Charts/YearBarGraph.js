import React , {useEffect, useState} from 'react'
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";

const YearBarGraph = ({fetcheddata,year}) => {
    const [data, setData] = useState([]); 
    useEffect(()=>{
        const arraydata = [];
        let Casper = 0;
        let Cirrus = 0;
        let Gemini = 0;
        let VIS = 0;
        if(fetcheddata.length) fetcheddata.forEach((d)=>{
          if(d.key_as_string.slice(0,4)==year){
            d.group_by_month.buckets.forEach((month)=>{
                month.group_by_Type.buckets.forEach((type)=>{
                    if(type.key=="Casper") Casper+= type.total_count.value;
                    else if(type.key=="Cirrus") Cirrus+=type.total_count.value;
                    else if(type.key=="Gemini") Gemini+=type.total_count.value;
                    else VIS+=type.total_count.value
                })
            })
            arraydata.push({"name": d.key_as_string.slice(0,4),"Casper": Casper, "Cirrus": Cirrus, "VIS": VIS, "Gemini": Gemini})
        }})
        setData(arraydata);
    },[fetcheddata])
    console.log(data);
    return (
        <ResponsiveContainer width={500} height={500}>
        <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 50,
          right: 80,
          left: 90,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" wrapperStyle={{top: 80, left: 460}}/>
        <Bar dataKey="Casper" stackId="d" fill="#0088FE" />
        <Bar dataKey="Cirrus" stackId="d" fill="#00C49F" />
        <Bar dataKey="Gemini" stackId="d" fill="#FFBB28" />
        <Bar dataKey="VIS" stackId="d" fill="#FF8042" />
      </BarChart>
      </ResponsiveContainer>
    )
}

export default YearBarGraph;
