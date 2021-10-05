import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';

import config, { plugins } from './rollup.config.common';
import scss from 'rollup-plugin-scss';

export default Object.assign(config, {
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
		},
	],
	plugins: plugins.concat([terser(),scss()]),
});
