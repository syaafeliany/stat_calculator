// stats.js

function calculateBasicStats(numbers) {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;

  const freq = {};
  let maxFreq = 0;
  let mode = [];

  for (const num of numbers) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] > maxFreq) {
      maxFreq = freq[num];
    }
  }

  for (const key in freq) {
    if (freq[key] === maxFreq) {
      mode.push(Number(key));
    }
  }

  const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);

  return { mean, median, mode, variance, stdDev };
}

// Add probability distribution functions
function calculateNormalPDF(x, mean, stdDev) {
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

// Inferential statistics: confidence interval (95%)
function confidenceInterval(numbers) {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const stdDev = Math.sqrt(numbers.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (numbers.length - 1));
  const z = 1.96; // for 95% CI
  const margin = z * (stdDev / Math.sqrt(numbers.length));
  return [mean - margin, mean + margin];
}

// Regression (simple linear)
function linearRegression(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = y.reduce((a, b) => a + b) / n;

  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (x[i] - meanX) * (y[i] - meanY);
    den += Math.pow(x[i] - meanX, 2);
  }

  const slope = num / den;
  const intercept = meanY - slope * meanX;
  const r = num / (Math.sqrt(x.reduce((s, xi) => s + Math.pow(xi - meanX, 2), 0)) * 
                   Math.sqrt(y.reduce((s, yi) => s + Math.pow(yi - meanY, 2), 0)));

  return { slope, intercept, correlation: r };
}
