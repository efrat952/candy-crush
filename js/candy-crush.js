let arrPicturs=["yellow","red","purple","lightBlue","green","orange"];
let arrBackgroundImg=["../pictures/item1.PNG", "../pictures/2item2.PNG", "./pictures/3item3.PNG", "./pictures/4item4.PNG", "./pictures/5item5.PNG", "../pictures/8item6.PNG"];
let arrCandies=[];
let chooseCandy;
let count=0;
let classMove;
let indexMove;
let unRealClassMove;
let difrence;
let ChoosedId;
let choosedClass;
let candyColor;
let index=0; //-basicCheck
let kind;
let arrCopyPicturs;
let isRight=false;
let arrCopyCandies=[];
let condition;
let arrCandiesToShow=[];
let score=0;
let success = 0;
let moves;
let howMany;
let gole;
levels();
newGame();

let baseMusic = new Audio("../music/Sk8board.mp3")
let soundSuccess = new Audio("../music/circle.mp3");
let soundFail = new Audio("../music/")
let player = JSON.parse(sessionStorage.getItem((localStorage.getItem('currentUser'))));
let playerRec = player.record;
document.querySelector(".record").innerText = playerRec;



function newGame(){
  for(let i=0;i<36;i++){
    chooseCandy=Math.ceil(Math.random()*6)-1;
    let candy=document.createElement("button");
    document.querySelector(".gameBoard").append(candy);
    candy.className=arrPicturs[chooseCandy];
    candy.id=i;
    arrCandiesToShow[i]=candy;
    arrCandies[i]=candy.className;
    candy.addEventListener("click",()=>{ChangeCandy()});
  }
basicCheck(arrCandies, 2);
}


function ChangeCandy(){
 if(count==0){
    ChoosedId=event.currentTarget.id;
    choosedClass=event.currentTarget.className;
    count++;
  }
 else{
    checkMove();
    count=0;
 }       
}

//בגלל ההחלפה צריך משתנה עזר למזהה של האירוע
let indexEvent;
function checkMove(){
  difrence=event.currentTarget.id - ChoosedId;
  if((difrence==-1||difrence==1||difrence==6||difrence==-6) && (unRealChange(event.currentTarget.id,ChoosedId))){
    if(moves > 1 && success < gole)
      moves--;
    else{
      endGame();
    if(moves == 1 && success < gole){
      window.location.href="../pages/gameOver.html";
    }
    else{
      window.location.href="../pages/endPage.html";
    }
  }
    console.log("moves"+moves);
    // classMove, indexMove - משתנים שומרים מזהה וקלאס של הסוכריה השניה
    indexMove=event.currentTarget.id;
    classMove=event.currentTarget.className;
    document.getElementById(ChoosedId).className=classMove;
    document.getElementById(indexMove).className=choosedClass;
    basicCheck(arrCandies, 1);
  }
}

//בדיקה האם קיימים 3 איברים זהים ברציפות במטריצה
//מקבל מערך עליו מבצע את הבדיקה וכן מספר 1 או 0 לשם זיהוי המערך כדי שנדע האם לשלוח לפעולת החלפת הצבעים או רק לבצע בדיקה
function basicCheck(arr, condition) {
  let bombCalled = false; // הוספת משתנה שמציין האם פונקציית bomb כבר נקראה

  for (let i = 2; i <= 33; i += 4) {
      let index = 0;
      while (index < 2) {
        if(!bombCalled){
          if (arr[i] == arr[i - 1] && arr[i] == arr[i + 1]) {
              if (condition == 0) {
                  return true;
              }
              if (arr[i] == arr[i - 2]) {
                  if (arr[i] == arr[i + 2]) {
                      bomb(i, 9, condition);
                      bombCalled = true; // מציין שהפונקציה bomb נקראה
                  }
                  if (!bombCalled) { // קריאה לפונקציה bomb רק אם לא נקראה כבר
                      bomb(i, 7, condition);
                      bombCalled = true;
                  }
              }
              if (!bombCalled) {
                  if (arr[i] == arr[i + 2]) {
                      bomb(i, 8, condition);
                      bombCalled = true;
                  }
                  bomb(i, 1, condition);
                  bombCalled = true;
              }
            }
          }
          if (!bombCalled) {
              if (arr[i] == arr[i - 1] && arr[i] == arr[i - 2]) {
                  if (condition == 0) {
                      return true;
                  }
                  bomb(i, 2, condition);
                  bombCalled = true;
              }
              if (!bombCalled) {
                  if (arr[i] == arr[i + 1] && arr[i] == arr[i + 2]) {
                      if (condition == 0) {
                          return true;
                      }
                      bomb(i, 3, condition);
                      bombCalled = true;
                  }
              }
          }
          i++;
          index++;
      }
  }
  
  for (let j = 12; j <= 23; j++) {
    let index = 0;
    while (index < 2) {
        if (!bombCalled) {
            if (arr[j] == arr[j - 6] && arr[j] == arr[j + 6]) {
                if (condition == 0) {
                    return true;
                }
                if (arr[j] == arr[j - 12]) {
                    if (arr[j] == arr[j + 12]) {
                        bomb(j, 12, condition);
                        bombCalled=true;
                    }
                    bomb(j, 10, condition);
                    bombCalled=true;
                }
                if (arr[j] == arr[j + 12]) {
                    bomb(j, 11, condition);
                    bombCalled=true;
                }
                bomb(j, 4, condition);
                bombCalled=true;

            }
            if (!bombCalled){
              if (arr[j] == arr[j - 6] && arr[j] == arr[j - 12]) {
                if (condition == 0) {
                    return true;
                }
                bomb(j, 5, condition);
                bombCalled=true;
            }
            }
            if (!bombCalled){
               if (arr[j] == arr[j + 6] && arr[j] == arr[j + 12]) {
                if (condition == 0) {
                    return true;
                }
                bomb(j, 6, condition);
                bombCalled=true;
            }
            } 
        }
        index++;
    }
}

if(condition==0){
  return false;
}
}

