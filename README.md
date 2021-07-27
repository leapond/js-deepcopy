# js-deepcopy

Object, Array, Set, Map supported deepcopy.

## Installation

**NPM**

```shell
npm i leapond-deepcopy
```

**Yarn**

```shell
yarn add leapond-deepcopy
```

## Usage

```javascript
// bundled
import deepCopy from "leapond-deepcopy";
// source (recommend)
import deepCopy from "leapond-deepcopy/src";

let target = {
  a: [1, 2, 3],
  o: {x: 1, y: 2, z: {zz: 3}},
  s: new Set([1, 2]),
  m: new Map([[1, 100]])
}, result

console.log(
    result = deepCopy(target, 2/* depthMax */),
    result === target,        // false
    result.a,
    result.a === target.a,    // false
    result.o,
    result.o === target.o,    // false
    result.s,
    result.s === target.s,    // false
    result.m,
    result.m === target.m,    // false
    result.o.z,
    result.o.z === target.o.z // true
)
```