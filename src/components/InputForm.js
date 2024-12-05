import React, { useState } from 'react';
import Papa from 'papaparse';

const InputForm = ({ onDataSubmit }) => {
    const [data, setData] = useState([]);
    const [maxStudents, setMaxStudents] = useState(30);

    // Function to handle form submission (manual entry)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newEntry = {
            semester: formData.get('semester'),
            courseCode: formData.get('courseCode'),
            totalStudents: parseInt(formData.get('totalStudents')),
        };
        setData([...data, newEntry]);
        onDataSubmit([...data, newEntry], maxStudents);
        alert("Entry added successfully!");
    };

    // Function to handle file import
    const handleFileImport = (event) => {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
            Papa.parse(file, {
                header: false, // Since there are no headers in the sample CSV
                skipEmptyLines: true, // Ignore empty rows
                complete: (result) => {
                    // Ensure proper data format after import
                    const importedData = result.data.map((entry) => ({
                        courseCode: entry[0], // Assuming courseCode is in the first column
                        totalStudents: parseInt(entry[1]), // Total number of students
                        sections: parseInt(entry[2]), // Number of sections
                        studentsPerSection: entry[3], // Students per section (already calculated in the CSV)
                    }));
                    const combinedData = [...data, ...importedData];
                    setData(combinedData); // Update local state with imported data
                    onDataSubmit(combinedData, maxStudents); // Pass data to parent
                    alert("CSV file imported successfully!"); // Success alert
                    console.log('Imported CSV Data:', importedData); // Debugging
                },
                error: (error) => {
                    console.error('Error while parsing CSV:', error.message); // Handle any parsing errors
                    alert("Error importing CSV file. Please check the file format.");
                },
            });
        }
    };

    return (
        <div>
            {/* Manual Entry Form */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="semester" placeholder="Semester" required /> 
                <input type="text" name="courseCode" placeholder="Course Code" required />
                <input type="number" name="totalStudents" placeholder="Total Students" required />
                <input
                    type="number"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    placeholder="Max Students per Section"
                />
                <button type="submit">Add Entry</button>
            </form>

            {/* CSV File Import */}
            <input
                type="file"
                accept=".csv"
                onChange={handleFileImport}
                style={{ marginBottom: '20px' }}
                
            />
        </div>
    );
};

export default InputForm;
