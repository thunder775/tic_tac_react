import React, {useState} from "react";
import Square from "../Square";
import './styles.css';
import Reset from '../resetMove'

function Grid(props) {
    let [squares, setSquares] = useState(Array(9).fill(null)
    );


    let [moves, setMoves] = useState([]);
    let [isXNext, setXNext] = useState(true);
    let [playerStatus, setPlayerStatus] = useState("player X move");
    let [status, setStatus] = useState(["player X move"]);
    let [potentialResetMove, setResetMove] = useState(null);

    function isGameDraw(squares) {
        for (let i = 0; i < 9; i++) {
            if (squares[i] === null) return false;
        }
        return true;
    }

    function isGameWon(squares) {
        if (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== null) {
            return true;
        }
        if (squares[3] === squares[4] && squares[4] === squares[5] && squares[3] !== null) {
            return true;
        }
        if (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== null) {
            return true;
        }
        if (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== null) {
            return true;
        }
        if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== null) {
            return true;
        }
        if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== null) {
            return true;
        }
        if (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== null) {
            return true;
        }
        if (squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== null) {
            return true;
        }
        return false;
    }

    function handleResetMove() {
        setMoves(moves.slice(0, potentialResetMove+1));
        setStatus(status.slice(0, potentialResetMove+1));
        setResetMove(null);
    }

    function updateGrid(offset) {
        if (potentialResetMove !== null) {
            handleResetMove();
            return;
        }
        if (isGameWon(squares)) {
            return;
        }
        let squaresCopy = squares.slice();
        if (squaresCopy[offset] !== null) {
            return;
        }

        squaresCopy[offset] = isXNext ? 'X' : 'O';
        setSquares(squaresCopy);
        let tempCopy = moves.slice();
        tempCopy.push(squaresCopy);

        setMoves(tempCopy);
        moves.push(squaresCopy);


        setXNext(!isXNext);

        setPlayerStatus(isXNext ? 'player 0 move' : 'player x move');


        if (isGameWon(squaresCopy)) {
            setPlayerStatus(isXNext ? 'X won' : 'O won');
            let tempStatus = status.slice();
            tempStatus.push(isXNext ? 'X won' : 'O won');
            setStatus(tempStatus);
        } else if (isGameDraw(squaresCopy)) {
            setPlayerStatus('game draw');
            let tempStatus = status.slice();
            tempStatus.push("game draw");
            setStatus(tempStatus);

        }else{
            let tempStatus = status.slice();
            tempStatus.push(isXNext ? 'player 0 move' : 'player x move');
            setStatus(tempStatus);
        }

    }

    function getRow(offset) {
        return (
            <div className={"grid-row"}>
                <Square value={squares[offset + 0]} handleClick={() => updateGrid(offset + 0)}/>
                <Square value={squares[offset + 1]} handleClick={() => updateGrid(offset + 1)}/>
                <Square value={squares[offset + 2]} handleClick={() => updateGrid(offset + 2)}/>
            </div>
        )
    }

    function getResetButtons() {
        let buttons = [];
        for (let i = 0; i < moves.length; i++) {

            buttons.push(
                <button className="square-button" onClick={() => {
                    setSquares(moves[i]);
                    setPlayerStatus(status[i+1]);
                    setResetMove(i);
                    console.log(status)
                    // setMoves(moves.slice(0,i+1));
                    // setStatus(status.slice(0,i+1))
                }}>{i + 1}</button>
            )
        }
        return buttons;
    }


    return (
        <div>
            {
                getRow(0)
            } {
            getRow(3)
        } {
            getRow(6)
        }
            <p>{
                playerStatus
            }</p>
            <div className={"reset-buttons"}>{
                getResetButtons()
            }</div>

        </div>

    );
}


export default Grid;