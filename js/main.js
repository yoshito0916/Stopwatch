'use strict';
{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0; 

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {  
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => { 
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  })

  stop.addEventListener('click', () => { 
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime; 
  });

  reset.addEventListener('click', () => { 
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000'; 
    elapsedTime = 0;
  });

}


// {
//   const timer = document.getElementById('timer');//必要な要素を取得する
//   const start = document.getElementById('start');
//   const stop = document.getElementById('stop');
//   const reset = document.getElementById('reset');

//   let startTime;
//   let timeoutId;
//   let elapsedTime = 0; //タイマーを再開した時に続きから開始する指示を書く。走ってきた時間をelapsedTimeとして計算する。再代入するのでletで宣言して初期値は0としておけば良い。

//   function countUp() {
// //現在の時刻からstartボタンを押した時の時刻を引いてやると経過時間がわかる。単位をミリ秒から分や秒にしてやる。dateオブジェクトを作ってそれを使う。new Date()としてこれをそのまま渡す。それをdという変数に代入
//     const d = new Date(Date.now() - startTime + elapsedTime);//カウントアップの方で経過時間も含めてタイマーに表示していけば良いのでelapsedTimeを足してあげる。
//     const m = String(d.getMinutes()).padStart(2, '0');//２桁２桁３桁にするにはpadStart()というメソッドを使う。ただしpadStart()は文字列にしか使えないため、String()で文字列にする。その上で値を２桁で表示するよう指示し、２桁に満たなかったら前に０を入れるよう指示する。
//     const s = String(d.getSeconds()).padStart(2, '0');
//     const ms = String(d.getMilliseconds()).padStart(3, '0');
//     timer.textContent = `${m}:${s}.${ms}`;

//     timeoutId = setTimeout(() => {  //10ミリ秒後にcountUp()を呼び出す
//       countUp();
//     }, 10);
//   }
// //ボタンの状態の切り替えを指示する関数を書く
//   function setButtonStateInitial() {
//     start.classList.remove('inactive');
//     stop.classList.add('inactive');
//     reset.classList.add('inactive');
//   }

//   function setButtonStateRunning() {
//     start.classList.add('inactive');
//     stop.classList.remove('inactive');
//     reset.classList.add('inactive');
//   }

//   function setButtonStateStopped() {
//     start.classList.remove('inactive');
//     stop.classList.add('inactive');
//     reset.classList.remove('inactive');
//   }

//   setButtonStateInitial();//ページを読み込む時にInitialを呼んであげたいのでこの辺りに書く

//   start.addEventListener('click', () => { //startボタンをクリックした際の処理
//     if (start.classList.contains('inactive') === true) {
//       return;
//     }
//     setButtonStateRunning();//Startを押した時はタイマーが走り始めるのでRunningとする
//     startTime = Date.now();
//     countUp();
//   })

//   stop.addEventListener('click', () => { 
//     if (stop.classList.contains('inactive') === true) {
//       return;
//     }
//     setButtonStateStopped();//Stopを押した時はStoppedの状態になるのでこのように書く
//     clearTimeout(timeoutId);
//     elapsedTime += Date.now() - startTime; //Stopをクリックした時点でelapsedTimeを計算する。Stopをクリックした時刻をDate.now()で取り、Startをクリックした時刻をstartTimeだったのでそれを引いてやれば良い。
//   });

//   reset.addEventListener('click', () => { 
//     if (reset.classList.contains('inactive') === true) {
//       return;
//     }
//     setButtonStateInitial();//Resetを押すと最初の状態に戻せば良いのでInitialにする
//     timer.textContent = '00:00.000'; //タイマーの元の表記に戻す
//     elapsedTime = 0;//リセットした時に0になるようにする。
//   });

// }