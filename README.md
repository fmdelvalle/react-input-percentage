[![NPM](https://img.shields.io/npm/v/react-input-percentage.svg)](https://www.npmjs.com/package/react-input-percentage)
[![CircleCI](https://circleci.com/gh/fmdelvalle/react-input-percentage/tree/master.svg?style=shield)](https://circleci.com/gh/fmdelvalle/react-input-percentage/tree/master)
[![Coverage Status](https://coveralls.io/repos/fmdelvalle/react-input-percentage/badge.svg?branch=master&service=github)](https://coveralls.io/github/fmdelvalle/react-input-percentage?branch=master)

# React-input-percentage

The React Input control for [React](https://reactjs.com). Initially built for use in [KeystoneJS](http://www.keystonejs.com).

Features include:

- Flexible amount of decimal positions (0, 1 or 2)
- Support for comma (',') instead of dot ('.') as a separator
- Support for min, max, and change steps (with arrows)
- Only managed mode

This is my first upload to Github, so feel free to suggest improvements or changes!


# Installation and usage

The easiest way to use react-input-percentage is to install it from npm and build it into your app with Webpack.

```
yarn add react-input-percentage
```

Then use it in your app:

#### With React Component

```js
import React from 'react';
import InputPercentage from 'react-input-percentage';
import "react-input-percentage/dist/react-input-percentage.cjs.css';

class App extends React.Component {
  state = {
    value: null,
  };
  handleChange = (value) => {
    this.setState({ value }, () =>
      console.log(`Value received:`, this.state.value)
    );
  };
  render() {
    const { value } = this.state;

    return (
      <InputPercentage
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
```

#### With React Hooks

```js
import React, { useState } from 'react';
import InputPercentage from 'react-input-percentage';
import "react-input-percentage/dist/react-input-percentage.cjs.css';

export default function App() {
  const [value, setValue] = useState(null);

  return (
    <div className="App">
      <InputPercentage
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
```

## Props

Common props you may want to specify include:

- `className` - apply a className to the control (i.e. 'form-control', for Bootstrap)
- `disabled` - disable the control
- `readOnly` - control is read-only
- `onChange` - subscribe to new values (it will receive string or null, not an event)
- `value` - control the current value
- `decimals` - how many decimals (aka precission) to use (0, 1 or 2). A value of 2, for example, will send values like '99.23%' to onChange().
- `decimal_point` - what to use as a decimal point (',' or '.'). Some languages use comma to separate them. Will only be used for rendering.
- `min` - you can limit the minimum acceptable value (i.e., 0). You can still receive nulls though.
- `max` - you can limit the maximum acceptable value (i.e., 100). You can still receive nulls though.
- `step` - how much do the arrows increment/decrement the current value. By default, 1.
- `symbol` - symbol to append to the value. It will be included in the onChange() calls. By default, '%', though you can use '', '$', etc.

See the [props documentation](https://www.react-input-percentage.com/props) for complete documentation on the props react-input-percentage supports.

## Controllable Props

This control right now accepts only 'managed mode'. That means that the parent has to supply some value and act on changes. Not all changes get 
promoted to the parent (only the ones with valid values, or null).

- `value` / `onChange` - specify the current value of the control


## License

GNU GPL v3. Copyright (c) Fernando del Valle 2021.
