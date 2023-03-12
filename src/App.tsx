import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, CLASS_URL, GET_HEADERS, POST_HEADERS, STUDENT_URL} from "./globals";
import {GradeTable} from "./components/GradeTable";
import { IHttpResponse } from "./types/api_types";

function App() {
  // You will need to use more of these!
  const verticalStyle = { display: 'flex', justifyContent: 'left', alignItems: 'left', width: '100%'}
  const [message, setMessage] = useState<string>("");
  const [key, setKey] = useState<string>("");

  useEffect(()=>{
    var keyConfig = require("./key.json");
    setKey(keyConfig.TOKEN);
  },[]);

  /**
   * listBySemester is to given a semester, it returns all the class's ID in that semester, and set the 
   * global variable classList. This functino will be called when the program runs because it is in the useEffect.
   */
  const addShipment = async () => {
    let body = {
        "shipperId": (document.getElementById("postShipperId") as HTMLInputElement).value,
        "Date": (document.getElementById("date") as HTMLInputElement).value,
        "WarehouseID": (document.getElementById("warehouseId") as HTMLInputElement).value,
        "ShippingPO": (document.getElementById("shippingPO") as HTMLInputElement).value,
        "ShipmentID": (document.getElementById("shipmentId") as HTMLInputElement).value,
        "BoxesRcvd": (document.getElementById("numBoxesRecv") as HTMLInputElement).value
    }
    const response = await fetch("https://functionsinportal.azurewebsites.net/api/HttpTrigger1",{
      method: 'POST',
      body: JSON.stringify(body),
      headers: POST_HEADERS(key)
    })
    var data: IHttpResponse = await response.json()
    data.apiType="POST"
    setMessage(JSON.stringify(data))
  }

  const getShipment = async () => {
    var shipperId: string = (document.getElementById("getShipperId") as HTMLInputElement).value
    if (shipperId === null){
      shipperId = ""
    }
    const response = await fetch("https://functionsinportal.azurewebsites.net/api/getShipments?&shipperId="+shipperId,
    {
      method: 'GET',
      headers: GET_HEADERS(key)
    })

    var data: IHttpResponse = await response.json()
    data.apiType="GET"
    setMessage(JSON.stringify(data))
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Warehouse Automation
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Enter shipment information to upload:
          </Typography>
                      
          <div style={verticalStyle}>ShipperId</div>
          <div style={verticalStyle}><input type="text" id="postShipperId" name="postShipperId"></input></div>
          <div style={verticalStyle}>Date: </div>
          <div style={verticalStyle}><input type="text" id="date" name="date"></input></div>    
          <div style={verticalStyle}>Warehouse ID:</div>
          <div style={verticalStyle}><input type="text" id="warehouseId" name="warehouseId"></input></div>   
          <div style={verticalStyle}>shipping PO: </div>
          <div style={verticalStyle}><input type="text" id="shippingPO" name="shippingPO"></input></div>  
          <div style={verticalStyle}>Shipment ID: </div>
          <div style={verticalStyle}><input type="text" id="shipmentId" name="shipmentId"></input></div>  
          <div style={verticalStyle}># Boxes Received ID: </div>
          <div style={verticalStyle}><input type="text" id="numBoxesRecv" name="numBoxesRecv"></input></div>  
          <div style={verticalStyle}><button type="button" onClick={addShipment}>Add shipment to inventory</button></div>
          <div style={verticalStyle}><p>                 </p></div>


          <Typography variant="h5" gutterBottom>
            Enter shipperId to look up:
          </Typography>
          <div style={verticalStyle}>Shipper ID</div>
          <div style={verticalStyle}><input type="text" id="getShipperId" name="getShipperId"></input></div>  
          <div style={verticalStyle}><button type="button" onClick={getShipment}>Get shipments information</button></div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Results
          </Typography>
          <div>{GradeTable(message)}</div>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
