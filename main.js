// Load the CSV file
Papa.parse("Employés.csv", {
    download: true,
    header: true,
    complete: function (results) {
        const data = results.data;

        // Visualization 1: Salary Distribution
        const salaries = data.map(row => parseFloat(row.salaire));
        const salaryTrace = {
            x: salaries,
            type: "histogram",
            nbinsx: 10
        };
        Plotly.newPlot("salary-distribution", [salaryTrace], {
            title: "Salary Distribution",
            xaxis: { title: "Salary" },
            yaxis: { title: "Count" }
        });

        // Visualization 2: Department-wise Employee Count
        const departmentCounts = {};
        data.forEach(row => {
            const dept = row.nomDepartement;
            departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
        });
        const deptTrace = {
            x: Object.keys(departmentCounts),
            y: Object.values(departmentCounts),
            type: "bar"
        };
        Plotly.newPlot("department-count", [deptTrace], {
            title: "Employee Count by Department",
            xaxis: { title: "Department" },
            yaxis: { title: "Count" }
        });

        // Visualization 3: Grade-wise Average Salary
        const gradeSalaries = {};
        data.forEach(row => {
            const grade = row.grade;
            const salary = parseFloat(row.salaire);
            if (!gradeSalaries[grade]) {
                gradeSalaries[grade] = { total: 0, count: 0 };
            }
            gradeSalaries[grade].total += salary;
            gradeSalaries[grade].count += 1;
        });
        const grades = Object.keys(gradeSalaries);
        const avgSalaries = grades.map(grade => gradeSalaries[grade].total / gradeSalaries[grade].count);
        const gradeTrace = {
            x: grades,
            y: avgSalaries,
            type: "bar"
        };
        Plotly.newPlot("grade-salary", [gradeTrace], {
            title: "Average Salary by Grade",
            xaxis: { title: "Grade" },
            yaxis: { title: "Average Salary" }
        });

        // Visualization 4: Age Distribution
        const currentYear = 2025;
        const ages = data.map(row => currentYear - new Date(row.date_naissance).getFullYear());
        const ageTrace = {
            x: ages,
            type: "histogram",
            nbinsx: 10
        };
        Plotly.newPlot("age-distribution", [ageTrace], {
            title: "Age Distribution of Employees",
            xaxis: { title: "Age" },
            yaxis: { title: "Count" }
        });
    }
});