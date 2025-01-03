const eventSchedulerTime = document.getElementById("event-scheduler-time");

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
