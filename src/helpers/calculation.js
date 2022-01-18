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

const getHighFreeDay = (formsArr) => {
  const bestDaysArr = bestDays(formsArr);
  return bestDaysArr[0];
};

const getHighScoreDay = (formsArr) => {
  const scores = dayScores(formsArr);
  const highScore = Math.max(...scores);
  return scores.indexOf(highScore);
};

const getSoonestDay = (formsArr) => {
  const available = availableDays(formsArr);
  return available[0];
};

const medalCounts = (formsArr, bestDay) =>
  [3, 2, 1, 0].map((val) => getMedalCount(formsArr, bestDay, val));

const scoreComparison = (highFreeDayScore, highScoreDayScore) => {
  if (highFreeDayScore === highScoreDayScore) return 0;
  return (highScoreDayScore / highFreeDayScore) - 1
};

const getFinalResult = (formsArr) => {
  const highFreeDay = getHighFreeDay(formsArr); // 5
  const highScoreDay = getHighScoreDay(formsArr); // 4

  const highFreeDayScore = dayScore(formsArr, highFreeDay); // 5
  const highScoreDayScore = dayScore(formsArr, highScoreDay); // 6

  const scoreDifference = scoreComparison(highFreeDayScore, highScoreDayScore); //0.20 rd up
  const highFreeDayMedals = medalCounts(formsArr, highFreeDay);
  const highScoreDayMedals = medalCounts(formsArr, highScoreDay);

  const highScoreDayBusy = highScoreDayMedals[3] // 1
  const busyPercent = highScoreDayBusy/(formsArr.length) //0.33 rd down
  console.log(busyPercent)
};

const finalResult = {
  isReady,
  // getHighAvailabilityDay,
  medalCounts,
  // getHighscoreDay,
  getSoonestDay,
};

module.exports = finalResult;

const testData = [
  [0, 1, 0, 0, 3, 2],
  [0, 1, 1, 0, 0, 1],
  [0, 1, 2, 1, 3, 2],
];

// console.log(getBestDay(testData));
// console.log(getHighscoreDay(testData));
// console.log(getSoonestDay(testData));

console.log(getFinalResult(testData)); // { best: 5, secondary: 4, bestMedals: [0, 2, 1, 0], secondaryMedals: [2, 0, 0, 1] }
