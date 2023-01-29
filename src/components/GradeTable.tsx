import {oneStudentFinalResult} from "../types/api_types";


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
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 * This is a component, need to apply it to the div below the typography in the App.tsx
 */ 
export const GradeTable = (infoList: oneStudentFinalResult[]) => {
  for(var a of infoList){
    console.log(a);
  }

  const items = [];
        for (const student of infoList) {
            items.push(<tr key = {student.studentId}>
                <td> { student.studentName} </td>   
                <td> {student.classId}</td>
                <td> {student.className}</td>
                <td> {student.semester}</td>
                <td> {student.finalGrade}</td>
            </tr>)
        }

  return (
  <table >
    <thead>
      <tr>
        <th>Student ID</th>
        <th>Student Name</th>
        <th>Class ID</th>
        <th>Class Name</th>
        <th>Semester</th>
        <th>Final Grade</th>
      </tr>
    </thead>
    <tbody>
      {items}
    </tbody>
</table>);
};
