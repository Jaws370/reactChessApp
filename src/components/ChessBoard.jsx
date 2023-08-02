import React from 'react';
import { useState, useEffect } from 'react';

import './ChessBoard.css';

import { ChessPiece } from './ChessPiece.jsx';

import { fenToUsable } from '../backend/FenToUsable.js';
import { updateFen } from '../backend/UpdateFen.js';
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

            if (checkMove(moveCouple[0], moveCouple[1], rawBoard, previousMoves)) {

                setRawBoard(updateFen(moveCouple[0], moveCouple[1], rawBoard));
                setPreviousMoves([...previousMoves, moveCouple[1], moveCouple[0]]);

            }

            setMoveCouple([]);

        }
    }, [moveCouple, rawBoard, previousMoves])

    const handleClick = event => {

        if ((event.currentTarget.getAttribute("type") !== " " || moveCouple.length === 1) &&
            moveCouple[0] !== event.currentTarget.id) {

            setMoveCouple([...moveCouple, event.currentTarget.id]);

        }

    }

    for (let i = 0; i < SPACES; i++) {

        const SPACE_COLOR = !((i + Math.floor(i / 8)) % 2);

        const ROW = 8 - Math.floor(i / 8);

        const COLLUMN = ALPHABET_INDEX[i % 8];

        const HIGHLIGHT = moveCouple[0] === (COLLUMN + ROW);

        chessBoard.push(

            <div className={`space ${SPACE_COLOR ? "white" : "black"} ${HIGHLIGHT ? "highlight" : ""}`}
                id={COLLUMN + ROW}
                key={COLLUMN + ROW}
                onClick={handleClick}
                type={usableBoard[i]}>

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