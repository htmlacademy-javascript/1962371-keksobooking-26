//Функция, возвращающая случайное целое число из переданного диапазона включительно!
const getRandomPositiveInteger = (min, max) => {
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

getRandomPositiveInteger(1, 10);

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomPositiveFloat = (min, max, digits = 1) => {
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
  return parseFloat(result.toFixed(digits));
};

getRandomPositiveFloat(1, 10);
