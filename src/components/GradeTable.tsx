import { IHttpResponse } from "../types/api_types";
import "./GradeTable.css";


/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
export function dummyData() {
  return [];
}

/**
 * This function takes a list of IOneStudentFinalResult interface, and display each IOneStudentFinalResult's information on the website
 * @param infoList :list of IOneStudentFinalResult interface. IOneStudentFinalResult contains all the information of a student that we want to display on the website
 * @returns a component that contains all the students and their information that we want to display on the website.
 */
export const GradeTable = (response: string) => {
  var jsonObj = null
  if (response !== ""){
    console.log(response)
    jsonObj = JSON.parse(response)
    if(jsonObj.apiType === 'GET'){

    const items = [];
      for (const shipment of jsonObj.message.Received) {
        //key = {jsonObj.message}
        items.push(<tr>   
            <td> {shipment.Date}</td>
            <td> {shipment.WarehouseID}</td>   
            <td> {shipment.ShippingPO}</td>
            <td> {shipment.ShipmentID}</td>
            <td> {shipment.BoxesRcvd}</td>
        </tr>)
      }
      return (
        <table>
          <thead>
            <tr>
              <th>Date  </th>
              <th>Warehouse ID  </th>
              <th>Shipping PO  </th>
              <th>Shipment ID  </th>
              <th>Boxes Received  </th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
      </table>);
  }
  else{
    const items = []
    // key = {jsonObj.message}
    items.push(<tr>
      <td> {jsonObj.message}</td>
    </tr>)

  return (
  <table>
    <thead>
      <tr>
        <th>Message </th>
      </tr>
    </thead>
    <tbody>
      {items}
    </tbody>
</table>);
  }
}


};
