import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Cell } from 'recharts';

const YearPieChart = ({fetcheddata}) => {
    const [yearcountarr, setYearCount] = useState([]);
    useEffect(()=>{
     const yearcount = [];
     if(fetcheddata.length) fetcheddata.forEach((d)=>{
       let temp = 0;
         d.group_by_Type.buckets.forEach((bucket)=>{
         temp+=bucket.total_count.value
       })
       yearcount.push({
       "year":d.key_as_string,
       "total_count": temp
     })
     })
     setYearCount(yearcount);
     console.log(yearcount);
    },[fetcheddata])

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${payload[0].value}`}</p>
            </div>
          );
        }
        return null;
      };
    return (
        <ResponsiveContainer width={600} height={400}>
        <PieChart width={300} height={200} style={{marginBottom:"100px"}}>
        <Pie
        data={yearcountarr}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="total_count"
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          total,
          index
        }) => {
          console.log("handling label?");
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return ( 
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {yearcountarr[index].year.slice(0,4)}
            </text>
          );
        }}
      >
        {yearcountarr.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend layout="vertical" wrapperStyle={{top: 40, left: 405}}
        payload={
          yearcountarr.map(
            (item, index) => ({
              value: `${item.year.slice(0,4)} (${item.total_count})`,
              type: "square",
              id: item.year,
              color: COLORS[index % COLORS.length]
            })
          )
        }
      />
        </PieChart>
      </ResponsiveContainer> 
    )
}

export default YearPieChart;