function updateCurrentTime() {
    const currentTimeElement = document.getElementById('clock');
    const now = new Date();

    const options = {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };

    //create a DTFormat (which is a build-in JavaScript object)
    const formatter = new Intl.DateTimeFormat('en-US', options); 
    //format the DTFormat
    const formattedTime = formatter.format(now); 
    //update the time as the formattedTime
    currentTimeElement.textContent = formattedTime; 
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);