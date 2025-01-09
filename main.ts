interface EventData {
	event: string;
	time: string;
	verification: string;
}

const $addEventBtn = document.querySelector(
	".add-event-btn"
) as HTMLButtonElement;
if (!$addEventBtn) throw new Error("$addEventBtn does not exist");
const $backdrop = document.getElementById("backdrop") as HTMLDivElement;
if (!$backdrop) throw new Error("$backdrop does not exist");
const $scheduler = document.getElementById("scheduler") as HTMLDialogElement;
if (!$scheduler) throw new Error("$scheduler does not exist");
const $schedulerForm = document.querySelector(
	".scheduler-form"
) as HTMLFormElement;
if (!$schedulerForm) throw new Error("$schedulerForm does not exist");
const $schedulerTime = document.getElementById(
	"scheduler-time"
) as HTMLSelectElement;
if (!$schedulerTime) throw new Error("$schedulerTime does not exist");
const $schedulerDay = document.getElementById(
	"scheduler-day"
) as HTMLSelectElement;
if (!$schedulerDay) throw new Error("$schedulerDay does not exist");
const $schedulerEvent = document.getElementById(
	"scheduler-event"
) as HTMLInputElement;
if (!$schedulerEvent) throw new Error("$schedulerEvent does not exist");
const $schedulerCancelBtn = document.querySelector(
	".scheduler-cancel-btn"
) as HTMLButtonElement;
if (!$schedulerCancelBtn) throw new Error("$schedulerCancelBtn does not exist");
const $schedulerConfirmBtn = document.querySelector(
	".scheduler-confirm-btn"
) as HTMLButtonElement;
if (!$schedulerConfirmBtn)
	throw new Error("$schedulerConfirmBtn does not exist");
const $editor = document.getElementById("editor") as HTMLDialogElement;
if (!$editor) throw new Error("$editor does not exist");
const $editorForm = document.querySelector(".editor-form") as HTMLFormElement;
if (!$editorForm) throw new Error("$editorForm does not exist");
const $editorTime = document.getElementById("editor-time") as HTMLSelectElement;
if (!$editorTime) throw new Error("$editorTime does not exist");
const $editorDay = document.getElementById("editor-day") as HTMLSelectElement;
if (!$editorDay) throw new Error("$editorDay does not exist");
const $editorEvent = document.getElementById(
	"editor-event"
) as HTMLInputElement;
if (!$editorEvent) throw new Error("$editorEvent does not exist");
const $editorCancelBtn = document.querySelector(
	".editor-cancel-btn"
) as HTMLButtonElement;
if (!$editorCancelBtn) throw new Error("$editorCancelBtn does not exist");
const $editorConfirmBtn = document.querySelector(
	".editor-confirm-btn"
) as HTMLButtonElement;
if (!$editorConfirmBtn) throw new Error("$editorConfirmBtn does not exist");
const $eventTableTBody = document.querySelector(
	".event-table > tbody"
) as HTMLTableSectionElement;
if (!$eventTableTBody) throw new Error("$eventTableTBody does not exist");
const $dayOfWeek = document.querySelector(".day-of-week") as HTMLInputElement;
if (!$dayOfWeek) throw new Error("$dayOfWeek does not exist");
const $deleteWarning = document.getElementById(
	"delete-warning"
) as HTMLDialogElement;
if (!$deleteWarning) throw new Error("$deleteWarning does not exist");
const $deleteWarningCancel = document.querySelector(
	".delete-warning-cancel-btn"
) as HTMLButtonElement;
if (!$deleteWarningCancel)
	throw new Error("$deleteWarningCancel does not exist");
const $deleteWarningConfirm = document.querySelector(
	".delete-warning-confirm-btn"
) as HTMLButtonElement;
if (!$deleteWarningConfirm)
	throw new Error("$deleteWarningConfirm does not exist");
let $eventTarget: EventTarget | null = null;
let day: string = "";
let verificationNumString = "";

