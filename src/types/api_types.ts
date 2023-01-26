/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

export interface student{
  classId: string;
  studentId: string;
  name: string;
  grades: {
    A1: number,
    A2: number,
    A3: number,
    A4: number,
    A5: number
  };
}

export interface assignment{
  assignmentId: string,
  classId: string,
  date: string,
  weight: number
}

export interface grade{
  assignmentName: string;
  score: string;
}

export interface assignmentWeight{
  assignmentID: string;
  classId: string;
  weight: BigInt;
}



