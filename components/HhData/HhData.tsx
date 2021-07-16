import { HhDataProps } from './HhData.props'
import {Card} from "../Card/Card"
import RateIcon from './rate.svg'

import styles from './HhData.module.css'
import {priceRu} from "../../helpers/helpers";


export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<p className={styles.title}>Всего вакансий</p>
				<p  className={styles.countValue}>{count}</p>
			</Card>
			<Card className={styles.salary}>
				<div>
					<p className={styles.title}>Начальный</p>
					<p  className={styles.salaryValue}>{priceRu(juniorSalary)}</p>
					<p  className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon/>
						<RateIcon/>
					</p>
				</div>
				<div>
					<p className={styles.title}>Средний</p>
					<p  className={styles.salaryValue}>{priceRu(middleSalary)}</p>
					<p  className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
						<RateIcon/>
					</p>
				</div>
				<div>
					<p className={styles.title}>Профессионал</p>
					<p  className={styles.salaryValue}>{priceRu(seniorSalary)}</p>
					<p  className={styles.rate}>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
						<RateIcon className={styles.filled}/>
					</p>
				</div>
			</Card>
		</div>
	);
};