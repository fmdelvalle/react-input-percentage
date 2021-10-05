import config, { plugins } from './rollup.config.common';
import pkg from '../package.json';
import scss from 'rollup-plugin-scss';

export default Object.assign(config, {
	output: {
		name: 'ReactInputPercentage',
		file: `dist/${pkg.name}.dev.js`,
		format: 'cjs',
		exports: 'named',
	},
	plugins: plugins.concat([ scss() ]),
});
