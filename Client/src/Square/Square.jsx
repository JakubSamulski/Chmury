import React, { useState } from "react";
import "./Square.css";

const Square = ({
                    gameState,
                    setGameState,
                    socket,
                    playingAs,
                    currentElement,
                    finishedArrayState,
                    setFinishedState,
                    finishedState,
                    id,
                    currentPlayer,
                    setCurrentPlayer,
                }) => {

    const clickOnSquare = () => {
        if (playingAs !== currentPlayer) {
            return;
        }

        if (finishedState) {
            return;
        }

        console.log("currentPlayer", currentPlayer);
        console.log("playingAs", playingAs);
        console.log("currentElement", currentElement);
        console.log("finishedArrayState", finishedArrayState);
        console.log("finishedState", finishedState);
        console.log("gameState", gameState);

        if (currentElement !== "circle" && currentElement !== "cross") {
            const myCurrentPlayer = currentPlayer;
            socket.emit("playerMoveFromClient", {
                state: {
                    id,
                    sign: myCurrentPlayer,
                },
            });

            setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

            setGameState((prevState) => {
                let newState = [...prevState];
                const rowIndex = Math.floor(id / 3);
                const colIndex = id % 3;
                newState[rowIndex][colIndex] = myCurrentPlayer;
                return newState;
            });
        }
    };

   return (
    <div
        onClick={clickOnSquare}
        className={`
        square 
        ${finishedState ? "not-allowed" : ""}
        ${currentElement === "circle" || currentElement === "cross" ? "not-allowed" : ""}
        ${currentPlayer !== playingAs ? "not-allowed" : ""}
        ${finishedArrayState.includes(id) ? finishedState + "-won" : ""}
        `}
         style={{
            fontSize: "80px", // Zwiększona czcionka
            display: "flex", // Ustawienie elementu jako flexbox
            justifyContent: "center", // Wycentrowanie wzdłuż osi poziomej
            alignItems: "center" // Wycentrowanie wzdłuż osi pionowej
        }}
    >
        {currentElement === "circle"
            ? "O"
            : currentElement === "cross"
                ? "X"
                : null}
    </div>
    );
};

export default Square;
