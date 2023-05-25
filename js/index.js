function populateResumeData() {
  const resumeData = JSON.parse(localStorage.getItem("formData"));

  // Populate personal information
  const avatarImg = document.querySelector(".avatar-img");
  if (resumeData.profile_image) {
    avatarImg.src = resumeData.profile_image;
  } else {
    avatarImg.src = "https://www.w3schools.com/w3images/avatar_hat.jpg"; // Default image if no profile image is stored
  }

  // Populate personal information
  document.querySelector(".name").textContent = resumeData.name;
  document.querySelector(".headline").textContent = resumeData.headline;
  document.querySelector(".email").textContent = resumeData.email;
  document.querySelector(".phone").textContent = resumeData.phone;
  document.querySelector(".address").textContent = resumeData.address;
  document.querySelector(".website").textContent = resumeData.website;

  // Populate work experience
  const workExperienceContainer = document.querySelector(".experience-body");
  for (let i = 0; i < resumeData.work_experience.name.length; i++) {
    const workExperienceItem = document.createElement("div");
    workExperienceItem.classList.add("mb-4");

    const companyName = document.createElement("h5");
    companyName.classList.add("fw-bold", "mb-1");
    const companyLink = document.createElement("a");
    companyLink.href = resumeData.work_experience.website[i];
    companyLink.classList.add("text-decoration-none", "experience-website");
    companyLink.textContent = resumeData.work_experience.name[i];
    companyName.appendChild(companyLink);

    const position = document.createElement("p");
    position.classList.add("text-primary");
    position.innerHTML = `<i class="fa fa-calendar me-2 experience-start-date"></i>${resumeData.work_experience.start_date[i]} - ${resumeData.work_experience.end_date[i]}`;

    const summary = document.createElement("p");
    summary.classList.add("experience-summary");
    summary.textContent = resumeData.work_experience.summary[i];

    workExperienceItem.appendChild(companyName);
    workExperienceItem.appendChild(position);
    workExperienceItem.appendChild(summary);

    workExperienceContainer.appendChild(workExperienceItem);
  }

  // Populate skills
  const skillsContainer = document.querySelector(".skills");
  // resumeData.skills is a object

  for (let i = 0; i < resumeData.skills["name"].length; i++) {
    var skillName = resumeData.skills["name"][i];
    var skillLevel = resumeData.skills["level"][i];
    var skill = document.createElement("p");
    skill.textContent = skillName;

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress");
    const progress = document.createElement("div");
    progress.classList.add("progress-bar", "bg-teal");
    progress.style.width = `${skillLevel * 10}%`;
    progress.setAttribute("aria-valuenow", skillLevel * 10);
    progress.setAttribute("aria-valuemin", "0");
    progress.setAttribute("aria-valuemax", "100");
    progress.textContent = `${skillLevel * 10}%`;
    progressBar.appendChild(progress);
    skillsContainer.appendChild(skill);
    skillsContainer.appendChild(progressBar);
  }

  const profileContainer = document.querySelector(".profile");
  const profileNames = resumeData.profile.username;
  const profileWebsites = resumeData.profile.website;
  const socialContainer = document.querySelector(".profile");
  for (let i = 0; i < resumeData.profile.username.length; i++) {
    const socialItem = document.createElement("div");
    socialItem.classList.add("mb-3");

    const socialIcon = document.createElement("i");
    const socialLink = document.createElement("a");

    if (resumeData.profile.network[i].toLowerCase() === "linkedin") {
      socialIcon.classList.add("fa", "fa-linkedin");
    } else if (resumeData.profile.network[i].toLowerCase() === "twitter") {
      socialIcon.classList.add("fa", "fa-twitter");
    } else if (resumeData.profile.network[i].toLowerCase() === "facebook") {
      socialIcon.classList.add("fa", "fa-facebook");
    } else {
      socialIcon.classList.add("fa", "fa-link");
    }

    socialLink.href = resumeData.profile.website[i];
    socialLink.classList.add("text-decoration-none", "m-3");
    socialLink.textContent = resumeData.profile.username[i];

    socialItem.appendChild(socialIcon);
    socialItem.appendChild(socialLink);

    socialContainer.appendChild(socialItem);
  }

  const educationContainer = document.querySelector(".education-body");

  for (let i = 0; i < resumeData.education.institution.length; i++) {
    const educationItem = document.createElement("div");
    educationItem.classList.add("mb-4", "education-body");

    const institutionName = document.createElement("h5");
    institutionName.classList.add("fw-bold", "mb-1");
    institutionName.innerHTML = `
<a href="${resumeData.education.website[i]}" class="text-decoration-none education-website">${resumeData.education.institution[i]}</a>
`;

    const areaOfStudy = document.createElement("span");
    areaOfStudy.classList.add("area-of-study");
    areaOfStudy.textContent = resumeData.education.area_of_study[i];

    const educationDates = document.createElement("p");
    educationDates.classList.add("text-primary");
    educationDates.innerHTML = `
<i class="fa fa-calendar me-2 education-dates"></i>${resumeData.education.start_date[i]} - ${resumeData.education.end_date[i]}
`;

    const educationDegree = document.createElement("p");
    educationDegree.classList.add("education-degree");
    educationDegree.textContent = resumeData.education.degree[i];

    educationItem.appendChild(institutionName);
    educationItem.appendChild(areaOfStudy);
    educationItem.appendChild(educationDates);
    educationItem.appendChild(educationDegree);

    educationContainer.appendChild(educationItem);
  }

  const projectBody = document.querySelector(".project-body");
  for (let i = 0; i < resumeData.project.name.length; i++) {
    const projectName = resumeData.project.name[i];
    const projectDescription = resumeData.project.description[i];
    const projectStartDate = resumeData.project.start_date[i];
    const projectEndDate = resumeData.project.end_date[i];
    const projectWebsite = resumeData.project.website[i];
    const projectSummary = resumeData.project.summary[i];

    const projectElement = document.createElement("div");
    projectElement.classList.add("project");

    const projectTitle = document.createElement("h4");
    projectTitle.classList.add("project-title", "text-primary"); // Add 'text-primary' class
    projectTitle.textContent = projectName;
    projectElement.appendChild(projectTitle);

    const projectInfo = document.createElement("p");
    projectInfo.classList.add("project-info");
    projectInfo.innerHTML = `<strong>Description:</strong> ${projectDescription}<br>
                       <strong>Start Date:</strong> ${projectStartDate}<br>
                       <strong>End Date:</strong> ${projectEndDate}<br>
                       <strong>Website:</strong> <a href="${projectWebsite}" target="_blank">${projectWebsite}</a><br>
                       <strong>Summary:</strong> ${projectSummary}`;
    projectElement.appendChild(projectInfo);

    projectBody.appendChild(projectElement);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.querySelector("form");

  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the form data
    const formData = new FormData(form);

    // Create an empty object to store the form values
    const formValues = {};

    // Iterate over the form data and store the values in the object
    for (let [key, value] of formData.entries()) {
      const nestedKeys = key.split(".");
      const topLevelKey = nestedKeys[0];

      if (nestedKeys.length > 1) {
        // Handle nested data
        if (formValues[topLevelKey] === undefined) {
          formValues[topLevelKey] = {};
        }

        const nestedObject = formValues[topLevelKey];
        const nestedKey = nestedKeys.slice(1);

        let currentObject = nestedObject;
        for (let i = 0; i < nestedKey.length; i++) {
          const currentKey = nestedKey[i];
          if (currentObject[currentKey] === undefined) {
            currentObject[currentKey] = i === nestedKey.length - 1 ? [] : {};
          }
          if (i === nestedKey.length - 1) {
            if (Array.isArray(currentObject[currentKey])) {
              currentObject[currentKey].push(value);
            } else {
              currentObject[currentKey] = [value];
            }
          }
          currentObject = currentObject[currentKey];
        }
      } else if (key === "profile_image") {
        // Get the profile image file
        const file = formData.get("profile_image");
        if (file) {
          // Read the file and store it in the form values object
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            formValues[topLevelKey] = reader.result;

            // Convert the form values object to JSON string
            const jsonData = JSON.stringify(formValues);

            // Store the JSON data in the local storage
            localStorage.setItem("formData", jsonData);

            // Optionally, you can also display a success message or perform other actions

            // Reset the form
            form.reset();
          };
        }
      } else {
        // Handle other form data
        formValues[key] = value;
      }
    }
    window.location.href = "resume.html";
  });

  // Add item event handler
  var addButtons = document.querySelectorAll(".add-item");
  addButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      var cloneBox = this.closest(".clone-box");
      var cloneItems = cloneBox.getElementsByClassName("clone-item");
      var lastCloneItem = cloneItems[cloneItems.length - 1];
      var newItem = lastCloneItem.cloneNode(true);

      cloneBox.insertBefore(newItem, this);
    });
  });

  // Remove item event handler
  var removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      var cloneBox = this.closest(".clone-box");
      var cloneItems = cloneBox.getElementsByClassName("clone-item");

      if (cloneItems.length > 1) {
        cloneItems[cloneItems.length - 1].remove();
      }
    });
  });
});
