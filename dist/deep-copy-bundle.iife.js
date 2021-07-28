var deepCopy = (function () {
  'use strict';

  var toStr = Object.prototype.toString;
  var mergeTypes = {'[object Object]': 1, '[object Array]': 2, '[object Set]': 3, '[object Map]': 4};

  function getMergeType(target) {
    return target &&
        typeof target === 'object' &&
        mergeTypes[toStr.call(target)] ||
        0
  }

  /**
   * Object, Array, Set, Map supported deep copy.
   * @param target
   * @param {number} [depthMax]
   * @return {Map<any, any>|Set<any>|*[]|*}
   */
  function deepCopy(target, depthMax) {
    if ( depthMax === void 0 ) depthMax = Infinity;

    if (!target) { return target }
    var args = arguments, typeTarget = args[2], depthCurrent = args[3] || 0, aLoops = args[4], dest, v;
    if (!(typeTarget > -1)) { typeTarget = getMergeType(target); }
    if (!typeTarget || depthCurrent >= depthMax) { return target }

    depthCurrent++;

    aLoops = aLoops ? aLoops.concat( [target]) : [target];

    switch (typeTarget) {
      case 1:
      case 2:
        dest = typeTarget === 1 ? {} : [];
        Object.keys(target).forEach(function (k) {
          v = target[k];
          dest[k] = aLoops.includes(v) ? v : deepCopy(v, depthMax, -1, depthCurrent, aLoops);
        });
        return dest
      case 3:
        dest = new Set;
        target.forEach(function (v) {
          dest.add(deepCopy(v, depthMax, -1, depthCurrent, aLoops));
        });
        return dest
      case 4:
        dest = new Map;
        target.forEach(function (v, k) {
          dest.set(k, deepCopy(v, depthMax, -1, depthCurrent, aLoops));
        });
        return dest
    }
    return target
  }

  return deepCopy;

}());
//# sourceMappingURL=deep-copy-bundle.iife.js.map
