export default errors =>
  errors.reduce((acc, currVal) => {
    if (currVal.path in acc) {
      acc[currVal.path].push(currVal.message);
    } else {
      acc[currVal.path] = [currVal.message];
    }

    return acc;
  }, {});
