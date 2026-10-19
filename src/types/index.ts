export type LoopMethod = 'ascending' | 'descending' | 'euclidean' | 'direct_ekok';

export interface LoopStep {
  stepNumber: number;
  i: number;
  n1: number;
  n2: number;
  n1Divisible: boolean;
  n2Divisible: boolean;
  isCommonDivisor: boolean;
  ebobSoFar: number;
  codeLine: number; // 1-indexed line in current snippet
  actionDescription: string;
}

export interface EbobEkokResult {
  n1: number;
  n2: number;
  ebob: number;
  ekok: number;
  n1Divisors: number[];
  n2Divisors: number[];
  commonDivisors: number[];
  n1Multiples: number[];
  n2Multiples: number[];
  isCoprime: boolean; // aralarında asal mı
  steps: LoopStep[];
}

export interface FactorizationStep {
  currentN1: number;
  currentN2: number;
  prime: number;
  dividesBoth: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  n1?: number;
  n2?: number;
  options: string[];
  correctIndex: number;
  explanation: string;
}
