import { terser } from 'rollup-plugin-terser';
import config, { plugins } from './rollup.config.common';
import scss from 'rollup-plugin-scss';

export default Object.assign(config, {
	output: [
		{
			name: 'ReactInputPercentage',
			file: 'dist/react-input-percentage.umd.js',
			format: 'umd',
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
				'styled-components': 'styled',
				'lodash.orderby': 'orderby',
				deepmerge: 'deepmerge',
			},
			exports: 'named',
		},
	],
	plugins: plugins.concat([terser(), scss()]),
});
