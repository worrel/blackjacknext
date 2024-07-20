'use client'

import { useCallback, useEffect, useState } from "react"

import Game, { PlayerAction } from "@/components/Game"
import { CardService } from "@/lib/cardservice"
import { Blackjack, BlackjackState, WinState } from "@/lib/blackjack"

export default function Play() {
    const [deckId, setDeckId] = useState<string>("")
    const [isLoading, setLoading] = useState(true)
    const [game, setGame] = useState<BlackjackState>({
        winState: WinState.NOT_PLAYING, 
        houseHand: [], 
        playerHand:[], 
        houseHandValue: 0, 
        playerHandValue: 0,
        cardsRemaining: 52
    })

    const startGame = useCallback((deckId: string) => {
        Blackjack.startGame(deckId).then((game) => {
            setGame(game)
        })
    }, [])

    // init new deck & retrieve ID
    useEffect(() => {
        if(deckId == "") {
            CardService.newDeck().then((resp) => {
                setDeckId(resp.deckId)
                setLoading(false)
            })
        }
    }, [deckId])

    // then init new hand w/ 2 cards each
    useEffect(() => {
        if(deckId != "" && game.winState == WinState.NOT_PLAYING) {
            console.log(`starting game with deck id ${deckId}`)
            startGame(deckId)
        }
    }, [deckId, game])

    // handle state updates at the root
    const onPlayerAction = useCallback((action: PlayerAction) => {
        switch(action) {
            case PlayerAction.Hit:
                Blackjack.playerHits(deckId, game).then((newHand) => setGame(newHand))
                break
            
            case PlayerAction.Stand:
                setGame(Blackjack.playerStands(game))
                break

            case PlayerAction.Restart:
                if(game.cardsRemaining < 10) {
                    CardService.reshuffle(deckId).then(() => startGame(deckId))
                } else {
                    startGame(deckId)
                }
                break
        }
    }, [deckId, game])


    if (isLoading) return <p>Loading...</p>
    if (!deckId || game == null) return <p>No game data</p>

    return (
        <div className="flex min-h-screen flex-col items-center">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <Game 
                game={game}
                onPlayerAction={onPlayerAction}
            />
        </div>
        </div>
    );
}