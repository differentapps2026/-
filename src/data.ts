/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Movie } from './types';

export const BARBIE_MOVIES_DATABASE: Movie[] = [
  // --- المدبلجة (Dubbed) ---
  {
    id: "dub-1",
    title: "باربي في كسارة البندق",
    titleOriginal: "Barbie in the Nutcracker",
    year: 2001,
    category: "dubbed",
    description: "تبدأ مغامرة باربي عندما تتلقى 'كلارا' دمية كسارة البندق كهدية، وفي الليل السحري تستيقظ اللعبة لحمايتها من ملك الفئران الشرير وتخوض مغامرة سحرية رائعة في بلاد الألعاب والحلويات.",
    duration: "1 ساعة و 16 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-500 via-rose-400 to-indigo-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة كارتون نتورك", "العربية الفصحى أصلية"],
    trailerYoutubeId: "fG60u7n_J7w",
    scenes: [
      { title: "هدية العيد من العمة", time: "00:00", screenshotBg: "from-amber-600 to-rose-700" },
      { title: "معركة ملك الفئران الشرير", time: "18:24", screenshotBg: "from-purple-900 to-blue-900" },
      { title: "رحلة في غابة النعناع", time: "35:40", screenshotBg: "from-pink-300 to-cyan-400" },
      { title: "رقصة سكر البرقوق السحرية", time: "55:10", screenshotBg: "from-indigo-600 to-pink-500" }
    ]
  },
  {
    id: "dub-2",
    title: "باربي في رابونزل",
    titleOriginal: "Barbie as Rapunzel",
    year: 2002,
    category: "dubbed",
    description: "رابونزل فتاة ذات شعر طويل وجميل محبوسة في برج عال ومخفي تحرسه تنينة لطيفة، تكتشف فرشاة رسم سحرية تفتح لها آفاقاً جديدة وحرية غير متوقعة في مملكة سحرية غامضة.",
    duration: "1 ساعة و 24 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-600 via-purple-400 to-amber-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة الفصحى ديزني", "الدبلجة الكلاسيكية"],
    trailerYoutubeId: "_ZshqP72qsw",
    scenes: [
      { title: "الحياة في وادي البرج المجهول", time: "00:00", screenshotBg: "from-emerald-700 to-teal-900" },
      { title: "اكتشاف الفرشاة السحرية وألوانها", time: "15:33", screenshotBg: "from-rose-500 to-amber-500" },
      { title: "الخروج للمرة الأولى إلى المهرجان", time: "42:15", screenshotBg: "from-violet-600 to-fuchsia-700" },
      { title: "هزيمة جوثيل واستعادة العائلة", time: "1:10:05", screenshotBg: "from-amber-500 to-pink-600" }
    ]
  },
  {
    id: "dub-3",
    title: "باربي في بحيرة البجع",
    titleOriginal: "Barbie of Swan Lake",
    year: 2003,
    category: "dubbed",
    description: "أوديت، ابنة الخباز البسيطة، تتبع وحيد القرن السحري إلى الغابة المخيفة، وهناك تحولها تعويذة الساحر الشرير روثبارت إلى بجعة بيضاء رقيقة في الليل وتعود إنسانة في النهار.",
    duration: "1 ساعة و 22 دقيقة",
    rating: 4.7,
    posterGradient: "from-sky-400 via-pink-400 to-purple-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة التاريخية الأصلية", "دبلجة سبيستون"],
    trailerYoutubeId: "bX8PmsW-t1U",
    scenes: [
      { title: "ملاحقة وحيد القرن لغابة السحر", time: "00:00", screenshotBg: "from-cyan-500 to-emerald-600" },
      { title: "تعويذة البجعة وتحول أوديت", time: "22:12", screenshotBg: "from-blue-400 to-indigo-700" },
      { title: "المسيرة الرومانسية مع الأمير", time: "45:30", screenshotBg: "from-pink-400 to-violet-800" },
      { title: "استعادة بلورة الغابة وهزيمة روثبارت", time: "1:08:40", screenshotBg: "from-teal-500 to-purple-900" }
    ]
  },
  {
    id: "dub-4",
    title: "باربي في الأميرة والمفقرة",
    titleOriginal: "Barbie as the Princess and the Pauper",
    year: 2004,
    category: "dubbed",
    description: "قصة مشهورة عن أميرة غنية وفتاة فقيرة تبدوان متطابقتين تماماً في الشكل بينما تختلفان في مصيرو حياتهما. تتقاطعان معاً لإنقاذ المملكة وحماية مصير الحب والعدل.",
    duration: "1 ساعة و 25 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-500 via-sky-300 to-pink-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة استوديوهات إيميج", "الدبلجة الكرتونية الموسيقية"],
    trailerYoutubeId: "63yI31L_95Q",
    scenes: [
      { title: "أغنية حلم الحرية لكل منهما", time: "00:00", screenshotBg: "from-pink-500 to-blue-500" },
      { title: "اللقاء الأول والمفاجأة المذهلة", time: "19:40", screenshotBg: "from-rose-400 to-purple-500" },
      { title: "مخطط الوزير الشرير بريمنجر للانتقام", time: "38:15", screenshotBg: "from-slate-700 to-indigo-900" },
      { title: "حفل الزواج المضاعف الخرافي", time: "1:12:10", screenshotBg: "from-pink-600 to-amber-400" }
    ]
  },
  {
    id: "dub-5",
    title: "باربي والأميرات الاثني عشر الراقصات",
    titleOriginal: "Barbie in the 12 Dancing Princesses",
    year: 2006,
    category: "dubbed",
    description: "تكتشف الأميرة 'جينيفيف' وأخواتها الأحد عشر سراً مذهلاً يؤدي إلى ممر سري فائق الجمال يقود إلى عالم راقص وخيالي تتحقق فيه كل رقصة وأمنية سحرية.",
    duration: "1 ساعة و 34 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-500 via-fuchsia-400 to-indigo-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة الأصلية سبيس باور", "دبلجة كارتون نتورك"],
    trailerYoutubeId: "Fkcl98oZscY",
    scenes: [
      { title: "أخوات جينيفيف في قلعة الملك", time: "00:00", screenshotBg: "from-rose-600 to-fuchsia-800" },
      { title: "العثور على البلاطة الحجرية السحرية", time: "25:34", screenshotBg: "from-amber-500 to-pink-500" },
      { title: "الرقص السحري في القاعة الخرافية", time: "50:11", screenshotBg: "from-indigo-900 to-violet-800" },
      { title: "ترياق الشفاء للملك المسموم وعلاج العائلة", time: "1:18:20", screenshotBg: "from-emerald-600 to-teal-800" }
    ]
  },
  {
    id: "dub-6",
    title: "باربي ومدرسة سحر الأميرات",
    titleOriginal: "Barbie: Princess Charm School",
    year: 2011,
    category: "dubbed",
    description: "بلير فتاة بسيطة وطيبة تفوز بمنحة تمنح للفتيات الفقيرات للدخول لـ'مدرسة سحر الأميرات'، لتكتشف هناك أنها وريثة العرش الحقيقية المفقودة للمملكة.",
    duration: "1 ساعة و 21 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-500 via-indigo-400 to-pink-200",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة كارتون نتورك الرسمية", "دبلجة إيميج برودكشن"],
    trailerYoutubeId: "bH1X9RAnC6Q",
    scenes: [
      { title: "إعلان نتائج القرعة وفرحة العائلة", time: "00:00", screenshotBg: "from-orange-500 to-rose-600" },
      { title: "الوصول للقصر والتعرف على الصديقات", time: "14:12", screenshotBg: "from-teal-600 to-sky-700" },
      { title: "حفل شاي الأميرات وتدريب الوقار", time: "38:45", screenshotBg: "from-pink-500 to-purple-600" },
      { title: "استعادة التاج المجهول والتحول للأميرة", time: "1:05:30", screenshotBg: "from-yellow-400 to-rose-500" }
    ]
  },
  {
    id: "dub-7",
    title: "باربي فرقة التجسس",
    titleOriginal: "Barbie: Spy Squad",
    year: 2016,
    category: "dubbed",
    description: "باربي وصديقاتها الرياضيات البارعات ريني وتيريزا تتحولن من لاعبات جمباز رائدات إلى عميلات سريات ماهرات ومتخفيات في مهمة بالغة السرية والغموض.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.6,
    posterGradient: "from-indigo-600 via-pink-500 to-amber-200",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة إم بي سي 3 الحديثة", "العربية الرسمية"],
    trailerYoutubeId: "LwFqgXhX4Y4",
    scenes: [
      { title: "منافسات كأس الجمباز والمهارة الاستثنائية", time: "00:00", screenshotBg: "from-blue-600 to-indigo-800" },
      { title: "الدعوة السحرية لمقر المخابرات السري", time: "16:15", screenshotBg: "from-slate-800 to-purple-900" },
      { title: "تنزيل الأدوات والتقنيات التكنولوجية الوردية", time: "33:40", screenshotBg: "from-pink-600 to-violet-800" },
      { title: "الإطاحة بسارق الجواهر الرشيق والمراوغ", time: "1:02:10", screenshotBg: "from-cyan-600 to-fuchsia-600" }
    ]
  },
  {
    id: "dub-8",
    title: "باربي سحر دولفين",
    titleOriginal: "Barbie: Dolphin Magic",
    year: 2017,
    category: "dubbed",
    description: "في مغامرة استوائية غامضة تحت مياه الجزر الدافئة، تزور باربي وأخواتها بحيرة سحرية وتكتشف دلافين سحرية ملونة ومشرقة مهددة بالانقراض بواسطة قبطان ومستكشف طماع.",
    duration: "1 ساعة و 10 دقيقة",
    rating: 4.5,
    posterGradient: "from-teal-400 via-pink-400 to-cyan-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة نتفلكس العربية الرسمية"],
    trailerYoutubeId: "vAnk9I6N6sc",
    scenes: [
      { title: "الوصول إلى منتجع الشواطئ السحرية", time: "00:00", screenshotBg: "from-emerald-400 to-cyan-600" },
      { title: "ملاعبة دلافين الأحجار الكريمة النادرة", time: "18:22", screenshotBg: "from-sky-400 to-blue-700" },
      { title: "تحت أعماق المياه والتقاء 'إيسلا' حورية البحر", time: "35:10", screenshotBg: "from-cyan-800 to-purple-900" },
      { title: "مهمة الإنقاذ المشتركة والتحرير الكامل", time: "58:04", screenshotBg: "from-pink-600 to-teal-500" }
    ]
  },
  {
    id: "dub-9",
    title: "باربي في أزياء خيالية",
    titleOriginal: "Barbie: A Fashion Fairytale",
    year: 2010,
    category: "dubbed",
    description: "تنطلق باربي في مغامرة شيقة إلى باريس لزيارة دار الأزياء السحرية الخاصة بعمتها، لتكتشف أن المحل مهدد بالإغلاق، فتتعاون مع مساعدتها وثلاث جنيات من جنيات الموضة السحرية لتقديم عرض أزياء خرافي لإنقاذ الدار.",
    duration: "1 ساعة و 22 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-500 via-fuchsia-400 to-indigo-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["دبلجة أصلية سبيستون", "العربية الفصحى أصلية"],
    trailerYoutubeId: "yH86hY_7I2A",
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa8ef5s",
    imageUrl: "/src/assets/images/fashion_fairytale_1779804982046.png",
    scenes: [
      { title: "الوصول لباريس وصدمة دار الأزياء المهدد", time: "00:00", screenshotBg: "from-pink-600 to-purple-800" },
      { title: "اللقاء بجنيات الموضة السحرية can", time: "18:30", screenshotBg: "from-teal-600 to-pink-500" },
      { title: "بدء تنظيم وتصميم الفساتين المضيئة", time: "38:45", screenshotBg: "from-violet-600 to-fuchsia-700" },
      { title: "عرض الأزياء التاريخي السحري وإنقاذ المحل", time: "1:05:12", screenshotBg: "from-amber-400 to-pink-600" }
    ]
  },
  {
    id: "dub-10",
    title: "باربي في قصة حورية البحر (مدبلج)",
    titleOriginal: "Barbie in A Mermaid Tale",
    year: 2010,
    category: "dubbed",
    description: "مغامرة مائية ممتعة للبطلة 'لايا رايدر' بطلة ركوب الأمواج المتألقة التي تكتشف أنها في الحقيقة نصف بشرية ونصف حورية بحر، وأن عليها السفر لأعماق المحيط لإنقاذ والدتها الملكة.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.8,
    posterGradient: "from-cyan-400 via-teal-300 to-rose-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    trailerYoutubeId: "A617T3T_D_I",
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa8a4gc",
    imageUrl: "/src/assets/images/mermaid_tale_1780507744798.png",
    scenes: [
      { title: "بطولة ركوب الأمواج", time: "00:00", screenshotBg: "from-teal-500 to-cyan-600" },
      { title: "سر الشعر الوردي", time: "15:20", screenshotBg: "from-fuchsia-500 to-blue-500" },
      { title: "التقاء الدولفين 'زوما'", time: "32:45", screenshotBg: "from-blue-600 to-indigo-900" },
      { title: "مواجهة 'إريس' وتحرير المملكة المائية", time: "1:01:20", screenshotBg: "from-cyan-400 to-pink-500" }
    ]
  },
  {
    id: "dub-11",
    title: "باربي مدرسة الأميرة الفاتنة (مدبلج)",
    titleOriginal: "Barbie: Princess Charm School",
    year: 2011,
    category: "dubbed",
    description: "تنضم الفتاة البسيطة والمكافحة 'بلير ويلوز' إلى مدرسة الأميرة الفاتنة المرموقة لتعلم فنون الأميرات الملكيات، لتكتشف سرًا مذهلاً حول هويتها الحقيقية وأنها قد تكون الأميرة المفقودة للمملكة وعليها استرجاع العرش من السيدة 'ديفين' الشريرة.",
    duration: "1 ساعة و 21 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-500 via-rose-400 to-purple-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    trailerYoutubeId: "fQ3vU-uYJ1w",
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa89ymc",
    imageUrl: "/src/assets/images/charm_school_1780507884933.png",
    scenes: [
      { title: "بلير ويلوز ومفاجأة الفوز بالمنحة", time: "00:00", screenshotBg: "from-pink-500 to-rose-600" },
      { title: "الوصول إلى قصر مدرسة الأميرة الفاتنة", time: "12:15", screenshotBg: "from-purple-500 to-indigo-600" },
      { title: "تدريبات وقواعد الرقص الملكي مع بيبسي", time: "34:10", screenshotBg: "from-fuchsia-500 to-pink-700" },
      { title: "التتويج واكتشاف الهوية الحقيقية للأميرة صوفيا", time: "1:07:45", screenshotBg: "from-amber-400 to-pink-500" }
    ]
  },
  {
    id: "dub-12",
    title: "باربي حكاية لعبة: إجازة هاواي (مدبلج)",
    titleOriginal: "Toy Story Toons: Hawaiian Vacation",
    year: 2011,
    category: "dubbed",
    description: "في هذا الفيلم القصير والممتع، يخطط كين وباربي للذهاب في عطلة استوائية رومانسية إلى جزر هاواي، ولكن عندما تتعطل خططهما وينتهي بهما الأمر داخل حقيبة في غرفة بوني، يتعاون جميع الألعاب لخلق إجازة هاواي الساحرة والمثالية لهما في الغرفة.",
    duration: "6 دقائق",
    rating: 4.9,
    posterGradient: "from-amber-400 via-yellow-300 to-orange-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa8594a",
    imageUrl: "/src/assets/images/hawaiian_vacation_1780507988352_png_1780508118076.png",
    scenes: [
      { title: "خطط الإجازة الاستوائية السرية لكين وباربي", time: "00:00", screenshotBg: "from-amber-400 to-yellow-500" },
      { title: "صدمة البقاء في الغرفة والخطة البديلة من الألعاب", time: "01:30", screenshotBg: "from-cyan-400 to-blue-500" },
      { title: "الحفلة الاستوائية ورقصة الهولا الممتعة", time: "03:15", screenshotBg: "from-orange-400 to-pink-500" },
      { title: "السباحة الافتراضية والقبلة الرومانسية تحت الجليد", time: "05:00", screenshotBg: "from-teal-400 to-purple-600" }
    ]
  },
  {
    id: "dub-13",
    title: "باربي: الأميرة ونجمة البوب (مدبلج)",
    titleOriginal: "Barbie: The Princess & the Popstar",
    year: 2012,
    category: "dubbed",
    description: "في هذه المغامرة الغنائية والمشوقة، تلتقي الأميرة 'توري' التي تحلم بحياة الحرية والغناء مع نجمة البوب المفضلة لديها 'كيرا' التي تحلم بحياة الأميرات الهادئة، وعندما تكتشفان قدرتهما السحرية على تبادل الأماكن والهويات، تبدأ رحلة رائعة مليئة بالموسيقى والصداقة والدروس القيمة.",
    duration: "1 ساعة و 26 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-400 via-purple-400 to-fuchsia-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa80xku",
    imageUrl: "/src/assets/images/princess_popstar_1780508354437.png",
    scenes: [
      { title: "الأميرة توري ونجمة البوب كيرا وتبادل الأدوار", time: "00:00", screenshotBg: "from-pink-400 to-purple-500" },
      { title: "الحرية الجديدة وحفلة الشاي الملكية المربكة", time: "18:40", screenshotBg: "from-purple-500 to-indigo-600" },
      { title: "سر شجرة الغاردينيا السحرية المهددة بالخطر", time: "42:15", screenshotBg: "from-emerald-400 to-teal-600" },
      { title: "الحفل الموسيقي المشترك وإنقاذ المملكة معاً", time: "1:15:30", screenshotBg: "from-fuchsia-500 to-pink-600" }
    ]
  },
  {
    id: "dub-14",
    title: "باربي وسر الحذاء الوردي (مدبلج)",
    titleOriginal: "Barbie in The Pink Shoes",
    year: 2013,
    category: "dubbed",
    description: "تكتشف راقصة الباليه الطموحة 'كريستين' حذاءً ورديًا سحريًا يأخذها هي وصديقتها إلى عالم باليه خيالي تسكنه أشهر الرقصات الكلاسيكية، لتجد نفسها تؤدي دور البطولة في عروض شهيرة مثل 'جيزيل' و'بحيرة البجع' وعليها هزيمة ملكة الثلج الشريرة بأسلوب رقصها المبتكر والخاص.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-400 via-rose-300 to-fuchsia-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa7b43s",
    imageUrl: "/src/assets/images/pink_shoes_poster_1780508574888.png",
    scenes: [
      { title: "كريستين وتدريبات الباليه المجهدة", time: "00:00", screenshotBg: "from-pink-300 to-rose-400" },
      { title: "اكتشاف الحذاء الوردي السحري والانتقال لعالم العروض", time: "14:35", screenshotBg: "from-fuchsia-400 to-purple-600" },
      { title: "تحدي الرقص بأسلوب حر وخارج النص الكلاسيكي", time: "38:10", screenshotBg: "from-pink-500 to-indigo-700" },
      { title: "هزيمة ملكة الثلج وتحقيق حلم النجومية", time: "1:02:15", screenshotBg: "from-cyan-300 to-pink-500" }
    ]
  },
  {
    id: "dub-15",
    title: "باربي في الأميرات والنجمات (مدبلج)",
    titleOriginal: "Barbie in Rock 'N Royals",
    year: 2015,
    category: "dubbed",
    description: "بسبب خطأ تنظيم غير مقصود، تُرسل الأميرة الرقيقة 'كورتني' إلى مخيم الصاخبين والمغنين، بينما تُرسل نجمة الروك الشهيرة 'إريكا' إلى مخيم الأميرات الكلاسيكي. تكتشف الفتاتان عالماً مختلفاً تماماً، وتتعلمان التكيف وحب أساليب بعضهما البعض لينقذا المخيمين معاً في حفل غنائي رائع.",
    duration: "1 ساعة و 24 دقيقة",
    rating: 4.9,
    posterGradient: "from-fuchsia-500 via-pink-400 to-cyan-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa727es",
    imageUrl: "/src/assets/images/rock_n_royals_poster_1780508704865.png",
    scenes: [
      { title: "وصول كورتني وإريكا وتطابق الأسماء المربك", time: "00:00", screenshotBg: "from-pink-500 to-indigo-600" },
      { title: "تدريبات الأميرة في مخيم الروك وصعوبة التكيف", time: "18:22", screenshotBg: "from-fuchsia-500 to-pink-600" },
      { title: "التحدي الغنائي المثير والتعاون لإنقاذ المخيم", time: "45:10", screenshotBg: "from-blue-500 to-cyan-600" },
      { title: "الأغنية الختامية الكبرى ودمج الموسيقى والرويال", time: "1:12:40", screenshotBg: "from-purple-500 to-pink-500" }
    ]
  },
  {
    id: "dub-16",
    title: "باربي: فرقة التجسس (مدبلج)",
    titleOriginal: "Barbie: Spy Squad",
    year: 2016,
    category: "dubbed",
    description: "تتحول ثلاث لاعبات جمباز، 'باربي' وصديقتاها 'تيريزا' و'رينيه'، من رياضيات موهوبات إلى عميلات سريات متخفيات لصالح وكالة تجسس سرية للغاية بمساعدة حيوانات أليفة ذكية وأدوات تكنولوجية متقدمة، لإيقاف سارقة مجوهرات غامضة ومحترفة.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-500 via-purple-500 to-indigo-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa63ja4",
    imageUrl: "/src/assets/images/spy_squad_poster_1780508809923.png",
    scenes: [
      { title: "تدريبات الجمباز والمهارات الرياضية الفائقة", time: "00:00", screenshotBg: "from-pink-500 to-rose-500" },
      { title: "الاستدعاء للوكالة السرية والتعريف بالأدوات", time: "15:45", screenshotBg: "from-purple-500 to-indigo-600" },
      { title: "مهمة التسلل الأولى وملاحقة السارقة الغامضة", time: "35:10", screenshotBg: "from-fuchsia-500 to-pink-700" },
      { title: "العمل الجماعي الحاسم والقبض على السارقة بنجاح", time: "1:03:20", screenshotBg: "from-cyan-400 to-indigo-500" }
    ]
  },
  {
    id: "dub-17",
    title: "باربي سكيبير ومغامرة جليسة الأطفال (مدبلج)",
    titleOriginal: "Barbie: Skipper and the Big Babysitting Adventure",
    year: 2023,
    category: "dubbed",
    description: "عندما يفشل عملها في مجال رعاية الأطفال، تقرر 'سكيبير' - شقيقة باربي الموهوبة - خوض مغامرة الصيف بالعمل كجليسة أطفال في منتزه مائي ترفيهي عملاق، حيث تستعرض مهاراتها الإبداعية وقدرتها الفائقة في التعامل مع المواقف الصعبة والمرحة لتثبت جدارتها للجميع.",
    duration: "1 ساعة و 3 دقائق",
    rating: 4.8,
    posterGradient: "from-purple-500 via-pink-400 to-cyan-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5m00u",
    imageUrl: "/src/assets/images/skipper_babysitting_poster_1780509187358.png",
    scenes: [
      { title: "سكيبير ومحاولة العثور على وظيفة رعاية أطفال جديدة", time: "00:00", screenshotBg: "from-purple-500 to-indigo-600" },
      { title: "بدء العمل في المنتزه المائي الترفيهي الممتع", time: "16:15", screenshotBg: "from-blue-400 to-cyan-500" },
      { title: "الفوضى المرحة وتجربة أساليب رعاية مبتكرة للأطفال", time: "35:40", screenshotBg: "from-pink-400 to-rose-500" },
      { title: "إنقاذ المنتزه ونيل تقدير الجميع بفضل شجاعتها", time: "51:10", screenshotBg: "from-cyan-400 to-teal-500" }
    ]
  },
  {
    id: "dub-18",
    title: "باربي: قوة حورية البحر (مدبلج)",
    titleOriginal: "Barbie Mermaid Power",
    year: 2022,
    category: "dubbed",
    description: "تنضم باربي 'بروكلين' وباربي 'ماليبو' مع شقيقاتهما سكيبر، ستاسي، وتشيلسي، في مغامرة مائية سحرية حيث تتحول الفتيات إلى حوريات بحر لإنقاذ عالم المحيط الخيالي 'باسيفيكا' والتنافس على لقب حارسة القوة المائية الفائقة.",
    duration: "1 ساعة و 4 دقائق",
    rating: 4.8,
    posterGradient: "from-blue-400 via-cyan-400 to-teal-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5m2ya",
    imageUrl: "/src/assets/images/mermaid_power_poster_1780509268563.png",
    scenes: [
      { title: "التحول المذهل لباربي وصديقاتها لحوريات بحر", time: "00:00", screenshotBg: "from-cyan-400 to-blue-500" },
      { title: "بدء اختبارات وتحديات حوريات البحر الكبرى", time: "15:20", screenshotBg: "from-teal-400 to-emerald-500" },
      { title: "مواجهة الخطر المائي وإنقاذ عالم المحيط الهادئ", time: "38:40", screenshotBg: "from-blue-500 to-purple-600" },
      { title: "تتويج حارسة القوة والاحتفال المشترك بالصداقة", time: "52:15", screenshotBg: "from-pink-400 to-cyan-500" }
    ]
  },
  {
    id: "dub-19",
    title: "باربي وتشيلسي: عيد الميلاد المفقود (مدبلج)",
    titleOriginal: "Barbie & Chelsea: The Lost Birthday",
    year: 2021,
    category: "dubbed",
    description: "تتحمس تشيلسي - الشقيقة الصغرى لباربي - للاحتفال بعيد ميلادها السابع على متن سفينة سياحية فاخرة، ولكن عندما تعبر السفينة خط التاريخ الدولي، تكتشف أنها فقدت عيد ميلادها كلياً! تنطلق تشيلسي في مغامرة بجزيرة استوائية غامضة ومثيرة للعثور على عيد ميلادها المفقود برفقة حيوانات متكلمة لطيفة.",
    duration: "1 ساعة",
    rating: 4.8,
    posterGradient: "from-teal-300 via-pink-400 to-yellow-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5nn7y",
    imageUrl: "/src/assets/images/lost_birthday_poster_1780509353546.png",
    scenes: [
      { title: "الحماس لعيد الميلاد على السفينة السياحية الفاخرة", time: "00:00", screenshotBg: "from-blue-400 to-cyan-500" },
      { title: "خط تاريخ تغيير التوقيت وفاجعة اليوم المفقود", time: "14:15", screenshotBg: "from-purple-500 to-pink-500" },
      { title: "مغمرة تشيلسي على الجزيرة ولقاء الجراء والحيوانات", time: "32:45", screenshotBg: "from-teal-400 to-yellow-400" },
      { title: "حفل عيد الميلاد الاستوائي الهائل وإنقاذ اليوم", time: "50:10", screenshotBg: "from-pink-400 to-rose-500" }
    ]
  },
  {
    id: "dub-20",
    title: "باربي: مغامرة الأميرة (مدبلج)",
    titleOriginal: "Barbie Princess Adventure",
    year: 2020,
    category: "dubbed",
    description: "تنتقل باربي إلى مملكة فلورافيا السحرية بعد ترشيحها من قِبل صديقتها الأميرة آميليا التي تشبهها تمامًا، حيث تتفق الصديقتان على تبادل الأدوار لتعيش باربي حياة الأميرات وتجرب آميليا العيش بحرية كفتاة عادية، ولكن سرعان ما تظهر مؤامرة من أمير شرير يسعى لكشف الخدعة والاستيلاء على العرش.",
    duration: "1 ساعة و 32 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-400 via-fuchsia-400 to-sky-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5nsni",
    imageUrl: "/src/assets/images/princess_adventure_poster_1780509450597.png",
    scenes: [
      { title: "صديقة المراسلة والتشابه المربك والمدهش", time: "00:00", screenshotBg: "from-pink-400 to-indigo-600" },
      { title: "تبادل الأدوار السري وعيش أحلام القصور الرائعة", time: "18:30", screenshotBg: "from-pink-300 to-fuchsia-500" },
      { title: "مؤامرة الأمير الشرير ومحاولة كشف التبادل المشترك", time: "42:15", screenshotBg: "from-purple-500 to-rose-600" },
      { title: "الأغنية الختامية الكبرى وحفظ أمن واستقرار المملكة", time: "1:15:10", screenshotBg: "from-sky-400 to-pink-500" }
    ]
  },
  {
    id: "dub-21",
    title: "باربي: الدولفين السحري (مدبلج)",
    titleOriginal: "Barbie Dolphin Magic",
    year: 2017,
    category: "dubbed",
    description: "أثناء زيارتهم لصديقهم 'كين' في بيئة بحرية استوائية مذهلة، تكتشف باربي وأخواتها دولفيناً سحرياً ونادراً يتلألأ بألوان الأحجار الكريمة اللامعة. تتعاون الفتيات مع صديقة جديدة غامضة وشجاعة تدعى 'إيسلا' لحماية هذا المخلوق المذهل وإنقاذه من أيدي باحثين طامعين يسعون لحجزه واستغلاله.",
    duration: "1 ساعة",
    rating: 4.8,
    posterGradient: "from-blue-400 via-cyan-300 to-sky-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5slcq",
    imageUrl: "/src/assets/images/dolphin_magic_poster_1780509532944.png",
    scenes: [
      { title: "الرحلة الاستوائية للقاء كين واستكشاف الشاطئ", time: "00:00", screenshotBg: "from-blue-400 to-cyan-500" },
      { title: "اكتشاف الدولفين السحري وبدء المغامرة المائية", time: "12:15", screenshotBg: "from-cyan-400 to-teal-400" },
      { title: "التعرف على إيسلا وكشف سر قوة الأحجار الكريمة", time: "30:40", screenshotBg: "from-blue-500 to-indigo-600" },
      { title: "إنقاذ الدولفين السحري والاحتفال بحماية البيئة البحرية", time: "48:10", screenshotBg: "from-teal-300 to-sky-500" }
    ]
  },
  {
    id: "dub-22",
    title: "باربي: بطلة لعبة الفيديو (مدبلج)",
    titleOriginal: "Barbie Video Game Hero",
    year: 2017,
    category: "dubbed",
    description: "تُسحب باربي بطريقة سحرية إلى لعبة الفيديو المفضلة لديها، لتتحول فجأة إلى شخصية لعبة رولر سكيتس مرحة ونشطة. رفقة أصدقائها الجدد 'كوت كوت' والملكة 'بيلا' تكتشف أن فيروساً خبيثاً يحاول تدمير اللعبة ومستوياتها، فتخوض مهمة حافلة بالتحديات المهارية والذكاء الرقمي لإنقاذ عالم الألعاب.",
    duration: "1 ساعة و 12 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-500 via-purple-500 to-indigo-600",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5snwo",
    imageUrl: "/src/assets/images/video_game_hero_poster_1780509663094.png",
    scenes: [
      { title: "الدخول المفاجئ لعالم اللعبة والتحول الرقمي لباربي", time: "00:00", screenshotBg: "from-pink-500 to-purple-600" },
      { title: "تعلم المستويات الأولى وتحدي حذاء رولر سكيتس اللامع", time: "18:40", screenshotBg: "from-purple-500 to-indigo-500" },
      { title: "مواجهة فيروس الألعاب الخبيث وتكاتف الفريق الرقمي", time: "38:15", screenshotBg: "from-indigo-600 to-pink-600" },
      { title: "النصر الكبير في المستوى النهائي وإعادة الأمان للعالم الافتراضي", time: "58:40", screenshotBg: "from-cyan-400 to-purple-500" }
    ],
    hasNewBadge: true
  },
  {
    id: "dub-23",
    title: "باربي: مغامرة ستار لايت (مدبلج)",
    titleOriginal: "Barbie: Star Light Adventure",
    year: 2016,
    category: "dubbed",
    description: "تعيش باربي في كوكب هادئ وجميل في أعماق الفضاء، وتفاجأ باستدعائها للانضمام إلى فريق من النخبة والموهوبين لمواجهة أزمة كونية كبرى تتمثل في خفوت ضوء النجوم تدريجيًا. تنطلق باربي مع حيوانها الأليف الطائر وصديقاتها الجدد في مغامرة سماوية شيقة لإنقاذ المجرة وإعادة بريق النجوم للكون.",
    duration: "1 ساعة و 19 دقيقة",
    rating: 4.9,
    posterGradient: "from-indigo-900 via-purple-600 to-pink-500",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5ylbi",
    imageUrl: "/src/assets/images/starlight_adventure_poster_1780509833857.png",
    scenes: [
      { title: "الحياة البسيطة على الكوكب البعيد واستدعاء باربي", time: "00:00", screenshotBg: "from-blue-950 to-purple-900" },
      { title: "مهمة التدريب على لوح الطيران السحابي في العاصمة الكونية", time: "15:30", screenshotBg: "from-purple-800 to-pink-600" },
      { title: "مواجهة عقبات الجاذبية واكتشاف قوى الصداقة السحرية", time: "38:45", screenshotBg: "from-indigo-900 to-cyan-500" },
      { title: "إنقاذ مجرى طاقة النجوم الكبرى والاحتفال الكوني المجيد", time: "59:20", screenshotBg: "from-pink-500 to-violet-950" }
    ],
    hasNewBadge: true
  },
  {
    id: "dub-24",
    title: "باربي: دريمتوبيا (مدبلج)",
    titleOriginal: "Barbie Dreamtopia",
    year: 2016,
    category: "dubbed",
    description: "تنطلق تشيلسي - شقيقة باربي الصغرى - رفقة جروها اللطيف هوني في رحلة أحلام مذهلة إلى دولتها الخيالية السحرية 'دريمتوبيا'، المليئة بأنهار قوس قزح، وحمامات الشوكولاتة، والغيوم الطائرة، وحوريات البحر اللطيفة مع وحيد القرن السحري، لتعلّم قيم الثقة بالذات والتفكير الإيجابي الخلاق.",
    duration: "1 ساعة و 24 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-300 via-sky-300 to-yellow-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["الدبلجة العربية الفصحى", "العربية الفصحى أصلية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=xa5zc0g",
    imageUrl: "/src/assets/images/dreamtopia_poster_1780509958654.png",
    scenes: [
      { title: "دخول تشيلسي وجروها لعالم دريمتوبيا الخيالي", time: "00:00", screenshotBg: "from-pink-300 to-sky-400" },
      { title: "مغامرة غابة الحلوى ولقاء وحيد القرن السحري", time: "18:25", screenshotBg: "from-teal-300 to-emerald-400" },
      { title: "اكتشاف جبل الكراميل وحل أزمة النهر الملّون", time: "38:10", screenshotBg: "from-yellow-300 to-amber-500" },
      { title: "العودة المبهجة واستعادة الثقة الحقيقية بالذات", time: "1:03:45", screenshotBg: "from-pink-400 to-purple-500" }
    ],
    hasNewBadge: true
  },

  // --- المترجمة (Subbed) ---
  {
    id: "sub-1",
    title: "باربي وسحر الحصان الطائر (مترجم)",
    titleOriginal: "Barbie and the Magic of Pegasus",
    year: 2005,
    category: "subbed",
    description: "الأميرة آنيكا الرائعة تخوض مغامر عظيمة مع حصان طائر يدعى 'بريتا'، وتصعد مع رفقائها لتشكيل 'عصا الضوء السحرية' للتغلب على الساحر الشرير وينلوك وتحرير مملكتها من الجليد الاستبدادي.",
    duration: "1 ساعة و 25 دقيقة",
    rating: 4.8,
    posterGradient: "from-sky-300 via-violet-400 to-fuchsia-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "Ssh8ZcTAn-M",
    scenes: [
      { title: "الهروب الطائر من وينلوك الشرير", time: "00:00", screenshotBg: "from-blue-900 to-slate-800" },
      { title: "الوصول لبلاد الغيوم ومملكة السماء", time: "20:45", screenshotBg: "from-pink-300 to-sky-300" },
      { title: "جمع عناصر عصا النور المشرقة", time: "43:30", screenshotBg: "from-yellow-400 to-rose-500" },
      { title: "تدمير السحر الجليدي وعودة الوالدين", time: "1:10:15", screenshotBg: "from-indigo-600 to-amber-300" }
    ]
  },
  {
    id: "sub-2",
    title: "باربي مذكرات باربي (مترجم)",
    titleOriginal: "The Barbie Diaries",
    year: 2006,
    category: "subbed",
    description: "باربي طالبة في الثانوية العامة تعشق الموسيقى وتحلم بالوصول للشهرة، تعثر على مذكرات خاصة للغاية، حيث تسجل بها أمنياتها وتبدأ في التحقق بفضل قلم سحري عجيب.",
    duration: "1 ساعة و 10 دقيقة",
    rating: 4.4,
    posterGradient: "from-purple-500 via-pink-400 to-rose-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "Z_dbe_Yt-hE",
    scenes: [
      { title: "بداية العام الدراسي الجديد والمنافسة", time: "00:00", screenshotBg: "from-teal-600 to-indigo-800" },
      { title: "اقتناء المذكرات وكتابة الأحلام الوردية", time: "14:10", screenshotBg: "from-violet-500 to-pink-500" },
      { title: "مسابقة الفرق الموسيقية الكبرى والتألق", time: "39:05", screenshotBg: "from-fuchsia-600 to-cyan-500" },
      { title: "الثقة بالنفس والتغلب على القلق وتألق باربي", time: "58:50", screenshotBg: "from-pink-600 to-yellow-300" }
    ]
  },
  {
    id: "sub-3",
    title: "باربي وقلعة الماس (مترجم)",
    titleOriginal: "Barbie and the Diamond Castle",
    year: 2008,
    category: "subbed",
    description: "ليانا وأليكسا صديقتان تجمعهما موهبة العزف والغناء الفريد، تتلقيان مرآة غامضة تحبس بداخلها فتاة سحرية تدعى 'ميلودي'، لتبدأ رحلتهما المخاطرة للعثور على قلعة الماس الأسطورية.",
    duration: "1 ساعة و 19 دقيقة",
    rating: 4.9,
    posterGradient: "from-fuchsia-500 via-pink-300 to-teal-200",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "W27_p0G5Z-g",
    scenes: [
      { title: "تشارك الصديقتين للمنزل والزهور الفواحة", time: "00:00", screenshotBg: "from-emerald-600 to-rose-500" },
      { title: "أغنية الاتصال بالصديقة المحبوسة بالمرآة", time: "18:40", screenshotBg: "from-cyan-400 to-indigo-800" },
      { title: "تحديات وليد التنانين والمسالك الوعرة", time: "41:30", screenshotBg: "from-red-600 to-purple-800" },
      { title: "الدخول لقلعة الماس الأسطورية واسترداد الآلات", time: "1:05:15", screenshotBg: "from-pink-500 to-cyan-300" }
    ]
  },
  {
    id: "sub-4",
    title: "باربي ومغامرة حورية البحر (مترجم)",
    titleOriginal: "Barbie in A Mermaid Tale",
    year: 2010,
    category: "subbed",
    description: "لايا رايدر بطلة أستراليا في ركوب الأمواج السريعة تكتشف فجأة حقيقة غريبة؛ أنها حورية البحر المفقودة لأميرة المحيطات السحرية أوشيانا، وتخوض غمار البحار لإنقاذ أمها السجينة.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.7,
    posterGradient: "from-cyan-400 via-sky-300 to-rose-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "A617T3T_D_I",
    scenes: [
      { title: "منافسات الجري وركوب الموج العالي", time: "00:00", screenshotBg: "from-teal-500 to-cyan-600" },
      { title: "تحول الشعر للوردي المفاجئ تحت الماء", time: "15:20", screenshotBg: "from-fuchsia-500 to-blue-500" },
      { title: "مساعدة الدولفين 'زوما' في استكشاف أوشيانا", time: "32:45", screenshotBg: "from-blue-600 to-indigo-900" },
      { title: "الإطاحة بالطاغية 'إريس' وتتويج الملكة كاليوب", time: "1:01:20", screenshotBg: "from-cyan-400 to-pink-500" }
    ]
  },
  {
    id: "sub-5",
    title: "باربي الأميرة ونجمة النجوم (مترجم)",
    titleOriginal: "Barbie: The Princess & the Popstar",
    year: 2012,
    category: "subbed",
    description: "الأميرة 'توري' التي تحس بالملل من واجبات البلاط، والمغنية الشهيرة 'كيرا' التي تمل الشهرة والاضطهاد والضغوط، تكتشفان ترياقاً سحرياً يتيح لهما تحول وتقمص أدوار بعضهما.",
    duration: "1 ساعة و 26 دقيقة",
    rating: 4.8,
    posterGradient: "from-purple-600 via-pink-400 to-emerald-200",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "H4mF9g_Nsh8",
    scenes: [
      { title: "دويتو غنائي مبهر لقاء الأميرتين", time: "00:00", screenshotBg: "from-violet-600 to-fuchsia-700" },
      { title: "استخدام فرشاة تصفيف الشعر السحرية للتبديل", time: "18:14", screenshotBg: "from-amber-400 to-rose-500" },
      { title: "مؤامرة سرية لسرقة نباتات المملكة الفضية", time: "42:10", screenshotBg: "from-slate-800 to-emerald-900" },
      { title: "عرض المسرح الكبير والتحام النجمتين معاً", time: "1:11:05", screenshotBg: "from-pink-500 to-cyan-400" }
    ]
  },
  {
    id: "sub-6",
    title: "باربي والحذاء الوردي (مترجم)",
    titleOriginal: "Barbie in the Pink Shoes",
    year: 2013,
    category: "subbed",
    description: "كريستين باليرينا طموحة تجد زوجاً من الأحذية بطلاء وردي متألق، ترتديه لتجد نفسها منتقلة سحرياً مع رفيقتها الحبيبة إلى عالم الباليه الخيالي الذي لا يتوقف عن الرقص والسحر.",
    duration: "1 ساعة و 15 دقيقة",
    rating: 4.6,
    posterGradient: "from-pink-400 via-rose-300 to-emerald-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "W4uQZf8aonI",
    scenes: [
      { title: "غرف التدريب ونقد المدرب القاسي", time: "00:00", screenshotBg: "from-teal-600 to-rose-600" },
      { title: "شراء وتألق حذاء رقص الباليه الساحر", time: "12:44", screenshotBg: "from-pink-500 to-fuchsia-600" },
      { title: "مهاجمة ملكة الثلج الشريرة بقطوع بحيرة البجع", time: "34:10", screenshotBg: "from-cyan-700 to-indigo-900" },
      { title: "رقصة جيزيل الكبرى والعودة بلقب النجمة الأولى", time: "59:20", screenshotBg: "from-pink-600 to-yellow-300" }
    ]
  },
  {
    id: "sub-7",
    title: "باربي: مدينة كبيرة وأحلام كبيرة (مترجم)",
    titleOriginal: "Barbie: Big City, Big Dreams",
    year: 2021,
    category: "subbed",
    description: "باربي روبرتس من كاليفورنيا تسافر لمدينة نيويورك للدراسة الصيفية للموسيقى، لتلتقي بزميلة تدعى باربي روبرتس أيضاً من بروكلين، وتنشأ علاقة صداقة وتنافس فائق اللطافة والإمتاع.",
    duration: "1 ساعة و 18 دقيقة",
    rating: 4.8,
    posterGradient: "from-indigo-500 via-pink-400 to-amber-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    trailerYoutubeId: "WzN48Wv-jN8",
    scenes: [
      { title: "خطوات المغادرة لمطار نيويورك المشرق", time: "00:00", screenshotBg: "from-amber-600 to-cyan-705" },
      { title: "مواجهة 'باربي' بروكلين واكتشاف تشابه الأسماء", time: "16:20", screenshotBg: "from-fuchsia-500 to-violet-600" },
      { title: "المسيرة التدريبية المشتركة في مسار السنترال بارك", time: "38:45", screenshotBg: "from-pink-500 to-blue-500" },
      { title: "دويتو ساطع وتقديم الأغنية الفائزة على قمة المسرح", time: "1:04:10", screenshotBg: "from-violet-700 to-amber-400" }
    ],
    hasNewBadge: true
  },
  {
    id: "sub-8",
    title: "باربي الفيلم الواقعي - مارجو روبي (مترجم)",
    titleOriginal: "Barbie: The Live Action Movie",
    year: 2023,
    category: "subbed",
    description: "بسبب أزمة غامضة تؤدي لتغير شكل قدميها فجأة، تعاني باربي المقيمة في 'باربي لاند' المثالية من أزمة وجودية، مما يضطرها للسفر إلى 'العالم الحقيقي' رفقة كين لاكتشاف كنه الوجود وحل المشكلة.",
    duration: "1 ساعة و 54 دقيقة",
    rating: 4.8,
    posterGradient: "from-pink-600 via-rose-400 to-blue-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل باللغة العربية بدقة فائقة"],
    trailerYoutubeId: "pBk4NYhWNMM",
    scenes: [
      { title: "الروتين الصباحي الرائع في باربي لاند", time: "00:00", screenshotBg: "from-pink-500 to-sky-400" },
      { title: "الهبوط في شواطئ فينيسيا بالعالم الحقيقي", time: "28:10", screenshotBg: "from-orange-400 to-blue-500" },
      { title: "أزمة سيطرة كين على القلعة والتحولات الكبرى", time: "55:30", screenshotBg: "from-indigo-900 to-slate-900" },
      { title: "الحديث الإنساني الساحر مع مروح شاشات ماتيل", time: "1:35:15", screenshotBg: "from-rose-500 to-amber-300" }
    ],
    hasNewBadge: true
  },
  {
    id: "sub-9",
    title: "باربي وتيريزا: وصفة الصداقة (مترجم)",
    titleOriginal: "Barbie & Teresa: Recipe for Friendship",
    year: 2025,
    category: "subbed",
    description: "في هذه المغامرة الجديدة والممتعة، تتعاون باربي وصديقتها المقربة تيريزا معاً في المطبخ لابتكار ومشاركة ألذ وصفات الطعام والحلويات، ليكتشفا من خلال مواجهة التحديات والمزج بين الأذواق المختلفة أن التعاون والدعم المتبادل هما المكونان السحريان وأجمل وصفة لصداقة تدوم طويلاً.",
    duration: "45 دقيقة",
    rating: 4.9,
    posterGradient: "from-pink-400 via-rose-300 to-emerald-300",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=x9zoors",
    imageUrl: "/src/assets/images/recipe_friendship_1780508934208.png",
    scenes: [
      { title: "باربي وتيريزا وتحدي الخبز المشترك", time: "00:00", screenshotBg: "from-pink-400 to-yellow-400" },
      { title: "مواجهة عقبات المطبخ والخلطة السرية", time: "12:30", screenshotBg: "from-amber-400 to-emerald-500" },
      { title: "سحر تزيين الحلويات وتبادل المهارات", time: "28:15", screenshotBg: "from-pink-500 to-rose-600" },
      { title: "الاستمتاع بالوصفة الختامية الرائعة معاً", time: "40:00", screenshotBg: "from-emerald-400 to-cyan-500" }
    ],
    hasNewBadge: true
  },
  {
    id: "sub-10",
    title: "باربي وستايسي لإنقاذ الموقف (مترجم)",
    titleOriginal: "Barbie and Stacie to the Rescue",
    year: 2024,
    category: "subbed",
    description: "عندما تذهب باربي وأخواتها في رحلة ممتعة، تضيع باربي وسكيب وسط غابة كثيفة بسبب حادث غير متوقع. هنا يأتي دور الشقيقة الصغرى الشجاعة 'ستايسي' التي تقود مهمة إنقاذ بطولية رفقة كلابها الصغيرة اللطيفة لإنقاذ شقيقتيها والعودة بسلام، لتثبت للجميع عظمة العمل الجماعي والحث الإرادي.",
    duration: "1 ساعة و 4 دقائق",
    rating: 4.8,
    posterGradient: "from-emerald-400 via-teal-300 to-sky-400",
    quality: ["1080p", "720p", "480p"],
    soundOptions: ["مترجم بالكامل للغة العربية"],
    videoUrl: "https://geo.dailymotion.com/player/xlqhp.html?video=x9zrseu",
    imageUrl: "/src/assets/images/barbie_stacie_rescue_poster_1780509021569.png",
    scenes: [
      { title: "باربي والأخوات والتحضير لرحلة المغامرة الخلوية", time: "00:00", screenshotBg: "from-teal-400 to-emerald-500" },
      { title: "ضياع باربي وسكيب وسط الغابات الموحشة", time: "18:40", screenshotBg: "from-emerald-500 to-indigo-700" },
      { title: "ستايسي والجراء الصغيرة تطلق مهمة البحث والإنقاذ", time: "35:15", screenshotBg: "from-pink-400 to-rose-500" },
      { title: "الإنقاذ البطولي والاحتفال بالعمل والوفاء العائلي", time: "52:10", screenshotBg: "from-sky-400 to-teal-500" }
    ],
    hasNewBadge: true
  }
];
