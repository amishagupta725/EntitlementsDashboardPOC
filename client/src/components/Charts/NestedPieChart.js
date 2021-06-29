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
 
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${payload[0].value}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

 return (
      <ResponsiveContainer width={600} height={400}>
      <PieChart width={400} height={400}>
      <Pie
        data={yearcount}
        dataKey="total_count"
        cx={200}
        cy={200}
        outerRadius={50}
        fill="#8884d8"
        label
      />
      <Tooltip />
      <Pie
        data={counttype}
        dataKey="total"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        label
      />
    </PieChart>
      </ResponsiveContainer>   
    )
}

export default NestedPieChart;
