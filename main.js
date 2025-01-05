const $addEventBtn = document.querySelector(".add-event-btn");
const $backdrop = document.getElementById("backdrop");
const $scheduler = document.getElementById("scheduler");
const $schedulerForm = document.querySelector(".scheduler-form");
const $schedulerTime = document.getElementById("scheduler-time");
const $schedulerDay = document.getElementById("scheduler-day");
const $schedulerEvent = document.getElementById("scheduler-event");
const $schedulerCancelBtn = document.querySelector(".scheduler-cancel-btn");
const $schedulerConfirmBtn = document.querySelector(".scheduler-confirm-btn");
const $editor = document.getElementById("editor");
const $editorForm = document.querySelector(".editor-form");
const $editorTime = document.getElementById("editor-time");
const $editorDay = document.getElementById("editor-day");
const $editorEvent = document.getElementById("editor-event");
const $editorCancelBtn = document.querySelector(".editor-cancel-btn");
const $editorConfirmBtn = document.querySelector(".editor-confirm-btn");
const $eventTableTBody = document.querySelector(".event-table > tbody");
const $dayOfWeek = document.querySelector(".day-of-week");
const $deleteWarning = document.getElementById("delete-warning");
const $deleteWarningCancel = document.querySelector(
	".delete-warning-cancel-btn"
);
const $deleteWarningConfirm = document.querySelector(
	".delete-warning-confirm-btn"
);
let $eventTarget = {};

// Initializes events object and adds events
const events = { monday: [] };
events.monday.push({ event: "Dog Park 1", time: "1200" });
events["tuesday"] = [];
events.tuesday.push({ event: "Dog Park 2", time: "1200" });

// Populates list of times in the $scheduler
function populateTimesList() {
	for (let i = 0; i < 24; i++) {
		// Ensures two-digit hours
		const hr = i.toString().padStart(2, "0");

		// Adds times that are on the hour to scheduler
		const onHourScheduler = document.createElement("option");
		onHourScheduler.value = `${hr}00`;
		onHourScheduler.text = `${hr}00`;
		$schedulerTime.appendChild(onHourScheduler);

		// Adds times that are on the half hour to scheduler
		const onHalfHourScheduler = document.createElement("option");
		onHalfHourScheduler.value = `${hr}30`;
		onHalfHourScheduler.text = `${hr}30`;
		$schedulerTime.appendChild(onHalfHourScheduler);

		// Adds times that are on the hour to editor
		const onHourEditor = document.createElement("option");
		onHourEditor.value = `${hr}00`;
		onHourEditor.text = `${hr}00`;
		$editorTime.appendChild(onHourEditor);

		// Adds times that are on the half hour to editor
		const onHalfHourEditor = document.createElement("option");
		onHalfHourEditor.value = `${hr}30`;
		onHalfHourEditor.text = `${hr}30`;
		$editorTime.appendChild(onHalfHourEditor);
	}
}

// Populates the table with events, then with empty rows
function populateTable() {
	// Resets the table by removing existing rows
	$eventTableTBody.innerHTML = "";
	const day = $dayOfWeek.value;
	let eventCounter = 0;

	// Checks for existence of event
	if (events[day]) {
		// Loops through events of specified day
		for (const event of events[day]) {
			// Creates new row with events
			const row = document.createElement("tr");

			// Creates the time cell
			const eventTableTime = document.createElement("td");
			eventTableTime.className = "event-table-time";
			eventTableTime.textContent = event.time;
			row.appendChild(eventTableTime);

			// Creates the event cell
			const eventTableEvent = document.createElement("td");
			eventTableEvent.className = "event-table-event";
			eventTableEvent.textContent = event.event;
			row.appendChild(eventTableEvent);

			// Creates the actions cell
			const eventTableActions = document.createElement("td");
			eventTableActions.className = "event-table-actions flex";

			// Creates the edit button for actions cell
			const eventTableEdit = document.createElement("button");
			eventTableEdit.className = "event-table-edit-btn flex";
			eventTableEdit.type = "button";
			eventTableEdit.textContent = "Edit";
			eventTableActions.appendChild(eventTableEdit);

			// Creates the delete button for actions cell
			const eventTableDelete = document.createElement("button");
			eventTableDelete.className = "event-table-delete-btn flex";
			eventTableDelete.type = "button";
			eventTableDelete.textContent = "Delete";

			// Adds the buttons to the table
			eventTableActions.appendChild(eventTableDelete);
			row.appendChild(eventTableActions);
			$eventTableTBody.appendChild(row);

			eventCounter++;
		}

		// Populates the rest of the table with empty rows
		if (eventCounter < 10) {
			for (let i = eventCounter; i < 10; i++) {
				const row = document.createElement("tr");
				for (let j = 0; j < 3; j++) {
					const cell = document.createElement("td");
					row.appendChild(cell);
				}
				$eventTableTBody.appendChild(row);
				eventCounter++;
			}
		}
	}
}

