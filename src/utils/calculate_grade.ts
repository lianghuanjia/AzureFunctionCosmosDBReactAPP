/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, IStudent, IAssignment, IGrade, IOneStudentFinalResult} from "../types/api_types";
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
 * This function is to use a classID and get all students IDs in that class
 * @param classID : the class of the students we are looking for
 * @returns : a list of student IDs, student IDs are string
 */
export async function getAllStudentsWithOneClassID(classID: string): Promise<string[]>{
  const response = await fetch(BASE_API_URL+CLASS_URL+"listStudents/"+classID+"/?"+new URLSearchParams({
    buid: MY_BU_ID
  }),{
    method: 'GET',
    headers: GET_DEFAULT_HEADERS(),
    });

  const data = await response.json()
  return data
}

/**
 * This function is given a studentID and a classID, it retrieves a student that matches the studentID and in that class
 * @param studentID : the student's studentID
 * @param classID : the class's ID of the class the student is in
 * @returns : an IStudent interface
 */
export async function getOneStudentWithAStudentIDandClassID(studentID: string, classID: string): Promise<IStudent>{
  const studentInfo = await fetch(BASE_API_URL+STUDENT_URL+"listGrades/"+studentID+"/"+classID+"/?"+new URLSearchParams({
    buid: MY_BU_ID
  }),{
    method: 'GET',
    headers: GET_DEFAULT_HEADERS(),
    });

  const student: IStudent = await studentInfo.json();
  return student;
}

/**
 * This function is to get a class's all assignments and their weights
 * @param classID : the class of those assignments
 * @returns : a Map that key is assignment name, value is the weight of the assignment
 */
export async function getOneClassAssignmentsAndWeights(classID: string): Promise<Map<string, number>>{
  let assignmentsAndWeight = new Map();
  const res = await fetch(BASE_API_URL+CLASS_URL+"listAssignments/"+classID+"/?"+new URLSearchParams({
    buid: MY_BU_ID
  }),{
    method: 'GET',
    headers: GET_DEFAULT_HEADERS(),
    });

  const jsonResponse = await res.json();

  for(var assignment of jsonResponse){
    assignmentsAndWeight.set(assignment.assignmentId, assignment.weight);
  }

  return assignmentsAndWeight;
}

/**
 * This function is to pass a list of IStudent, calculate all their final grades, and return a list of IOneStudentFinalResult. This list
 * is ready to be displayed on the website.
 * @param students : list of IStudent interface
 * @param assignmentsWeight : Map<string, number>, key is the assignment, value is the weight of that assignment
 * @param classID : the class's ID
 * @param classTitle : class's title
 * @param currSemester : current semester
 * @returns return a list of IOneStudentFinalResult. This list is ready to be displayed on the website.
 */
export async function calculateAllStudentsFinalGrade(students: IStudent[], assignmentsWeight: Map<string, number>, classID: string, classTitle: string, currSemester: string): Promise<IOneStudentFinalResult[]>{
  let returnList: IOneStudentFinalResult[] = [];
  for(var student of students){
    var eachStudentResult: IOneStudentFinalResult = await calculateSingleStudentFinalGraade(student, assignmentsWeight, classID, classTitle, currSemester);
    returnList.push(eachStudentResult);
  }
  return returnList;
}

/**
 * This function is to calculate a single student's final grade. It is a helper function of the calculateAllStudentsFinalGrade() above
 * @param student : the student the function is calculating on
 * @param assignmentsWeight : Map<string, number>, key is the assignment, value is the weight of that assignment
 * @param classID :the class's ID
 * @param classTitle :class's title
 * @param currSemester :current semester
 * @returns An interface IOneStudentFinalResult. This interface contains all the display field of a student that we want to display on the website.
 */
export async function calculateSingleStudentFinalGraade(student: IStudent, assignmentsWeight: Map<string, number>, classID: string, classTitle: string, currSemester: string): Promise<IOneStudentFinalResult>{
  var totalScore = 0;
    var grades: [string, number][] = Object.entries(student.grades[0]);
    for(var eachGrade of grades){
      var weight = assignmentsWeight.get(eachGrade[0]);
      var assignmentGrade = eachGrade[1];
      if (typeof weight === 'number'){
        totalScore += weight*assignmentGrade;
      }
    }
    totalScore = totalScore / 100;
    let eachStudentResult: IOneStudentFinalResult = {
      studentId: student.studentId,
      studentName: student.name,
      classId: classID,
      className: classTitle,
      semester: currSemester,
      finalGrade: totalScore,
    }
  return eachStudentResult;
}

/**
 * This function is given a classID, it calculates all the students' final grade inside the class and get the display information for the website.
 * @param classID : the class ID
 * @param classTitle : class name
 * @param currSemester : current semester
 * @returns return a list of IOneStudentFinalResult. This list is ready to be displayed on the website.
 */
export async function calcAllFinalGrade(classID: string, classTitle: string, currSemester: string): Promise<IOneStudentFinalResult[]> {
  
  const studentIDs = await getAllStudentsWithOneClassID(classID);

  var students = [];
  for (var studentID of studentIDs) {
    const student: IStudent = await getOneStudentWithAStudentIDandClassID(studentID, classID);
    students.push(student);
  }

  var assignmentsWeight: Map<string, number> = await getOneClassAssignmentsAndWeights(classID);

  var returnList: IOneStudentFinalResult[] = await calculateAllStudentsFinalGrade(students, assignmentsWeight, classID, classTitle, currSemester);

  return returnList;
}

