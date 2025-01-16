/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				text: "#ede8f5",
				background: "#11091d",
				primary: "#ab86e4",
				secondary: "#46158f",
				accent: "#701dee",
			},
		},
	},
	plugins: [],
};
