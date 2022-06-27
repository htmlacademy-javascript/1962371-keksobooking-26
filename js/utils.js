//Функция, возвращающая случайное целое число из переданного диапазона включительно!
export const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveInteger(Math.abs(min), Math.abs(max));
  }

  if (max < min) {
    return getRandomPositiveInteger(max, min);
  }

  if (max === min) {
    return min;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
export const getRandomPositiveFloat = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    return getRandomPositiveFloat(Math.abs(min), Math.abs(max), digits);
  }

  if (max < min) {
    return getRandomPositiveFloat(max, min, digits);
  }

  if (max === min) {
    return parseFloat(min.toFixed(digits));
  }

  const result = Math.random() * (max - min) + min;
  return result.toFixed(digits);
};

//Функция, возвращающая число с ведущий нулем
export const getNumberWithZero = (number) => number < 10 ? `0${number}` : number;

//Функция, возвращающая рандомный элемент
export const getRandomElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

//Функция, возвращающая массив случайной длины
export const getRandomArrayPart = (arr) => {
  const indexes = [getRandomPositiveInteger(0, arr.length), getRandomPositiveInteger(0, arr.length)];
  return arr.slice(...indexes.sort());
};
