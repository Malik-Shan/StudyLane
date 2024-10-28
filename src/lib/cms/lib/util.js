export function coursesectionPathRegx(data) {
  const selectedValues = data.types
    .map((t) => t.abbreviation.toLowerCase())
    .join("|");
  const generatedRegex = new RegExp(`^(${selectedValues})[0-9-]+(?:-[0-9]+)*$`);
  return generatedRegex;
}
export function slugPathRegex(data) {
  const selectedValues = data.types
    .map((t) => t.abbreviation.toLowerCase())
    .join("|");
  const generatedRegex = new RegExp(`^(${selectedValues})\/[a-z0-9-]+(?<!-)$`);
  return generatedRegex;
}
export function slugDoublePathRegex(data) {
  const selectedValues = data.types
    .map((t) => t.abbreviation.toLowerCase())
    .join("|");
  const generatedRegex = new RegExp(
    `^(${selectedValues})\/[a-z0-9-]+\/[a-z0-9-]+(?<!-)$`,
  );
  return generatedRegex;
}
