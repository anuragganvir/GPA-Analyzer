function showForm(type) {
    const sgpaForm = document.getElementById('sgpaForm');
    const cgpaForm = document.getElementById('cgpaForm');
    
    if (type === 'sgpa') {
        sgpaForm.classList.add('active');
        cgpaForm.classList.remove('active');
    } else {
        cgpaForm.classList.add('active');
        sgpaForm.classList.remove('active');
    }
}

function validateInput(value, min = 0, max = 10) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

function calculateSGPA() {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasError = false;

    // Loop through each input container and calculate total credits and grade points
    for (let i = 1; i <= 15; i++) {
        const credits = parseFloat(document.getElementById(`sub${i}-credits`).value);
        const grade = parseFloat(document.getElementById(`sub${i}-grade`).value);

        // Validate inputs
        if (!isNaN(credits) && !isNaN(grade)) {
            if (!validateInput(credits, 0, 10) || !validateInput(grade, 0, 10)) {
                hasError = true;
                break;
            }
            totalCredits += credits;
            totalGradePoints += credits * grade;
        }
    }

    if (hasError) {
        alert('Please enter valid values between 0 and 10');
        return;
    }

    if (totalCredits === 0) {
        alert('Please enter at least one subject\'s credits and grade');
        return;
    }

    // Calculate SGPA
    const sgpa = (totalGradePoints / totalCredits);
    const percentage = calculatePercentage(sgpa);

    // Display results
    const modal = document.getElementById("modal");
    const sgpaResult = document.getElementById("sgpaResult");
    sgpaResult.innerHTML = `
        <div class="result-container">
            <div class="result-value">${sgpa.toFixed(2)}</div>
            <div class="percentage-value">${percentage.toFixed(2)}%</div>
        </div>
    `;
    modal.style.display = "block";
}

function calculateCGPA() {
    let totalSGPA = 0;
    let numberOfSemesters = 0;
    let hasError = false;

    for (let i = 1; i <= 8; i++) {
        const sgpa = parseFloat(document.getElementById(`sem${i}-sgpa`).value);

        if (!isNaN(sgpa)) {
            if (!validateInput(sgpa, 0, 10)) {
                hasError = true;
                break;
            }
            totalSGPA += sgpa;
            numberOfSemesters++;
        }
    }

    if (hasError) {
        alert('Please enter valid SGPA values between 0 and 10');
        return;
    }

    if (numberOfSemesters === 0) {
        alert('Please enter at least one semester\'s SGPA');
        return;
    }

    // Calculate CGPA
    const cgpa = totalSGPA / numberOfSemesters;
    const percentage = calculatePercentage(cgpa);

    // Display results
    const modal = document.getElementById("modal2");
    const cgpaResult = document.getElementById("cgpaResult");
    cgpaResult.innerHTML = `
        <div class="result-container">
            <div class="result-value">${cgpa.toFixed(2)}</div>
            <div class="percentage-value">${percentage.toFixed(2)}%</div>
        </div>
    `;
    modal.style.display = "block";
}

function calculatePercentage(gpa) {
    return gpa * 8.8; // SPPU conversion formula
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function closeModal2() {
    document.getElementById("modal2").style.display = "none";
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    const modal2 = document.getElementById("modal2");
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
}