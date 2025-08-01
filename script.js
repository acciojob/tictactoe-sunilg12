const submit = document.getElementById("submit");
const message = document.querySelector(".message");
const board = document.getElementById("board");

let players = ["",""];
let turn = 0;
let boardState = Array(9).fill(null);

const wins =[
	[0,1,2],[3,4,5],[6,7,8],
	[0,3,6],[1,4,7],[2,5,8],
	[2,4,6],[0,4,8]
]

submit.addEventListener("click", startGame);

function startGame(){
	const p1 = document.getElementById("player-1").value.trim();
	const p2 = document.getElementById("player-2").value.trim();

	if(!p1 || !p2){
		alert("please enter both names");
		return;
	}

    players=[p1,p2];
	document.querySelector(".setup").style.display="none";
    document.querySelector(".board").style.display="grid";
    message.style.display='block';
    
	message.innerText=`${players[turn]}, you're up`;
	// board.style.display="grid";

	renderBoard();
}

function renderBoard(){
	// boardState.fill(null);
	// turn=0;
	document.querySelectorAll(".cell")
    .forEach((cell, index) => {
		// cell.innerText="";
		cell.addEventListener("click", handleMove);
	})
}

function handleMove(e) {
	const id = e.target.id;

	const mark = turn === 0 ? 'X' : 'O';
	boardState[id-1] = mark;
	e.target.innerText=mark;
	e.target.classList.add('disabled');
    console.log(boardState);

	const winningLine = wins.find(line => line.every(i => boardState[i] === mark));
	if(winningLine){
        console.log(winningLine);
		winningLine.forEach( i=> {
			document.getElementById((i+1).toString()).classList.add("winner");
		})
        message.innerText=`${players[turn]} you're a winner`;
        return;

	}
	turn = 1 - turn;
	updateMessage();
}

function updateMessage() {
	message.innerText=`${players[turn]} you're up`;
}





	




