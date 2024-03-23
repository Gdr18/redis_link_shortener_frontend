import * as React from 'react'
const CrossIcon = props => (
	<svg
		width={16}
		height={16}
		strokeLinejoin='round'
		data-testid='geist-icon'
		style={{
			color: 'currentcolor'
		}}
		{...props}
	>
		<path
			fill='currentColor'
			fillRule='evenodd'
			d='m12.47 13.53.53.53L14.06 13l-.53-.53L9.06 8l4.47-4.47.53-.53L13 1.94l-.53.53L8 6.94 3.53 2.47 3 1.94 1.94 3l.53.53L6.94 8l-4.47 4.47-.53.53L3 14.06l.53-.53L8 9.06l4.47 4.47Z'
			clipRule='evenodd'
		/>
	</svg>
)
export default CrossIcon
