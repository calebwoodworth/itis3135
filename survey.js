document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        let output = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Your Introduction Page</title></head><body>";
        output += "<h2>Welcome to My Introduction Page!</h2><ul>";

        formData.forEach((value, key) => {
            if (key === "image") {
                const file = form.elements["image"].files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        output += `<li><strong>${key}:</strong> <img src="${e.target.result}" alt="Uploaded Image" style="max-width: 200px;"></li>`;
                        output += "</ul></body></html>";

                        // Open new tab and write the content
                        const newWindow = window.open();
                        newWindow.document.write(output);
                        newWindow.document.close();
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                output += `<li><strong>${key}:</strong> ${value}</li>`;
            }
        });

        output += "</ul></body></html>";

        // Open new tab and write the content (excluding image, since it's loaded asynchronously)
        if (!form.elements["image"].files.length) {
            const newWindow = window.open();
            newWindow.document.write(output);
            newWindow.document.close();
        }
    });

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
