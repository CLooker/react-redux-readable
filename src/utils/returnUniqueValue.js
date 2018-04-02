const returnUniqueValue = () =>
  String(Date.now()) +
  Math.random()
    .toString(36)
    .substr(2, 34) +
  Math.random()
    .toString(36)
    .substr(2, 34) +
  Math.random()
    .toString(36)
    .substr(2, 34);

export default returnUniqueValue;
