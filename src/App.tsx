/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Download, 
  History, 
  Settings as SettingsIcon, 
  MessageSquare, 
  Home, 
  Tv, 
  Bell, 
  Moon, 
  Sun, 
  Play, 
  Trash2, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Clock, 
  Volume2, 
  HelpCircle, 
  Send,
  Wifi,
  WifiOff,
  Calendar,
  Info,
  Star
} from 'lucide-react';
import { BARBIE_MOVIES_DATABASE } from './data';
import { Movie, HistoryItem, DownloadItem, SupportMessage, NotificationItem, AppSettings } from './types';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  // --- Core Application State ---
  const [activeTab, setActiveTab] = useState<'home' | 'favorites' | 'history' | 'downloads' | 'settings'>('home');
  const [selectedCategory, setSelectedCategory] = useState<'subbed' | 'dubbed'>('subbed');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByYear, setSortByYear] = useState<'desc' | 'asc'>('desc');
  
  // Custom states for the player and active viewing
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  // Persistence loaded on mount
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    autoPlay: true,
    defaultQuality: '1080p',
    nightMode: true, // Defaulting to stylish cozy dark cinematic mode
    eyeComfortTint: false
  });
  
  // Custom states for local experience
  const [isOfflineSandbox, setIsOfflineSandbox] = useState(false); // Sandbox test mode for offline viewing
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'warn' | 'info' } | null>(null);
  const [downloadingMovieId, setDownloadingMovieId] = useState<string | null>(null);

  // Help support chat states
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportMessageInput, setSupportMessageInput] = useState('');
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [isSupportTyping, setIsSupportTyping] = useState(false);

  // Ratings persistence
  const [movieRatings, setMovieRatings] = useState<Record<string, number>>({});
  const [completedMovieId, setCompletedMovieId] = useState<string | null>(null);
  const [ratingHover, setRatingHover] = useState<number | null>(null);

  useEffect(() => {
    setCompletedMovieId(null);
    setRatingHover(null);
  }, [playingMovie?.id]);

  // --- Load Persisted Data on Mount ---
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('barbie_favs');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedHistory = localStorage.getItem('barbie_history');
      if (storedHistory) setHistory(JSON.parse(storedHistory));

      const storedDownloads = localStorage.getItem('barbie_downloads');
      if (storedDownloads) setDownloads(JSON.parse(storedDownloads));

      const storedSettings = localStorage.getItem('barbie_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedRatings = localStorage.getItem('barbie_movie_ratings');
      if (storedRatings) setMovieRatings(JSON.parse(storedRatings));

      const storedNotifications = localStorage.getItem('barbie_notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        // Initialize default notifications
        const initialNotifications: NotificationItem[] = [
          {
            id: 'notif-1',
            title: '🎀 أهلاً بكِ في عالم سينما باربي السحري!',
            body: 'استمتعي بأروع تشكيلة من أفلام باربي مدبلجة ومترجمة باللغة العربية بجودة فائقة السرعة ومتعة كاملة مع عائلتك وصديقاتك! 💕',
            timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
            isRead: false,
            type: 'system'
          },
          {
            id: 'notif-2',
            title: '✨ إضافة جديدة: باربي المغامرة الواقعية الحرة (2023)',
            body: 'الفيلم الحصري الشهير من بطولة مارجو روبي متاح الآن بجودة فائقة للترجمة العربية والتحميل الفوري! 🍿🦄',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            isRead: false,
            movieId: 'sub-8',
            type: 'movie'
          },
          {
            id: 'notif-3',
            title: '🌸 دعم فني مباشر ومتواصل 24 ساعة',
            body: 'صديقتك اللطيفة "وردة" مستعدة لتلقي استفساراتك حول كيفية التحميل لتشغيل الفيلم بدون إنترنت أو تفعيل الرؤية الليلية الهادئة. 💕💅',
            timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
            isRead: true,
            type: 'support'
          }
        ];
        setNotifications(initialNotifications);
        localStorage.setItem('barbie_notifications', JSON.stringify(initialNotifications));
      }

      // Preload support chatbot welcomes
      const initialChat: SupportMessage[] = [
        {
          id: 'chat-welcome',
          role: 'model',
          content: 'أهلاً بكِ يا جميلة في واحة الدعم الفني السحري لسينما باربي! 🎀✨ أنا "وردة" رفيقتكِ التقنية الودودة، ومستعدة لمساعدتكِ في أي وقت وعلى مدار الساعة لحل المشكلات!\n\nكيف يمكنني إسعادكِ وتوجيهكِ اليوم؟ 💖🧚‍♀️',
          timestamp: new Date().toISOString()
        }
      ];
      setSupportMessages(initialChat);

    } catch (e) {
      console.error('Failed to restore local database states', e);
    }
  }, []);

  // --- Sync State back to LocalStorage ---
  const saveFavorites = (newFavs: string[]) => {
    setFavorites(newFavs);
    localStorage.setItem('barbie_favs', JSON.stringify(newFavs));
  };

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('barbie_history', JSON.stringify(newHistory));
  };

  const saveDownloads = (newDownloads: DownloadItem[]) => {
    setDownloads(newDownloads);
    localStorage.setItem('barbie_downloads', JSON.stringify(newDownloads));
  };

  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('barbie_settings', JSON.stringify(newSettings));
  };

  const saveNotifications = (newNotifs: NotificationItem[]) => {
    setNotifications(newNotifs);
    localStorage.setItem('barbie_notifications', JSON.stringify(newNotifs));
  };

  const handleRateMovie = (movieId: string, rating: number) => {
    const updated = { ...movieRatings, [movieId]: rating };
    setMovieRatings(updated);
    localStorage.setItem('barbie_movie_ratings', JSON.stringify(updated));
    triggerToast(`شكراً لكِ من القلب! تم تقييم الفيلم بنجاح بـ ${rating} نجوم سحرية! ⭐💖`, 'success');
  };

  // --- Show Transient Status Toast ---
  const triggerToast = (message: string, type: 'success' | 'warn' | 'info' = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => {
      setShowToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // --- Toggle Favorites ---
  const handleToggleFavorite = (movieId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isFav = favorites.includes(movieId);
    let updated: string[];
    if (isFav) {
      updated = favorites.filter(id => id !== movieId);
      triggerToast('تمت إزالة الفيلم من قائمة المفضلة 🖤', 'warn');
    } else {
      updated = [...favorites, movieId];
      triggerToast('تمت إضافة الفيلم إلى مفضلتكِ الودية الرائعة! 💖', 'success');
    }
    saveFavorites(updated);
  };

  // --- Handle Watch History addition ---
  const handleAddHistory = (item: Omit<HistoryItem, 'id' | 'watchedAt'>) => {
    // Avoid double entry, update instead
    const filtered = history.filter(h => h.movieId !== item.movieId);
    const newItem: HistoryItem = {
      ...item,
      id: `hist-${Date.now()}-${Math.random()}`,
      watchedAt: new Date().toISOString()
    };
    const updated = [newItem, ...filtered].slice(0, 30); // limit to last 30 films
    saveHistory(updated);
  };

  // --- Handle Real-time Simulated Movie Download ---
  const handleStartDownload = (movie: Movie, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Check if already completed or downloading
    const status = downloads.find(d => d.movieId === movie.id);
    if (status?.isCompleted) {
      triggerToast('هذا الفيلم محمل بالفعل وجاهز للمشاهدة بدون إنترنت! 🌸', 'info');
      return;
    }
    if (downloadingMovieId) {
      triggerToast('هناك فيلم آخر جاري تحميله فلكياً الآن، يرجى الانتظار! 🎀', 'warn');
      return;
    }

    setDownloadingMovieId(movie.id);
    
    // Setup initial download record if not exists
    const safeDownloads = downloads.filter(d => d.movieId !== movie.id);
    const sizeMb = Math.floor(Math.random() * 320) + 180; // simulated size 180-500mb
    const initialItem: DownloadItem = {
      movieId: movie.id,
      progress: 0,
      isCompleted: false,
      sizeMb
    };
    saveDownloads([...safeDownloads, initialItem]);
    triggerToast(`بدأ تحميل فيلم: "${movie.title}" للمشاهدة في الوضع غير المتصل! 📥`, 'success');

    // Simulate progress increments
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloadingMovieId(null);
        
        // update complete download
        const finishedDownloads = safeDownloads.map(d => d.movieId === movie.id ? { ...d, progress: 100, isCompleted: true } : d);
        if (!finishedDownloads.some(d => d.movieId === movie.id)) {
          finishedDownloads.push({
            movieId: movie.id,
            progress: 100,
            isCompleted: true,
            sizeMb
          });
        }
        saveDownloads(finishedDownloads);
        
        // Push notification of download success
        const downloadNotif: NotificationItem = {
          id: `notif-dl-${Date.now()}`,
          title: `📥 اكتمل تحميل الفيلم بنجاح!`,
          body: `فيلم "${movie.title}" متاح الآن بالكامل للمشاهدة بدون الحاجة لاتصال بالإنترنت أينما كنتِ! 🦄✨`,
          timestamp: new Date().toISOString(),
          isRead: false,
          movieId: movie.id,
          type: 'system'
        };
        const updatedNotifications = [downloadNotif, ...notifications];
        saveNotifications(updatedNotifications);
        
        triggerToast(`🎉 واو! اكتمل تحميل "${movie.title}" بنجاح فائق!`, 'success');
      } else {
        // Update intermediate state
        setDownloads(prev => {
          const mapped = prev.map(d => d.movieId === movie.id ? { ...d, progress } : d);
          return mapped;
        });
      }
    }, 450);
  };

  // --- Delete Downloaded Movie ---
  const handleDeleteDownload = (movieId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const filtered = downloads.filter(d => d.movieId !== movieId);
    saveDownloads(filtered);
    triggerToast('تم حذف ملف الفيلم المحمل من الذاكرة المحلية لتوفير مساحة 🧹', 'info');
  };

  // --- Send customer support message to Express API ---
  const handleSendSupportMessage = async () => {
    if (!supportMessageInput.trim()) return;

    const userMsg: SupportMessage = {
      id: `chat-usr-${Date.now()}`,
      role: 'user',
      content: supportMessageInput,
      timestamp: new Date().toISOString()
    };

    const updatedChat = [...supportMessages, userMsg];
    setSupportMessages(updatedChat);
    setSupportMessageInput('');
    setIsSupportTyping(true);

    try {
      // API request to the backend with context history
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedChat.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('API server issue');
      }

      const data = await response.json();
      
      const serverMsg: SupportMessage = {
        id: `chat-srv-${Date.now()}`,
        role: 'model',
        content: data.reply || 'أهلاً بكِ السحر يسري دائماً، ولكن وقع خلل بسيط!',
        timestamp: new Date().toISOString()
      };
      
      setSupportMessages(prev => [...prev, serverMsg]);

      // Add a support response notification
      const updateUnreadNotif: NotificationItem = {
        id: `notif-support-${Date.now()}`,
        title: '💬 وردة من الدعم الفني ردت على رسالتكِ',
        body: 'اضغطي لمشاهدة الرد الفني اللطيف وحل استفساركِ الحالي فوراً 💖',
        timestamp: new Date().toISOString(),
        isRead: false,
        type: 'support'
      };
      saveNotifications([updateUnreadNotif, ...notifications]);

    } catch (err) {
      console.error(err);
      // Failover response
      setTimeout(() => {
        const fallbackMsg: SupportMessage = {
          id: `chat-srv-fail-${Date.now()}`,
          role: 'model',
          content: 'لقد استلمت رسالتك التقنية الرائعة! 💖 سأقوم بإرسالها للمهندسين السحريين لمراجعتها في أسرع وقت. يمكنكِ دائماً الاطمئنان فنحن هنا معاً على مدار الساعة! 🌸🦄',
          timestamp: new Date().toISOString()
        };
        setSupportMessages(prev => [...prev, fallbackMsg]);
      }, 1000);
    } finally {
      setIsSupportTyping(false);
    }
  };

  // --- Filter and sort the movie list ---
  const getFilteredMovies = () => {
    // If we model as sandbox offline mode, we should check if they only want downloaded
    let db = BARBIE_MOVIES_DATABASE;

    // Filter by category
    db = db.filter(m => m.category === selectedCategory);

    // Filter by search text
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      db = db.filter(m => 
        m.title.toLowerCase().includes(query) || 
        m.titleOriginal.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.year.toString().includes(query)
      );
    }

    // Sort by production year
    return [...db].sort((a, b) => {
      if (sortByYear === 'desc') {
        return b.year - a.year;
      } else {
        return a.year - b.year;
      }
    });
  };

  // --- Helpers to resolve movies from id ---
  const getMovieById = (id: string) => {
    return BARBIE_MOVIES_DATABASE.find(m => m.id === id);
  };

  // Fetch only movies that are downloaded on offline section
  const getCachedDownloadedMovies = () => {
    const completedIds = downloads.filter(d => d.isCompleted).map(d => d.movieId);
    return BARBIE_MOVIES_DATABASE.filter(m => completedIds.includes(m.id));
  };

  const getFavoriteMoviesList = () => {
    return BARBIE_MOVIES_DATABASE.filter(m => favorites.includes(m.id));
  };

  // --- Notification Interactions ---
  const handleMarkAllNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    saveNotifications(updated);
    triggerToast('تم تحديد جميع الإشعارات كمقروءة 🎀', 'info');
  };

  const handleNotificationClick = (item: NotificationItem) => {
    const updated = notifications.map(n => n.id === item.id ? { ...n, isRead: true } : n);
    saveNotifications(updated);
    setShowNotificationsDropdown(false);

    if (item.movieId) {
      const movieObj = getMovieById(item.movieId);
      if (movieObj) {
        setPlayingMovie(movieObj);
        triggerToast(`جاري تشغيل: ${movieObj.title} ✨`, 'success');
      }
    } else if (item.type === 'support') {
      setIsSupportOpen(true);
    }
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 relative ${
      settings.nightMode ? 'bg-[#0F0F0F] text-white' : 'bg-[#FCF7F8] text-slate-800'
    }`}>
      
      {/* Eye Comfort Tint Overlay (Warm light filter) */}
      {settings.eyeComfortTint && (
        <div className="fixed inset-0 bg-amber-500/8 pointer-events-none z-50 mix-blend-multiply duration-500 transition-all" />
      )}

      {/* Dynamic Floating Toast Notification Alert */}
      {showToast && (
        <div className="fixed bottom-20 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-50 transform animate-bounce max-w-sm mx-auto sm:mx-0" id="toast_wrapper">
          <div className="bg-slate-900 border border-pink-500/40 text-pink-100 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold font-sans">{showToast.message}</p>
          </div>
        </div>
      )}

      {/* TOP Header Control Navigation Bar */}
      <nav className={`flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4 border-b ${
        settings.nightMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-pink-100 shadow-sm'
      } relative z-30`}>
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="text-lg sm:text-2xl font-black tracking-tighter text-[#FF85A2] flex items-center gap-1.5 sm:gap-2 select-none" id="brand_logo_main">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF85A2] text-white rounded-full flex items-center justify-center font-extrabold shadow-lg shadow-pink-500/30 text-xs sm:text-lg animate-pulse shrink-0">
              B
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm sm:text-xl font-extrabold leading-tight sm:leading-5">عالم باربي</span>
              <span className="text-[8px] sm:text-[10px] text-pink-400 font-bold tracking-tight sm:tracking-widest uppercase">السينما السحرية</span>
            </div>
          </div>

          {/* Quick tab filters on head if home is active as prescribed by design */}
          {activeTab === 'home' && (
            <div className="hidden md:flex bg-pink-500/10 rounded-full p-1 border border-pink-500/20" id="category_filter_switch">
              <button 
                onClick={() => setSelectedCategory('subbed')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === 'subbed' 
                    ? 'bg-[#FF85A2] text-white shadow-md' 
                    : 'text-pink-400 hover:text-pink-300'
                }`}
              >
                الأفلام المترجمة 📝
              </button>
              <button 
                onClick={() => setSelectedCategory('dubbed')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === 'dubbed' 
                    ? 'bg-[#FF85A2] text-white shadow-md' 
                    : 'text-pink-400 hover:text-pink-300'
                }`}
              >
                الأفلام المدبلجة 🎙️
              </button>
            </div>
          )}
        </div>

        {/* Central Searchbar (Dynamic React filter) */}
        <div className="flex-1 max-w-md mx-6 hidden lg:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحثي عن فيلم باربي السحري (كسارة البندق، رابونزل، بحيرة البجع...)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs rounded-full py-2 px-10 text-right focus:outline-none focus:ring-2 focus:ring-[#FF85A2]/50 ${
                settings.nightMode 
                  ? 'bg-white/10 text-white placeholder:text-white/40' 
                  : 'bg-slate-100 text-slate-800 placeholder:text-slate-400 border border-slate-200'
              }`}
            />
            <Search className="w-4 h-4 absolute right-4 top-2.5 text-[#FF85A2]" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-2 text-xs text-pink-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Action controls (Offline trigger, Notifications bell, user profile, NightMode quick toggle) */}
        <div className="flex items-center gap-3">
          
          {/* OFFLINE SANDBOX SIMULATOR toggle */}
          <button 
            onClick={() => {
              setIsOfflineSandbox(!isOfflineSandbox);
              triggerToast(
                !isOfflineSandbox 
                  ? 'تم قطع الاتصال بالإنترنت اختيارياً لتجربة تشغيل الأفلام بدون إنترنت! 📴' 
                  : 'تمت العودة للوضع المتصل بالإنترنت بنجاح! 📡',
                !isOfflineSandbox ? 'warn' : 'success'
              );
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isOfflineSandbox 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' 
                : 'bg-green-500/10 text-green-400 border-green-500/20'
            }`}
            title="انقر لمحاكاة انقطاع الإنترنت لاختبار ميزة أوفلاين"
          >
            {isOfflineSandbox ? (
              <>
                <WifiOff className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline text-[10px]">وضع بدون إنترنت نشط</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 shrink-0 animate-ping" />
                <span className="hidden sm:inline text-[10px]">متصل بالشبكة</span>
              </>
            )}
          </button>

          {/* Quick theme switcher button */}
          <button 
            onClick={() => {
              setSettings(prev => ({ ...prev, nightMode: !prev.nightMode }));
              triggerToast(!settings.nightMode ? 'تم تفعيل الوضع الليلي الهادئ 🌙' : 'تم العودة للمظهر النهاري ☀️', 'info');
            }}
            className={`p-2 rounded-full transition-all border ${
              settings.nightMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-yellow-400' 
                : 'bg-slate-100 hover:bg-slate-200 text-purple-600 border-slate-200'
            }`}
            title="تبديل الوضع الليلي والنهاري"
          >
            {settings.nightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Notification bell and unread tracker */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className={`p-2 rounded-full transition-all border relative ${
                settings.nightMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
              id="notifications_bell_trigger"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-[#FF85A2] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#1A1A1A] animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Container */}
            {showNotificationsDropdown && (
              <div 
                className={`absolute -left-12 sm:left-0 mt-3 w-72 sm:w-80 rounded-2xl p-4 shadow-2xl z-40 text-right border ${
                  settings.nightMode 
                    ? 'bg-[#1A1A1A] border-pink-500/20 text-white shadow-black/80' 
                    : 'bg-white text-slate-800 shadow-slate-300 border-pink-100'
                }`}
                id="notifications_box"
              >
                <div className="flex items-center justify-between border-b pb-2 mb-2 border-pink-500/10">
                  <button 
                    onClick={handleMarkAllNotificationsAsRead}
                    className="text-[10px] text-[#FF85A2] hover:underline"
                  >
                    قراءة الجميع
                  </button>
                  <h4 className="text-xs font-black text-pink-400">🔔 أحدث التنبيهات والإضافات</h4>
                </div>

                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto custom-scroll">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">لا توجد تنبيهات حالية</div>
                  ) : (
                    notifications.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-2.5 rounded-lg text-right transition-all cursor-pointer border ${
                          item.isRead 
                            ? 'bg-transparent border-transparent opacity-60' 
                            : 'bg-pink-500/5 hover:bg-pink-500/10 border-pink-500/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-slate-400 font-mono">
                            {new Date(item.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-[10px] font-bold text-pink-300">
                            {item.type === 'movie' ? '🎬 فيلم جديد' : item.type === 'support' ? '💬 الدعم' : '📢 إشعار'}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold mb-0.5 text-pink-100">{item.title}</h5>
                        <p className="text-[11px] text-slate-300 leading-normal">{item.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User profile avatar decoration */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF85A2] to-[#FFB7C5] border-2 border-white/20 shadow-inner hidden sm:block" />
        </div>
      </nav>

      {/* Main Content Layout Block (Sidebar + Main Window) */}
      <div className="flex flex-1 overflow-hidden" dir="rtl">
        
        {/* SIDEBAR Action Panels */}
        <aside className={`w-20 md:w-24 shrink-0 border-l hidden md:flex flex-col items-center py-6 gap-6 ${
          settings.nightMode 
            ? 'bg-[#141414] border-white/5' 
            : 'bg-white border-pink-100'
        }`}>
          {/* HOME TAB button */}
          <button 
            onClick={() => { setActiveTab('home'); setPlayingMovie(null); }}
            className={`group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'home' && !playingMovie
                ? 'bg-[#FF85A2]/15 text-[#FF85A2] border border-[#FF85A2]/30' 
                : 'text-slate-400 hover:text-[#FF85A2] hover:bg-pink-500/5'
            }`}
            id="sidebar_tab_home"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>

          {/* FAVORITES TAB button */}
          <button 
            onClick={() => { setActiveTab('favorites'); setPlayingMovie(null); }}
            className={`group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'favorites' 
                ? 'bg-[#FF85A2]/15 text-[#FF85A2] border border-[#FF85A2]/30' 
                : 'text-slate-400 hover:text-[#FF85A2] hover:bg-pink-500/5'
            }`}
            id="sidebar_tab_favorites"
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-bold">المفضلة</span>
          </button>

          {/* WATCH HISTORY TAB button */}
          <button 
            onClick={() => { setActiveTab('history'); setPlayingMovie(null); }}
            className={`group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'history' 
                ? 'bg-[#FF85A2]/15 text-[#FF85A2] border border-[#FF85A2]/30' 
                : 'text-slate-400 hover:text-[#FF85A2] hover:bg-pink-500/5'
            }`}
            id="sidebar_tab_history"
          >
            <History className="w-5 h-5" />
            <span className="text-[10px] font-bold">السجل</span>
          </button>

          {/* CHAT SUPPORT Floating Side Tab trigger */}
          <button 
            onClick={() => setIsSupportOpen(true)}
            className="group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all text-pink-400 hover:text-white hover:bg-pink-500/10 border-2 border-dotted border-pink-500/20 mt-2"
            id="sidebar_tab_support"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold">دعم 24/7</span>
          </button>

          {/* SYSTEM SETTINGS TAB button */}
          <button 
            onClick={() => { setActiveTab('settings'); setPlayingMovie(null); }}
            className={`group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all mt-auto ${
              activeTab === 'settings' 
                ? 'bg-[#FF85A2]/15 text-[#FF85A2] border border-[#FF85A2]/30' 
                : 'text-slate-400 hover:text-[#FF85A2] hover:bg-pink-500/5'
            }`}
            id="sidebar_tab_settings"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-[10px] font-bold">الإعدادات</span>
          </button>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8 overflow-y-auto flex flex-col">
          
          {/* Mobile responsive search widget */}
          <div className="block lg:hidden mb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="ابحثي عن فيلم باربي المفضل لديك..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs rounded-xl py-2 px-10 text-right focus:outline-none focus:ring-2 focus:ring-[#FF85A2]/50 ${
                  settings.nightMode 
                    ? 'bg-white/10 text-white placeholder:text-white/40' 
                    : 'bg-slate-100 text-slate-800 placeholder:text-slate-400 border border-slate-200'
                }`}
              />
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-[#FF85A2]" />
            </div>
          </div>

          {/* Active play view overrides standard grids */}
          {playingMovie ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <button 
                  onClick={() => setPlayingMovie(null)}
                  className="flex items-center gap-2 hover:bg-pink-500/10 text-pink-400 text-xs font-bold px-4 py-2 rounded-full border border-pink-500/20 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>إغلاق المشغل والعودة</span>
                </button>
                <div className="text-right">
                  <h2 className="text-md font-bold">{playingMovie.title}</h2>
                  <p className="text-pink-300 text-xs">سنة الإنتاج: {playingMovie.year} | {playingMovie.category === 'subbed' ? 'مترجم' : 'مدبلج'}</p>
                </div>
              </div>

              <VideoPlayer 
                movie={playingMovie}
                settings={settings}
                onChangeSettings={(newS) => saveSettings({ ...settings, ...newS })}
                onAddHistory={handleAddHistory}
                onClose={() => setPlayingMovie(null)}
                onMovieFinished={() => {
                  setCompletedMovieId(playingMovie.id);
                  triggerToast('رائع جداً! لقد أنهيتِ مشاهدة الفيلم بنجاح سحري باهر! 🎉 شاركينا رأيكِ بتقييمه بالأسفل 💕', 'success');
                }}
                onNextMovie={() => {
                  // Find next movie of matching list
                  const siblingMovies = BARBIE_MOVIES_DATABASE.filter(m => m.category === playingMovie.category);
                  const currentIndex = siblingMovies.findIndex(m => m.id === playingMovie.id);
                  const nextIndex = (currentIndex + 1) % siblingMovies.length;
                  const nextMovie = siblingMovies[nextIndex];
                  if (nextMovie) {
                    setPlayingMovie(nextMovie);
                    triggerToast(`تم الانتقال التلقائي للفيلم التالي: ${nextMovie.title} 💖`, 'success');
                  }
                }}
              />

              {/* Star Rating Section */}
              <div 
                className={`p-6 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden ${
                  settings.nightMode 
                    ? 'bg-[#141414] border-pink-500/20 text-white shadow-xl shadow-pink-950/20' 
                    : 'bg-white border-pink-100 text-slate-800 shadow-lg'
                }`}
                id="movie_rating_component"
              >
                {/* Visual sparkles decorative elements */}
                <div className="absolute top-2 left-3 opacity-40 animate-pulse pointer-events-none">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="absolute bottom-2 right-3 opacity-40 animate-pulse pointer-events-none">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                </div>

                {completedMovieId === playingMovie.id ? (
                  <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-pink-500/15 border border-pink-500/30 animate-pulse text-right flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="text-right flex-1">
                      <h4 className="text-sm font-bold text-pink-400 flex items-center justify-end gap-1.5 mb-1">
                        <span>بطلة سينما باربي المتألقة! 🎉👑</span>
                        <Sparkles className="w-4 h-4 text-pink-400" />
                      </h4>
                      <p className="text-xs text-slate-200">
                        يا لروعة الأحلام والدروس المستفادة! لقد أنهيتِ مشاهدة الفيلم بالكامل بنجاح سحري مذهل. يسعدنا جداً تقييمكِ الصادق! 💕
                      </p>
                    </div>
                    <span className="bg-pink-600 text-white text-[11px] font-black px-3 py-1.5 rounded-full select-none shrink-0 border border-pink-400">
                      مشاهدة كاملة بنجاح 🍿
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 pb-4 border-b border-pink-500/10 gap-3">
                    <button
                      onClick={() => {
                        setCompletedMovieId(playingMovie.id);
                        triggerToast('تهانينا الباهرة! تم تسجيل إنهاء مشاهدة الفيلم سحرياً 🎉', 'success');
                      }}
                      className="text-xs text-pink-400 hover:text-pink-300 font-bold bg-pink-500/5 hover:bg-pink-500/10 border border-pink-500/25 px-3.5 py-1.5 rounded-xl transition-all"
                    >
                      أنهيتِ مشاهدة الفيلم؟ انقري لتسجيل الإنجاز! 🍿✨
                    </button>
                    <div className="text-right">
                      <h3 className="text-sm font-bold text-pink-400">مختبر التقييم السحري لباربي 🦄</h3>
                      <p className="text-[11px] text-slate-400">شاركينا انطباعكِ وصوتكِ السحري لنشره في بطاقة الفيلم</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-row-reverse items-center justify-center gap-3">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const userRating = movieRatings[playingMovie.id] || 0;
                      const isActive = (ratingHover !== null ? star <= ratingHover : star <= userRating);

                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRateMovie(playingMovie.id, star)}
                          onMouseEnter={() => setRatingHover(star)}
                          onMouseLeave={() => setRatingHover(null)}
                          className="p-1 rounded-full text-slate-400 hover:text-yellow-400 transition-all transform hover:scale-125 duration-200 active:scale-95 cursor-pointer"
                          title={`تقييم بـ ${star} نجوم`}
                        >
                          <Star 
                            className={`w-9 h-9 transition-all duration-300 ${
                              isActive 
                                ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' 
                                : 'text-slate-500/40 hover:text-yellow-400/85'
                            }`} 
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="min-h-5 text-center mt-2">
                    {(() => {
                      const activeVal = ratingHover !== null ? ratingHover : (movieRatings[playingMovie.id] || 0);
                      switch (activeVal) {
                        case 1: return <span className="text-xs text-red-400 font-bold flex items-center justify-center gap-1">مخيب للآمال 💔</span>;
                        case 2: return <span className="text-xs text-orange-400 font-bold flex items-center justify-center gap-1">عادي وبسيط 🌸</span>;
                        case 3: return <span className="text-xs text-pink-400 font-bold flex items-center justify-center gap-1">جميل وممتع 🎀</span>;
                        case 4: return <span className="text-xs text-yellow-400 font-bold flex items-center justify-center gap-1">رائع جداً وساحر! ✨</span>;
                        case 5: return <span className="text-xs text-[#FF85A2] font-semibold flex items-center justify-center gap-1">خرافي، فاق توقعات السحر! 💖🦄👑</span>;
                        default: return <span className="text-[11px] text-slate-400">انقري لتحديد النجوم التي يستحقها هذا الفيلم الساحر 🌟</span>;
                      }
                    })()}
                  </div>

                  {movieRatings[playingMovie.id] && (
                    <div className="mt-2 text-[10px] text-slate-400 italic">
                      لقد قمتِ بتقييم هذا الفيلم بـ <strong className="text-yellow-400">{movieRatings[playingMovie.id]} من 5</strong>. يمكنكِ تعديله في أي وقت! 💕
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Home Tab Rendering Area */}
              {activeTab === 'home' && (
                <div className="flex flex-col flex-1">
                  
                  {/* Category switcher panel on screen for styling precision */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl font-black mb-1 text-right tracking-tight">
                        {selectedCategory === 'subbed' ? 'أفلام باربي المترجمة 🎀' : 'أفلام باربي المدبلجة 🌸'}
                      </h1>
                      <p className={`text-xs ${settings.nightMode ? 'text-white/50' : 'text-slate-500'} text-right flex items-center gap-1.5 justify-end`}>
                        {getFilteredMovies().length} فيلم متاح حالياً
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                        مرتبة تلقائياً حسب سنة الإنتاج
                      </p>
                    </div>

                    {/* Sorting & Category Switch controls */}
                    <div className="flex flex-wrap items-center gap-2 justify-end">
                      {/* Sorting control */}
                      <button 
                        onClick={() => {
                          const nextSort = sortByYear === 'desc' ? 'asc' : 'desc';
                          setSortByYear(nextSort);
                          triggerToast(nextSort === 'desc' ? 'تم الفرز من الأحدث للأقدم 📅' : 'تم الفرز من الأقدم للأحدث 📅', 'info');
                        }}
                        className={`text-xs px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition-all outline-none ${
                          settings.nightMode 
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-[#FF85A2]" />
                        <span>الترتيب: {sortByYear === 'desc' ? 'الأحدث أولاً' : 'الأقدم أولاً'}</span>
                      </button>

                      {/* Manual switch inside screen for easy access on mobile */}
                      <div className="flex md:hidden bg-pink-500/10 rounded-xl p-0.5 border border-pink-500/20" id="home_mobile_toggle">
                        <button 
                          onClick={() => setSelectedCategory('subbed')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            selectedCategory === 'subbed' ? 'bg-[#FF85A2] text-white' : 'text-pink-400'
                          }`}
                        >
                          المترجمة
                        </button>
                        <button 
                          onClick={() => setSelectedCategory('dubbed')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            selectedCategory === 'dubbed' ? 'bg-[#FF85A2] text-white' : 'text-pink-400'
                          }`}
                        >
                          المدبلجة
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Empty state if search yields nothing */}
                  {getFilteredMovies().length === 0 ? (
                    <div className="text-center py-16 bg-pink-500/5 rounded-3xl border border-dotted border-pink-500/20 max-w-lg mx-auto w-full my-auto" id="no_movies_found_element">
                      <HelpCircle className="w-12 h-12 text-[#FF85A2] mx-auto mb-3 animate-pulse" />
                      <h3 className="text-lg font-bold mb-1">لم نعثر على هذا الفيلم السحري!</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        جربي البحث بكلمات أبسط، أو تفقدي القسم الآخر (المدبلج/المترجم) للعثور على الإصدار المنشود. ✨
                      </p>
                    </div>
                  ) : (
                    /* Movies Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="movies_grid">
                      {getFilteredMovies().map((movie) => {
                        const isFav = favorites.includes(movie.id);
                        const dlStatus = downloads.find(d => d.movieId === movie.id);
                        const isCompletedDl = dlStatus?.isCompleted;
                        const isMyHistory = history.some(h => h.movieId === movie.id);

                        return (
                          <div 
                            key={movie.id}
                            className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                              settings.nightMode 
                                ? 'bg-[#1A1A1A] border-white/5 hover:border-[#FF85A2]/40' 
                                : 'bg-white border-pink-100 hover:border-[#FF85A2] shadow-sm'
                            }`}
                          >
                            {/* Card Header Poster Image block represented by gorgeous CSS Gradient */}
                            <div className={`aspect-[4/3] bg-gradient-to-tr ${movie.posterGradient} relative overflow-hidden transition-all duration-500`}>
                              {movie.imageUrl && (
                                <img 
                                  src={movie.imageUrl} 
                                  alt={movie.title} 
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              
                              {/* Ambient noise and decorations */}
                              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                              {/* Production Year label */}
                              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/25">
                                {movie.year}
                              </div>

                              {/* New release badge if applicable */}
                              {movie.hasNewBadge && (
                                <div className="absolute top-3 left-3 bg-[#FF85A2] text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                                  جديد 🌟
                                  {/* Sparkles decoration */}
                                </div>
                              )}

                              {/* Card overlay Controls appearing on hover */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                                <button 
                                  onClick={() => {
                                    setPlayingMovie(movie);
                                    triggerToast(`جاري تشغيل: ${movie.title} ✨📽️`, 'success');
                                  }}
                                  className="w-14 h-14 bg-white text-black hover:bg-pink-100 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-all select-none cursor-pointer border border-[#FF85A2]"
                                >
                                  <Play className="w-6 h-6 mr-1 fill-black text-black" />
                                </button>
                              </div>

                              {/* Micro-Details tag */}
                              <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-[10px] text-white font-medium select-none pointer-events-none">
                                <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">{movie.duration}</span>
                                {movieRatings[movie.id] ? (
                                  <span className="text-yellow-300 font-bold bg-pink-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-pink-400 flex items-center gap-0.5" title="تقييمكِ السحري">
                                    ⭐ {movieRatings[movie.id]} (تقييمكِ)
                                  </span>
                                ) : (
                                  <span className="text-yellow-400 font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full">⭐ {movie.rating}</span>
                                )}
                              </div>
                            </div>

                            {/* Card Content parameters */}
                            <div className="p-4 text-right">
                              <h3 className="font-bold text-sm mb-1 line-clamp-1 text-pink-500 dark:text-pink-300">
                                {movie.title}
                              </h3>
                              <p className={`text-[11px] mb-2 line-clamp-1 italic ${settings.nightMode ? 'text-white/40' : 'text-slate-400'}`}>
                                {movie.titleOriginal}
                              </p>
                              <p className={`text-[11px] mb-4 line-clamp-2 ${settings.nightMode ? 'text-white/60' : 'text-slate-500'} leading-relaxed`}>
                                {movie.description}
                              </p>

                              {/* Interactive Actions bar */}
                              <div className="flex items-center justify-between border-t border-dotted border-pink-500/10 pt-3">
                                <span className={`text-[10px] px-2 py-0.5 rounded ${
                                  movie.category === 'subbed' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-pink-500/15 text-pink-400'
                                }`}>
                                  {movie.category === 'subbed' ? 'مترجم للعربية' : 'مدبلج بالفصحى'}
                                </span>

                                <div className="flex items-center gap-2">
                                  {/* Favorite Button */}
                                  <button 
                                    onClick={(e) => handleToggleFavorite(movie.id, e)}
                                    className={`p-1.5 rounded-full transition-all border ${
                                      isFav 
                                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                                        : 'bg-transparent border-transparent text-slate-400 hover:text-rose-500 hover:bg-slate-800/10'
                                    }`}
                                    title={isFav ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                                  >
                                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab Rendering Area */}
              {activeTab === 'favorites' && (
                <div className="flex flex-col flex-1">
                  <div className="border-b pb-4 mb-6 text-right border-pink-500/10">
                    <h1 className="text-3xl font-black mb-1 text-right">مجموعة الأفلام المفضلة 💖</h1>
                    <p className={`text-xs ${settings.nightMode ? 'text-white/40' : 'text-slate-500'}`}>
                      المعرض السحري الخاص بكِ والذي قمتِ بجمعه بالنقر على نجوم القلوب الوردية.
                    </p>
                  </div>

                  {getFavoriteMoviesList().length === 0 ? (
                    <div className="text-center py-16 bg-pink-500/5 rounded-3xl border border-dotted border-pink-500/20 max-w-lg mx-auto w-full my-auto text-slate-400">
                      <Heart className="w-12 h-12 text-[#FF85A2] mx-auto mb-3 animate-ping" />
                      <h3 className="text-lg font-bold mb-1">المفضلة فارغة الآن!</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        تصفحي صالة العرض بالرئيسية واضغطي على أيقونة **القلب الوردي** لأي فيلم لجمع سحره الخاص هنا للوصول السريع! 💕💄
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {getFavoriteMoviesList().map((movie) => (
                        <div 
                          key={movie.id}
                          className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                            settings.nightMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-pink-100 shadow-sm'
                          }`}
                        >
                          <div className={`aspect-[4/3] bg-gradient-to-tr ${movie.posterGradient} relative overflow-hidden`}>
                            {movie.imageUrl && (
                              <img 
                                src={movie.imageUrl} 
                                alt={movie.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <button 
                              onClick={() => setPlayingMovie(movie)}
                              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors"
                            >
                              <Play className="w-10 h-10 text-white fill-white scale-90 group-hover:scale-100 transition-transform" />
                            </button>
                            <button 
                              onClick={(e) => handleToggleFavorite(movie.id, e)}
                              className="absolute top-3 left-3 bg-red-600 text-white p-1.5 rounded-full shadow-lg"
                              title="إزالة من المفضلة"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>
                          <div className="p-4 text-right">
                            <h3 className="font-bold text-sm text-pink-500 mb-1 line-clamp-1">{movie.title}</h3>
                            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-3">
                              {movieRatings[movie.id] ? (
                                <span className="text-yellow-400 font-bold flex items-center gap-0.5 whitespace-nowrap bg-pink-500/10 px-1.5 py-0.5 rounded text-[9px] border border-pink-500/20">
                                  ⭐ {movieRatings[movie.id]} (تقييمكِ)
                                </span>
                              ) : (
                                <span className="text-yellow-500 font-medium whitespace-nowrap">⭐ {movie.rating}</span>
                              )}
                              <span>{movie.category === 'subbed' ? 'مترجم بالكامل' : 'مدبلج كرتون'}</span>
                            </div>
                            <button
                              onClick={() => setPlayingMovie(movie)}
                              className="w-full py-2 bg-[#FF85A2]/10 hover:bg-[#FF85A2]/20 text-[#FF85A2] text-xs font-bold rounded-xl transition-all"
                            >
                              تشغيل العرض فورا 🍿
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Watch History Tab Rendering Area */}
              {activeTab === 'history' && (
                <div className="flex flex-col flex-1">
                  <div className="border-b pb-4 mb-6 justify-between flex items-end border-pink-500/10">
                    <button 
                      onClick={() => {
                        saveHistory([]);
                        triggerToast('تم تصفير وتنظيف سجل المشاهدة بالكامل 🧹', 'warn');
                      }}
                      className="text-xs text-red-400 hover:text-red-500 underline"
                      disabled={history.length === 0}
                    >
                      مسح السجل بالكامل
                    </button>
                    <div className="text-right">
                      <h1 className="text-3xl font-black mb-1">سجل المشاهدة ودرجة التقدم 🕒</h1>
                      <p className={`text-xs ${settings.nightMode ? 'text-white/40' : 'text-slate-500'}`}>
                        متابعة ما تم عرضه سابقاً لمساعدتكِ بالعودة لنفس الدقيقة واللحظة السحرية التي تشاهدينها.
                      </p>
                    </div>
                  </div>

                  {history.length === 0 ? (
                    <div className="text-center py-16 bg-pink-500/5 rounded-3xl border border-dotted border-pink-500/20 max-w-lg mx-auto w-full my-auto text-slate-400">
                      <History className="w-12 h-12 text-[#FF85A2] mx-auto mb-3 animate-spin" />
                      <h3 className="text-lg font-bold mb-1">لا يوجد تاريخ مشاهدة بعد!</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        عند تشغيل أي فيلم من صالات باربي، سنقوم تلقائياً بتدوين لحظات المشاهدة لمتابعتها تالياً بكل سهولة! 🍿
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
                      {history.map((hist) => {
                        const m = getMovieById(hist.movieId);
                        if (!m) return null;
                        const watchedPercent = Math.min(Math.floor((hist.progressMinutes / hist.totalDurationMinutes) * 100), 100);

                        return (
                          <div 
                            key={hist.id}
                            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-right transition-all ${
                              settings.nightMode ? 'bg-[#1A1A1A] border-white/5 hover:bg-[#222]' : 'bg-white border-pink-100 shadow-sm hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <div className={`w-16 h-12 rounded-lg bg-gradient-to-r ${m.posterGradient} shrink-0 hidden sm:block relative overflow-hidden`}>
                                {m.imageUrl && (
                                  <img 
                                    src={m.imageUrl} 
                                    alt={m.title} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                              </div>
                              <div className="text-right flex-1">
                                <h3 className="font-bold text-sm text-pink-400">{m.title}</h3>
                                <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 items-center mt-1">
                                  <span>آخر مشاهدة: {new Date(hist.watchedAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                  <span className="w-1 h-1 bg-slate-500 rounded-full" />
                                  <span>جودة: {hist.quality}</span>
                                  {movieRatings[m.id] && (
                                    <>
                                      <span className="w-1 h-1 bg-slate-500 rounded-full" />
                                      <span className="text-yellow-400 font-bold flex items-center gap-0.5">⭐ {movieRatings[m.id]} (تقييمكِ)</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Progress bar and play button */}
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                              <div className="text-right min-w-[120px]">
                                <span className="text-[11px] text-slate-400 block mb-1">متبقي {hist.totalDurationMinutes - hist.progressMinutes} دقيقة ({watchedPercent}%)</span>
                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#FF85A2]" style={{ width: `${watchedPercent}%` }} />
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  setPlayingMovie(m);
                                  triggerToast(`متابعة تشغيل: ${m.title} من الدقيقة ${hist.progressMinutes} 🍿`, 'info');
                                }}
                                className="px-4 py-2 bg-[#FF85A2] text-white text-xs font-bold rounded-xl hover:bg-rose-500 transition-colors shrink-0"
                              >
                                استكمال المشاهدة ▶️
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* System Settings Tab Rendering Area */}
              {activeTab === 'settings' && (
                <div className="flex flex-1 max-w-2xl mx-auto w-full text-right" id="app_settings_control_panel">
                  <div className="flex flex-col flex-1 pb-10">
                    <div className="border-b pb-4 mb-6 border-pink-500/10">
                      <h1 className="text-3xl font-black mb-1">خيارات التشغيل والعرض ⚙️</h1>
                      <p className={`text-xs ${settings.nightMode ? 'text-white/40' : 'text-slate-500'}`}>
                        ضبط إعدادات التشغيل التلقائي للمسلسلات، جودة المزامنة الافتراضية، ومرشح حماية العين للأطفال.
                      </p>
                    </div>

                    <div className="flex flex-col gap-6">
                      
                      {/* Quality selection block */}
                      <div className={`p-4 rounded-2xl border ${settings.nightMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-pink-100 shadow-sm'}`}>
                        <h3 className="font-bold text-sm text-pink-400 mb-1">دقة العرض الافتراضية</h3>
                        <p className="text-xs text-slate-400 mb-4">اختر جودة بث العرض المفضلة بناءً على سرعة اتصال باقة الإنترنت لديكِ</p>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: '1080p', label: '1080p FHD (كاملة الدقة والسطوع)', badge: 'فائقة السحر ✨' },
                            { value: '720p', label: '720p HD (دقة متوازنة للبث السلس)', badge: 'موصى بها 👍' },
                            { value: '480p', label: '480p SD (جودة موفرة واقتصادية للبيانات)', badge: 'موفرة 🔋' }
                          ].map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                saveSettings({ ...settings, defaultQuality: item.value as any });
                                triggerToast(`تم ضبط الجودة الافتراضية إلى ${item.value} 🎚️`, 'info');
                              }}
                              className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between h-24 ${
                                settings.defaultQuality === item.value
                                  ? 'bg-pink-600/15 border-pink-500 text-white ring-2 ring-pink-500/20'
                                  : 'bg-transparent border-slate-700/40 text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              <span className="text-xs font-black block">{item.value}</span>
                              <span className="text-[10px] text-slate-400 leading-normal line-clamp-1">{item.label}</span>
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded self-start ${
                                settings.defaultQuality === item.value ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {item.badge}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Autoplay setting block */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        settings.nightMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-pink-100 shadow-sm'
                      }`}>
                        <div className="text-right">
                          <h3 className="font-bold text-sm text-pink-400 mb-1">ميزة التشغيل التلقائي (Autoplay)</h3>
                          <p className="text-[11px] text-slate-400">انتقال المشغل تلقائياً للجزء التالي وسلسلة الأفلام دون التوقف للضغط اليدوي.</p>
                        </div>
                        <input 
                          type="checkbox"
                          checked={settings.autoPlay}
                          onChange={(e) => {
                            saveSettings({ ...settings, autoPlay: e.target.checked });
                            triggerToast(e.target.checked ? 'تم تفعيل التشغيل التلقائي للأعوام المتعاقبة ⏱️' : 'تم تعطيل التشغيل التلقائي ⏱️', 'info');
                          }}
                          className="w-10 h-10 accent-pink-600 rounded-lg cursor-pointer shrink-0"
                        />
                      </div>

                      {/* Comfort mode warm block */}
                      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                        settings.nightMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-pink-100 shadow-sm'
                      }`}>
                        <div className="text-right">
                          <h3 className="font-bold text-sm text-pink-400 mb-1">مرشح حماية العين الليلي (Eye Comfort Warmth)</h3>
                          <p className="text-[11px] text-slate-400">تطبيق صبغة صفراء مهدئة على الشاشة لتقليل الضوء الأزرق المضر لراحة أطفالك وصغاركِ.</p>
                        </div>
                        <input 
                          type="checkbox"
                          checked={settings.eyeComfortTint}
                          onChange={(e) => {
                            saveSettings({ ...settings, eyeComfortTint: e.target.checked });
                            triggerToast(e.target.checked ? 'تم تفعيل مرشح حماية العين 🌙💛' : 'تم إيقاف مرشح حماية العين ☀️', 'info');
                          }}
                          className="w-10 h-10 accent-pink-600 rounded-lg cursor-pointer shrink-0"
                        />
                      </div>

                      {/* Technical support status banner */}
                      <div className={`p-4 rounded-2xl border ${settings.nightMode ? 'bg-[#1A1A1A]/80 border-pink-500/20' : 'bg-pink-500/5 border-pink-100'} text-right`}>
                        <h3 className="font-bold text-sm text-pink-500 dark:text-pink-300 mb-1 flex items-center gap-1.5 justify-end">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>تطبيق معتمد ومحمي بالكامل</span>
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          التطبيق يدعم الحفظ السحابي المؤقت، وإمكانية المشاهدة فائق السرعة عبر خوادم مخصصة متناغمة 24 ساعة.
                        </p>
                        <div className="flex gap-4">
                          <div className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-500/25">
                            الخادم السحابي: متصل ومستقر 🟢
                          </div>
                          <div className="bg-pink-500/10 text-pink-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-pink-500/25">
                            سجل الدعم الفني: متاح بالذكاء الاصطناعي 🌸
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Footer Status Bar as required by design styling */}
          <footer className={`mt-auto pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            settings.nightMode ? 'border-white/5 text-white/60' : 'border-slate-200 text-slate-500'
          }`}>
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse mr-1"></span>
                <span>فريق الدعم الفني يسهر لأجلكِ دائمًا 24/7 متاح الآن</span>
              </div>
              <div className="text-[11px]">
                ميزة التشغيل التلقائي: 
                <span className={settings.autoPlay ? "text-emerald-400 font-bold ml-1" : "text-slate-400 ml-1"}>
                  {settings.autoPlay ? "نشطة ومفعلة" : "غير نشطة"}
                </span>
              </div>
              <div className="text-[11px] bg-[#FF85A2]/10 text-[#FF85A2] px-2.5 py-0.5 rounded-full font-bold">
                نسخة وردية 2.4.0
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSupportOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF85A2] hover:bg-rose-500 text-white font-black rounded-xl transition-all shadow-md shadow-pink-500/20"
                id="footer_support_button"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>تحدثي مع الدعم التقني السحري</span>
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Interactive Chat Support Panel (Slide Drawer) */}
      {isSupportOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex justify-end animate-fade-in" id="support_chat_overlay" onClick={() => setIsSupportOpen(false)}>
          {/* Drawer container body */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md h-full shadow-2xl flex flex-col transition-all duration-300 text-right ${
              settings.nightMode ? 'bg-[#151515] border-r border-[#FF85A2]/20' : 'bg-white text-slate-800'
            }`}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-pink-600 to-[#FF85A2] p-5 text-white flex justify-between items-center shadow-lg">
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
                title="إغلاق الدردشة"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="font-extrabold text-sm leading-tight flex items-center gap-1 pb-1">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                    <span>المساعدة "وردة" من سينما باربي</span>
                  </h3>
                  <span className="text-[10px] text-pink-100 font-bold block">دعم تقني معتمد لحل المشكلات 24/7/365</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg text-white border-2 border-white/40">
                  🌸
                </div>
              </div>
            </div>

            {/* Simulated support alerts */}
            <div className="bg-pink-500/10 p-3 flex gap-2 items-center text-right text-[11px] text-pink-300 border-b border-pink-500/20">
              <Info className="w-4 h-4 shrink-0 text-[#FF85A2]" />
              <p>نحن نعمل على خدمتكِ. يمكنكِ الاستفسار عن تحميل الأفلام، جودة البث، الوضع الليلي والمفضلة!</p>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col custom-scroll bg-black/10">
              {supportMessages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div 
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-start' : 'justify-end'} text-right`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-xs shadow-md ${
                      isUser
                        ? 'bg-[#FF85A2] text-white rounded-tr-none'
                        : settings.nightMode 
                          ? 'bg-slate-900 border border-slate-700/60 text-slate-100 rounded-tl-none' 
                          : 'bg-slate-50 border border-pink-100 text-slate-800 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed font-sans font-medium">{msg.content}</p>
                      <span className="text-[9px] text-slate-400 block mt-2 font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot Typing simulation indicator */}
              {isSupportTyping && (
                <div className="flex justify-end text-right">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs flex items-center gap-2 rounded-tl-none">
                    <span className="w-1.5 h-1.5 bg-[#FF85A2] rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-[#FF85A2] rounded-full animate-bounce delay-200" />
                    <span className="w-1.5 h-1.5 bg-[#FF85A2] rounded-full animate-bounce delay-300" />
                    <span className="text-[10px] text-slate-400">وردة تفكر في الحل السحري...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Support Message Input drawer footer */}
            <div className={`p-4 border-t ${
              settings.nightMode ? 'bg-[#181818] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSendSupportMessage}
                  className="bg-[#FF85A2] hover:bg-rose-500 text-white p-3 rounded-xl transition-all cursor-pointer shadow-md shadow-pink-500/25 group"
                  title="إرسال"
                >
                  <Send className="w-4 h-4 shrink-0 transform -rotate-45 group-hover:translate-x-0.5" />
                </button>
                <input 
                  type="text" 
                  placeholder="اسألي وردة عن تفعيل جودة 1080p أو التحميل والوضع الليلي..." 
                  value={supportMessageInput}
                  onChange={(e) => setSupportMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendSupportMessage();
                  }}
                  className={`flex-1 text-xs text-right py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF85A2]/40 ${
                    settings.nightMode 
                      ? 'bg-white/5 text-white placeholder:text-white/30 border border-white/5' 
                      : 'bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 shadow-inner'
                  }`}
                />
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-2 font-black">وردة تجيب بالذكاء الاصطناعي مع الدعم الفني لراحتكِ ✨</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Optimized for Portrait View) */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 h-16 border-t z-40 bg-opacity-95 backdrop-blur-lg flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.15)] ${
          settings.nightMode 
            ? 'bg-[#141414] border-white/10 text-white' 
            : 'bg-white border-pink-100 text-slate-800'
        }`}
        id="mobile_bottom_nav"
      >
        {/* HOME TAB button */}
        <button 
          onClick={() => { setActiveTab('home'); setPlayingMovie(null); }}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all ${
            activeTab === 'home' && !playingMovie
              ? 'text-[#FF85A2] scale-110 font-black' 
              : 'text-slate-400 font-bold'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] mt-0.5">الرئيسية</span>
        </button>

        {/* FAVORITES TAB button */}
        <button 
          onClick={() => { setActiveTab('favorites'); setPlayingMovie(null); }}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all ${
            activeTab === 'favorites' 
              ? 'text-[#FF85A2] scale-110 font-black' 
              : 'text-slate-400 font-bold'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[9px] mt-0.5">المفضلة</span>
        </button>

        {/* WATCH HISTORY TAB button */}
        <button 
          onClick={() => { setActiveTab('history'); setPlayingMovie(null); }}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all ${
            activeTab === 'history' 
              ? 'text-[#FF85A2] scale-110 font-black' 
              : 'text-slate-400 font-bold'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[9px] mt-0.5">السجل</span>
        </button>

        {/* CHAT SUPPORT Trigger */}
        <button 
          onClick={() => setIsSupportOpen(true)}
          className="flex flex-col items-center justify-center w-14 h-14 transition-all text-pink-400 hover:text-white font-bold"
        >
          <MessageSquare className="w-5 h-5 animate-pulse" />
          <span className="text-[9px] mt-0.5">دعم وردة</span>
        </button>

        {/* SYSTEM SETTINGS TAB button */}
        <button 
          onClick={() => { setActiveTab('settings'); setPlayingMovie(null); }}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-all ${
            activeTab === 'settings' 
              ? 'text-[#FF85A2] scale-110 font-black' 
              : 'text-slate-400 font-bold'
          }`}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="text-[9px] mt-0.5">الإعدادات</span>
        </button>
      </div>

    </div>
  );
}
