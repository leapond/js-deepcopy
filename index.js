import {getMergeType} from "leapond-js-utils";

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
      [...target.values()].forEach(v => {
        dest.add(deepCopy(v, depthMax, -1, depthCurrent, aLoops))
      });
      return dest
    case 4:
      dest = new Map;
      [...target.entries()].forEach(v => {
        dest.set(v[0], deepCopy(v[1], depthMax, -1, depthCurrent, aLoops))
      })
      return dest
  }
  return target
}