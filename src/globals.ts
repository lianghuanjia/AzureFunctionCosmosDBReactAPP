/**
 * This file can be used to store global variables that you need to access across multiple places.
 * We've put a few here that we know you will need.
 * Fill in the blank for each one
 */
import * as fs from 'fs';


export const MY_BU_ID = "U62794192";
export const BASE_API_URL = "https://dscs519-assessment.azurewebsites.net/api/";
export const STUDENT_URL = "student/";
export const CLASS_URL = "class/";

// This is a helper function to generate the headers with the x-functions-key attached


export const GET_HEADERS = (key:string) => {
  var headers = new Headers();
  // You will need to add another header here
  // If you do not, the API will reject your request (:
  headers.append('Content-Type','application/json');
  headers.append('x-functions-key',key);
  return headers;
};

export const POST_HEADERS = (key:string) => {
  var headers = new Headers();
  // You will need to add another header here
  // If you do not, the API will reject your request (:
  headers.append('Content-Type','application/json');
  headers.append('x-functions-key',key);
  return headers;
};