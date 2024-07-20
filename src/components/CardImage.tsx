'use client'

import { Card } from "@/lib/cardservice";

const CardImage: React.FC<any> = ({card}: {card: Card}) => {
    return (
        <div 
            className="flex px-0 py-0 rounded-xl bg-white shadow-lg">
            <img src={card.image} alt={card.code} />
        </div>
    )
}

export default CardImage;