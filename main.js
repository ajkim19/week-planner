// Query DOM for utilized elements
const addEventBtn = document.querySelector(".add-event-btn");
if (!addEventBtn) throw new Error("addEventBtn does not exist");
const backdrop = document.getElementById("backdrop");
if (!backdrop) throw new Error("backdrop does not exist");
const scheduler = document.getElementById("scheduler");
if (!scheduler) throw new Error("scheduler does not exist");
const schedulerForm = document.querySelector(".scheduler-form");
if (!schedulerForm) throw new Error("schedulerForm does not exist");
const schedulerTime = document.getElementById("scheduler-time");
if (!schedulerTime) throw new Error("schedulerTime does not exist");
const schedulerDay = document.getElementById("scheduler-day");
if (!schedulerDay) throw new Error("schedulerDay does not exist");
const schedulerEvent = document.getElementById("scheduler-event");
if (!schedulerEvent) throw new Error("schedulerEvent does not exist");
const schedulerCancelBtn = document.querySelector(".scheduler-cancel-btn");
if (!schedulerCancelBtn) throw new Error("schedulerCancelBtn does not exist");
const schedulerConfirmBtn = document.querySelector(".scheduler-confirm-btn");
if (!schedulerConfirmBtn) throw new Error("schedulerConfirmBtn does not exist");
const eventTableTBody = document.querySelector(".event-table > tbody");
if (!eventTableTBody) throw new Error("eventTableTBody does not exist");
const dayOfWeek = document.querySelector(".day-of-week");
if (!dayOfWeek) throw new Error("dayOfWeek does not exist");

// Initializes events object and adds first entry
const events = { monday: [] };
events.monday.push({ event: "Dog Park", time: "1200" });

// Populates list of times in the scheduler
function populateTimesList() {
	for (let i = 0; i < 24; i++) {
		// Ensures two-digit hours
		const hr = i.toString().padStart(2, "0");

		// Adds times that are on the hour
		const onHour = document.createElement("option");
		onHour.value = `${hr}00`;
		onHour.text = `${hr}00`;
		schedulerTime.appendChild(onHour);

		// Adds times that are on the half hour
		const onHalfHour = document.createElement("option");
		onHalfHour.value = `${hr}30`;
		onHalfHour.text = `${hr}30`;
		schedulerTime.appendChild(onHalfHour);
	}
}

// Populates the table with event entries, then with empty rows
function populateTable() {
	// Resets the table by removing existing rows
	eventTableTBody.innerHTML = "";
	const day = dayOfWeek.value;
	let eventCounter = 0;

	// Checks for existence of entries
	if (events[day]) {
		// Loops through events of specified day
		for (const event of events[day]) {
			// Creates new row with event entries
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
			eventTableTBody.appendChild(row);

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
				eventTableTBody.appendChild(row);
				eventCounter++;
			}
		}
	}
}

// Opens scheduler modal
function openScheduler() {
	scheduler.style.display = "block";
	backdrop.style.display = "block";
}

// Closes scheduler modal
function closeScheduler() {
	scheduler.style.display = "none";
	backdrop.style.display = "none";
	schedulerForm.reset();
}

function confirmEvent() {
	// event.preventDefault();
	const day = schedulerDay.value;
	if (!events[day]) {
		events[day] = [];
	}
	events[day].push({
		time: schedulerTime.value,
		event: schedulerEvent.value,
	});
	populateTable();
	closeScheduler();
}

// Startup Setup
populateTimesList();
populateTable();

// Event Listeners
addEventBtn.addEventListener("click", openScheduler);
schedulerCancelBtn.addEventListener("click", closeScheduler);
schedulerConfirmBtn.addEventListener("click", confirmEvent);
