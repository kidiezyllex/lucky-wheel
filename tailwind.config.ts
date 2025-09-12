import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'
import reactAriaComponents from 'tailwindcss-react-aria-components'

export default {
	content: [
		'src/**/*!(*.stories|*.spec|*.test).{ts,tsx}',
		'stories/*.stories.{ts,tsx}',
		'index.html',
	],
	darkMode: ['class', 'class'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter Variable',
					...fontFamily.sans
				],
				mono: [
					'JetBrains Mono Variable',
					...fontFamily.mono
				]
			},
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				'gradient': 'gradient 9s infinite alternate linear',
				'makeItRain': 'makeItRain 3000ms infinite linear'
			},
			keyframes: {
				gradient: {
					'0%': {
						'background-position': '0% 50%',
						'background-image': 'linear-gradient(-45deg, #ef629f, #42275a)'
					},
					'50%': {
						'background-position': '100% 50%',
						'background-image': 'linear-gradient(to bottom, #aa076b, #61045f)'
					},
					'100%': {
						'background-position': '0% 50%',
						'background-image': 'linear-gradient(to top, #ef629f, #42275a)'
					}
				},
				makeItRain: {
					'from': {
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'to': {
						transform: 'translateY(250px)'
					}
				}
			}
		}
	},
	plugins: [
		forms,
		aspectRatio,
		typography,
		animate,
		reactAriaComponents,
	],
} satisfies Config
