const isReady = (formsArr) => {
  const valueArr = formsArr.map((form) => form.length);
  return !valueArr.includes(0);
};

// =====================
// AVAILABILITY
// =====================

const allAvailableForDay = (formsArr, dayIndex) => {
  const available = formsArr.map((form) => form[dayIndex]);
  return !available.includes(0);
};

const availableDays = (formsArr) => {
  const days = [];
  formsArr[0].forEach((_day, i) => {
    const isAvailable = allAvailableForDay(formsArr, i);
    if (isAvailable) days.push(i);
  });
  return days;
};

const availableScores = (formsArr) => {
  const availableArr = availableDays(formsArr);
  const scoresArr = dayScores(formsArr);
  return scoresArr.map((score, i) => (availableArr.includes(i) ? score : 0));
};

// =====================
// BEST
// =====================

const dayScore = (formsArr, dayIndex) => {
  let score = 0;
  formsArr.forEach((form) => (score += form[dayIndex]));
  return score;
};

const dayScores = (formsArr) =>
  formsArr[0].map((_day, i) => dayScore(formsArr, i));

const bestDays = (formsArr) => {
  const aScores = availableScores(formsArr);
  const highScore = Math.max(...aScores);
  let myBestDays = [];
  aScores.forEach((score, i) => {
    if (score === highScore) myBestDays.push(i);
  });
  return highScore === 0 ? [-1] : myBestDays;
};

// =====================
// EXTRAS
// =====================

const sumArr = (arr) => arr.reduce((pre, pos) => pre + pos);

const getMedalCount = (formsArr, dayIndex, medalNumber) => {
  const medals = formsArr.map((form) =>
    form[dayIndex] === medalNumber ? 1 : 0
  );
  return sumArr(medals);
};

// =====================
// CALLABLE
// =====================

const getBestDay = (formsArr) => {
  const bestDaysArr = bestDays(formsArr);
  return bestDaysArr[0];
};

const getHighscoreDay = (formsArr) => {
  const scores = dayScores(formsArr);
  const highScore = Math.max(...scores);
  return scores.indexOf(highScore);
};

const medalCounts = (formsArr, bestDay) =>
  [3, 2, 1].map((val) => getMedalCount(formsArr, bestDay, val));

const finalResult = {
  isReady,
  getBestDay,
  medalCounts,
  getHighscoreDay,
};

module.exports = finalResult;

// const testData = [
//   [0, 1, 0, 0, 3, 2],
//   [0, 0, 1, 0, 0, 1],
//   [0, 1, 2, 1, 3, 2],
// ];

// console.log(getBestDay(testData));
// console.log(getHighscoreDay(testData));
