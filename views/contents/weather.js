const API_KEY = "45494f84784f471fbd8130233200805"
const COORDS = "coords";

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify())
}

function getWeather(lat, ing) {
    //데이터를 가지고 온다.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
}

//좌표를 가져오는데 성공했을 때 처리하는 함수이다.
function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("cant access geo location")
}

//좌표를 요청하는 함수를 만든다.
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }else{
    //getWeather 함수를 호출한다.
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude)
    }
}


    function init() {
        loadCoords();

    }

    init();