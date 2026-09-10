const templates = [];

const nameInput = document.getElementById("template-name");
const bodyInput = document.getElementById("template-body");
const saveButton = document.getElementById("save-template");
const templatesList = document.getElementById("templates-list");

function renderTemplates() {
  templatesList.innerHTML = "";

  if (templates.length === 0) {
    templatesList.innerHTML = '<p class="empty-message">No templates yet. Create your first one above!</p>';
    return;
  }

  templates.forEach(function (template, index) {
    const card = document.createElement("div");
    card.className = "template-card";

    card.innerHTML = `
      <h3>${template.name}</h3>
      <p>${template.body}</p>
      <div class="template-actions">
        <button class="copy-btn" data-index="${index}">Copy</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;

    templatesList.appendChild(card);
  });
}

function saveTemplate() {
  const name = nameInput.value;
  const body = bodyInput.value;

  if (name.trim() === "" || body.trim() === "") {
    alert("Please fill out both the template name and body.");
    return;
  }

  const newTemplate = {
    name: name,
    body: body
  };

  templates.push(newTemplate);

  nameInput.value = "";
  bodyInput.value = "";

  renderTemplates();
}

function handleTemplateAction(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("copy-btn")) {
    const index = clickedElement.getAttribute("data-index");
    const template = templates[index];

    navigator.clipboard.writeText(template.body);

    clickedElement.textContent = "Copied!";
    setTimeout(function () {
      clickedElement.textContent = "Copy";
    }, 1500);
  }

  if (clickedElement.classList.contains("delete-btn")) {
    const index = clickedElement.getAttribute("data-index");
    templates.splice(index, 1);
    renderTemplates();
  }
}

saveButton.addEventListener("click", saveTemplate);
templatesList.addEventListener("click", handleTemplateAction);
renderTemplates();
