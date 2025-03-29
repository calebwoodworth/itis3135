document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");
    const resultContainer = document.getElementById("resultContainer");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevents form from reloading the page
        
        const formData = new FormData(form);
        let output = "<h3>Submitted Information</h3><ul>";
        
        // Process each field in the form
        formData.forEach((value, key) => {
            if (key === "image") {
                const file = form.elements["image"].files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        output += `<li><strong>${key}:</strong> <img src="${e.target.result}" alt="Uploaded Image" style="max-width: 200px;"></li>`;
                        resultContainer.innerHTML = output;
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                output += `<li><strong>${key}:</strong> ${value}</li>`;
            }
        });
        
        output += "</ul>";
        resultContainer.innerHTML = output;
    });
    
    // Add a new course input field dynamically
    window.addCourse = function () {
        const coursesContainer = document.getElementById("coursesContainer");
        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.name = "courses";
        newInput.placeholder = "New Course";
        newInput.required = true;
        coursesContainer.insertBefore(newInput, coursesContainer.lastElementChild);
    };
});
