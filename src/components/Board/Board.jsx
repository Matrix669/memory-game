import { Card } from '../Card/Card'
import { cardsArr } from '../../utils/cards'
import styles from './Board.module.scss'
import { useEffect, useState } from 'react'

export function Board() {
	const [cards, setCards] = useState(cardsArr)
	const [firstSelectedCard, setFirstSelectedCard] = useState(null)
	const [secondSelectedCard, setSecondSelectedCard] = useState(null)
	const [isComparing, setIsComparing] = useState(false)

	useEffect(() => {
		shuffleCardsClick()
	}, [])

	function handleCardClick(clickedCard) {
		if (!isComparing) {
			setCards(
				cards.map(card => {
					if (card.id === clickedCard.id) {
						return { ...card, isShown: true }
					}
					return card
				})
			)
			if (!firstSelectedCard) {
				setFirstSelectedCard(clickedCard)
			} else {
				setSecondSelectedCard(clickedCard)
				setIsComparing(true)
				if (firstSelectedCard.sign === clickedCard.sign) {
					setFirstSelectedCard(null)
					setSecondSelectedCard(null)
					setIsComparing(false)
				} else {
					setTimeout(() => {
						setCards(
							cards.map(card => {
								if (card.id === firstSelectedCard.id || card.id === clickedCard.id) {
									return { ...card, isShown: false }
								}
								return card
							})
						)
						setFirstSelectedCard(null)
						setSecondSelectedCard(null)
						setIsComparing(false)
					}, 1000)
				}
			}
		}
	}

	function shuffleCardsClick() {
		const shuffleCards = [...cards].sort(() => Math.random() - 0.5)
		setCards(shuffleCards)
		resetCard()
	}
	function resetCard() {
		setCards(prevCards =>
			prevCards.map(card => {
				return {
					...card,
					isShown: false,
				}
			})
		)
	}

	let winMsg
	const shownCardsArr = cards.every(card => card.isShown === true)
	if(shownCardsArr) {
		winMsg = 'Wygrałeś! 🎉'
	}
	/*
		todo:
		4) odgadnięte karty pozostają odkryte w momencie kiedy probowałbym je porównywać do nieodgadniętych
	*/

	const cardsBoard = cards.map(card => (
		<Card key={card.id} isShown={card.isShown} onShownClick={() => handleCardClick(card)}>
			{card.isShown ? card.sign : '❓'}
		</Card>
	))

	return (
		<div className={styles.container}>
			<div className={styles.board}>{cardsBoard}</div>
			<h1 className={styles.winMsg}>{winMsg}</h1>
			<button onClick={shuffleCardsClick} className={styles.btnReset}>
				Zresetuj
			</button>
		</div>
	)
}
