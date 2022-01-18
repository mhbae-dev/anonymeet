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

const scoreComparison = (formsArr, highFreeDay, highScoreDay) => {
  const scoreFree = dayScore(formsArr, highFreeDay),
    scoreScore = dayScore(formsArr, highScoreDay);
  if (scoreFree === scoreScore) return 0;
  return scoreScore / scoreFree - 1;
};

const getFinalResult = (formsArr) => {
  const highFreeDay = getHighFreeDay(formsArr),
    highScoreDay = getHighScoreDay(formsArr),
    highFreeDayMedals = medalCounts(formsArr, highFreeDay),
    highScoreDayMedals = medalCounts(formsArr, highScoreDay);

  const scorePercent = scoreComparison(formsArr, highFreeDay, highScoreDay),
    busyPercent = highScoreDayMedals[3] / formsArr.length;

  return busyPercent > scorePercent
    ? {
        best: highFreeDay,
        secondary: highScoreDay,
        bestMedals: highFreeDayMedals,
        secondaryMedals: highScoreDayMedals,
      }
    : {
        best: highScoreDay,
        secondary: highFreeDay,
        bestMedals: highScoreDayMedals,
        secondaryMedals: highFreeDayMedals,
      };
};

const finalResult = {
  isReady,
  getFinalResult,
};

module.exports = finalResult;
