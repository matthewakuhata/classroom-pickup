export type ClassroomType = {
  id: string;
  name: string;
  students: StudentType[];
};

export type StudentType = {
  id: string;
  name: string;
  cars: string[];
};

export type SeenPlates = { [key: string]: boolean };
