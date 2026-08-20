import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville, Montserrat } from "next/font/google";
import "./globals.css";


// custom fonts 
const libre = Libre_Baskerville({
	variable: "--font-libre",
	subsets: ["latin"],
});
const mont = Montserrat({
	variable: "--font-mont",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ToDo App",
	description: "Todo for different days",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${libre.variable} ${mont.variable} antialiased`}>{children}</body>
		</html>
	);
}
