export interface Card {
    code: string
    image: string
    value: string
    index: number
    suit: string
}

export interface ApiCard {
    code: string,
    image: string
    images: string[]
    value: string
    suit: string
}

export interface DrawCardsResponse {
    success: boolean
    cards: Card[]
    remaining: number
}

export interface NewDeckResponse {
    success: boolean
    deckId: string
    remaining: number
}

const API_PREFIX = "https://deckofcardsapi.com/api/deck"

export class CardService {
    static async newDeck(): Promise<NewDeckResponse> {
        return fetch(`${API_PREFIX}/new/shuffle/?deck_count=1`)
            .then((res) => res.json())
            .then((data) => {
                console.log(`deck_id ${data.deck_id}`)
                return {
                    success: data.success,
                    deckId: data.deck_id,
                    remaining: data.remaining,
                }
            })
    }

   static async drawCards(deckId: string, numCards: number): Promise<DrawCardsResponse> {
        // validate numCards >= remaining!!!

        return fetch(`${API_PREFIX}/${deckId}/draw/?count=${numCards}`)
            .then((res) => res.json())
            .then((data) => {
                if(!data.success) {
                    return {success: false, cards: [], remaining: 0}
                } else {
                    const respCards: ApiCard[] = data.cards // for typing
                    const cards: Card[] = respCards.map((card) => CardService.convertApiCard(card))
                    return {success: true, cards, remaining: data.remaining}
                }
            })
    }

    static async reshuffle(deckId: string): Promise<NewDeckResponse> {
        return fetch(`${API_PREFIX}/${deckId}/shuffle/`)
            .then((res) => res.json())
            .then((data) => {
                if(!data.success) {
                    return {success: false, remaining: 0, deckId}
                } else {
                    return {success: true, remaining: data.remaing, deckId }
                }
            })
    }

    static convertApiCard(apiCard: ApiCard): Card {
        let cardIndex = 0;
        
        if(isNaN(<any>apiCard.value)) {
            switch (apiCard.value) {
                case "JACK":
                    cardIndex = 11
                    break
                case "QUEEN":
                    cardIndex = 12
                    break
                case "KING":
                    cardIndex = 13
                    break
                case "ACE":
                    cardIndex = 14
                    break
            }
        } else {
            cardIndex = parseInt(apiCard.value)
        }

        let card: Card = {
            code: apiCard.code,
            image: apiCard.image,
            suit: apiCard.value,
            index: cardIndex,
            value: apiCard.value
        }

        return card
    }
}
