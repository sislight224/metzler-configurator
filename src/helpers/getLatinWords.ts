export const getLatinWords = (value: string): string => {
  const germanLetters = { ä: 'a', ö: 'o', ü: 'u', ß: 'ss' };
  Object.keys(germanLetters).forEach((letter) => {
    value = value.replace(new RegExp(letter, 'g'), germanLetters[letter as keyof typeof germanLetters]);
  });

  return value;
};
