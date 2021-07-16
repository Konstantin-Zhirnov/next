import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

	const computeFocus = (r: number, i: number): number => {
		if (!isEditable) return -1
		if (!rating && i === 0) return tabIndex ?? 0
		if (r === i + 1) return tabIndex ?? 0
		return -1
	}

	useEffect(() => {
		constructRating(rating);
	}, [rating, tabIndex]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDispay(i + 1)}
					onMouseLeave={() => changeDispay(rating)}
					onClick={() => onClick(i + 1)}
					tabIndex={computeFocus(rating, i)}
					onKeyDown={handleKey}
					ref={r => ratingArrayRef.current?.push(r)}
					role={isEditable ? 'slider' : '' }
					aria-invalid={error ? true : false}
					aria-valuenow={rating}
					aria-valuemax={5}
					aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
					aria-valuemin={1}
				>
					<StarIcon/>
				</span>

			);
		})
		setRatingArray(updatedArray)
	};

	const changeDispay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleKey = (key: KeyboardEvent) => {
		if (!isEditable || !setRating) {
			return;
		}
		if (key.code === 'ArrowRight' || key.code === 'ArrowUp') {
			if (!rating) {
				setRating(1);
			} else {
				key.preventDefault()
				setRating(rating < 5 ? rating + 1 : 5);
			}
			ratingArrayRef.current[rating]?.focus()
		}
		if (key.code === 'ArrowLeft' || key.code === 'ArrowDown') {
			key.preventDefault()
			setRating(rating > 1 ? rating - 1 : 1);
			ratingArrayRef.current[rating - 2]?.focus()
		}
	};

	return (
		<div {...props} ref={ref} className={cn(styles.ratingWrapper, {[styles.error]: error})}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
			{error && <span role="alert"  className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
})