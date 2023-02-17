export const queryByXPath = (xpath) => {
  const xResult = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  )
  const xNodes = []
  let xres
  while ((xres = xResult.iterateNext())) {
    xNodes.push(xres)
  }

  return xNodes
}
