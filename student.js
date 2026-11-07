// ==========================================
// Student Management & Analysis System
// ==========================================

// 1. Student Class

class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // Calculate average using reduce()
    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    // Determine letter grade
    getGrade(average) {
        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // Check student's final result
    getFinalResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "Passed";
        } else {
            return "Needs Review";
        }
    }
}

// ==========================================
// 2. Students Data
// ==========================================

const studentsList = [
    new Student(3107, "Mariam", [40, 40, 40], 90),
    new Student(4215, "Omar", [49, 49, 49], 80),
    new Student(5382, "Salma", [88, 92, 90], 70),
    new Student(6479, "Youssef", [76, 80, 84], 95)
];

// ==========================================
// 3. Original Students Report
// ==========================================

console.log("==================================");
console.log("       STUDENT REPORT");
console.log("==================================");

const originalReport = studentsList.map(student => {
    const average = student.calculateAverage();

    return {
        ID: student.id,
        Name: student.name,
        Grades: student.grades.join(" / "),
        Attendance: student.attendance + "%",
        Average: average,
        "Letter Grade": student.getGrade(average),
        "Final Result": student.getFinalResult(average)
    };
});

console.table(originalReport);

// ==========================================
// 4. Grace Marks Committee
// ==========================================

// Find students with averages from 40 to 49
const strugglingStudents = studentsList.filter(student => {
    const average = student.calculateAverage();

    return average >= 40 && average <= 49;
});

// Add 5 grace marks without changing original data
const updatedStudents = strugglingStudents.map(student => {
    const originalAverage = student.calculateAverage();

    const newAverage = Math.min(originalAverage + 5, 100);

    return {
        id: student.id,
        name: student.name,
        originalAverage: originalAverage,
        newAverage: newAverage,
        updatedGrade: student.getGrade(newAverage),
        updatedResult: student.getFinalResult(newAverage),
        attendance: student.attendance
    };
});

// ==========================================
// 5. Grace Marks Report
// ==========================================

console.log("==================================");
console.log("       GRACE MARKS REPORT");
console.log("==================================");

console.table(
    updatedStudents.map(student => ({
        ID: student.id,
        Name: student.name,
        "Original Average": student.originalAverage,
        "New Average": student.newAverage,
        "Updated Grade": student.updatedGrade,
        Attendance: student.attendance + "%",
        "Updated Result": student.updatedResult
    }))
);

// ==========================================
// 6. Committee Calculations
// ==========================================

// Calculate the sum of new averages using reduce()
const totalNewAverages = updatedStudents.reduce(
    (total, student) => total + student.newAverage,
    0
);

// Calculate average after grace marks
const strugglingAverage = updatedStudents.length > 0
    ? totalNewAverages / updatedStudents.length
    : 0;

// ==========================================
// 7. Final Committee Summary
// ==========================================

console.log("==================================");
console.log("       COMMITTEE SUMMARY");
console.log("==================================");

console.log("Total Struggling Students:", strugglingStudents.length);

console.log("Sum of New Averages:", totalNewAverages);

console.log("Average After Grace Marks:", strugglingAverage);

// ==========================================
// 8. Verify Original Data Is Unchanged
// ==========================================

const originalDataCheck = studentsList.every(student => {
    const updatedRecord = updatedStudents.find(
        item => item.id === student.id
    );

    if (!updatedRecord) {
        return true;
    }

    return student.calculateAverage() === updatedRecord.originalAverage;
});

console.log("Original Student Data Preserved:", originalDataCheck);

// Verify number of students and subject grades
console.log("Total Students:", studentsList.length);

console.log(
    "Each Student Has 3 Grades:",
    studentsList.every(student => student.grades.length === 3)
);

console.log("==================================");
console.log("       END OF REPORT");
console.log("==================================");