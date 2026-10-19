export interface JavaSnippet {
  id: string;
  title: string;
  shortDesc: string;
  filename: string;
  code: string;
  explanation: string;
}

export const JAVA_TEMPLATES: Record<string, JavaSnippet> = {
  standard: {
    id: 'standard',
    title: 'Ödev Çözümü: Standart While Döngüsü',
    shortDesc: '1\'den min(n1, n2)\'ye kadar while döngüsü ile EBOB ve EKOK = (n1*n2)/EBOB',
    filename: 'EbobEkokWhile.java',
    code: `import java.util.Scanner;

/**
 * Java ile iki sayının EBOB ve EKOK değerlerini While Döngüsü kullanarak bulan program.
 * 
 * EBOB: İki ya da daha fazla doğal sayının ortak bölenlerinin en büyüğüdür.
 * EKOK: İki ya da daha fazla doğal sayının ortak katlarının en küçüğüdür.
 * EKOK Formülü: (n1 * n2) / EBOB
 * 
 * @author Enes Öztürk
 */
public class EbobEkokWhile {
    public static void main(String[] args) {
        // Hazırlayan / Geliştirici: Enes Öztürk
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("  EBOB & EKOK HESAPLAMA PROGRAMI (WHILE DÖNGÜSÜ)  ");
        System.out.println("  Geliştirici: Enes Öztürk                        ");
        System.out.println("==================================================");

        // Kullanıcıdan iki sayıyı alıyoruz
        System.out.print("Birinci sayıyı (n1) giriniz: ");
        int n1 = scanner.nextInt();

        System.out.print("İkinci sayıyı (n2) giriniz : ");
        int n2 = scanner.nextInt();

        // 1. ADIM: While döngüsü ile EBOB hesaplama
        // Küçük olan sayı sınırımızdır (ortak bölen küçük sayıdan büyük olamaz)
        int minSayi = (n1 < n2) ? n1 : n2;
        int i = 1;
        int ebob = 1;

        // While döngüsü: i, minSayi değerine ulaşana kadar devam eder
        while (i <= minSayi) {
            // Eğer i sayısı hem n1'i hem n2'yi kalansız bölüyorsa ortak bölendir
            if (n1 % i == 0 && n2 % i == 0) {
                ebob = i; // En son bulunan en büyük ortak bölen hafızaya alınır
            }
            i++; // Döngü sayacı 1 artırılır
        }

        // 2. ADIM: Matematiksel formül ile EKOK hesaplama
        // Formül: EKOK = (n1 * n2) / EBOB
        int ekok = (n1 * n2) / ebob;

        // Sonuçları ekrana yazdırma
        System.out.println("\\n------------- HESAPLAMA SONUÇLARI -------------");
        System.out.println("Girilen Sayılar : " + n1 + " ve " + n2);
        System.out.println("EBOB(" + n1 + ", " + n2 + ")   : " + ebob);
        System.out.println("EKOK(" + n1 + ", " + n2 + ")   : " + ekok + "  [Formül: (" + n1 + " * " + n2 + ") / " + ebob + "]");
        
        if (ebob == 1) {
            System.out.println("Bilgi: Bu iki sayı aralarında asaldır (EBOB = 1).");
        }
        System.out.println("-------------------------------------------------");
        System.out.println("Program başarıyla tamamlandı. - Enes Öztürk");

        scanner.close();
    }
}`,
    explanation:
      'Bu yaklaşımda döngü 1\'den başlar ve küçük olan sayıya kadar artarak devam eder. Ortak bölenler her bulunduğunda ebob değişkeni güncellenir. Döngü bittiğinde en son atanan sayı en büyük ortak bölen (EBOB) olur. EKOK ise verilen (n1 * n2) / EBOB formülüyle doğrudan hesaplanır.',
  },

  optimized: {
    id: 'optimized',
    title: 'Optimize Çözüm: Geriye Doğru While Döngüsü',
    shortDesc: 'Küçük sayıdan 1\'e geriye sayar, ilk bulunan ortak bölen doğrudan EBOB\'dur (break ile durur)',
    filename: 'EbobEkokOptimize.java',
    code: `import java.util.Scanner;

/**
 * Optimize While Döngüsü ile EBOB ve EKOK Hesaplama
 * En büyükten geriye doğru sayarak ilk ortak böleni bulur ve döngüyü kırar.
 * 
 * @author Enes Öztürk
 */
public class EbobEkokOptimize {
    public static void main(String[] args) {
        // Hazırlayan: Enes Öztürk
        Scanner scanner = new Scanner(System.in);

        System.out.print("İlk sayıyı giriniz (n1): ");
        int n1 = scanner.nextInt();

        System.out.print("İkinci sayıyı giriniz (n2): ");
        int n2 = scanner.nextInt();

        int minSayi = Math.min(n1, n2);
        int i = minSayi;
        int ebob = 1;

        // Geriye doğru while döngüsü: En büyük sayıdan geriye sayar
        while (i >= 1) {
            if (n1 % i == 0 && n2 % i == 0) {
                ebob = i; // Geriye doğru geldiğimiz için ilk bulduğumuz ortak bölen EN BÜYÜKTÜR!
                break;    // Döngüden hemen çıkılarak gereksiz adımlar önlenir
            }
            i--;
        }

        // EKOK = (n1 * n2) / EBOB
        int ekok = (n1 * n2) / ebob;

        System.out.println("\\n--- SONUÇLAR (Enes Öztürk) ---");
        System.out.println("EBOB: " + ebob);
        System.out.println("EKOK: " + ekok);

        scanner.close();
    }
}`,
    explanation:
      'Geriye doğru sayma optimizasyonu sayesinde, örneğin 100 ve 50 sayıları için ilk adımda i=50 iken ortak bölen bulunur ve break ile döngü 1 adımda biter. 1\'den başlasaydık 50 adım sürecekti!',
  },

  directEkok: {
    id: 'directEkok',
    title: 'Çift While Döngüsü: Hem EBOB Hem EKOK Döngü ile',
    shortDesc: 'EBOB için ayrı while döngüsü, EKOK için formülsüz doğrudan katları gezen while döngüsü',
    filename: 'EbobEkokCiftWhile.java',
    code: `import java.util.Scanner;

/**
 * Hem EBOB hem de EKOK değerlerini ayrı While Döngüleri kullanarak bulan program.
 * 
 * @author Enes Öztürk
 */
public class EbobEkokCiftWhile {
    public static void main(String[] args) {
        // Hazırlayan: Enes Öztürk
        Scanner scanner = new Scanner(System.in);

        System.out.print("n1: ");
        int n1 = scanner.nextInt();
        System.out.print("n2: ");
        int n2 = scanner.nextInt();

        // 1. While Döngüsü: EBOB Bulma
        int i = 1;
        int ebob = 1;
        int min = (n1 < n2) ? n1 : n2;
        while (i <= min) {
            if (n1 % i == 0 && n2 % i == 0) {
                ebob = i;
            }
            i++;
        }

        // 2. While Döngüsü: EKOK Bulma (Formül kullanmadan, doğrudan katları arayarak)
        // Başlangıç noktası büyük olan sayıdır
        int k = Math.max(n1, n2);
        int ekok = 1;
        while (true) {
            if (k % n1 == 0 && k % n2 == 0) {
                ekok = k; // İlk ortak kat en küçük ortak kattır
                break;
            }
            k++;
        }

        System.out.println("EBOB = " + ebob);
        System.out.println("EKOK = " + ekok + " (Doğrudan while ile kat kontrolü)");
        System.out.println("Geliştirici: Enes Öztürk");

        scanner.close();
    }
}`,
    explanation:
      'Ödevde hem formül hem de saf döngü istendiği durumlar için idealdir. EKOK döngüsü iki sayının büyüğünden başlar ve her iki sayıya birden bölünen ilk ortak katı bulduğunda break ile durur.',
  },

  euclidean: {
    id: 'euclidean',
    title: 'İleri Seviye: Öklid Algoritması (Euclidean While Loop)',
    shortDesc: 'Büyük sayılar için O(log(min(a,b))) hızında çalışan matematiksel Öklid döngüsü',
    filename: 'EbobEkokEuclid.java',
    code: `import java.util.Scanner;

/**
 * Öklid Algoritması ile Yıldırım Hızında EBOB ve EKOK
 * 
 * @author Enes Öztürk
 */
public class EbobEkokEuclid {
    public static void main(String[] args) {
        // Hazırlayan: Enes Öztürk
        Scanner scanner = new Scanner(System.in);

        System.out.print("n1: ");
        int n1 = scanner.nextInt();
        System.out.print("n2: ");
        int n2 = scanner.nextInt();

        int a = n1;
        int b = n2;

        // Öklid while döngüsü: Kalan sıfır olana kadar devam eder
        while (b != 0) {
            int kalan = a % b;
            a = b;
            b = kalan;
        }
        int ebob = a;
        int ekok = (n1 * n2) / ebob;

        System.out.println("EBOB(" + n1 + ", " + n2 + ") = " + ebob);
        System.out.println("EKOK(" + n1 + ", " + n2 + ") = " + ekok);
        System.out.println("İmza: Enes Öztürk");

        scanner.close();
    }
}`,
    explanation:
      'M.Ö. 300 yılında Öklid tarafından bulunan bu algoritma, kalanı yeni bölen yaparak döngüyü logaritmik zamanda tamamlar. Çok büyük sayılarda milyonlarca döngü adımından tasarruf sağlar.',
  },
};
