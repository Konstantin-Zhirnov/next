import { AdvantagesProps } from './Advantages.props'

import CheckIcon from './check.svg'

import styles from './Advantages.module.css'



export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => (
				<div className={styles.advantage} key={a._id}>
					<CheckIcon/>
					<p className={styles.title}>{a.title}</p>
					<hr className={styles.vLine}/>
					<p>{a.description}</p>
				</div>
			))}
		</>
	);
};