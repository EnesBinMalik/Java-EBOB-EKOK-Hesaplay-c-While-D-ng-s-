import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '18 ve 24 sayılarının en büyük ortak böleni (EBOB) kaçtır?',
    n1: 18,
    n2: 24,
    options: ['3', '6', '8', '12'],
    correctIndex: 1,
    explanation:
      "18'in bölenleri: 1, 2, 3, 6, 9, 18. 24'ün bölenleri: 1, 2, 3, 4, 6, 8, 12, 24. Ortak bölenler: 1, 2, 3, 6. En büyüğü 6'dır.",
  },
  {
    id: 2,
    question: '6 ve 8 sayılarının en küçük ortak katı (EKOK) kaçtır?',
    n1: 6,
    n2: 8,
    options: ['16', '18', '24', '48'],
    correctIndex: 2,
    explanation:
      "6'nın katları: 6, 12, 18, 24, 30... 8'in katları: 8, 16, 24, 32... İlk kesişen en küçük ortak kat 24'tür. Ayrıca Formül: (6 * 8) / EBOB(6,8) = 48 / 2 = 24.",
  },
  {
    id: 3,
    question: 'EBOB(a, b) = 1 olan iki sayı için hangi ifade doğrudur?',
    options: [
      'Bu iki sayı çift sayıdır.',
      'Bu iki sayı aralarında asaldır ve EKOK(a, b) = a * b olur.',
      'Sayıların toplamı her zaman asaldır.',
      'Bu sayıların ortak katı yoktur.',
    ],
    correctIndex: 1,
    explanation:
      'EBOB değeri 1 olan sayılara "Aralarında Asal Sayılar" denir. Formülden: EKOK = (a * b) / 1 = a * b olur (Örn: 7 ve 9 için EBOB 1, EKOK 63).',
  },
  {
    id: 4,
    question: 'n1=20 ve n2=30 iken, EBOB = 10 bulunmuştur. EKOK değeri formülle nasıl hesaplanır?',
    options: [
      'EKOK = 20 + 30 - 10 = 40',
      'EKOK = (20 * 30) / 10 = 60',
      'EKOK = (20 * 30) * 10 = 6000',
      'EKOK = (20 + 30) / 10 = 5',
    ],
    correctIndex: 1,
    explanation:
      'EKOK = (n1 * n2) / EBOB formülünden: (20 * 30) / 10 = 600 / 10 = 60 çıkar.',
  },
  {
    id: 5,
    question: 'While döngüsünde "while(i <= minSayi)" kullanmamızın mantığı nedir?',
    options: [
      'Programın sonsuz döngüye girmesi için',
      'Ortak bir bölenin, küçük olan sayıdan daha büyük olması imkansız olduğu için',
      'Java derleyicisinin zorunlu kuralı olduğu için',
      'EKOK değerinin küçük sayıya eşit olmasını sağlamak için',
    ],
    correctIndex: 1,
    explanation:
      'Bir sayının böleni o sayıdan büyük olamaz. Dolayısıyla iki sayının ortak böleni de sayıların küçüğünden büyük olamaz. minSayi sonrası kontrol etmek gereksizdir.',
  },
];
