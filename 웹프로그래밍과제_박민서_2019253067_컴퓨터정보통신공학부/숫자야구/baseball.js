const input = document.getElementById("input");
const form = document.getElementById("form");
const logs = document.getElementById("logs");
const hint = document.getElementById("hint");
const hintSelect = document.getElementById("hintSelect");
const hintArea = document.getElementById("hintArea");
const choiceHint = document.getElementById("choiceHint");
const resetButton = document.getElementById("resetButton");


var tryLimit = 10;
var tryCount = 0;

const numbers = [];
for (let i = 1; i <= 9; i++) {
    numbers.push(i);
}

const answer = [];
for (let i = 0; i <= 3; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index]);
    numbers.splice(index, 1);
}

console.log(answer);
const tries = [];

function checkInput(value) {
    if (value.length != 4) {
        return alert('4자리 숫자를 입력해주세요.');
    }
    if (new Set(value).size != 4) {
        return alert('중복되지 않게 입력해 주세요.');
    }
    if (tries.includes(value)) {
        return alert('이미 시도한 값입니다.');
    }
    tryLimit--;
    tryCount++;
    document.getElementById("tryLimit").innerHTML = tryLimit + "번";
    return true;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    input.value = '';
    const valid = checkInput(value);

    if (!valid) return;
    if (answer.join('') === value) {
        logs.textContent = '홈런!';
        form.style.display = "none";
        resetButton.style.display = "block";
        return;
    }
    if (tries.length >= 3) {
        const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
        logs.appendChild(message);
        if(confirm("다시 하시겠습니까?")){
            location.reload();
        }else{
            form.style.display = "none";
            resetButton.style.display = "block";
            alert("다시 도전하시려면 다시하기 버튼을 눌러주세요!")
        }
        return;
    }
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) { // 일치하는 숫자 발견
            if (index === i) { // 자릿수도 같음
                strike += 1;
            } else { // 숫자만 같음
                ball += 1;
            }
        }
    }
    logs.append(`${tryCount} 회차 [${value}] : ${strike} 스트라이크 ${ball} 볼`,
        document.createElement('br'));
    tries.push(value);
});

function showHint() {
    if(hint.style.display == "none") {
        hint.style.display = "block";
    } else{
        hint.style.display = "none";
    }
}

function show(){
    console.log(hintSelect.value);
    choiceHint.style.display = "none";
    hintArea.append(`힌트 : ${hintSelect.value}번째 자리의 숫자는 ${answer[hintSelect.value - 1]}입니다.`, document.createElement('br'));
}

function reset(){
    location.reload();
}