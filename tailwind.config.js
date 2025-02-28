/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				text: "#ede8f5",
				background: "#0F0A16",
				primary: "#11091D",
				secondary: "#46158f",
				accent: "#701dee",
			},
		},
	},
	plugins: [],
};
