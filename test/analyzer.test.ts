import { Analyzer } from '../src/domain/interfaces/analyzer';
import { it, expect, vi } from 'vitest';

it('correctly evaluates male genders', () => {
  const maleRow = [{ gender: 'm' }, { gender: 'M' }, { gender: 'male' }];
  const analyzer = new Analyzer();
  maleRow.forEach((row) => analyzer.analyzeGender(row.gender));
  const result = analyzer.getAnalytics();
  expect(result.genders.male).equals(3);
  expect(result.genders.female).equals(0);
  expect(result.genders.other).equals(0);
});
it('correctly evaluates female genders', () => {
  const femaleRow = [{ gender: 'f' }, { gender: 'F' }, { gender: 'female' }];
  const analyzer = new Analyzer();
  femaleRow.forEach((row) => analyzer.analyzeGender(row.gender));
  const result = analyzer.getAnalytics();
  expect(result.genders.male).equals(0);
  expect(result.genders.female).equals(3);
  expect(result.genders.other).equals(0);
});
it('correctly evaluates other genders', () => {
  const otherGenders = [{ gender: null }, { gender: 'mouse' }];
  const analyzer = new Analyzer();
  otherGenders.forEach((row) => analyzer.analyzeGender(row.gender));
  const result = analyzer.getAnalytics();
  expect(result.genders.male).equals(0);
  expect(result.genders.female).equals(0);
  expect(result.genders.other).equals(2);
});
it('calculates average weight correctly', () => {
  const maleRow = [
    { gender: 'm', weight: '20' },
    { gender: 'M', weight: '40' },
    { gender: 'male', weight: '30' },
  ];
  const analyzer = new Analyzer();
  maleRow.forEach((row) => analyzer.analyzeRow(row));
  expect(analyzer.getAnalytics().average_weight).equals(30);
});
it('calculates average age correctly', () => {
  const date = new Date(2023, 1, 23, 11);
  vi.setSystemTime(date);
  const dateRows = [
    { born: '1994-12-14 00:00:00' }, // 28 years
    { born: '1995-12-14 00:00:00' }, // 27 years
    { born: '1996-12-14 00:00:00' }, // 26 years
    { born: 'invalid-string' }, // 0 years
  ];
  const analyzer = new Analyzer();
  dateRows.forEach((row) => analyzer.analyzeRow(row));
  expect(analyzer.getAnalytics().average_age).equals(20.25);
  vi.useRealTimers();
});
