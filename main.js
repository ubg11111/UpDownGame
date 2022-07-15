// 랜덤번호 지정
// 유저가 번호를 입력한다.
// go라는 버튼을 누름.
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호가 < 유저번호 Down 메시지 띄우기
// 랜덤번호가 > 유저번호가 Up 메시지 띄우기
// reset 버튼을 누르면 게임이 초기화되게 끔 구현
// 5번의 기회를 다 쓰면 게임이 끝!!! (더이상 추측 불가 버튼 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

// 변수 지정해주기
let computerNum = 0;
let playButton = document.querySelector("#play-button");
let userInput = document.querySelector("#user-input");
let resultArea = document.querySelector("#result-area");
let resetButton = document.querySelector("#reset-button");
let resultChance = document.querySelector("#result-chance");
let gifImg = document.querySelector(".img_gif");
let resultMessage = document.querySelector(".result-messages");

let chances = 5;
let gameOver = false;
let history = [];

// playButton에 대해서 이벤트 주기 (함수도 매개변수로 넘겨줄 수 있다.)
playButton.addEventListener("click", play);
userInput.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        play();
    }
});

resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", ()=> {
    userInput.value = "";
});


// 랜덤값을 가져오는 함수
function pickRandomNum(){
    computerNum = ((Math.random() * 100) + 1).toFixed(0) ;
    console.log("정답", computerNum);
}

// 플레이버튼을 클릭하는경우의 함수
function play(){
    
    chances -= 1;

    // 해당 input값의 입력값을 가져올때는 value값을 입력한다.
    let userValue = userInput.value;


    // 입력한 값이 1보다 작거나 100보다 큰경우 메시지를 띄우고 찬스는 깍지않는다. return으로 함수를 종료
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100사이 숫자를 입력해주세요."
        return; 
    }

    // 입력한 값이 중복으로 입력한 경우 배열 history로 배열에 값을 담고 includes로 userValue(입력값)을 비교해서 값이 true면 조건문 실행
    if(history.includes(userValue)){
        resultArea.textContent = "중복으로 입력한 값입니다. 다른값을 입력해주세요."
        return;
    }else{
        resultArea.textContent = "";
    }

    // 업다운 게임 번호에대한 조건문
    if(userValue < computerNum){
        gifImg.src = "img/up.gif"
        resultMessage.innerHTML = "UP!!!!"
    }else if(userValue > computerNum){
        gifImg.src = "img/down.gif"
        resultMessage.innerHTML = "Down!!!!";
    }else{
        gifImg.src = "img/good.gif"
        resultMessage.innerHTML = "축하한다 정답이다!!";
        gameOver = true;
    }

    // 히스토리 확인하기 (중복값)
    history.push(userValue);

    // 5번 누르게 되면 게임 끝
   if(chances < 1){
        gameOver = true;
        gifImg.src = "img/리퍼.gif";
        resultMessage.innerHTML = "죽어라 욘뇨속!!!";
        resultChance.innerHTML = "찬스가 모두 소진됨";
        resultArea.innerHTML = "리셋을 눌러 다시 시작해주세요.";
   }else{
     resultChance.innerHTML = `찬스 : ${chances} 번`;
   }
   
   if(gameOver == true){
        playButton.disabled = true;
   }

}

// 리셋 버튼을 클릭했을 때 모든 게임이 재시작됨.
function reset(){
    chances = 5;
    history = [];

    if(chances == 5){
        gameOver = false;
    }

    if(gameOver == false){
        playButton.disabled = false;
    }

    // 유저 input창이 정리
    userInput.value = "";
    userInput.focus();

    // 새로운 번호가 생성
    pickRandomNum();

    // 리셋을 눌럿을 때
    resultChance.innerHTML = "찬스 : 5번";
    resultArea.innerHTML = "";
    console.log(chances);

    // 이미지 교체 및 폰트교체
    gifImg.src = "img/start.gif";
    resultMessage.innerHTML = "시작 해보자고!";
}

// 정답버튼 확인하는 뇨속
pickRandomNum();


