import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, CLASS_URL, GET_DEFAULT_HEADERS, MY_BU_ID, STUDENT_URL, TOKEN } from "./globals";
import { IUniversityClass, oneStudentFinalResult } from "./types/api_types";
import { countReset } from "console";
import {calcAllFinalGrade} from "./utils/calculate_grade";
import {GradeTable} from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [currClassName, setCurrClassName] = useState<string>("");
  const [currSemester, setCurrSemester] = useState<string>("");
  const [classAllStudentFinalGrade, setClassAllStudentFinalGrade] = useState<oneStudentFinalResult[]>([]);



  const listBySemester = async () => {
    var semester = "fall2022";
    setCurrSemester(semester);
    const response = await fetch(BASE_API_URL+CLASS_URL+"listBySemester/"+semester+"?"+new URLSearchParams({
      buid: MY_BU_ID
    }),{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'x-functions-key': TOKEN
      },
    })

    const data = await response.json()
    setClassList(data)
  }

  //class/listStudents/{classId}
  const listStudentsByClassId = async () => {
    const response = await fetch(BASE_API_URL+CLASS_URL+"listStudents/"+currClassId+"/?"+new URLSearchParams({
      buid: MY_BU_ID
    }),{
      method: 'GET',
      headers: GET_DEFAULT_HEADERS(),
      });

    const data = await response.json()
  }


  useEffect(() => {
    listBySemester();
  }, []);

  useEffect(() => {
    // run something every time name changes
    calcAllFinalGrade(currClassId, currClassName, currSemester).then((value) => {
      setClassAllStudentFinalGrade(value);
    }); //use props to pass the result to component GradeTable
  }, [currClassId]);


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select fullWidth={true} label="Class" onChange={(e) => {
              const selectedValue = e.target.value
              const selectedClass = classList.filter(c => c.classId === selectedValue)[0]
              console.log(selectedClass.classId)
              setCurrClassId(selectedClass.classId)
              setCurrClassName(selectedClass.title)
            }}>
            {classList.map((IUniversityClass) => 
              <MenuItem key={IUniversityClass.title} value={IUniversityClass.classId}>
                {IUniversityClass.classId}
              </MenuItem>
            )}
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <div>{GradeTable(classAllStudentFinalGrade)}</div>
        </Grid>
      </Grid>
    </div>
  );
}
//<GradeTable />
export default App;