function funcScore(){
  score+=5;
  success++;
  document.querySelector(".score").innerText = score;
  document.querySelector(".moves").innerText = moves; 
   if(success<gole){
    document.querySelector(".goal").innerText = success+"/"+gole+"💥";
   }
   else{
    window.location.href="../pages/endPage.html";
   }
}

function bomb(i, id, condition){
  if(condition == 1){
    funcScore();
    baseMusic.pause();
    soundSuccess.play();
    baseMusic.play();
  }
  howMany=2;
  isRight = true;
  console.log("score"+score);
  switch (id) {
    case 1:
        kind = 1;
        i = i - 1;
        break;
    case 2:
        kind = 1;
        i = i - 2;
        break;
    case 3:
        kind = 1;
        break;
    case 4:
        kind = 6;
        i = i - 6;
        break;
    case 5:
        kind = 6;
        i = i - 12;
        break;
    case 6:
        kind = 6;
        break;
    case 7:
        kind = 1;
        i = i - 2;
        howMany=3;
        break;
    case 8:
        kind = 1;
        i = i - 1;
        howMany=3;
        break;
    case 9:
        kind = 1;
        i = i - 2;
        howMany=4;
        break;
    case 10:
        kind = 6;
        i = i - 12;
        howMany=3;
        break;
    case 11:
        kind = 6;
        i = i - 6;
        howMany=3;
        break;
    case 12:
        kind = 6;
        i = i - 12;
        howMany=4;
        break;
    default:
        isRight = false;
        break;
}

if (isRight) {
    randomCandyBomb(i, kind, howMany, condition);
}
}

function randomCandyBomb(index, kind, howMany, condition)
{
  //-מאיזה index להתחיל
  arrCopyPicturs= arrPicturs.filter((element)=>{return element!= arrCandies[index]});
 setTimeout(() => {
  for(let i=index;i<=index+howMany*kind;i+=kind){
    document.getElementById(i).className="boom";
    }
 }, 500);

     setTimeout(() => {
      for(let i=index;i<=index+howMany*kind;i+=kind){
        chooseCandy=Math.ceil(Math.random()*5)-1;
        document.getElementById(i).className=arrCopyPicturs[chooseCandy];
        arrCandies[i]=document.getElementById(i).className;}
        console.log("change");
     }, 1000);

     
   setTimeout(() => {
    if(condition==1){
      basicCheck(arrCandies, 1);
    }
    else{      
      basicCheck(arrCandies, 2);
    }
   }, 2000);

  
}

function unRealChange(id1, id2){
  arrCopyCandies=[...arrCandies];
  unRealClassMove=arrCopyCandies[id1];
  arrCopyCandies[id1]=arrCopyCandies[id2];
  arrCopyCandies[id2]=unRealClassMove;
  if (basicCheck(arrCopyCandies,0)){
    arrCandies=[...arrCopyCandies];
    return true;
  }
}


function unRealChange(id1, id2){
  arrCopyCandies=[...arrCandies];
  unRealClassMove=arrCopyCandies[id1];
  arrCopyCandies[id1]=arrCopyCandies[id2];
  arrCopyCandies[id2]=unRealClassMove;
  if (basicCheck(arrCopyCandies,0)){
    arrCandies=[...arrCopyCandies];
    return true;
  }
}

function levels(){
  if(localStorage.getItem('currentLevel')=="level1"){
    moves = 15;
    gole = 18;
  
  }
   if(localStorage.getItem('currentLevel')=="level2"){
    moves = 20;
    gole = 30;
  }
  if(localStorage.getItem('currentLevel')=="level3"){
    moves = 20;
    gole = 40;
  } 
   document.querySelector(".moves").innerText = moves;
   document.querySelector(".goal").innerText = success+"/"+gole+"💥";
}
function refresh(){
  let game = document.createElement("div");
  document.querySelector(".gameBoard").remove();
  document.querySelector(".game").append(game);
  game.className = "gameBoard";
  arrCandies = [];
  arrCandiesToShow = [];
  newGame();
}
function returnToPlay(){
  window.location.href="../pages/login.html";
}
function endGame(){
  if(playerRec < score){
    sessionStorage.setItem(player.password, JSON.stringify(player));
    localStorage.setItem("currentUser",player.password );
    player.record= score;
    sessionStorage.setItem(player.password, JSON.stringify(player));
    console.log("cf");
  }
}