document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("introForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        let name = formData.get("name") || "Your Name";
        let mascot = formData.get("mascot") || "Your Mascot";
        let caption = formData.get("caption") || "";
        let personalBackground = formData.get("personalBackground") || "";
        let professionalBackground = formData.get("professionalBackground") || "";
        let academicBackground = formData.get("academicBackground") || "";
        let webDevBackground = formData.get("webDevBackground") || "";
        let computerPlatform = formData.get("computerPlatform") || "";
        let courses = formData.getAll("courses").join(", ") || "No courses listed";
        let funnyThing = formData.get("funnyThing") || "";
        let anythingElse = formData.get("anythingElse") || "";

        let output = `
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>About Me - ${name}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; text-align: center; }
                nav { background-color: #333; padding: 10px; }
                nav a { color: white; text-decoration: none; margin: 0 15px; font-size: 18px; }
                nav a:hover { text-decoration: underline; }
                .container { max-width: 800px; margin: 20px auto; text-align: left; padding: 20px; }
                img { max-width: 200px; border-radius: 10px; }
                h2 { color: #0275d8; }
                ul { list-style: none; padding: 0; }
                li { margin: 10px 0; }
            </style>
        </head>
        <body>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Projects</a>
                <a href="#">Contact</a>
            </nav>

            <div class="container">
                <h2>About ${name}</h2>
                <p><strong>Mascot:</strong> ${mascot}</p>
        `;

        // Handle Image Upload
        const file = form.elements["image"].files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                output += `<img src="${e.target.result}" alt="Uploaded Image"><p><strong>Caption:</strong> ${caption}</p>`;
                finalizePage(output);
            };
            reader.readAsDataURL(file);
        } else {
            finalizePage(output);
        }

        function finalizePage(content) {
            content += `
                <h3>Background</h3>
                <ul>
                    <li><strong>Personal:</strong> ${personalBackground}</li>
                    <li><strong>Professional:</strong> ${professionalBackground}</li>
                    <li><strong>Academic:</strong> ${academicBackground}</li>
                    <li><strong>Web Dev Experience:</strong> ${webDevBackground}</li>
                    <li><strong>Primary Computer:</strong> ${computerPlatform}</li>
                </ul>

                <h3>Courses I'm Taking</h3>
                <p>${courses}</p>

                <h3>Fun Facts</h3>
                <ul>
                    <li><strong>Funny Thing:</strong> ${funnyThing}</li>
                    <li><strong>Anything Else:</strong> ${anythingElse}</li>
                </ul>
            </div>
        </body>
        </html>`;

            const newWindow = window.open();
            newWindow.document.write(content);
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
