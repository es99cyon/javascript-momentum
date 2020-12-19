const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
// filter는 array의 모든 아이템을 통해 함수를 실행한다.
function filterFn(toDo) {
    return toDo.id === 1;
}
let toDos = [];

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
} 

/**
 * 아이템 생성시 버튼과 id를 채번한다.
 * 
 * @param {string} text 입력값 
 */
function paintToDo(text) {
    const li = document.createElement("li"); 
    const delBtn = document.createElement("button");
    // TODO innerText 가 정확하게 무슨 역할을하는지 설명을 봐도 이해가 안됨...
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
    // 로컬스토리지는 자바스크립트의 DATA를 저장 할 수 없다. 자바스크립트 object를 string으로 바꿔야 한다.
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    }); 
    toDos = cleanToDos 
    saveToDos();


}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        //parse로 가져온 것을 자바스크립트 object로 변환해준다.
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        // forEach()는 array에 담겨 있는 것들 각각 한번씩 함수를 실행시켜 준다.
        });
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();


/**
 * 로직에대해서 이해가 안되면 로직 순서대로 정리를하고...
 * 
 * 동작과정을 머릿속으로 상상해보고 그래도 헷갈리면 물어보고...
 * 
 * 그래도 안되면 다음예제로 넘어가면서 TODO list 작성
 */

