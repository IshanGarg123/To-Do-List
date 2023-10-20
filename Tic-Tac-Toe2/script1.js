let hasWon = (board, index, player) => {
    let row = parseInt(index / 3);
    let col = parseInt(index % 3);
  
    if (
      board[3 * row] == player &&
      board[3 * row + 1] == player &&
      board[3 * row + 2] == player
    ) {
      return true;
    } else if (
      board[col] == player &&
      board[3 + col] == player &&
      board[6 + col] == player
    ) {
      return true;
    } else if (board[0] == player && board[4] == player && board[8] == player) {
      return true;
    } else if (board[2] == player && board[4] == player && board[6] == player) {
      return true;
    }
    return false;
  };
  
  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let history = [];
  history[0] = [...board];

  let cols = document.getElementsByClassName("board-col");
  
  for (let i = 0; i < 9; i++) {
    cols[i].innerHTML = board[i];
  }
  
  let player = "X";
  let count = 0;
  let won = false;
  let info = document.getElementById("info");

  let show = (history)=>{
    for(let i=0;i<history.length;i++)
    {
        console.log(history[i]);
    }
  }
  
  // Game
  Array.from(cols).forEach((element, index) => {
      element.addEventListener("click", () => {
        if (element.innerHTML === " " && !won && count < 9) {
          element.innerHTML = player;
          board[index] = player;
          count++;
          history[count] = [...board];
          show(history);
        //  console.log(hasWon(board, index, player));
        //  console.log(board, index, player);
  
          if (hasWon(board, index, player) == true) {
            info.innerHTML = "Player " + player + " has Won the game";
            won = true;
          } else if (count === 9) {
            info.innerHTML = "Game Draw";
          } else {
            player = player === "X" ? "O" : "X";
            info.innerHTML = "Turn For " + player;
          }
        }
      });
  });

  // UNDO
  let undo = document.getElementById("undo");
  undo.addEventListener('click',()=>{
    let a = prompt("Enter the undo Turn Number");
    a = parseInt(a);
    if(a>count)
    {
        console.log("Turn No Invalid");
    }
    else if(a>=0 && a<count)
    {
        board = [...history[a]];
        for(let i=0;i<9;i++)
        {
            cols[i].innerHTML = board[i];
        }
        count = a;
        player = (count%2===0)?"X":"O";
        won = false;
    }
  })
  