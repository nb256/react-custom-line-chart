export const fetchGraphData = () => {
  return new Promise((resolve, reject) => {
    // fake latency for real server experience
    setTimeout(() => {
      resolve({
        male: [5, 10, 30, 36, 30, 20, 10, 5, 4, 3],
        female: [3, 5, 10, 15, 25, 30, 25, 20, 10, 5],
        average: 41
      });
    }, 2000);
  });
};