// Initializes events object and adds events
const events: { [key: string]: EventData[] } = { monday: [] };
events.monday.push({
	event: "Dog Park 1",
	time: "1200",
	verification: "0000000000001",
});
events.monday.push({
	event: "Dog Park 2",
	time: "1600",
	verification: "0000000000002",
});
events.monday.push({
	event: "Dog Park 3",
	time: "0300",
	verification: "0000000000003",
});
events["tuesday"] = [];
events.tuesday.push({
	event: "Dog Park 4",
	time: "1200",
	verification: "0000000000004",
});

// Populates list of times in the $scheduler
function populateTimesList(): void {
	for (let i = 0; i < 24; i++) {
		// Ensures two-digit hours
		const hr = i < 10 ? "0" + i : i.toString();

		// Adds times that are on the hour to scheduler
		const onHourScheduler = document.createElement("option");
		onHourScheduler.value = `${hr}00`;
		onHourScheduler.text = `${hr}00`;
		if (!!$schedulerTime) {
			$schedulerTime.appendChild(onHourScheduler);
		}
		// Adds times that are on the half hour to scheduler
		const onHalfHourScheduler = document.createElement("option");
		onHalfHourScheduler.value = `${hr}30`;
		onHalfHourScheduler.text = `${hr}30`;
		if (!!$schedulerTime) {
			$schedulerTime.appendChild(onHalfHourScheduler);
		}
		// Adds times that are on the hour to editor
		const onHourEditor = document.createElement("option");
		onHourEditor.value = `${hr}00`;
		onHourEditor.text = `${hr}00`;
		if (!!$editorTime) {
			$editorTime.appendChild(onHourEditor);
		}
		// Adds times that are on the half hour to editor
		const onHalfHourEditor = document.createElement("option");
		onHalfHourEditor.value = `${hr}30`;
		onHalfHourEditor.text = `${hr}30`;
		if (!!$editorTime) {
			$editorTime.appendChild(onHalfHourEditor);
		}
	}
}

