document
	.getElementById("issueInputForm")
	.addEventListener("submit", submitIssue);

  // Submit:
function submitIssue(e) {
	const getInputValue = (id) => document.getElementById(id).value;
	const description = getInputValue("issueDescription");
	const severity = getInputValue("issueSeverity");
	const assignedTo = getInputValue("issueAssignedTo");
	const id = Math.floor(Math.random() * 100000000) + "";
	const status = "Open";

	const issue = { id, description, severity, assignedTo, status };
	let issues = [];
	if (localStorage.getItem("issues")) {
		issues = JSON.parse(localStorage.getItem("issues"));
	}
	issues.push(issue);
	localStorage.setItem("issues", JSON.stringify(issues));

	document.getElementById("issueInputForm").reset();
	fetchIssues();
	e.preventDefault();
}

// closed Function:
const setStatusClosed = (id) => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const currentIssue = issues.find((issue) => issue.id == id);
	currentIssue.status = "Closed";
	localStorage.setItem("issues", JSON.stringify(issues));
	fetchIssues();
};


// Delete Function:
const deleteIssue = (id) => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const remainingIssues = issues.filter((issue) => issue.id != id);

	localStorage.setItem("issues", JSON.stringify(remainingIssues));
	location.reload();
};

// fetch:

const fetchIssues = () => {
	const issues = JSON.parse(localStorage.getItem("issues"));
	const issuesList = document.getElementById("issuesList");
	issuesList.innerHTML = "";

	for (var i = 0; i < issues.length; i++) {
		const { id, description, severity, assignedTo, status } = issues[
			i
		];

		issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
	}
	openList();
};

// OpenList Function:
let openList = () => {
	let show = document.getElementById("issuesList").childElementCount;
	document.getElementById("TrackerCount").innerText = show;

 
	let potStatus = document.getElementsByClassName("label label-info");

	if (potStatus.length > 0) {
		document.getElementById("description").style.display = "block";
		openCount = 0;
		closeCount = 0;

		for (let i = 0; i < potStatus.length; i++) {
			const element = potStatus[i].innerText;
			if (element == "Open") {
				openCount = openCount + 1;
			} else if (element == "Closed") {
				closeCount = closeCount + 1;
			}
		}

		document.getElementById("open").innerText = openCount;
		document.getElementById("closed").innerText = closeCount;
	} else {
		document.getElementById("description").style.display = "none";
	}
};
