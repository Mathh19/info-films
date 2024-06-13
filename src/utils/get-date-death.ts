export const getDateDeath = (dateBirthday: string, dateDeath: string) => {
  const dateOfBirth = new Date(dateBirthday);
  const dateOfDeath = new Date(dateDeath);
  const differenceTime = dateOfDeath.getTime() - dateOfBirth.getTime();
  const age = Math.floor(differenceTime / (1000 * 60 * 60 * 24 * 365.25));
  return age;
};
