document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");
    const resultContainer = document.getElementById("resultContainer");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevents form from reloading the page
        
        const formData = new FormData(form);
        let output = "<h2>About Me</h2>";
        
        // Start of the navbar
        output += `
        <nav>
            <a href="#name">Home</a>
            <a href="#background">Background</a>
            <a href="#courses">Courses</a>
            <a href="#funny">Funny</a>
        </nav>
        <hr>`;
        
        // Process each field in the form
        formData.forEach((value, key) => {
            if (key === "image") {
                const file = form.elements["image"].files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        output += `
                        <div id="imageContainer">
                            <img src="${e.target.result}" alt="Uploaded Image">
                            <p><strong>Image Caption:</strong> ${formData.get("caption")}</p>
                        </div>`;
                        resultContainer.innerHTML = output;
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                output += `<div><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</div>`;
            }
        });
        
        output += "</div>";
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
