import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Cell } from 'recharts';


const NestedPieChart = ({fetcheddata}) => {

 const [counttype, setData] = useState([]); 
 const [yearcount, setYearCount] = useState([]);
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


 useEffect(()=>{
  const counttype = [];
  if (fetcheddata.length) fetcheddata.forEach((d)=>{
        d.group_by_Type.buckets.forEach((bucket)=>{
        counttype.push({'total':bucket.total_count.value,'type':bucket.key});
    })  
    })
    setData(counttype);
 },[fetcheddata])
 
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
      <PieChart width={400} height={400} margin={{bottom: 50}}>
      <Pie
        data={yearcount}
        dataKey="total_count"
        cx={200}
        cy={200}
        outerRadius={50}
        fill="#8884d8"
      >
      </Pie>
      <Legend layout="vertical" wrapperStyle={{top: 40, left: 350}}
        payload={
          yearcount.map(
            (item, index) => ({
              value: `${item.year.slice(0, 4)} (${item.total_count})`,
              type: "square",
              id: item.year,
              color: "#8884d8"
            })
          )
        }
      />
      <Pie
        data={counttype}
        dataKey="total"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
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

          if (counttype[index].total>3) return ( 
            <text
              x={x}
              y={y}
              fill="#FF8042"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {counttype[index].type}
            </text>
          );
        }}
      >
        {counttype.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
    </PieChart>
      </ResponsiveContainer>   
    )
}

export default NestedPieChart;
