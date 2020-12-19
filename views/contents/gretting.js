const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    //폼에 입력되는 값을 기본값으로 바꾸기.
    //입력되는 값이 초기화가 안됨.
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `hello ${text}`;
}

function loadName() {
    const  currentUser = localStorage.getItem(USER_LS);

    if (currentUser === null) {
        askForName();
        //유저가 아닐 때 들어갈 부분
    } else {
        // 유저가 맞을 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();