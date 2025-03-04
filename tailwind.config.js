/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				text: "#ede8f5",
				primary: "#16161A",
				secondary: "#46158f",
				accent: "#701dee",

				backgroundPrimary: "#000000",
				backgroundSecondary: "#222222",
				aside: "#16161A",
			},
			backgroundImage: {
				body: "url('https://www.transparenttextures.com/patterns/batthern.png')",
			},
		},
		fontFamily: {
			title: "Playfair Display",
			paragraph: "Fira Code",
		},
	},
	plugins: [],
};
