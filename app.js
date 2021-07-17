const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
var client = require('./connection.js');

app.get('/api/fetchdata',(req,res)=>{
    client.search({  
        index: 'entitlementfactsindex',
        body: {
            "size": 0,
            "aggs":{
              "group_by_year":{
                "date_histogram": {
                  "field": "Dateiso",
                  "calendar_interval": "year"
                },
             "aggs": {
               "group_by_month": {
                 "date_histogram": {
                   "field": "Dateiso",
                   "calendar_interval": "month"
                 },
                 "aggs": {
                 "group_by_Type": {
                   "terms": {
                     "field": "Ent_Type_Desc.keyword"
                   },
               "aggs": {
                   "total_count": {
                     "sum": {
                       "field": "COUNT"
                            }
                           }
                         }
                       }
                     }
                    }
                }
            }
        }
      }
      },function (error, response,status) {
          if (error){
            console.log("search error: " + error)
          }
          else {
            console.log("--- Response ---");
            console.log(response);
            res.json(response);
          }
      });
})

app.get('/api/fetchdataperyear',(req,res)=>{
  client.search({  
      index: 'entitlementfactsindex',
      body: {  "size": 0,
      "aggs":{
        "group_by_year":{
          "date_histogram": {
            "field": "Dateiso",
            "calendar_interval": "year"
          },
         "aggs": {
           "group_by_Type": {
             "terms": {
               "field": "Ent_Type_Desc.keyword"
             },
         "aggs": {
             "total_count": {
               "sum": {
                 "field": "COUNT"
                      }
                     }
                   }
                 }
               }
        }
      }
    }
    },function (error, response,status) {
        if (error){
          console.log("search error: " + error)
        }
        else {
          console.log("--- Response ---");
          console.log(response);
          res.json(response);
        }
    });
})

app.get('/api/fetchdataperyearpermonth',(req,res)=>{
  client.search({  
      index: 'entitlementfactsindex',
      body: {  
        "size": 0,
 "aggs":{
   "group_by_year":{
     "date_histogram": {
       "field": "Dateiso",
       "calendar_interval": "year"
     },
  "aggs": {
    "group_by_month": {
      "date_histogram": {
        "field": "Dateiso",
        "calendar_interval": "month"
      },
    
  "aggs": {
    "group_by_day": {
      "date_histogram": {
        "field": "Dateiso",
        "calendar_interval": "day"
      },
  "aggs": {
      "group_by_Type": {
        "terms": {
          "field": "Ent_Type_Desc.keyword"
        },
    "aggs": {
        "total_count": {
          "sum": {
            "field": "COUNT"
                 }
                }
              }
            }
          }
        }
      }
    }
  }
}}
    }
    },function (error, response,status) {
        if (error){
          console.log("search error: " + error)
        }
        else {
          console.log("--- Response ---");
          console.log(response);
          res.json(response);
        }
    });
})

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})