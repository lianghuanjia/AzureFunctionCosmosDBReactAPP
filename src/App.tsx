import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, CLASS_URL, GET_DEFAULT_HEADERS, MY_BU_ID, STUDENT_URL, TOKEN } from "./globals";
import { IUniversityClass } from "./types/api_types";
import { countReset } from "console";
import {calcAllFinalGrade} from "./utils/calculate_grade";
import {GradeTable} from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [currClassName, setCurrClassName] = useState<string>("");
  const [currSemester, setCurrSemester] = useState<string>("");

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */
  const fetchSomeData = async () => {
    const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
      method: "GET",
    });
    const json = await res.json();
    console.log(json);
  };



  //class/listBySemester/{semester}
  const listBySemester = async () => {
    var semester = "fall2022";
    setCurrSemester(semester);
    //https://dscs519-assessment.azurewebsites.net/api/class/listBySemester/fall2022?buid=U62794192
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
    console.log(data)
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
    console.log(data)
  }


  useEffect(() => {
    listBySemester();
  }, []);

  useEffect(() => {
    // run something every time name changes
    const result = calcAllFinalGrade(currClassId, currClassName, currSemester); //use props to pass the result to component GradeTable
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
          <div><GradeTable /></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
