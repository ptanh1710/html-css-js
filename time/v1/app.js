setInterval(() => {
    const date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let am = hour < 12 ? 'AM' : 'PM';

    let hh = document.getElementById('hour');
    let mm = document.getElementById('minute');
    let ss = document.getElementById('second');
    let ampm = document.getElementById('ampm');

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    hh.innerHTML = hour;
    mm.innerHTML = minute;
    ss.innerHTML = second;
    ampm.innerHTML = am;
});