// Populates the table with events, then with empty rows
function populateTable(): void {
	// Resets the table by removing existing rows
	if (!!$eventTableTBody && !!$dayOfWeek) {
		$eventTableTBody.innerHTML = "";
		$dayOfWeek as HTMLInputElement;
		day = $dayOfWeek.value;
		let eventCounter = 0;

		// Checks for existence of event
		if (events[day]) {
			events[day].sort((a, b) => a.time.localeCompare(b.time));
			// Loops through events of specified day
			for (const event of events[day]) {
				// Creates new row with events
				const row = document.createElement("tr");

				// Creates the time cell
				const eventTableTime = document.createElement("td");
				eventTableTime.className = "event-table-time";
				eventTableTime.textContent = event.time;
				row.appendChild(eventTableTime);

				// Creates a hidden verification number div within time cell
				const eventTableVerification = document.createElement("div");
				eventTableVerification.id = "event-table-verification";
				eventTableVerification.textContent = event.verification;
				eventTableTime.appendChild(eventTableVerification);

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
function openScheduler(): void {
	$scheduler.showModal();
	$backdrop.style.display = "block";
}

// Closes scheduler modal
function closeScheduler(): void {
	$scheduler.close();
	$backdrop.style.display = "none";
	$schedulerForm.reset();
}

// Adds an event to the events object
function confirmAddEvent(): void {
	const day = $schedulerDay.value;

	// Initializes events item if it does not exist
	!events[day] ? (events[day] = []) : null;

	// Adds the event to the events object
	if (
		!!$schedulerTime.value &&
		!!$schedulerDay.value &&
		!!$schedulerEvent.value
	) {
		events[day].push({
			time: $schedulerTime.value,
			event: $schedulerEvent.value,
			verification: String(Date.now()),
		});

		// Stores data locally as a JSON
		const eventsJSON = JSON.stringify(events);
		localStorage.setItem("events-storage", eventsJSON);
	}
	// Resets the environment for next use
	populateTable();
	closeScheduler();
}

// Opens editor modal
function openEditor(event: Event): void {
	// Grabs the data to be edited
	const $eventTarget = event.target as HTMLElement;
	if (!$eventTarget) throw new Error("$eventTarget does not exist");
	const $targetRow = $eventTarget.closest("tr");
	if (!$targetRow) throw new Error("$targetRow does not exist");
	const $eventTimeCell = $targetRow.querySelector(".event-table-time");
	if (!$eventTimeCell) throw new Error("$eventTimeCell does not exist");
	const $eventTime = $targetRow.querySelector(".event-table-time")?.textContent;
	if (!$eventTime) throw new Error("$eventTime does not exist");
	const $eventDay = $targetRow.querySelector(".event-table-day")?.textContent;
	if (!$eventDay) throw new Error("$eventDay does not exist");
	const $eventEvent =
		$targetRow.querySelector(".event-table-event")?.textContent;
	if (!$eventEvent) throw new Error("$eventEvent does not exist");
	const $eventVerification = $eventTimeCell.querySelector(
		"#event-table-verification"
	)?.textContent;
	if (!$eventVerification) throw new Error("$eventVerification does not exist");

	// Populates the editor
	$editorDay.value = $eventDay;
	verificationNumString = $eventVerification;
	$editorEvent.value = $eventEvent;

	// Displays the editor modal
	$editor.showModal();
	$backdrop.style.display = "block";
}

// Closes editor modal
function closeEditor(): void {
	$editor.close();
	$backdrop.style.display = "none";
	$editorForm.reset();
}

// Edits an event to the events object
function confirmEditEvent(): void {
	// Deletes the current event entry in events object
	deleteEvent();

	// Adds the event to the events object
	const day = $editorDay.value;
	!events[day] ? (events[day] = []) : null;
	events[day].push({
		time: $editorTime.value,
		event: $editorEvent.value,
		verification: verificationNumString,
	});

	// Resets environment for next use
	populateTable();
	closeEditor();
}

// Opens delete warning modal
function openDeleteWarning(event: Event): void {
	const $eventTarget = event.target as HTMLElement;
	if (!$eventTarget) throw new Error("$eventTarget does not exist");
	const $targetRow = $eventTarget.closest("tr");
	if (!$targetRow) throw new Error("$targetRow does not exist");
	const $eventTimeCell = $targetRow.querySelector(".event-table-time");
	if (!$eventTimeCell) throw new Error("$eventTimeCell does not exist");

	// Takes note of which event to possibly delete
	const $eventVerification = $eventTimeCell.querySelector(
		"#event-table-verification"
	)?.textContent;
	if (!$eventVerification) throw new Error("$eventVerification does not exist");
	verificationNumString = $eventVerification;

	// Displays delete warning modal
	$deleteWarning.style.display = "block";
	$backdrop.style.display = "block";
}

// Closes delete warming modal
function closeDeleteWarning(): void {
	$deleteWarning.style.display = "none";
	$backdrop.style.display = "none";
}

function deleteEvent(): void {
	// Obtain data of event to delete
	const dayToDelete = $dayOfWeek.value;
	for (let i = 0; i < events[dayToDelete].length; i++) {
		if (events[dayToDelete][i]["verification"] === verificationNumString) {
			events[dayToDelete].splice(i, 1);
			$eventTarget = null;
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
$eventTableTBody.addEventListener("click", openEditor);
$editorCancelBtn.addEventListener("click", closeEditor);
$editorConfirmBtn.addEventListener("click", confirmEditEvent);

// Allows users to delete an event
$eventTableTBody.addEventListener("click", openDeleteWarning);
$deleteWarningCancel.addEventListener("click", closeDeleteWarning);
$deleteWarningConfirm.addEventListener("click", deleteEvent);

// Refreshes the table relative to the day-of-week selection
$dayOfWeek.addEventListener("input", populateTable);
