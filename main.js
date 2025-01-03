const addEventBtn = document.querySelector(".add-event-btn");
if (!addEventBtn) throw new Error("addEventBtn does not exist");
const schedulerTime = document.getElementById("scheduler-time");
if (!schedulerTime) throw new Error("schedulerTime does not exist");
const schedulerDay = document.getElementById("scheduler-day");
if (!schedulerDay) throw new Error("schedulerDay does not exist");
const schedulerEvent = document.getElementById("scheduler-event");
if (!schedulerEvent) throw new Error("schedulerEvent does not exist");
const eventTableTBody = document.querySelector(".event-table > tbody");
if (!eventTableTBody) throw new Error("eventTableTBody does not exist");
const dayOfWeek = document.querySelector(".day-of-week");
if (!dayOfWeek) throw new Error("dayOfWeek does not exist");
const timeList = [];
const events = { monday: { event: "Dog Park", time: "1200" } };

for (let i = 0; i < 24; i++) {
	const hr = i.toString().padStart(2, "0");
	const onHour = document.createElement("option");
	onHour.value = `${hr}00`;
	onHour.text = `${hr}00`;
	timeList.push(`${hr}00`);
	schedulerTime.appendChild(onHour);
	const onHalfHour = document.createElement("option");
	onHalfHour.value = `${hr}30`;
	onHalfHour.text = `${hr}30`;
	timeList.push(`${hr}30`);
	schedulerTime.appendChild(onHalfHour);
}

for (let i = 0; i < 10; i++) {
	const row = document.createElement("tr");
	for (let j = 0; j < 3; j++) {
		const cell = document.createElement("td");
		row.appendChild(cell);
	}
	eventTableTBody.appendChild(row);
}

function addEvent() {
	const day = dayOfWeek.value;
	let eventCounter = 0;
	for (const time of timeList) {
		const row = document.createElement("tr");
		if (events[day]["time"] === time) {
			const eventTableTime = document.createElement("td");
			eventTableTime.className = "event-table-time";
			eventTableTime.textContent = time;
			row.appendChild(eventTableTime);
			const eventTableEvent = document.createElement("td");
			eventTableEvent.className = "event-table-event";
			eventTableEvent.textContent = events[day]["event"];
			row.appendChild(eventTableEvent);
			const eventTableActions = document.createElement("td");
			eventTableActions.className = "event-table-actions flex";
			const eventTableEdit = document.createElement("button");
			eventTableEdit.className = "event-table-edit-btn flex";
			eventTableEdit.textContent = "Edit";
			eventTableActions.appendChild(eventTableEdit);
			const eventTableDelete = document.createElement("button");
			eventTableDelete.className = "event-table-delete-btn flex";
			eventTableDelete.textContent = "Delete";
			eventTableActions.appendChild(eventTableDelete);
			row.appendChild(eventTableActions);
			eventTableTBody.appendChild(row);
			eventCounter++;
		}
	}
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

addEventBtn.addEventListener("click", addEvent);
