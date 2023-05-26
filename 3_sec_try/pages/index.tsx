// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'


// export default function Home() {
// 	return (
// 		<>
// 			<section>
// 				<h1>
//           3_sec_try!!
// 				</h1>
// 				{/* ボタンをクリックするとタイマーがスタート */}
//         <button>Start</button>
//         {/* 3秒間を表すインジケーターが出力されている */}
//         <div>

//         </div>
// 			</section>
// 		</>
// 	);
// }


  // return (
  //   <div>
  //     <div id="timer-display" className={styles.timer}>{formatTime(timer)}</div>
  //     <div className={styles.indicator} style={{ backgroundColor: indicatorColor }}></div>
  //     <button className={styles.startBtn} onClick={startTimer}>スタート</button>
  //     {finished && <div className={styles.finished}>終了！</div>}
  //   </div>
  // );
  import { useState, useEffect } from "react";
  import styles from "../styles/Home.module.css";
  
  const formatTime = (time: number): string => {
    const seconds = Math.floor(time / 1000).toString().padStart(2, "0");
    const milliseconds = (time % 1000).toString().padStart(3, "0");
    return `${seconds}:${milliseconds}`;
  };
  
  export default function Home(): JSX.Element {
    const [timer, setTimer] = useState<number>(3000); // 3秒（3000ミリ秒）
    const [indicatorColor, setIndicatorColor] = useState<string>("#4682b4"); // 初期状態の色は青色
    const [finished, setFinished] = useState<boolean>(false);
  
    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;
      if (timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 10); // 10ミリ秒ごとに減算
        }, 10);
      } else {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setFinished(true);
      }
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [timer]);
  
    useEffect(() => {
      if (timer <= 3000 && timer >= 0) {
        const percentage = (timer / 3000) * 100; // インジケーターの割合を計算
        const blueValue = Math.floor(70 + (percentage * 127) / 100); // 青色成分の値を計算
        const indicatorColor = `rgb(70, 130, ${blueValue})`; // RGB値を生成
        setIndicatorColor(indicatorColor);
      }
    }, [timer]);
  
    return (
      <div>
        <div id="timer-display" className={styles.timer}>
          {formatTime(timer)}
        </div>
        <div className={styles.indicatorWrapper}>
          <div
            className={styles.indicator}
            style={{ width: `${timer / 30}px`, backgroundColor: indicatorColor }}
          >　</div>
        </div>
        <button className={styles.startBtn} onClick={() => setTimer(3000)}>
          スタート
        </button>
        {finished && <div className={styles.finished}>終了！</div>}
      </div>
    );
  }
  