/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Maximize, Settings, Check, Tv, Sparkles, SkipForward, ArrowLeft, Palette, Scissors, HelpCircle, Trophy, Award, Heart } from 'lucide-react';
import { Movie, AppSettings, HistoryItem } from '../types';

// Custom simulation scenarios for standard and customized experience
const MOVIE_SIMULATIONS: Record<string, {
  storytext: string;
  subtitles: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    hint: string;
  }[];
}[]> = {
  "dub-9": [ // باربي أزياء خيالية
    {
      storytext: "تصل باربي إلى باريس الحالمة وتكتشف بحزن شديد أن متجر عمتها 'ميلسنت' للأزياء على وشك الإغلاق التام بسبب تراجع المبيعات والحروب التجارية مع المنافسين الأشرار.",
      subtitles: [
        "باربي: يا إلهي! باريس رائعة كالعادة، لكن دار الأزياء تبدو حزينة للغاية..",
        "العمة ميلسنت: أهلاً يا باربي المحبوبة، المتجر يمر بظروف صعبة جداً وقد نضطر لإغلاقه للأبد..",
        "باربي: لا تفقدي الأمل يا عمتي! سنعثر بالتأكيد على طريقة ما لإعادة البهجة والشهرة للدار!",
        "أليس: أنا أليس، مساعدة المتجر! يسعدني كثيراً وجودك يا باربي، ربما نستطيع ابتكار تصميمات جديدة معاً!"
      ],
      quiz: [
        {
          question: "لماذا ذهبت باربي إلى باريس في بداية الفيلم؟",
          options: ["لزيارة عمتها ودعم متجرها للأزياء", "للمشاركة في مسابقة طبخ فرنسية", "لشراء قصر فرنسي جديد بالكامل"],
          correctIndex: 0,
          hint: "ذهبت لزيارة عمتها ميلسنت ودعمها في أزمتها لمتجر الأزياء!"
        }
      ]
    },
    {
      storytext: "في العلية القديمة للدار، تكتشف باربي وأليس جنيات الموضة السحرية الثلاث (شاين، شيمر، وغليمر) اللواتي يمتلكن طاقة بريق سحري بإمكانه جعل أي رقعة قماش وتصميم يتوهج ببريق ملائكي أخاذ لا مثيل له في العالم الحقيقي!",
      subtitles: [
        "شاين: واو! شيفون رائع وحرير برّاق! القوة السحرية للألوان تبتدئ من هنا!",
        "شيمر: انظروا إليّ! طاقة اللمعان الزهري الخيالي جاهزة لتزيين الفساتين!",
        "غليمر: ها قد تحررت طاقتي السحرية! نحن جنيات الموضة، سنعيد لدار الأزياء بريقها اللامع!",
        "أليس بذهول: يا إلهي.. هل أرى جنيات حقيقية تصنع ألواناً سحرية للفساتين؟!"
      ],
      quiz: [
        {
          question: "ما هو الاسم الجماعي للجنيات الثلاثة اللاتي يساعدن باربي؟",
          options: ["جنيات البحر السحرية", "جنيات الموضة (Flairies)", "جنيات الزهور والغابات برونكس"],
          correctIndex: 1,
          hint: "إنهن جنيات الموضة الـ Flairies اللاتي يضفن توهجاً خرافياً على الأزياء!"
        }
      ]
    },
    {
      storytext: "تبدأ باربي وأليس بالتعاون مع الجنيات لتصميم خط أزياء ساحر ومبتكر بالكامل! حان دوركِ الآن في المحاكي: صممي فستان باربي ليكون جاهزاً للعرض التاريخي الكبير بضغطة زر واحدة!",
      subtitles: [
        "باربي: انظري يا أليس.. هذه الأقمشة الوردية تتلألأ بمجرد أن تلمسها الجنيات سحرياً!",
        "أليس: العمل معك ممتع للغاية يا باربي، العرض سيكون استثنائياً وغير مسبوق بالمرة!",
        "شاين: دعينا نضيف لمسة من بريق النجمات الوردية للتصميم!",
        "غليمر: التصميم جاهز للتلألؤ، غيري الألوان والبريق الآن عبر لوحة التحكم السفلية لتري النتيجة السحرية!"
      ],
      quiz: [
        {
          question: "ما هي الميزة الخاصة التي تجعل الفساتين المصممة سحرية؟",
          options: ["أنها تطير في الهواء كالغيمة", "أنها تتوهج وتتألق ببريق سحري عند الموسيقى", "أنها تغير مقاس من يرتديها تلقائياً"],
          correctIndex: 1,
          hint: "الفساتين تتوهج وتشرق ببريق رائع وخيالي بفضل الجنيات السحرية!"
        }
      ]
    },
    {
      storytext: "تبدأ منصة العرض بالعمل تحت أنظار المئات من الحضور والمصممين والصحافة العالمية في باريس! عرض أزياء خرافي يثبت أن السحر الحقيقي هو الإيمان بالقدرات والصداقة. تنجح باربي في إنقاذ دار أزياء عمتها للأبد وتحقيق انتصار تاريخي لأحلام الموضة الوردية!",
      subtitles: [
        "المذيع الفرنسي: والآن.. العرض الأكثر سحراً في تاريخ عاصمة الموضة باريس لـ باربي وأليس!",
        "الجمهور يصفق بحرارة: يا لروعة التصاميم المتوهجة! إنه حلم وردي مذهل ينبض بالحياة!",
        "باربي ممسكة بيد أليس: لقد فعلناها يا أليس! السحر الحقيقي كان بداخلنا، في تمنياتنا ورغبتنا في عدم الاستسلام!",
        "العمة ميلسنت والدموع في عينيها: شكراً لكِ يا باربي.. لقد أنقذتِ إرث العائلة وفتحتِ عهداً جديداً للأزياء!"
      ],
      quiz: [
        {
          question: "كيف تمكنت باربي من إنقاذ دار أزياء عمتها في النهاية؟",
          options: ["بتقديم عرض أزياء سحري خارق ومبهر للجمهور", "ببيع المحل لمصمم منافس طماع وغدار", "بالدخول في مسابقة تزلج على الجليد العالي"],
          correctIndex: 0,
          hint: "تم إنقاذ المحل بعرض الأزياء السحري التاريخي الذي نال إعجاب واعتراف الجميع في باريس!"
        }
      ]
    }
  ],
  "default": [
    {
      storytext: "تبدأ مغامرة باربي السحرية المشوقة المليئة بالتحديات والمرح، حيث تجتمع باربي مع صديقاتها في اللحظات الأولى من القصة السحرية للتعرف على حبكة الفيلم الشيقة.",
      subtitles: [
        "باربي بابتسامة: أهلاً بكنّ يا صديقاتي في هذا العالم الساحر المليء بالمغامرات الفاتنة!",
        "الصديقة المخلصة: يسعدني جداً مرافقتكِ في هذه الرحلة الخرافية الاستثنائية اليوم!",
        "باربي: سنواجه التحديات معاً بكل حب وقوة وتضامن!"
      ],
      quiz: [
        {
          question: "ما هي أهم صفة تمثل شخصيات أفلام باربي في مواجهة الصعاب؟",
          options: ["التعاون والصداقة الحميمة الحقيقية", "العزلة وتجنب المساعدة من الآخرين", "الاستسلام فوراً لأي تحدي صغير"],
          correctIndex: 0,
          hint: "الصداقة والتعاون والإيمان بالذات هي قلب كل قصة سحرية في أفلام باربي!"
        }
      ]
    },
    {
      storytext: "تتطور الأحداث وتكتشف البطلات سراً تاريخياً أو قوة خارقة تساعدهن على التقدم وكشف المكائد والدسائس التي يحيكها الأشرار ضد السلام في مملكتهن السحرية.",
      subtitles: [
        "باربي: انظروا جميعاً.. هذا الرمز السري يحمل طاقة أجدادنا السحرية العريقة!",
        "العدو المتسلل: لن أسمح لكنّ بالوصول للأحجار الكريمة، هذه القوة ستصبح ملكي وحدي!",
        "باربي بثقة: الصداقة والأمل الحقيقي أقوى من كل قواك وخططك الشريرة!"
      ],
      quiz: [
        {
          question: "ما الذي تسعى باربي وصديقاتها لحمايته دائماً؟",
          options: ["مملكتهن السحرية بنشر الخير والحب للأبد", "الصداقة السطحية فقط والمال الوفير", "شهرة المظاهر الخداعية أمام الناس"],
          correctIndex: 0,
          hint: "الخير والحب والسلام هما دائماً القيمة الأكبر المدافع عنها!"
        }
      ]
    },
    {
      storytext: "يتصاعد التوتر وتقترب البطلات من الحل الفاصل، محاولات أخيرة شجاعة لتركيب الفستان أو تعويذة السحر أو إعداد الخطة النهائية للتحدي القادم.",
      subtitles: [
        "المرافقة الوفية: الوقت ضيق جداً لمواجهة التحدي الفعلي، هل نحن على أتم الاستعداد؟",
        "باربي مشجعة: نعم! طالما قلوبنا متصلة بصدق وإيمان، فلا شيء مستحيل على الإطلاق!",
        "الجنيات المساعدة: طاقة سحر الورود والنجوم البراقة تؤيد خطواتكن السعيدة!"
      ],
      quiz: [
        {
          question: "ما الذي يجب تقديمه قبل اتخاذ القرارات الحاسمة؟",
          options: ["التروي والتخطيط القائم على الحب والتعاون", "القرارات العشوائية المتسرعة والخطرة", "الهروب من التحديات تماماً وترك الأصدقاء"],
          correctIndex: 0,
          hint: "التخطيط بالرفق والتعاون يضمن النصر الدائم!"
        }
      ]
    },
    {
      storytext: "النهاية السعيدة المبهجة! تنجح باربي بحب وشجاعة فائقة في تخطي كافة العقبات وتنظيم العرض أو إنقاذ الغابة أو تحقيق الكأس لتعم البهجة والاحتفال الراقص بنجاح ساحق ومبهر للجميع.",
      subtitles: [
        "باربي بسعادة عارمة: لقد فعلناها بحق يا بنات! انتصر الخير والأحلام الوردية الجميلة!",
        "الجميع يحتفلون ويغنون: السحر الحقيقي هو الحب والأمل اللذان يكمنان في أعماق كل واحدة منا!",
        "المعجبين والصديقات: دمتِ لنا ملهمة الأناقة والأخلاق الرائعة يا باربي الجميلة!"
      ],
      quiz: [
        {
          question: "ما هو الدرس التعليمي الأبرز المستفاد من نهاية قصة باربي؟",
          options: ["أن الخير والإصرار والصداقة ينتصرون دائماً", "أن الغش والخداع يمكن أن ينجحا في الحياة", "أن الأحلام لا قيمة لها ولا مبرر لتحقيقها"],
          correctIndex: 0,
          hint: "الإيمان بالأحلام والعمل مع الصديقات بصدق يقود لأفضل النهايات دائماً!"
        }
      ]
    }
  ]
};

