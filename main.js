const $addEventBtn = document.querySelector(".add-event-btn");
const $backdrop = document.getElementById("backdrop");
const $scheduler = document.getElementById("scheduler");
const $schedulerForm = document.querySelector(".scheduler-form");
const $schedulerTime = document.getElementById("scheduler-time");
const $schedulerDay = document.getElementById("scheduler-day");
const $schedulerEvent = document.getElementById("scheduler-event");
const $schedulerCancelBtn = document.querySelector(".scheduler-cancel-btn");
const $schedulerConfirmBtn = document.querySelector(".scheduler-confirm-btn");
const $eventTableTBody = document.querySelector(".event-table > tbody");
let $eventTableDeleteBtn = {};
const $dayOfWeek = document.querySelector(".day-of-week");
const $deleteWarning = document.getElementById("delete-warning");
const $deleteWarningCancel = document.querySelector(
	".delete-warning-cancel-btn"
);
const $deleteWarningConfirm = document.querySelector(
	".delete-warning-confirm-btn"
);

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

		// Adds times that are on the hour
		const onHour = document.createElement("option");
		onHour.value = `${hr}00`;
		onHour.text = `${hr}00`;
		$schedulerTime.appendChild(onHour);

		// Adds times that are on the half hour
		const onHalfHour = document.createElement("option");
		onHalfHour.value = `${hr}30`;
		onHalfHour.text = `${hr}30`;
		$schedulerTime.appendChild(onHalfHour);
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

// Adds an event to the events object
function confirmEvent() {
	const day = $schedulerDay.value;

	// Initializes events item if it does not exist
	!events[day] ? (events[day] = []) : null;

	// Adds the event to the events object
	events[day].push({
		time: $schedulerTime.value,
		event: $schedulerEvent.value,
	});

	populateTable();
	closeScheduler();
}

function deleteEvent() {
	// Obtain data of event to delete
	const dayToDelete = $dayOfWeek.value;
	const timeToDelete =
		$eventTableDeleteBtn.parentNode.parentNode.childNodes[0].textContent;
	for (let i = 0; i < events[dayToDelete].length; i++) {
		if (events[dayToDelete][i]["time"] === timeToDelete) {
			events[dayToDelete].splice(i, 1);
			break;
		}
	}
	populateTable();
	closeDeleteWarning();
}

// Starts up setup
populateTimesList();
populateTable();

$addEventBtn.addEventListener("click", openScheduler);
$schedulerCancelBtn.addEventListener("click", closeScheduler);
$schedulerConfirmBtn.addEventListener("click", confirmEvent);
$eventTableTBody.addEventListener("click", () => {
	// Opens delete warning modal if the clicked element is a delete button
	if (event.target.classList.contains("event-table-delete-btn")) {
		// Bookmarks the delete button for later use
		$eventTableDeleteBtn = event.target;
		openDeleteWarning();
	}
});
$deleteWarningCancel.addEventListener("click", closeDeleteWarning);
$deleteWarningConfirm.addEventListener("click", deleteEvent);
