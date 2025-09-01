export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type Role = 'student' | 'admin';

export interface Certificate {
  id: string;
  userId?: number;
  courseId?: number;
  courseName?: string;
  userName?: string;
  issueDate?: Date;
  completionDate?: Date;
  grade?: string;
  certificateUrl?: string;
  status?: 'pending' | 'issued' | 'expired';
}

export interface Lesson {
  id: number;
  title: string;
  duration: string; 
  type: string;     
}

export interface CourseDetails {
  level?: string;
  category?: string;
  rating?: number;
  students?: number;
  lessons?: Lesson[];
  requirements?: string[];
  outcomes?: string[];
  tags?: string[];
  language?: string;
  lastUpdated?: string;
}

export interface Course {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  duration: string;
  instructor: string;
  details?: CourseDetails[];
}

export interface CourseProgress {
  courseId: number;
  userId: number;
  progress: number; // 0..100
  completedLessons: number[];
  totalLessons: number;
  lastAccessed: Date;
  startDate: Date;
  estimatedCompletion?: Date;
}
export interface Comments{
    id: number;
    name: string,
    role: string,
    content: string,
    rating: number,
    userId: string;
}
export interface LessonProgress {
  lessonId: number;
  courseId: number;
  userId: number;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number;
  quizScore?: number;
}

export interface User {
  phone: string;
  id: number;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;  
  name: string;
  bio?: string;
  preferences?: {
    language: string;
    notifications: boolean;
    newsletter: boolean;
  };
  avatar?: string;
  role?: Role;
  createdAt?: string;
  lastLoginAt?: string;
  enrolledCourses: number[];
  progress: CourseProgress[];
  certificates: Certificate[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
 role?: Role;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
