import cn from 'classnames';
import {motion, useReducedMotion} from 'framer-motion';
import {useRouter} from 'next/router'

import Logo from '../logo.svg'
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon";
import {Sidebar} from "../Sidebar/Sidebar";
import {useEffect, useState} from "react";


export const Header = ({className, ...props }: HeaderProps): JSX.Element => {

	const [isOpened, setIsOpened] = useState<boolean>(false)
	const router = useRouter()
	const shouldReduceMotion = useReducedMotion()

	useEffect(() => {
		setIsOpened(false)
	}, [router])

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: shouldReduceMotion ? 1 : 0,
			x: '100%',
		}
	}

	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo/>
			<ButtonIcon icon='menu' appearance='white' onClick={() => setIsOpened(true)}/>
			<motion.div className={styles.mobileMenu} variants={variants} initial={'closed'} animate={isOpened ? 'opened' : 'closed'}>
				<Sidebar/>
				<ButtonIcon className={styles.menuClose} icon='close' appearance='white' onClick={() => setIsOpened(false)}/>
			</motion.div>
		</header>
	);
};