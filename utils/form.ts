export const clearFormValues = (data: Object) => {
  const res = JSON.parse(JSON.stringify(data));
  Object.keys(data).forEach((key) => {
    const value = data[key];

    const invalidValue = value === undefined || value === null;
    const emptyString = typeof value === "string" && value.length === 0;
    const emptyObject = typeof value === "object" && Object.keys(value).length === 0;

    if (invalidValue || emptyString || emptyObject) {
      delete res[key];
    }
  });

  return res;
}
