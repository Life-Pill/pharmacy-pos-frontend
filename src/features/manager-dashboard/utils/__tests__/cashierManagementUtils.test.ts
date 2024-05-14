import {
  calculateActiveWorkers,
  calculateMaleFemaleWorkers,
} from '../cashierManagementUtils';

describe('calculateActiveWorkers', () => {
  it('should return 0 if no workers are provided', () => {
    var workers;
    const result = calculateActiveWorkers(workers);
    expect(result).toBe(0);
  });

  it('should return 0 if no workers are active', () => {
    const workers = [{ activeStatus: false }, { activeStatus: false }];
    const result = calculateActiveWorkers(workers);
    expect(result).toBe(0);
  });

  it('should return the count of active workers', () => {
    const workers = [
      { activeStatus: true },
      { activeStatus: false },
      { activeStatus: true },
    ];
    const result = calculateActiveWorkers(workers);
    expect(result).toBe(2);
  });

  it('should handle edge case of empty active workers array', () => {
    const workers = [{ activeStatus: true }];
    const result = calculateActiveWorkers(workers);
    expect(result).toBe(1);
  });

  it('should handle edge case of large number of workers with varying active statuses', () => {
    const workers = new Array(100).fill({ activeStatus: true });
    workers[10].activeStatus = false;
    workers[50].activeStatus = false;
    const result = calculateActiveWorkers(workers);
    expect(result).toBe(98);
  });
});

describe('calculateMaleFemaleWorkers', () => {
  it('should return an object with 0 male and 0 female counts if no workers are provided', () => {
    var workers;
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 0, femaleCount: 0 });
  });

  it('should correctly count male and female workers', () => {
    const workers = [
      { gender: 'MALE' },
      { gender: 'FEMALE' },
      { gender: 'MALE' },
      { gender: 'MALE' },
      { gender: 'FEMALE' },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 3, femaleCount: 2 });
  });

  it('should handle edge cases such as undefined gender', () => {
    const workers = [
      { gender: 'MALE' },
      { gender: undefined },
      { gender: 'FEMALE' },
      { gender: 'MALE' },
      { gender: undefined },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 2, femaleCount: 1 });
  });

  it('should handle edge cases such as null gender', () => {
    const workers = [
      { gender: 'MALE' },
      { gender: null },
      { gender: 'FEMALE' },
      { gender: null },
      { gender: 'MALE' },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 2, femaleCount: 1 });
  });

  it('should handle edge case of empty workers array', () => {
    var workers;
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 0, femaleCount: 0 });
  });

  it('should handle edge case of only male workers', () => {
    const workers = [
      { gender: 'MALE' },
      { gender: 'MALE' },
      { gender: 'MALE' },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 3, femaleCount: 0 });
  });

  it('should handle edge case of only female workers', () => {
    const workers = [
      { gender: 'FEMALE' },
      { gender: 'FEMALE' },
      { gender: 'FEMALE' },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 0, femaleCount: 3 });
  });

  it('should handle edge case of no male or female workers', () => {
    const workers = [{ gender: 'OTHER' }, { gender: 'OTHER' }];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 0, femaleCount: 0 });
  });

  it('should handle edge case of mixed genders and null/undefined values', () => {
    const workers = [
      { gender: 'MALE' },
      { gender: undefined },
      { gender: 'FEMALE' },
      { gender: null },
      { gender: 'MALE' },
      { gender: 'OTHER' },
    ];
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 2, femaleCount: 1 });
  });

  it('should handle edge case of large number of workers with various genders', () => {
    const workers = new Array(100).fill({ gender: 'MALE' });
    workers[10].gender = 'FEMALE';
    workers[50].gender = 'FEMALE';
    workers[75].gender = undefined;
    workers[90].gender = 'OTHER';
    const result = calculateMaleFemaleWorkers(workers);
    expect(result).toEqual({ maleCount: 97, femaleCount: 2 });
  });
});
