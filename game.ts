import Board from "./Board";
import initial_board from "./initial_board";
import Player from "./Player";

const computer_board = initial_board(Player.computer);
const user_board = initial_board(Player.user);

console.log(computer_board.board());
console.log(user_board.board());
