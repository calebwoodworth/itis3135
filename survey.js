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
        let imageData = '';  // Will hold image HTML if uploaded
        formData.forEach((value, key) => {
            if (key === "image") {
                const file = form.elements["image"].files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        imageData = `
                            <div id="imageContainer">
                                <img src="${e.target.result}" alt="Uploaded Image">
                                <p><strong>Image Caption:</strong> ${formData.get("caption")}</p>
                            </div>`;
                        // Once the image is loaded, call this function to update the page
                        updatePage();
                    };
                    reader.readAsDataURL(file);
                }
            } else if (key !== "image" && key !== "agree") {
                output += `<div><strong>${capitalizeFirstLetter(key)}:</strong> ${value}</div>`;
            }
        });

        // Add courses dynamically
        const courses = formData.getAll('courses');
        output += "<div id='courses'><strong>Courses Currently Taking:</strong><ul>";
        courses.forEach(course => {
            output += `<li>${course}</li>`;
        });
        output += "</ul></div>";

        // Add funny thing and anything else section
        output += `
        <div id="funny">
            <strong>Funny Thing:</strong> ${formData.get("funnyThing")}
        </div>
        <div id="anythingElse">
            <strong>Anything Else?</strong> ${formData.get("anythingElse")}
        </div>`;

        // Update the page with the result and image
        function updatePage() {
            resultContainer.innerHTML = output + imageData;
        }
        
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

    // Helper function to capitalize first letter of each field name
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
    }
});
