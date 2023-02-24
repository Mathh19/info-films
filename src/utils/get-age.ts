export function getAge(date: string) {
  const dateOfBirth = new Date(date);
  const actualDate = new Date();
  const differenceTime = actualDate.getTime() - dateOfBirth.getTime();
  const age = Math.floor(differenceTime / (1000 * 60 * 60 * 24 * 365.25));
  return age;
}
