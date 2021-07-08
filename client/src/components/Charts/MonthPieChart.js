import React , {useState, useEffect} from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer,Cell } from 'recharts';

const MonthPieChart = ({fetcheddata,yeardata}) => {
    const [yearcount, setYearCount] = useState([]);
    const [countmonth, setMonthCount] = useState([]); 

    useEffect(()=>{
    const yearcounts = [];
    if(yeardata.length) yeardata.forEach((d)=>{
        let temp = 0;
        d.group_by_Type.buckets.forEach((bucket)=>{
        temp+=bucket.total_count.value
        })
        yearcounts.push({
        "year":d.key_as_string,
        "total_count": temp
    })
    })
    setYearCount(yearcounts);
    console.log(yearcounts);
    },[yeardata])

    useEffect(()=>{
        const monthcount = [];
        if(fetcheddata.length) fetcheddata.forEach((d)=>{
            d.group_by_month.buckets.forEach((bucket)=>{
                let temp = 0;
                bucket.group_by_Type.buckets.forEach((type)=>{
                    temp+= type.total_count.value;
                })
                monthcount.push({'total':temp,'Month':bucket.key_as_string.slice(0,7)})
            })
        })
        setMonthCount(monthcount);
        console.log(monthcount);
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
        <ResponsiveContainer width={800} height={600}>
        <PieChart width={200} height={400} margin={{bottom: 50}}>
        <Pie
          data={yearcount}
          dataKey="total_count"
          cx={200}
          cy={200}
          outerRadius={50}
          fill="#8884d8"
        >
        </Pie>
        <Pie
          data={countmonth}
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
  
            return ( 
              <text
                x={x}
                y={y}
                fill= "black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {countmonth[index].Month}
              </text>
            );
          }}
        >
        {countmonth.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
          </Pie>
        <Legend layout="vertical" wrapperStyle={{top: 30, left: 400}}
        payload={
          countmonth.map(
            (item, index) => ({
              value: `${item.Month} (${item.total})`,
              type: "square",
              id: item.month,
              color: COLORS[index % COLORS.length]
            })
          )
        }
        />
          <Tooltip content={<CustomTooltip />} />
      </PieChart>
      </ResponsiveContainer> 
    )
}

export default MonthPieChart;
