function updateClock() {

    const now = new Date();
    const formattedDateTime = now.toLocaleString();

    document.getElementById('liveClock').textContent = formattedDateTime;
}

updateClock();
setInterval(updateClock, 1000);