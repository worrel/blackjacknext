'use client'

import { useCallback } from "react";

import { BlackjackState, WinState } from "@/lib/blackjack";
import CardHand from "./CardHand";
import Button from "./Button";

export enum PlayerAction {
    Hit,
    Stand,
    Restart
}

interface GameProps {
    game: BlackjackState
    onPlayerAction: (action: PlayerAction) => void
}

const Game: React.FC<GameProps> = ({game: game, onPlayerAction}) => {
    const onHit = useCallback(() => onPlayerAction(PlayerAction.Hit), [onPlayerAction])
    const onStand = useCallback(() => onPlayerAction(PlayerAction.Stand), [onPlayerAction])
    const onRestart = useCallback(() => onPlayerAction(PlayerAction.Restart), [onPlayerAction])

    let gameOver = game.winState !== WinState.PLAYING
    let playerWin = game.winState === WinState.PLAYER_WINS
    let houseWin = game.winState === WinState.HOUSE_WINS

    const playerActions = !gameOver ? (
        <div className="flex flex-row p-6 space-x-2">
            <Button text="Hit" onClick={onHit}/>
            <Button text="Stand" onClick={onStand}/>
        </div>
    ) : null

    const restartAction = gameOver ? (
        <div className="flex flex-col p-6">
            <Button 
                onClick={onRestart}
                text="Deal"
            />
        </div>
    ) : null

  return (
    <div className="flex flex-col items-center">
      {playerActions}
      {restartAction}
      
        <CardHand 
            label="Player"
            hand={game.playerHand} 
            handValue={game.playerHandValue} 
            winner={gameOver && playerWin}
        />
    
        <div className="flex p-2 text-3xl">VS</div>

        <CardHand 
            label="House"
            hand={game.houseHand} 
            handValue={game.houseHandValue}
            winner={gameOver && houseWin}
        />
   
        <div className="font-mono font-light text-xs">Cards remaining in deck: {game.cardsRemaining}</div>
    </div>
  );
}

export default Game;