/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, student, assignment, grade, oneStudentFinalResult} from "../types/api_types";
import { BASE_API_URL, CLASS_URL, GET_DEFAULT_HEADERS, MY_BU_ID, STUDENT_URL, TOKEN } from "../globals";

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: undefined,
  klass: IUniversityClass
): Promise<undefined> {
  return undefined;
}

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string, classTitle: string, currSemester: string): Promise<oneStudentFinalResult[]> {
  const response = await fetch(BASE_API_URL+CLASS_URL+"listStudents/"+classID+"/?"+new URLSearchParams({
    buid: MY_BU_ID
  }),{
    method: 'GET',
    headers: GET_DEFAULT_HEADERS(),
    });

  const data = await response.json()

  //use a list to store all the data and return it.

  var students = [];
  for (var studentID of data) {
    const studentInfo = await fetch(BASE_API_URL+STUDENT_URL+"listGrades/"+studentID+"/"+classID+"/?"+new URLSearchParams({
      buid: MY_BU_ID
    }),{
      method: 'GET',
      headers: GET_DEFAULT_HEADERS(),
      });
  
    const student: student = await studentInfo.json();
    // console.log(student);
    students.push(student);
  }

  // console.log(students)

  // for(var student in students){
  //   console.log(student)
  // }

  let assignmentsWeight = new Map();
  const res = await fetch(BASE_API_URL+CLASS_URL+"listAssignments/"+classID+"/?"+new URLSearchParams({
    buid: MY_BU_ID
  }),{
    method: 'GET',
    headers: GET_DEFAULT_HEADERS(),
    });

  const jsonResponse = await res.json();

  for(var assignment of jsonResponse){
    assignmentsWeight.set(assignment.assignmentId, assignment.weight);
  }

  let returnList = [];

  for(var student of students){
    var totalScore = 0;
    var grades = Object.entries(student.grades[0]);
    for(var eachGrade of grades){

      // console.log(eachGrade);
      // console.log(eachGrade[0]+eachGrade[1]);
      var weight = assignmentsWeight.get(eachGrade[0]);
      var assignmentGrade = eachGrade[1];
      // if(typeof eachGrade.values === "string"){
        // assignmentGrade = parseInt(eachGrade[1]);
      // }
      // if(typeof assignmentGrade === "number"){
      totalScore += weight*assignmentGrade;
      // }
    }
    totalScore = totalScore / 100;
    let eachStudentResult: oneStudentFinalResult = {
      studentId: student.studentId,
      studentName: student.name,
      classId: classID,
      className: classTitle,
      semester: currSemester,
      finalGrade: totalScore,
    }
    returnList.push(eachStudentResult);
  }

  // for(var a of returnList){
  //   console.log(a);
  // }

  return returnList;
}