interface VideoPlayerProps {
  movie: Movie;
  settings: AppSettings;
  onChangeSettings: (newSettings: Partial<AppSettings>) => void;
  onAddHistory: (item: Omit<HistoryItem, 'id' | 'watchedAt'>) => void;
  onClose: () => void;
  onNextMovie?: () => void;
  onMovieFinished?: () => void;
}

export default function VideoPlayer({
  movie,
  settings,
  onChangeSettings,
  onAddHistory,
  onClose,
  onNextMovie,
  onMovieFinished
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playMode, setPlayMode] = useState<'simulation' | 'trailer' | 'movie'>('movie');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // Simulated 120 minutes total duration
  const [currentQuality, setCurrentQuality] = useState<'1080p' | '720p' | '480p'>(settings.defaultQuality);
  const [currentSound, setCurrentSound] = useState(movie.soundOptions[0]);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // New States to enrich offline simulation mode
  const [frockColor, setFrockColor] = useState<string>('#FF1493'); // Deep pink default
  const [glitterStyle, setGlitterStyle] = useState<'stars' | 'hearts' | 'glow' | 'none'>('glow');
  const [fairyPower, setFairyPower] = useState<'shimmer' | 'shine' | 'glimmer' | 'none'>('none');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [congratsMsg, setCongratsMsg] = useState<string>("");
  const [subtitleSliceIdx, setSubtitleSliceIdx] = useState<number>(0);
  
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse duration of movie
  useEffect(() => {
    // extract duration logic (e.g. "1 ساعة و 25 دقيقة")
    const matchHours = movie.duration.match(/(\d+)\s*ساعة/);
    const matchMinutes = movie.duration.match(/(\d+)\s*دقيقة/);
    const hrs = matchHours ? parseInt(matchHours[1]) : 1;
    const mins = matchMinutes ? parseInt(matchMinutes[1]) : 30;
    setDuration(hrs * 60 + mins);
    setCurrentTime(0);
    setActiveSceneIndex(0);
    setIsPlaying(true);
    setIsBuffering(true);
    
    // Autofallback mode switcher depending on available resources
    setPlayMode('movie');

    const t = setTimeout(() => setIsBuffering(false), 800);
    return () => clearTimeout(t);
  }, [movie]);

  // Handle Playback Simulation Timer
  useEffect(() => {
    if (isPlaying && !isBuffering) {
      progressTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (onMovieFinished) {
              onMovieFinished();
            }
            if (settings.autoPlay && onNextMovie) {
              // trigger next movie!
              onNextMovie();
            }
            return duration;
          }
          
          // Check if we hit a new scene threshold
          const progressPercent = (prev / duration) * 100;
          let newIndex = 0;
          if (progressPercent >= 75) newIndex = 3;
          else if (progressPercent >= 50) newIndex = 2;
          else if (progressPercent >= 25) newIndex = 1;
          else newIndex = 0;

          setActiveSceneIndex((oldIdx) => {
            if (oldIdx !== newIndex) {
              setSelectedAnswer(null); // Reset quiz on scene rotate
              setCongratsMsg("");
            }
            return newIndex;
          });

          // Rotate subtitles dynamically to simulate actor dialogues
          setSubtitleSliceIdx((old) => (old + 1) % 4);

          return prev + 1; // simulation speeds up: 1 second adds 1 minute of watch action
        });
      }, 1100);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, isBuffering, duration, settings.autoPlay, onNextMovie]);

  // Save progress to watch history when pausing or closing, or when updated
  useEffect(() => {
    // Throttle progress save
    if (currentTime > 0) {
      onAddHistory({
        movieId: movie.id,
        progressMinutes: currentTime,
        totalDurationMinutes: duration,
        quality: currentQuality
      });
    }
  }, [currentTime, currentQuality, movie.id, duration]);

  // Change Scene
  const handleJumpToScene = (index: number, timeStr: string) => {
    setIsBuffering(true);
    setActiveSceneIndex(index);
    
    // convert scene timestamp e.g. "18:24" into minutes
    const parts = timeStr.split(':');
    let targetMin = 0;
    if (parts.length === 2) {
      targetMin = parseInt(parts[0]) + parseInt(parts[1]) / 60;
    } else if (parts.length === 3) {
      targetMin = parseInt(parts[0]) * 60 + parseInt(parts[1]) + parseInt(parts[2]) / 60;
    }
    
    setCurrentTime(Math.min(Math.floor(targetMin), duration));
    setTimeout(() => {
      setIsBuffering(false);
      setIsPlaying(true);
    }, 600);
  };

  // Skip 10 mins forward
  const handleSkipForward = () => {
    setCurrentTime((prev) => Math.min(prev + 10, duration));
    setIsBuffering(true);
    setTimeout(() => setIsBuffering(false), 300);
  };

  // Rewind 10 mins backward
  const handleRewind = () => {
    setCurrentTime((prev) => Math.max(prev - 10, 0));
    setIsBuffering(true);
    setTimeout(() => setIsBuffering(false), 300);
  };

  // Format Time for Arabic interface, e.g., "1:24"
  const formatTimeStr = (minutesCount: number) => {
    const hrs = Math.floor(minutesCount / 60);
    const mins = minutesCount % 60;
    return `${hrs}:${mins < 10 ? '0' : ''}${mins}`;
  };

  const activeScene = movie.scenes[activeSceneIndex] || movie.scenes[0];

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-pink-500/30 shadow-2xl relative" id="styled_video_player">
      {/* Top Header Controls */}
      <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-slate-950/80 to-transparent p-4 flex flex-col md:flex-row gap-3 justify-between items-center">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md text-pink-200 hover:text-white px-4 py-2 rounded-full border border-pink-500/20 text-sm transition-all shrink-0"
          id="player_quit_btn"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>الرجوع للمكتبة</span>
        </button>

        {/* Switcher PILLED tab */}
        <div className="flex bg-slate-950/90 backdrop-blur-md rounded-full p-1 border border-pink-500/20 shadow-lg" id="player_mode_switch">
          {movie.videoUrl && (
            <button
              onClick={() => {
                setPlayMode('movie');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                playMode === 'movie'
                  ? 'bg-[#FF85A2] text-white shadow-md shadow-pink-500/30 font-extrabold'
                  : 'text-pink-300 hover:text-white'
              }`}
            >
              🍿 تشغيل الفيلم الكامل (مباشر)
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-pink-600/90 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg shadow-pink-500/20">
            <Sparkles className="w-3 h-3 animate-pulse" />
            جاري التشغيل: {movie.category === 'subbed' ? 'مترجم' : 'مدبلج'}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs px-3 py-1 rounded-full border border-slate-700 font-mono">
            {currentQuality}
          </span>
        </div>
      </div>

      {/* Actual Player Screen Area */}
      <div className="relative aspect-video bg-slate-950 flex flex-col justify-center items-center overflow-hidden group select-none">
        
        {playMode === 'movie' && movie.videoUrl ? (
          <div className="absolute inset-0 z-10 bg-black" id="movie_iframe_container">
            <iframe
              src={movie.videoUrl}
              title={movie.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="no-referrer"
              allowFullScreen
            />
          </div>
        ) : playMode === 'trailer' && movie.trailerYoutubeId ? (
          <div className="absolute inset-0 z-10 bg-black" id="youtube_iframe_container">
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&showinfo=0&controls=1&modestbranding=1`}
              title={movie.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="no-referrer"
              allowFullScreen
            />
          </div>
        ) : (
          (() => {
            const simulationData = MOVIE_SIMULATIONS[movie.id] || MOVIE_SIMULATIONS["default"];
            const activeSim = simulationData[activeSceneIndex] || simulationData[0];
            const activeDialog = activeSim.subtitles[subtitleSliceIdx] || activeSim.subtitles[0];
            const activeQuiz = activeSim.quiz[0];

            return (
              <>
                {/* Simulated Fairytale Canvas with Glowing Stars */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${activeScene.screenshotBg} opacity-95 flex flex-col justify-between p-6 overflow-y-auto pb-24`}>
                  
                  {/* Decorative Sparkles/Fairies absolute positions */}
                  <div className="absolute top-12 left-20 pointer-events-none animate-bounce duration-1000 select-none">
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  </div>
                  <div className="absolute top-28 right-16 pointer-events-none animate-pulse select-none">
                    <Sparkles className="w-4 h-4 text-pink-300" />
                  </div>
                  <div className="absolute bottom-32 left-10 pointer-events-none animate-bounce select-none">
                    <Heart className="w-5 h-5 text-red-300 opacity-60 fill-current" />
                  </div>

                  {/* Offline Interactive Top status bar */}
                  <div className="flex justify-between items-center border-b border-white/20 pb-3 mt-14">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-pink-600 text-[10px] font-bold text-white uppercase tracking-wider animate-pulse flex items-center gap-1 shadow">
                        <Award className="w-3 h-3" />
                        نمط المحاكاة التفاعلية (أوفلاين)
                      </span>
                      <span className="text-[11px] text-pink-100 font-medium hidden sm:block">
                        تصفح وحاكي سيناريو الفيلم بدون إنترنت 💝
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full text-xs text-pink-200">
                      <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                      <span>النقاط السحرية للطفل: <strong className="text-white font-mono">{quizScore}</strong> ⭐</span>
                    </div>
                  </div>

                  {/* Core Interactive Layout grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3 items-stretch">
                    
                    {/* Left: Dynamic Dress Designer Magic & Live Subtitles (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      
                      {/* Narrative box */}
                      <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-pink-400/30 shadow-lg text-right">
                        <h4 className="text-xs text-pink-400 font-bold mb-1 flex items-center gap-1.5 justify-end">
                          <Tv className="w-3.5 h-3.5 text-pink-400" />
                          <span>سرد أحداث الفصل الحالي:</span>
                        </h4>
                        <p className="text-xs text-slate-100 font-sans leading-5">
                          {activeSim.storytext}
                        </p>
                      </div>

                      {/* Live Simulated Scene Dialogues (The virtual actress screen) */}
                      <div className="bg-gradient-to-l from-pink-900/50 to-purple-900/50 backdrop-blur p-4 rounded-2xl border border-pink-500/40 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-24">
                        <div className="absolute top-2 right-3 flex items-center gap-1">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                          <span className="text-[9px] text-slate-300 font-mono">بث الحوار الداخلي..</span>
                        </div>
                        <p className="text-sm md:text-base font-bold text-white drop-shadow-md font-sans px-4 text-center leading-7 py-2 select-text">
                          {activeDialog}
                        </p>
                      </div>

                      {/* Barbie's Custom Dress Designer Simulator (Exclusive only for Barbie's magical style) */}
                      <div className="bg-slate-950/90 rounded-2xl p-4 border border-pink-400/30 shadow-2xl">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] bg-pink-700 text-white px-2 py-0.5 rounded-full font-bold">مصمم الأزياء التفاعلي 🧚</span>
                          <h4 className="text-xs text-pink-300 font-bold flex items-center gap-1">
                            <Scissors className="w-3.5 h-3.5 text-pink-400" />
                            <span>مختبر فستان باربي السحري (أوفلاين)</span>
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          {/* Interactive preview avatar */}
                          <div className="sm:col-span-5 flex flex-col items-center bg-slate-900/60 p-3 rounded-xl border border-pink-500/20 relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_center,rgba(255,20,147,0.4)_0,transparent_70%)]" />
                            
                            {/* SVG Representation of Dress glowing with selected state configs */}
                            <svg viewBox="0 0 100 100" className={`w-20 h-24 transition-all duration-500 ${fairyPower !== 'none' ? 'animate-bounce' : ''}`} style={{ filter: `drop-shadow(0 0 12px ${frockColor})` }}>
                              {/* Hanger and neck outline */}
                              <path d="M 35,20 Q 50,15 65,20 M 50,20 L 50,30" stroke="#ffb6c1" strokeWidth="2" fill="none" />
                              {/* Glowing gown shape reflecting the color custom styling and glitter effects */}
                              <path d="M 40,30 Q 50,38 60,30 Q 64,48 75,55 L 85,88 Q 50,92 15,88 L 25,55 Z" fill={frockColor} className="transition-all duration-500" />
                              {/* Inner decoration panel based on Fairy energy selection */}
                              {fairyPower === 'shimmer' && <path d="M 45,30 Q 50,45 55,30 Q 50,70 50,88" stroke="#ffffff" strokeWidth="2" strokeDasharray="3" fill="none" />}
                              {fairyPower === 'shine' && <polygon points="50,40 55,50 65,52 57,60 60,70 50,65 40,70 43,60 35,52 45,50" fill="#FFFF00" />}
                              {fairyPower === 'glimmer' && <path d="M 30,60 L 70,60 M 20,75 L 80,75" stroke="#00FFFF" strokeWidth="1.5" strokeDasharray="5" fill="none" />}
                            </svg>

                            <span className="text-[10px] text-pink-200 mt-2 text-center">
                              معاينة للتصميم المتوهج ببريق <strong>
                                {glitterStyle === 'stars' ? 'النجمات' : glitterStyle === 'hearts' ? 'القلوب الدافئة' : glitterStyle === 'glow' ? 'النيون المتلأليء' : 'ناعم'}
                              </strong>
                            </span>
                          </div>

                          {/* Control panel buttons to interact with design */}
                          <div className="sm:col-span-7 flex flex-col gap-2.5 text-right font-sans">
                            {/* Set Color */}
                            <div>
                              <span className="text-[10px] text-slate-300 block mb-1 font-semibold">1. اختر اللون الأساسي للفساتين:</span>
                              <div className="flex gap-2 justify-end">
                                {[
                                  { color: '#FF1493', label: 'وردي خالص' },
                                  { color: '#8A2BE2', label: 'بنفسجي ملكي' },
                                  { color: '#FF85A2', label: 'زهري فاتح' },
                                  { color: '#FFD700', label: 'ذهبي خيالي' },
                                  { color: '#00D2D2', label: 'سماوي مائي' }
                                ].map((c) => (
                                  <button
                                    key={c.color}
                                    onClick={() => setFrockColor(c.color)}
                                    className="w-5 h-5 rounded-full border-2 border-white/60 transition-transform active:scale-95 hover:scale-110 cursor-pointer flex items-center justify-center"
                                    style={{ backgroundColor: c.color }}
                                    title={c.label}
                                  >
                                    {frockColor === c.color && <Check className="w-3 h-3 text-white" />}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Set Glitter layout */}
                            <div>
                              <span className="text-[10px] text-slate-300 block mb-1 font-semibold">2. نوع بريق جنيات الموضة:</span>
                              <div className="grid grid-cols-4 gap-1">
                                {[
                                  { key: 'glow', label: 'توهج نيون' },
                                  { key: 'stars', label: 'نجمات غبار' },
                                  { key: 'hearts', label: 'ستاردست' },
                                  { key: 'none', label: 'طبيعي' }
                                ].map((g) => (
                                  <button
                                    key={g.key}
                                    onClick={() => setGlitterStyle(g.key as any)}
                                    className={`text-[9px] py-1 rounded border/50 text-center transition-all ${
                                      glitterStyle === g.key 
                                        ? "bg-pink-600 text-white font-bold" 
                                        : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                                    }`}
                                  >
                                    {g.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Fairy magic booster */}
                            <div>
                              <span className="text-[10px] text-slate-300 block mb-1 font-semibold">3. تعزيز طاقة الجنية المحددة:</span>
                              <div className="grid grid-cols-4 gap-1">
                                {[
                                  { key: 'shimmer', label: 'جنية شيمر ⚡' },
                                  { key: 'shine', label: 'جنية شاين ✨' },
                                  { key: 'glimmer', label: 'جنية غليمر ☄️' },
                                  { key: 'none', label: 'تعطيل القوة' }
                                ].map((f) => (
                                  <button
                                    key={f.key}
                                    onClick={() => setFairyPower(f.key as any)}
                                    className={`text-[9px] py-1 rounded border/50 text-center transition-all ${
                                      fairyPower === f.key 
                                        ? "bg-purple-600 text-white font-bold animate-pulse" 
                                        : "bg-slate-900 text-slate-300 hover:bg-slate-800"
                                    }`}
                                  >
                                    {f.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Barbie Fairytale Live Quiz (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      <div className="bg-slate-950/90 rounded-2xl p-4 border border-pink-400/30 shadow-2xl flex flex-col justify-between h-full text-right font-sans">
                        <div>
                          <h4 className="text-xs text-pink-300 font-bold mb-2 flex items-center gap-1.5 justify-end">
                            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                            <span>مسابقة المشهد وأزياء باربي السحرية</span>
                          </h4>
                          <p className="text-[11px] text-slate-400 mb-3">
                            أجيبوا كأبطال متألقين لربح نقاط وقوى جنيات الموضة السحرية في وضع الأوفلاين!
                          </p>

                          {/* Render Live Quiz if available */}
                          {activeQuiz ? (
                            <div className="bg-slate-900/80 rounded-xl p-3 border border-pink-500/10">
                              <span className="text-[10px] bg-slate-800 text-pink-300 px-2 py-0.5 rounded-full font-bold mb-2 inline-block">سؤال الفصل {activeSceneIndex + 1}:</span>
                              <p className="text-xs font-bold text-white mb-3 leading-relaxed">
                                {activeQuiz.question}
                              </p>

                              <div className="flex flex-col gap-2">
                                {activeQuiz.options.map((opt, oIdx) => {
                                  const isSelected = selectedAnswer === oIdx;
                                  const isCorrect = oIdx === activeQuiz.correctIndex;
                                  let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800";
                                  
                                  if (selectedAnswer !== null) {
                                    if (isCorrect) {
                                      btnStyle = "bg-green-950/60 border-green-500 text-green-200 font-bold";
                                    } else if (isSelected) {
                                      btnStyle = "bg-red-950/60 border-red-500 text-red-200";
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => {
                                        if (selectedAnswer !== null) return; // Prevent double selecting
                                        setSelectedAnswer(oIdx);
                                        if (oIdx === activeQuiz.correctIndex) {
                                          setQuizScore((prev) => prev + 50);
                                          setCongratsMsg("أحسنتِ إجابة سحرية صحيحة بالكامل! فزتِ بـ 50 نقطة من جنيات باربي! 🎉✨");
                                        } else {
                                          setCongratsMsg("محاولة لطيفة! لكن الإجابة غير صحيحة، اقرئي تلميح الحكمة لمزيد من المعرفة حول باربي! 💖");
                                        }
                                      }}
                                      disabled={selectedAnswer !== null}
                                      className={`text-xs p-2.5 rounded-xl border text-right transition-all flex items-center justify-between gap-1 cursor-pointer ${btnStyle}`}
                                    >
                                      <span>{opt}</span>
                                      {selectedAnswer !== null && isCorrect && <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Hint or congratulate block */}
                              {congratsMsg && (
                                <div className="mt-3 text-[11px] p-2.5 rounded-lg bg-pink-900/20 border border-pink-500/30 text-pink-200 leading-normal animate-fade-in">
                                  {congratsMsg}
                                </div>
                              )}

                              {selectedAnswer !== null && (
                                <div className="mt-2 text-[10px] text-slate-400 bg-slate-900/50 p-2 rounded-lg leading-normal">
                                  💡 <strong>تلميح جنيات الموضة: </strong> {activeQuiz.hint}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">لا يوجد أسئلة لهذا الفصل المختار حالياً.</p>
                          )}
                        </div>

                        {/* Fast forward scene or skip simulator inside Quiz panel */}
                        <div className="mt-3 border-t border-slate-800 pt-3 flex justify-between items-center text-xs">
                          <button
                            onClick={() => {
                              setSelectedAnswer(null);
                              setCongratsMsg("");
                              // Advance to next scene visually in the simulator
                              setActiveSceneIndex((old) => (old + 1) % 4);
                            }}
                            className="bg-pink-700 hover:bg-pink-600 text-white font-bold py-1.5 px-3 rounded-xl transition-all active:scale-95 text-[11px] flex items-center gap-1 cursor-pointer shadow"
                          >
                            <SkipForward className="w-3.5 h-3.5" />
                            <span>المشهد الخيالي التالي 🎬</span>
                          </button>
                          <span className="text-[10px] text-pink-300">
                            الفصل الحالي: {activeSceneIndex + 1} من 4
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Buffering State */}
                {isBuffering && (
                  <div className="absolute inset-0 z-40 bg-slate-950/70 backdrop-blur-sm flex flex-col gap-3 justify-center items-center" id="buffering_indicator">
                    <div className="w-12 h-12 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin" />
                    <p className="text-pink-100 text-sm font-semibold animate-pulse font-sans">
                      جاري تحميل البث السحري بجودة {currentQuality}... 💖
                    </p>
                  </div>
                )}

                {/* Overlay Displaying Currently Playing Title and Scene metadata */}
                <div className="absolute bottom-20 left-4 right-4 z-20 text-right pointer-events-none drop-shadow-lg transition-all duration-500 flex justify-between items-end">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl inline-flex flex-col border border-pink-500/30 text-right">
                    <span className="text-[10px] text-pink-300 font-bold block">المشهد الحالي:</span>
                    <span className="text-xs text-pink-100 font-semibold">{activeScene.title}</span>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black text-white font-sans tracking-tight mb-0.5">
                      {movie.title}
                    </h2>
                    <p className="text-pink-300 text-[10px] font-medium">
                      {movie.titleOriginal} ({movie.year})
                    </p>
                  </div>
                </div>

                {/* Bottom Custom Playback Bar Area */}
                <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex flex-col gap-2.5 pt-12">
                  {/* Progress Slider Bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-pink-200 font-mono select-none">
                      {formatTimeStr(currentTime)}
                    </span>
                    
                    {/* Clickable Progress track */}
                    <div 
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percent = clickX / rect.width;
                        setIsBuffering(true);
                        setCurrentTime(Math.floor(percent * duration));
                        setTimeout(() => setIsBuffering(false), 400);
                      }}
                      className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative group/track animate-pulse"
                    >
                      <div 
                        className="absolute top-0 left-0 h-full bg-pink-500 shadow-lg shadow-pink-500/50" 
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-400 border border-white opacity-0 group-hover/track:opacity-100 transition-opacity"
                        style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
                      />
                    </div>

                    <span className="text-xs text-pink-200 font-mono select-none">
                      {formatTimeStr(duration)}
                    </span>
                  </div>

                  {/* Controls Cluster */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      {/* Play / Pause button */}
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-pink-400 transition-colors p-1 cursor-pointer"
                        title={isPlaying ? "إيقاف مؤقت" : "تشغيل المحاكي"}
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      </button>

                      {/* Skip forward and rewind */}
                      <button 
                        onClick={handleRewind}
                        className="text-pink-300 hover:text-white transition-colors cursor-pointer"
                        title="إرجاع 10 دقائق"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleSkipForward}
                        className="text-pink-300 hover:text-white transition-colors cursor-pointer"
                        title="تقديم 10 دقائق"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>

                      {/* Volume Slider control */}
                      <div className="flex items-center gap-2 group/volume">
                        <button 
                          onClick={() => setVolume(volume === 0 ? 80 : 0)}
                          className="text-pink-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-16 h-1 mt-0.5 accent-pink-500 rounded bg-slate-800 transition-all cursor-pointer group-hover/volume:w-24"
                        />
                      </div>
                    </div>

                    {/* Quality, Sound, Autoplay, Fullscreen configurations */}
                    <div className="flex items-center gap-3 relative">
                      
                      {/* Autoplay status flag */}
                      <button 
                        onClick={() => onChangeSettings({ autoPlay: !settings.autoPlay })}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all border cursor-pointer ${
                          settings.autoPlay 
                            ? "bg-pink-900/40 text-pink-300 border-pink-500/40" 
                            : "bg-slate-900/80 text-slate-400 border-slate-800"
                        }`}
                        title="تفضيلات التشغيل التلقائي للفيلم القادم"
                      >
                        <Check className={`w-3.5 h-3.5 transition-opacity ${settings.autoPlay ? "opacity-100" : "opacity-0"}`} />
                        <span>تشغيل تلقائي</span>
                      </button>

                      {/* Settings Trigger Icon */}
                      <button 
                        onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                        className={`text-pink-300 hover:text-white transition-all p-1.5 rounded-full hover:bg-slate-900 cursor-pointer ${showSettingsDropdown ? "bg-slate-900 text-pink-400 rotate-45" : ""}`}
                        title="إعدادات الصوت والجودة"
                      >
                        <Settings className="w-4 h-4" />
                      </button>

                      {/* Settings Dropdown menu popup */}
                      {showSettingsDropdown && (
                        <div className="absolute bottom-10 left-0 r-auto z-50 bg-slate-950/95 backdrop-blur-md rounded-2xl p-4 border border-pink-500/30 shadow-2xl w-64 text-right flex flex-col gap-3.5" id="player_settings_dropdown">
                          
                          {/* Quality Settings Section */}
                          <div>
                            <span className="text-[11px] text-pink-400 font-bold block mb-2">جودة البث:</span>
                            <div className="grid grid-cols-3 gap-1">
                              {["1080p", "720p", "480p"].map((q) => (
                                <button
                                  key={q}
                                  onClick={() => {
                                    setIsBuffering(true);
                                    setCurrentQuality(q as any);
                                    onChangeSettings({ defaultQuality: q as any });
                                    setShowSettingsDropdown(false);
                                    setTimeout(() => setIsBuffering(false), 900);
                                  }}
                                  className={`text-xs py-1.5 rounded-lg border font-mono transition-all cursor-pointer ${
                                    currentQuality === q 
                                      ? "bg-pink-600 border-pink-500 text-white font-bold" 
                                      : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                                  }`}
                                >
                                  {q === "1080p" ? "FHD" : q === "720p" ? "HD" : "SD"} ({q})
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Audio Track settings */}
                          <div>
                            <span className="text-[11px] text-pink-400 font-bold block mb-2">القناة الصوتية:</span>
                            <div className="flex flex-col gap-1 text-right">
                              {movie.soundOptions.map((sound) => (
                                <button
                                  key={sound}
                                  onClick={() => {
                                    setCurrentSound(sound);
                                    setShowSettingsDropdown(false);
                                  }}
                                  className={`text-xs p-2 rounded-lg text-right flex items-center justify-between gap-2 border transition-all cursor-pointer ${
                                    currentSound === sound 
                                      ? "bg-pink-900/30 border-pink-500/40 text-pink-200" 
                                      : "bg-slate-900/60 border-transparent text-slate-400 hover:bg-slate-800"
                                  }`}
                                >
                                  <span className="flex-1 truncate">{sound}</span>
                                  {currentSound === sound && <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Autoplay slider inside controls */}
                          <div className="border-t border-slate-900 pt-2 flex justify-between items-center text-xs text-slate-300">
                            <span className="font-sans">تشغيل تلقائي للفيلم التالي</span>
                            <input 
                              type="checkbox"
                              checked={settings.autoPlay}
                              onChange={(e) => onChangeSettings({ autoPlay: e.target.checked })}
                              className="accent-pink-600 rounded cursor-pointer w-4 h-4"
                            />
                          </div>
                        </div>
                      )}

                      {/* Theater switch button */}
                      <button 
                        onClick={() => {
                          if (document.fullscreenElement) {
                            document.exitFullscreen();
                          } else {
                            document.getElementById("styled_video_player")?.requestFullscreen();
                          }
                        }}
                        className="text-pink-300 hover:text-white transition-colors p-1 cursor-pointer"
                        title="ملء الشاشة"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()
        )}
      </div>

    </div>
  );
}
