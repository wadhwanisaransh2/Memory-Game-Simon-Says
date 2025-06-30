 let gameSeq = [];
        let userSeq = [];

        let btns = ["yellow", "red", "purple", "green"];
        let started = false;
        let level = 0, score = 0, hScoreVal = 0;

        let highScore = document.querySelector(".HighScore h2");
        let body = document.querySelector("body")
        let h2 = document.querySelector("h2")
        let h3 = document.querySelector("h3")

        document.addEventListener("keypress", function () {
            if (!started) {
                console.log("Game started");
                started = true;
                score = 0;
                levelUp();
            }
        });

        function gameFlash(btn) {
            btn.classList.add("flash")
            setTimeout(function () {
                btn.classList.remove("flash")
            }, 250);
        }

        function userFlash(btn) {
            btn.classList.add("userflash")
            setTimeout(function () {
                btn.classList.remove("userflash")
            }, 250);
        }

        function levelUp() {
            userSeq = [];
            level++;
            h2.innerText = `Level ${level}`;

            let randIdx = Math.floor(Math.random() * 4);
            let randColor = btns[randIdx];
            let randBtn = document.querySelector(`#${randColor}`);
            gameSeq.push(randColor);
            console.log("Game Sequence:", gameSeq);
            gameFlash(randBtn);
        }

        function checkAns(idx) {
            if (userSeq[idx] === gameSeq[idx]) {
                if (userSeq.length === gameSeq.length) {
                    score++;
                    setTimeout(() => {
                        levelUp();
                    }, 1000);
                }
            } else {
                h2.innerHTML = `Game Over! Press any key to start again<br>Your Score was: ${score}`;

                if (score > hScoreVal) {
                    hScoreVal = score;
                    highScore.innerHTML = `Highest Score:<br><br><br> ${hScoreVal}`;
                }
                reset();
            }
        }

        function btnPress() {
            let btn = this;
            userFlash(btn);
            let color = btn.id;
            userSeq.push(color);
            checkAns(userSeq.length - 1);
        }

        let allBtns = document.querySelectorAll(".btn")
        for (let btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }

        function reset() {
            started = false;
            gameSeq = [];
            userSeq = [];
            level = 0;
            body.classList.add("changebg");
            setTimeout(function () {
                body.classList.remove("changebg");
            }, 250);
        }

        