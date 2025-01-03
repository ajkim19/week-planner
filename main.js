const eventSchedulerTime = document.getElementById("event-scheduler-time");
if (!eventSchedulerTime) throw new Error("eventSchedulerTime does not exist");
const scheduleListTableBody = document.querySelector("schedule-list-table > tbody")


for (let i = 0; i < 24; i++) {
	const hr = i.toString().padStart(2, "0");
	onHour = document.createElement("option");
	onHour.value = `${hr}00`;
	onHour.text = `${hr}00`;
	eventSchedulerTime.appendChild(onHour);
	onHalfHour = document.createElement("option");
	onHalfHour.value = `${hr}30`;
	onHalfHour.text = `${hr}30`;
	eventSchedulerTime.appendChild(onHalfHour);
}

for (let i = 0; i < 10; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < 3); j++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }
  scheduleListTableBody.appendChild(row);
}
