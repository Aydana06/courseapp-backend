import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Models
import User from "./models/User.js";
import Course from "./models/Course.js";
import Comment from "./models/Comment.js";
import CourseProgress from "./models/CourseProgress.js";
import LessonProgress from "./models/LessonProgress.js";
const seedDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/elearning");
        console.log("✅ MongoDB connected");
        // Clear old data
        await User.deleteMany({});
        await Course.deleteMany({});
        await Comment.deleteMany({});
        await CourseProgress.deleteMany({});
        await LessonProgress.deleteMany({});
        console.log("Old data cleared");
        const passwordHash = bcrypt.hashSync("123456", 10);
        const courses = [
            {
                id: 1,
                title: 'Angular',
                description: 'Angular-ийн хамгийн сүүлийн үеийн онцлогуудыг сурна уу. Components, Services, Routing, Forms, HTTP Client зэргийг дэлгэрэнгүй.',
                price: 150000,
                duration: '20 цаг',
                image: 'assets/images/angular.png',
                instructor: 'Батбаяр',
                details: [{
                        level: 'Дунд',
                        category: 'Frontend',
                        rating: 4.8,
                        students: 245,
                        language: 'Монгол',
                        lastUpdated: '2025-01-15',
                        tags: ['Angular', 'TypeScript', 'Frontend', 'Web Development'],
                        lessons: [
                            { id: 1, title: 'Angular-ийн үндэс', duration: '45 мин', type: 'video' },
                            { id: 2, title: 'Components болон Templates', duration: '60 мин', type: 'video' },
                            { id: 3, title: 'Services болон Dependency Injection', duration: '75 мин', type: 'video' },
                            { id: 4, title: 'Routing болон Navigation', duration: '90 мин', type: 'video' },
                            { id: 5, title: 'Forms болон Validation', duration: '120 мин', type: 'video' }
                        ],
                        requirements: [
                            'JavaScript-ийн үндсэн мэдлэг',
                            'HTML/CSS мэдлэг',
                            'TypeScript-ийн үндсэн ойлголт'
                        ],
                        outcomes: [
                            'Angular framework-ийн бүх чухал онцлогуудыг сурах',
                            'Real-world application хөгжүүлэх',
                            'Best practices болон patterns сурах'
                        ]
                    }],
            },
            {
                id: 2,
                title: 'React.js',
                description: 'React.js-ийн бүх чухал онцлогуудыг практик дадлагатай. Hooks, Context, Redux, Router зэргийг сурна.',
                price: 120000,
                duration: '15 цаг',
                image: 'assets/images/react.png',
                instructor: 'Бат-Эрдэнэ',
                details: [{
                        level: 'Дунд',
                        category: 'Frontend',
                        rating: 4.7,
                        students: 189,
                        language: 'Монгол',
                        lastUpdated: '2024-01-10',
                        tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
                        lessons: [
                            { id: 1, title: 'React-ийн үндэс', duration: '45 мин', type: 'video' },
                            { id: 2, title: 'Components болон Props', duration: '60 мин', type: 'video' },
                            { id: 3, title: 'State болон Lifecycle', duration: '75 мин', type: 'video' },
                            { id: 4, title: 'Hooks болон Functional Components', duration: '90 мин', type: 'video' },
                            { id: 5, title: 'Context API болон Redux', duration: '120 мин', type: 'video' }
                        ],
                        requirements: [
                            'JavaScript-ийн үндсэн мэдлэг',
                            'HTML/CSS мэдлэг',
                            'ES6+ онцлогууд'
                        ],
                        outcomes: [
                            'React-ийн бүх чухал онцлогуудыг сурах',
                            'Modern React patterns сурах',
                            'State management шийдлүүд'
                        ]
                    }]
            },
            {
                id: 3,
                title: 'Node.js Backend Development',
                description: 'Node.js ашиглан backend систем хөгжүүлэх. Express.js, MongoDB, Authentication, API development.',
                price: 180000,
                duration: '25 цаг',
                image: 'assets/images/nodejs.png',
                instructor: 'Төгсбаатар',
                details: [{
                        level: 'Дунд',
                        category: 'Backend',
                        rating: 4.9,
                        students: 156,
                        language: 'Монгол',
                        lastUpdated: '2024-01-20',
                        tags: ['Node.js', 'Express', 'MongoDB', 'Backend', 'API'],
                        lessons: [
                            { id: 1, title: 'Node.js-ийн үндэс', duration: '60 мин', type: 'video' },
                            { id: 2, title: 'Express.js Framework', duration: '90 мин', type: 'video' },
                            { id: 3, title: 'MongoDB болон Database', duration: '120 мин', type: 'video' },
                            { id: 4, title: 'Authentication болон Security', duration: '150 мин', type: 'video' },
                            { id: 5, title: 'API Development', duration: '180 мин', type: 'video' }
                        ],
                        requirements: [
                            'JavaScript-ийн үндсэн мэдлэг',
                            'Basic programming concepts',
                            'Database concepts'
                        ],
                        outcomes: [
                            'Backend development-ийн бүх чухал онцлогуудыг сурах',
                            'RESTful API хөгжүүлэх',
                            'Database design болон management'
                        ]
                    }]
            },
            {
                id: 4,
                title: 'Python Programming',
                description: 'Python програмчлалын үндэснээс эхлээд advanced topics хүртэл. Data Science, Web Development.',
                price: 100000,
                duration: '18 цаг',
                image: 'assets/images/python.png',
                instructor: 'Алтан-Эрдэнэ',
                details: [{
                        level: 'Эхлэгч',
                        category: 'Programming',
                        rating: 4.6,
                        students: 312,
                        language: 'Монгол',
                        lastUpdated: '2024-01-05',
                        tags: ['Python', 'Programming', 'Data Science', 'Web Development'],
                        lessons: [
                            { id: 1, title: 'Python-ийн үндэс', duration: '45 мин', type: 'video' },
                            { id: 2, title: 'Data Types болон Variables', duration: '60 мин', type: 'video' },
                            { id: 3, title: 'Control Structures', duration: '75 мин', type: 'video' },
                            { id: 4, title: 'Functions болон Modules', duration: '90 мин', type: 'video' },
                            { id: 5, title: 'Object-Oriented Programming', duration: '120 мин', type: 'video' }
                        ],
                        requirements: [
                            'Basic computer knowledge',
                            'Logical thinking',
                            'No prior programming experience needed'
                        ],
                        outcomes: [
                            'Python programming language-ийн бүх чухал онцлогуудыг сурах',
                            'Problem solving skills',
                            'Programming fundamentals'
                        ]
                    }]
            },
            {
                id: 5,
                title: 'JavaScript ES6+',
                description: 'JavaScript-ийн хамгийн сүүлийн үеийн онцлогуудыг сурна. ES6, ES7, ES8, ES9, ES10.',
                price: 80000,
                duration: '12 цаг',
                image: 'assets/images/javascript.png',
                instructor: 'Баттулга',
                details: [{
                        level: 'Эхлэгч',
                        category: 'Programming',
                        rating: 4.5,
                        students: 423,
                        language: 'Монгол',
                        lastUpdated: '2024-01-12',
                        tags: ['JavaScript', 'ES6', 'Programming', 'Web Development'],
                        lessons: [
                            { id: 1, title: 'JavaScript-ийн үндэс', duration: '45 мин', type: 'video' },
                            { id: 2, title: 'ES6 Features', duration: '60 мин', type: 'video' },
                            { id: 3, title: 'Async Programming', duration: '75 мин', type: 'video' },
                            { id: 4, title: 'Modern JavaScript', duration: '90 мин', type: 'video' },
                            { id: 5, title: 'Best Practices', duration: '120 мин', type: 'video' }
                        ],
                        requirements: [
                            'Basic programming concepts',
                            'HTML/CSS knowledge',
                            'Logical thinking'
                        ],
                        outcomes: [
                            'Modern JavaScript-ийн бүх чухал онцлогуудыг сурах',
                            'Async programming patterns',
                            'Best practices болон coding standards'
                        ]
                    }]
            },
            {
                id: 6,
                title: 'Vue.js Framework',
                description: 'Vue.js framework-ийн бүх онцлогуудыг сурна. Components, Vuex, Vue Router, Composition API.',
                price: 110000,
                duration: '16 цаг',
                image: 'assets/images/vuejs.png',
                instructor: 'Энхбат',
                details: [{
                        level: 'Дунд',
                        category: 'Frontend',
                        rating: 4.4,
                        students: 98,
                        language: 'Монгол',
                        lastUpdated: '2024-01-18',
                        tags: ['Vue.js', 'JavaScript', 'Frontend', 'Web Development'],
                        lessons: [
                            { id: 1, title: 'Vue.js-ийн үндэс', duration: '45 мин', type: 'video' },
                            { id: 2, title: 'Components болон Props', duration: '60 мин', type: 'video' },
                            { id: 3, title: 'Vuex State Management', duration: '75 мин', type: 'video' },
                            { id: 4, title: 'Vue Router', duration: '90 мин', type: 'video' },
                            { id: 5, title: 'Composition API', duration: '120 мин', type: 'video' }
                        ],
                        requirements: [
                            'JavaScript-ийн үндсэн мэдлэг',
                            'HTML/CSS мэдлэг',
                            'Basic programming concepts'
                        ],
                        outcomes: [
                            'Vue.js framework-ийн бүх чухал онцлогуудыг сурах',
                            'State management patterns',
                            'Modern Vue.js development'
                        ]
                    }]
            }
        ];
        const createdCourses = await Course.insertMany(courses);
        console.log("Courses added");
        const users = [
            {
                firstName: "Bolat",
                lastName: "Aydana",
                email: "bolataidana73@gmail.com",
                password: passwordHash,
                phone: "90908990",
                name: "Bolat Aydana",
                role: "student",
                enrolledCourses: [createdCourses[0]._id, createdCourses[2]._id],
                cart: [createdCourses[0]._id, createdCourses[2]._id],
            }
        ];
        // Insert users
        const createdUsers = await User.insertMany(users);
        console.log("Users added");
        // Insert courses
        const sampleUser = createdUsers[0];
        const sampleCourse = createdCourses[0];
        await Comment.create({
            name: "Болд",
            role: "Frontend Developer",
            content: "Энэ сургалт миний карьерт маш их тустай байсан.",
            rating: 5,
            userId: sampleUser._id
        });
        await CourseProgress.create({
            courseId: sampleCourse._id,
            userId: sampleUser._id,
            progress: 65,
            completedLessons: [1, 2],
            totalLessons: 5,
            lastAccessed: new Date(),
            startDate: new Date("2025-01-01"),
            estimatedCompletion: new Date("2025-02-01")
        });
        await LessonProgress.create({
            lessonId: 1,
            courseId: sampleCourse._id,
            userId: sampleUser._id,
            completed: true,
            completedAt: new Date("2025-01-02"),
            timeSpent: 45,
            quizScore: 85
        });
        console.log("Sample data seeded successfully");
        await mongoose.disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};
seedDB();
