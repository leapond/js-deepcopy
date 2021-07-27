import deepCopy from "../dist/deep-copy-bundle.es";

const t = {a: 1, b: [2], s: new Set([10]), m: new Map([[1, {x: 100}]])}

test('deepCopy', () => {
  expect(deepCopy(1)).toBe(1)
  expect(deepCopy()).toBe(undefined)
  let r = deepCopy(t)
  expect(t !== r).toBe(true)
  expect(t.a === r.a).toBe(true)
  expect(t.b !== r.b && t.b[0] === r.b[0]).toBe(true)
  expect(t.s !== r.s && r.s.has(10)).toBe(true)
  expect(t.m !== r.m && t.m.get(1) !== r.m.get(1) && r.m.get(1).x).toBe(100)
})

test('deepCopy with depthMax', () => {
  let r1 = deepCopy(t, 1)
  expect(t !== r1).toBe(true)
  expect(t.b === r1.b).toBe(true)
})