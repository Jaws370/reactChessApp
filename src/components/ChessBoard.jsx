import React from 'react';
import { useState, useEffect } from 'react';

import './ChessBoard.css';

import { ChessPiece } from './ChessPiece.jsx';

import { fenToUsable } from '../backend/FenToUsable.js';
import { checkMove } from '../backend/CheckMove.js';

export function ChessBoard() {

    const SPACES = 64;

    const ALPHABET_INDEX = ["a", "b", "c", "d", "e", "f", "g", "h"];

    var chessBoard = [];

    const [rawBoard, setRawBoard] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");

    const [moveCouple, setMoveCouple] = useState([]);

    const [previousMoves, setPreviousMoves] = useState([]);

    var usableBoard = fenToUsable(rawBoard);

    useEffect(() => {

        if (moveCouple.length === 2) {

            const [isGoodMove, newBoard, newPreviousMoves] = checkMove(moveCouple[0], moveCouple[1], rawBoard, previousMoves);

            if (isGoodMove) {

                setRawBoard(newBoard);
                setPreviousMoves(newPreviousMoves);

            }

            setMoveCouple([]);

        }

    }, [moveCouple, rawBoard, previousMoves])

    const handleClick = event => {

        if ((event.currentTarget.getAttribute("data-piece") !== " " || moveCouple.length === 1) &&
            moveCouple[0] !== event.currentTarget.id) {

            setMoveCouple([...moveCouple, event.currentTarget.id]);

        }

    }

    for (let i = 0; i < SPACES; i++) {

        const IS_WHITE = !((i + Math.floor(i / 8)) % 2) ? "white" : "black";

        const ROW = 8 - Math.floor(i / 8);

        const COLLUMN = ALPHABET_INDEX[i % 8];

        const IS_HIGHLIGHTED = moveCouple[0] === (COLLUMN + ROW);

        chessBoard.push(

            <div className="square"
                key={COLLUMN + ROW}
                id={COLLUMN + ROW}
                onClick={handleClick}
                data-highlighted={IS_HIGHLIGHTED}
                data-color={IS_WHITE}
                data-piece={usableBoard[i]}>

                <ChessPiece id={COLLUMN + ROW} type={usableBoard[i]} />

            </div>

        );

    }

    return (
        <div className="chessBoard">
            {chessBoard}
        </div>
    );

}