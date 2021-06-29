import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Cell } from 'recharts';


const Piechart = ({fetcheddata}) => {

 const [counttype, setData] = useState([]); 
 useEffect(()=>{
  const arrdata = [];
  const counttype = [];
  if (fetcheddata.length) fetcheddata.forEach((d)=>{
        d.group_by_Type.buckets.forEach((bucket)=>{
        counttype.push({'total':bucket.total_count.value,'type':bucket.key});
    })  
      arrdata.push({
        "key" : d.key_as_string,
        "count" : counttype      
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
        <PieChart width={300} height={300}>
        <Pie
        data={counttype}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        dataKey="total"
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
      <Legend layout="vertical" wrapperStyle={{top: 80, left: 425}}
        payload={
          counttype.map(
            (item, index) => ({
              value: `${item.type} (${item.total})`,
              type: "square",
              id: item.type,
              color: COLORS[index % COLORS.length]
            })
          )
        }
      />
        </PieChart>
      </ResponsiveContainer>   
    )
}

export default Piechart;
