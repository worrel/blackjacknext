'use client'

import { Card } from "@/lib/cardservice";
import CardImage from "./CardImage";

export interface CardHandProps {
    hand: Card[],
    handValue: number,
    label: string,
    winner: boolean,
    onHit?: () => void,
    onStand?: () => void
}

const CardHand: React.FC<CardHandProps> = ({hand, handValue, label, winner, onHit, onStand}) => {

    const handCards = hand.map((card) => <CardImage key={card.code} card={card} />)

    const winClass = winner ? " bg-green-500" : "bg-green-700"

    return (
        <div className={`flex flex-col p-3 rounded-lg items-center gap-y-2 ${winClass}`}>
            <div className="flex flex-row gap-2 px-5 py-2 rounded-md bg-amber-900 text-md">
                <div className="text-gray-300 font-bold">{label}</div>
                { winner && <div className="font-extrabold text-white">{' WINS with'}</div> }
                <div className="font-serif font-extrabold text-gray-400">{handValue}</div>
            </div>
            <div className="grid grid-cols-5 gap-4 auto-rows-max">
                {handCards}
            </div>
        </div>
    )
}

export default CardHand;

