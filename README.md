# Rex [![npm version](https://img.shields.io/npm/v/rex-react.svg)](https://www.npmjs.com/package/rex-react) [![license type](https://img.shields.io/npm/l/rex-react.svg)](https://github.com/llewan/rex.git/blob/master/LICENSE) [![codecov](https://codecov.io/gh/llewan/rex/branch/develop/graph/badge.svg)](https://codecov.io/gh/llewan/rex)
 
Simple library for helping share and manage state in react applications. It provides
a clear separation between business logic and views.

## Installation
```
npm install --save rex-react
```

And then import it:
```
// ES6 modules
import { Provider, Listener } from 'rex-react';

// commonjs
const Provider = require('rex-react').Provider;
const Listener = require('rex-react').Listener;
```

## API 
The library exposes two React components: `Provider` and `Listener`

### `<Provider />`
#### `props.entities`
This is an array of plain objects that represents the state of your app. It is mandatory that you pass at least one element.
```
<Provider entities={[Person, Ship]}>
  <div>...</div>
</Listener>
```

### `<Listener />`
#### `props.children`
A render function that is called with the array of objects/entities.
```
<Listener>
  {(Person, Ship) => {
    /* And you can access and do whetever with entities you provided before */
    <h1>{Person.getName()}</h1>
  }}
</Listener>
```

## Guide
First, wrap your main component with `Provider` and pass an array of objects or `entities` by prop. 
```
const App = (props) => {
  return (
    <Provider entities={[Counter]}>
      <Counter />
      <Display />
    </Provider>
  );
};
```
`Entities` are plain JS objects that represent the business logic of the application. You're free to model the logic of the program as you wish and every change on those objects will fire a setState, so,  make sure to use inmutable data types or re-render won't be fired. 
In this case:
 
```
const Counter = {
  counter: 1,
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  getCounter() {
    return this.counter;
  }
};
```
finally, every component that needs to be aware of the Counter object can do it this way:
```
const Counter = props => {
  return (
    <Listener>
      {counter => (
        <div>
          <button onClick={() => counter.increment()}>Increment</button>
          <button onClick={() => counter.decrement()}>Decrement</button>
        </div>
      )}
    </Listener>
  );
};

const Display = props => {
  return (
    <Listener>
      {counter => (<span>
        {counter.getCounter()}
      </span>)}
    </Listener>
  );
};
```

## Questions or suggestions?
Feel free to contact me on [Twitter](https://twitter.com/leolewan) or [open an issue](https://github.com/llewan/rex/issues/new).

 


