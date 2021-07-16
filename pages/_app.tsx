import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import ym, { YMInitializer } from 'react-yandex-metrika'
import {Router} from "next/router";

import '../styles/globals.css';


Router.events.on('routeChangeComplete', (url: string) => {
	if (typeof window !== 'undefined') {
		ym('hit', url)
	}
})


function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
	return <>
		<Head>
			<title>Next - курс с Udemy</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="preconnect" href="https://mc.yandex.ru" />
			<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
			<meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
			<meta property='og:locale' content='ru_RU'/>
		</Head>
		<YMInitializer
			accounts={[]}
			options={{webvisor: true, defer: true}}
			version='2'
		/>
		<Component {...pageProps} />
	</>;
}

export default MyApp;