// Opens scheduler modal
function openScheduler() {
	$scheduler.showModal();
	$backdrop.style.display = "block";
}

// Closes scheduler modal
function closeScheduler() {
	$scheduler.close();
	$backdrop.style.display = "none";
	$schedulerForm.reset();
}

// Adds an event to the events object
function confirmAddEvent() {
	const day = $schedulerDay.value;

	// Initializes events item if it does not exist
	!events[day] ? (events[day] = []) : null;

	// Adds the event to the events object
	events[day].push({
		time: $schedulerTime.value,
		event: $schedulerEvent.value,
	});

	// Resets the environment for next use
	populateTable();
	closeScheduler();
}

// Opens editor modal
function openEditor() {
	$editor.showModal();
	$backdrop.style.display = "block";
}

// Closes editor modal
function closeEditor() {
	$editor.close();
	$backdrop.style.display = "none";
	$editorForm.reset();
}

// Edits an event to the events object
function confirmEditEvent() {
	// Deletes the current event entry in events object
	deleteEvent();

	const day = $editorDay.value;

	// Initializes events item if it does not exist
	!events[day] ? (events[day] = []) : null;

	// Adds the event to the events object
	events[day].push({
		time: $editorTime.value,
		event: $editorEvent.value,
	});

	// Resets the environment for next use
	populateTable();
	closeEditor();
}

// Opens delete warning modal
function openDeleteWarning() {
	$deleteWarning.style.display = "block";
	$backdrop.style.display = "block";
}

// Closes delete warming modal
function closeDeleteWarning() {
	$deleteWarning.style.display = "none";
	$backdrop.style.display = "none";
}

function deleteEvent() {
	// Obtain data of event to delete
	const dayToDelete = $dayOfWeek.value;
	const timeToDelete =
		$eventTarget.parentNode.parentNode.childNodes[0].textContent;
	for (let i = 0; i < events[dayToDelete].length; i++) {
		if (events[dayToDelete][i]["time"] === timeToDelete) {
			events[dayToDelete].splice(i, 1);
			$eventTarget = {};
			break;
		}
	}
	// Resets the environment for next use
	populateTable();
	closeDeleteWarning();
}

// Sets up the environment for use
populateTimesList();
populateTable();

// Allows users to add an event
$addEventBtn.addEventListener("click", openScheduler);
$schedulerCancelBtn.addEventListener("click", closeScheduler);
$schedulerConfirmBtn.addEventListener("click", confirmAddEvent);

// Allows users to edit an event
$eventTableTBody.addEventListener("click", () => {
	if (event.target.classList.contains("event-table-edit-btn")) {
		// Matches the editor event details with the data from the table
		$editorDay.value = $dayOfWeek.value;
		$eventTarget = event.target;
		$editorTime.value =
			$eventTarget.parentNode.parentNode.childNodes[0].textContent;
		$editorEvent.value =
			$eventTarget.parentNode.parentNode.childNodes[1].textContent;
		openEditor();
	}
});
$editorCancelBtn.addEventListener("click", closeEditor);
$editorConfirmBtn.addEventListener("click", confirmEditEvent);

// Allows users to delete an event
$eventTableTBody.addEventListener("click", () => {
	// Opens delete warning modal if the clicked element is a delete button
	if (event.target.classList.contains("event-table-delete-btn")) {
		// Bookmarks the delete button for later use
		$eventTarget = event.target;
		openDeleteWarning();
	}
});
$deleteWarningCancel.addEventListener("click", closeDeleteWarning);
$deleteWarningConfirm.addEventListener("click", deleteEvent);
