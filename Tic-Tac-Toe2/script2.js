// hasWon Function
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
let game = 2;
let info = document.getElementById("info");

// UNDO
let undo = document.getElementById("undo");
undo.addEventListener("click", () => {
  let a = prompt("Enter the undo Turn Number");
  a = parseInt(a);
  if (a > count) {
    console.log("Turn No Invalid");
  } else if (a >= 0 && a < count) {
    board = [...history[a]];
    for (let i = 0; i < 9; i++) {
      cols[i].innerHTML = board[i];
    }
    count = a;
    player = count % 2 === 0 ? "X" : "O";
    won = false;
  }
});

// player-Button
let playerBtn = document.getElementById("player-btn");
playerBtn.addEventListener("click", () => {
  game = 2;
  board = [...history[0]];
  for (let i = 0; i < 9; i++) {
    cols[i].innerHTML = board[i];
  }
  player = "X";
  count = 0;
  won = false;
  info.innerHTML = "";
});

// Computer-Button
let compBtn = document.getElementById("comp-btn");
compBtn.addEventListener("click", () => {
  game = 1;
  board = [...history[0]];
  for (let i = 0; i < 9; i++) {
    cols[i].innerHTML = board[i];
  }
  player = "X";
  count = 0;
  won = false;
  info.innerHTML = "";
});

// Game
Array.from(cols).forEach((element, index) => {
  element.addEventListener("click", () => {
    if (game === 1) {
    } else if (game === 2) {
      if (element.innerHTML === " " && !won && count < 9) {
        element.innerHTML = player;
        board[index] = player;
        count++;
        history[count] = [...board];

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
    }
  });
});

let AI = (board,player,count)=>
{	
	if(player === "X")
	{
		let bestScore = -2;
		let index = -1;
		for(let i=0;i<9;i++)
		{
			if(board[i] == ' ')
			{
				board[i] = 'X';
				let score = minimax(board,'O',i,count+1);
				board[i] = ' ';
				
				if(score > bestScore)
				{
					bestScore = score;
					index = i;
				}
			}
		}
		return index;
	}
	else
	{
		let bestScore = 2;
		let index = -1;
		for(let i=0;i<9;i++)
		{
			if(board[i] == ' ')
			{
				board[i] = 'O';
				let score = minimax(board,'X',i,count+1);
				board[i] = ' ';
				
				if(score < bestScore)
				{
					bestScore = score;
					index = i;
				}
			}
		}
		return index;
	}
}




let minimax =(board,player,index,count)=>
{
	let prevPlayer = (player=='X')?'O':'X';
	let won = hasWon(board,index,prevPlayer);
	
	if(won)
	{
		return (prevPlayer == 'X')?1:-1;
	}
	
	if(count == 9)
	{
		return 0;
	}
	
	if(player == 'X')
	{
		let bestScore = -1;
		for(let i=0;i<9;i++)
		{
			if(board[i] == ' ')
			{
				board[i] = player;
				let score = minimax(board,'O',i,count+1);
				board[i] = ' ';
				bestScore = max(bestScore,score);
			}
		}
		return bestScore;
	}
	else
	{
		let bestScore = 1;
		for(let i=0;i<9;i++)
		{
			if(board[i] == ' ')
			{
				board[i] = player;
				let score = minimax(board,'X',i,count+1);
				board[i] = ' ';
				bestScore = min(bestScore,score);
			}
		}
		return bestScore;
	}	
}