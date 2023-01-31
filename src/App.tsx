import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, CLASS_URL, GET_DEFAULT_HEADERS, MY_BU_ID, STUDENT_URL, TOKEN } from "./globals";
import { IUniversityClass, IOneStudentFinalResult } from "./types/api_types";
import { countReset } from "console";
import {calcAllFinalGrade} from "./utils/calculate_grade";
import {GradeTable} from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [currClassName, setCurrClassName] = useState<string>("");
  const [currSemester, setCurrSemester] = useState<string>("");
  const [classAllStudentFinalGrade, setClassAllStudentFinalGrade] = useState<IOneStudentFinalResult[]>([]);

  /**
   * It calss the listBySemester when the program runs to get all the classIDs in the semester specified in
   * the listBySemester()
   */
  useEffect(() => {
    listBySemester();
  }, []);

  /**
   * Whenever the currClassId is changed(i.e., the user select a class to get its students final grades from the select drop down menu),
   * it will run setClassAllStudentFinalGrade() to calculate all the students' final grades in the class that matches the
   * currClassId, and it will use setClassAllStudentFinalGrade(value) to put all the display information to classAllStudentFinalGrade,
   * so that GradeTable component will use the classAllStudentFinalGrade to display all the students, their fianl grades, and other information
   * we want on the website.
   */
  useEffect(() => {
    if (currClassId !== '') {
      calcAllFinalGrade(currClassId, currClassName, currSemester).then((value) => {
        setClassAllStudentFinalGrade(value);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [currClassId]);

  /**
   * listBySemester is to given a semester, it returns all the class's ID in that semester, and set the 
   * global variable classList. This functino will be called when the program runs because it is in the useEffect.
   */
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
            <Select fullWidth={true} label="Class" defaultValue={{ label: "Select A Class", value: 0 }} onChange={(e) => {
              const selectedValue = e.target.value
              const selectedClass = classList.filter(c => c.classId === selectedValue)[0]
              setCurrClassId(selectedClass.classId)
              setCurrClassName(selectedClass.title)
            }}>
            {classList.map((IUniversityClass) => 
              <MenuItem key={IUniversityClass.title} value={IUniversityClass.classId}>
                {IUniversityClass.title}
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
export default App;
