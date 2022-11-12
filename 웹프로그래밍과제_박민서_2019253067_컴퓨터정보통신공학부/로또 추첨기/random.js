
function Start() {
    const again = document.getElementById("again");
    const inputNum = document.getElementById("inputNum").value;
    const resultText = document.getElementById("resultText");
    if (inputNum == '') {
        alert("숫자를 입력해주세요!");
        return;
    }

    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
        const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
        const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
        shuffle.push(value); // shuffle 배열에 넣기
    }
    console.log(shuffle);
    const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
    const bonus = shuffle[6];
    console.log(winBalls, bonus);

    const result = document.querySelector('#result');

    for (let i = 0; i < winBalls.length; i++) {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.textContent = winBalls[i];
            result.appendChild(ball);
        }, 1000 * (i + 1));
    }

    const bonusNum = document.querySelector('#bonus');
    setTimeout(() => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = bonus;
        bonusNum.appendChild(ball);
    }, 7000);

    setTimeout(() => {
        var msg = "";
        for (i = 0; i < 5; i++) {
            if (winBalls[i] == inputNum) {
                msg = `와우! ${winBalls[i]} 숫자의 추첨을 맞췄습니다! 로또 사러 갑시다~`;
                resultText.innerText = msg;
                return;
            }
        }
        if (bonus == inputNum) {
            msg = `와우! 보너스 번호${bonus} 추첨을 맞췄습니다. 로또 사러 갑시다~`;
            resultText.innerText = msg;
            return;
        }
        resultText.innerText = "아쉽네요ㅠㅠ 일치하는 숫자가 없네요. 오늘은 로또를 사면 안될 듯 합니다ㅠㅠ";
        again.style.display = "block";
    }, 7000);
}