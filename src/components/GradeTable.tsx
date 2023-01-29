import {IOneStudentFinalResult} from "../types/api_types";
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
export const GradeTable = (infoList: IOneStudentFinalResult[]) => {
  const items = [];
        for (const student of infoList) {
            items.push(<tr key = {student.studentId}>
                <td> {student.studentId}</td>
                <td> {student.studentName}</td>   
                <td> {student.classId}</td>
                <td> {student.className}</td>
                <td> {student.semester}</td>
                <td> {student.finalGrade}</td>
            </tr>)
        }

  return (
  <table>
    <thead>
      <tr>
        <th>Student ID | </th>
        <th>Student Name |</th>
        <th>Class ID | </th>
        <th>Class Name | </th>
        <th>Semester | </th>
        <th>Final Grade | </th>
      </tr>
    </thead>
    <tbody>
      {items}
    </tbody>
</table>);
};
