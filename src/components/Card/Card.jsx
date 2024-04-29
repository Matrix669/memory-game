import styles from './Card.module.scss'

export function Card({ children, isShown, onShownClick }) {
	return (
		<div className={`${styles.card} ${isShown && styles.flipped}`} 
		onClick={onShownClick}
		>
			{children}
		</div>
	)
}
