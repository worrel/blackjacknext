import { Card, CardService } from "./cardservice";

export enum WinState {
    NOT_PLAYING,
    PLAYING,
    HOUSE_WINS,
    PLAYER_WINS
}

export interface BlackjackState {
    houseHand: Card[]
    playerHand: Card[]
    winState: WinState
    houseHandValue: number
    playerHandValue: number
    cardsRemaining: number
}

export class Blackjack {
    static async startGame(deckId: string): Promise<BlackjackState> {
        return CardService.drawCards(deckId, 4).then((cardResp) => {
            if(cardResp.success) {
                let houseHand = cardResp.cards.slice(0,2)
                let playerHand = cardResp.cards.slice(-2)
                let houseHandValue = Blackjack.handValue(houseHand)
                let playerHandValue = Blackjack.handValue(playerHand)
                
                // TODO: this auto-wins for player when they're ahead on initial draw - is this desirable?
                //let winState = this.checkWinState(houseHandValue, playerHandValue)
                // for now, require player to stand on an initial winning deal
                let winState = WinState.PLAYING
                
                return {
                    houseHand,
                    playerHand,
                    winState,
                    houseHandValue,
                    playerHandValue,
                    cardsRemaining: cardResp.remaining
                }
            } else {
                return Promise.reject("card draw failed")
            }
        })
    }

    static playerStands(hand: BlackjackState): BlackjackState {
        let winState = this.checkWinState(hand.houseHandValue, hand.playerHandValue)
        if (winState == WinState.PLAYING) {
            winState = WinState.HOUSE_WINS
        }
        return {...hand, winState }
    }

    static async playerHits(deckId: string, hand: BlackjackState): Promise<BlackjackState> {
        return CardService.drawCards(deckId, 1).then((cardResp) => {
            if(cardResp.success) {
                let playerHand = [...hand.playerHand, cardResp.cards[0]]
                let playerHandValue = Blackjack.handValue(playerHand)
                let winState = this.checkWinState(hand.houseHandValue, playerHandValue)

                return {
                    ...hand,
                    winState,
                    playerHand,
                    playerHandValue: Blackjack.handValue(playerHand),
                    cardsRemaining: cardResp.remaining
                }
            } else {
                return Promise.reject("card draw failed")
            }
        })
    }

    static handValue(hand: Card[]) {
        let aceCount = 0
        let handValue = 0

        hand.forEach((card, idx) => {
            if(card.index < 10) {
                handValue += card.index
            } else if (card.index < 14) {
                handValue += 10
            } else {
                handValue += 11
                aceCount++
            }
        })
        
        while(handValue > 21 && aceCount > 0) {
            handValue -= 10
            aceCount--
        }

        return handValue
    }

    static checkWinState(houseHandValue: number, playerHandValue: number) {
        if(playerHandValue > 21 || houseHandValue == 21) {
            return WinState.HOUSE_WINS
        } else if (playerHandValue > houseHandValue) {
            return WinState.PLAYER_WINS
        } else {
            return WinState.PLAYING
        }
    }
}