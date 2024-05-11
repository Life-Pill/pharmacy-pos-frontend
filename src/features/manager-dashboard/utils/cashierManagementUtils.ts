export const calculateActiveWorkers = (workers: any) => {
  // Filter the workers array to get only active workers
  const activeWorkers = workers.filter((worker: any) => worker.activeStatus);

  // Return the count of active workers
  return activeWorkers.length;
};
export const calculateMaleFemaleWorkers = (workers: any) => {
  // Initialize counters for male and female workers
  let maleCount = 0;
  let femaleCount = 0;

  // Loop through the workers array and increment the counters based on gender
  workers.forEach((worker: any) => {
    if (worker.gender === 'MALE') {
      maleCount++;
    } else if (worker.gender === 'FEMALE') {
      femaleCount++;
    }
  });

  // Return an object with male and female worker counts
  return { maleCount, femaleCount };
};
