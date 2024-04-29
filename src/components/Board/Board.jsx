import { Card } from '../Card/Card'
import { cardsArr } from '../../utils/cards'
import styles from './Board.module.scss'
import { useState } from 'react'

export function Board() {
	const [cards, setCards] = useState(cardsArr)

	function handleIsShownCardClick(id) {
		setCards(prevCards =>
			prevCards.map(card => {
				if (card.id === id) {
					return {
						...card,
						isShown: true,
					}
				} else {
					return card
				}
			})
		)
	}

    function shuffleCardsClick() {
        const shuffleCards = [...cards].sort(() => Math.random() - 0.5)
        setCards(shuffleCards)
        resetCard()
    }
    function resetCard() {
        setCards(prevCards => prevCards.map(card => {
            return {
                ...card,
                isShown: false
            }
        }))
    }

	const cardsBoard = cards.map(({ id, sign, isShown }) => (
		<Card key={id} isShown={isShown} onShownClick={() => handleIsShownCardClick(id)}>
			{isShown ? sign : '❓'}
		</Card>
	))

	return (
		<div className={styles.container}>
			<div className={styles.board}>{cardsBoard}</div>
			<button onClick={shuffleCardsClick} className={styles.btnReset}>Zresetuj</button>
		</div>
	)
}
