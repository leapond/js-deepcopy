import {getMergeType} from "leapond-js-utils";

/**
 * Object, Array, Set, Map supported deep copy.
 * @param target
 * @param {number} [depthMax]
 * @return {Map<any, any>|Set<any>|*[]|*}
 */
export default function deepCopy(target, depthMax = Infinity) {
  if (!target) return target
  let args = arguments, typeTarget = args[2], depthCurrent = args[3] || 0, aLoops = args[4], dest, v
  if (!(typeTarget > -1)) typeTarget = getMergeType(target)
  if (!typeTarget || depthCurrent >= depthMax) return target

  depthCurrent++

  aLoops = aLoops ? [...aLoops, target] : [target]

  switch (typeTarget) {
    case 1:
    case 2:
      dest = typeTarget === 1 ? {} : []
      Object.keys(target).forEach(k => {
        v = target[k]
        dest[k] = aLoops.includes(v) ? v : deepCopy(v, depthMax, -1, depthCurrent, aLoops)
      })
      return dest
    case 3:
      dest = new Set;
      target.forEach(v => {
        dest.add(deepCopy(v, depthMax, -1, depthCurrent, aLoops))
      })
      return dest
    case 4:
      dest = new Map;
      target.forEach((v, k) => {
        dest.set(k, deepCopy(v, depthMax, -1, depthCurrent, aLoops))
      })
      return dest
  }
  return target
}