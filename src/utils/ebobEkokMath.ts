import { EbobEkokResult, FactorizationStep, LoopMethod, LoopStep } from '../types';

/**
 * Returns all positive divisors of a positive integer n in ascending order.
 */
export function getDivisors(n: number): number[] {
  if (n <= 0) return [];
  const divisors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

/**
 * Returns the first count multiples of a positive integer n.
 */
export function getMultiples(n: number, count: number): number[] {
  if (n <= 0 || count <= 0) return [];
  const multiples: number[] = [];
  for (let i = 1; i <= count; i++) {
    multiples.push(n * i);
  }
  return multiples;
}

/**
 * Calculates EBOB (GCD) using Euclidean method
 */
export function calculateGcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

/**
 * Generates prime factorization steps (Bölen listesi çizgisi)
 */
export function getPrimeFactorizationSteps(n1: number, n2: number): FactorizationStep[] {
  let a = n1;
  let b = n2;
  let prime = 2;
  const steps: FactorizationStep[] = [];

  while (a > 1 || b > 1) {
    if (a % prime === 0 || b % prime === 0) {
      const dividesBoth = a % prime === 0 && b % prime === 0;
      steps.push({
        currentN1: a,
        currentN2: b,
        prime,
        dividesBoth,
      });

      if (a % prime === 0) a = Math.floor(a / prime);
      if (b % prime === 0) b = Math.floor(b / prime);
    } else {
      prime++;
    }
  }

  // Push final state (1, 1)
  steps.push({
    currentN1: 1,
    currentN2: 1,
    prime: 0,
    dividesBoth: false,
  });

  return steps;
}

/**
 * Generates step-by-step trace of the chosen while loop implementation
 */
export function generateLoopSteps(
  n1: number,
  n2: number,
  method: LoopMethod
): LoopStep[] {
  const steps: LoopStep[] = [];
  const minVal = Math.min(n1, n2);

  if (method === 'ascending') {
    // Klasik 1'den min(n1, n2)'ye kadar while döngüsü
    let i = 1;
    let currentEbob = 1;
    let stepNum = 1;

    while (i <= minVal) {
      const n1Div = n1 % i === 0;
      const n2Div = n2 % i === 0;
      const isCommon = n1Div && n2Div;

      if (isCommon) {
        currentEbob = i;
      }

      steps.push({
        stepNumber: stepNum++,
        i,
        n1,
        n2,
        n1Divisible: n1Div,
        n2Divisible: n2Div,
        isCommonDivisor: isCommon,
        ebobSoFar: currentEbob,
        codeLine: isCommon ? 5 : 4,
        actionDescription: isCommon
          ? `${i} sayısı hem ${n1}'i hem de ${n2}'yi tam bölüyor! Ortak bölen bulundu. Güncel EBOB: ${currentEbob}`
          : `${i} sayısı ortak bölen değil (${!n1Div ? `${n1} tam bölünmez` : ''}${!n1Div && !n2Div ? ', ' : ''}${!n2Div ? `${n2} tam bölünmez` : ''}).`,
      });

      i++;
    }
  } else if (method === 'descending') {
    // Optimize geriye doğru while döngüsü: min(n1, n2)'den 1'e doğru
    let i = minVal;
    let currentEbob = 1;
    let stepNum = 1;

    while (i >= 1) {
      const n1Div = n1 % i === 0;
      const n2Div = n2 % i === 0;
      const isCommon = n1Div && n2Div;

      if (isCommon) {
        currentEbob = i;
        steps.push({
          stepNumber: stepNum++,
          i,
          n1,
          n2,
          n1Divisible: n1Div,
          n2Divisible: n2Div,
          isCommonDivisor: true,
          ebobSoFar: currentEbob,
          codeLine: 6,
          actionDescription: `${i} sayısı hem ${n1}'i hem ${n2}'yi tam bölen EN BÜYÜK ilk sayı! EBOB = ${i} bulundu, döngü sonlandırıldı (break).`,
        });
        break;
      } else {
        steps.push({
          stepNumber: stepNum++,
          i,
          n1,
          n2,
          n1Divisible: n1Div,
          n2Divisible: n2Div,
          isCommonDivisor: false,
          ebobSoFar: currentEbob,
          codeLine: 4,
          actionDescription: `${i} sayısı ortak bölen değil, bir küçüğe geçiliyor (i--).`,
        });
      }

      i--;
    }
  } else if (method === 'euclidean') {
    // Öklid while döngüsü
    let a = n1;
    let b = n2;
    let stepNum = 1;

    while (b !== 0) {
      const remainder = a % b;
      steps.push({
        stepNumber: stepNum++,
        i: remainder,
        n1: a,
        n2: b,
        n1Divisible: true,
        n2Divisible: true,
        isCommonDivisor: remainder === 0,
        ebobSoFar: b,
        codeLine: 3,
        actionDescription: `${a} % ${b} = ${remainder}. Yeni a = ${b}, yeni b = ${remainder}.`,
      });
      a = b;
      b = remainder;
    }
  } else if (method === 'direct_ekok') {
    // Doğrudan EKOK için while döngüsü
    const maxVal = Math.max(n1, n2);
    let i = maxVal;
    let stepNum = 1;
    const maxSteps = 100; // safety limit

    while (stepNum <= maxSteps) {
      const n1Div = i % n1 === 0;
      const n2Div = i % n2 === 0;
      const isCommon = n1Div && n2Div;

      if (isCommon) {
        steps.push({
          stepNumber: stepNum++,
          i,
          n1,
          n2,
          n1Divisible: n1Div,
          n2Divisible: n2Div,
          isCommonDivisor: true,
          ebobSoFar: i,
          codeLine: 5,
          actionDescription: `${i} sayısı hem ${n1}'e hem ${n2}'ye tam bölünüyor! İlk ortak kat bulundu: EKOK = ${i}.`,
        });
        break;
      } else {
        steps.push({
          stepNumber: stepNum++,
          i,
          n1,
          n2,
          n1Divisible: n1Div,
          n2Divisible: n2Div,
          isCommonDivisor: false,
          ebobSoFar: 0,
          codeLine: 4,
          actionDescription: `${i} sayısı ortak kat değil (${!n1Div ? `${n1}'in katı değil` : ''}${!n1Div && !n2Div ? ', ' : ''}${!n2Div ? `${n2}'nin katı değil` : ''}). i++ ile devam.`,
        });
      }
      i++;
    }
  }

  return steps;
}

/**
 * Calculates complete analysis of two numbers
 */
export function analyzeNumbers(
  n1Input: number,
  n2Input: number,
  method: LoopMethod = 'ascending'
): EbobEkokResult {
  const n1 = Math.max(1, Math.floor(n1Input || 1));
  const n2 = Math.max(1, Math.floor(n2Input || 1));

  const ebob = calculateGcd(n1, n2);
  const ekok = Math.floor((n1 * n2) / ebob);

  const n1Divisors = getDivisors(n1);
  const n2Divisors = getDivisors(n2);
  const commonDivisors = n1Divisors.filter((d) => n2Divisors.includes(d));

  // Determine how many multiples to show
  const multiplesCount = Math.min(12, Math.max(5, Math.ceil(ekok / Math.min(n1, n2)) + 1));
  const n1Multiples = getMultiples(n1, multiplesCount);
  const n2Multiples = getMultiples(n2, multiplesCount);

  const steps = generateLoopSteps(n1, n2, method);

  return {
    n1,
    n2,
    ebob,
    ekok,
    n1Divisors,
    n2Divisors,
    commonDivisors,
    n1Multiples,
    n2Multiples,
    isCoprime: ebob === 1,
    steps,
  };
}
