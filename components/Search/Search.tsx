import React from 'react'
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {ChangeEvent, useState} from "react";
import SearchIcon from './search.svg'
import {useRouter} from "next/router";


export const Search = ({ className, ...props }: SearchProps): JSX.Element => {

	const [search, setSearch] = useState<string>('')
	const router = useRouter()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const goToSearch = (): void => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') goToSearch()
	}

	return (
		<form className={cn(styles.search, className)} {...props} role='search'>
			<Input
				placeholder='Поиск...'
				value={search}
				onChange={handleChange}
				className={styles.input}
				onKeyDown={handleKeyDown}
			/>
			<Button appearance='primary' className={styles.button} onClick={goToSearch} aria-label='Искать по сайту'>
				<SearchIcon/>
			</Button>
		</form>
	)
}