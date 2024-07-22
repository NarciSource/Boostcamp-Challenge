import Player from "./Player";
import Board from "./Board";
import initial_board from "./initial_board";

export const boards: { [key in Player]: Board } = {
    [Player.user]: initial_board(Player.user),
    [Player.computer]: initial_board(Player.computer),
};

const turns = {
    [Player.user]: Player.computer,
    [Player.computer]: Player.user,
};

export const switch_turn = (turn: Player): Player => turns[turn];
