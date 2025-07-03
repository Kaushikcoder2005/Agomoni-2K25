const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    college_roll: {
        type: String,
        required: [true, "College roll is required."]
    },
    year: {
        type: String,
        required: [true, "Year is required."],
        enum: {
            values: ['1', '2', '3', '4'],
            message: "Invalid year. Must be 1, 2, 3, or 4."
        }
    },
    sem: {
        type: String,
        required: [true, "Semester is required."]
        // Removed inline validator – now handled in pre-validate
    },
    foodType: {
        type: String,
        required: [true, "Food type is required."]
    }
});

// ✅ Custom validation logic
studentSchema.pre('validate', function (next) {
    const validSemesters = {
        '1': ['1', '2'],
        '2': ['3', '4'],
        '3': ['5', '6'],
        '4': ['7', '8']
    };

    if (this.sem && this.year && !validSemesters[this.year]?.includes(this.sem)) {
        this.invalidate(
            'sem',
            `${this.sem} is not valid for ${this.year} year.`
        );
    }

    next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
