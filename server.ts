import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Lazy loader for Google Gen UI Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set or using placeholder.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// AI Technical Support Chatbot Endpoint
app.post("/api/support", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "الرجاء توفير رسائل صالحة للمحادثة" });
    }

    const client = getGeminiClient();
    
    // Default system guide
    const systemInstruction = `أنتِ ممثلة الدعم الفني اللطيفة والمحترفة "وردة" من تطبيق "سينما باربي - عالم باربي السحري".
مهمتكِ مساعدة المستخدمين (خاصة محبي أفلام باربي وعشاق جيل السحر والوردي) وحل مشكلاتهم التقنية وتوجيههم في استخدام التطبيق بجمال وسحر.
أسلوبكِ: طيب، وردي، ودود جداً، متحمس، ويستخدم الرموز التعبيرية مثل 💖 ✨ 🌸 🎀 💅 🦄 🧸.
تحدثي باللغة العربية الفصحى أو بلهجة مصرية خفيفة وقريبة من القلب.
ساعدي المستخدم في حل أي مشكلة تقنية مثل:
1. كيفية تحميل الأفلام للمشاهدة بدون إنترنت (تفعيل زر التحميل لحفظ الفيلم في قسم الأوفلاين المحلي).
2. تغيير الجودة (1080p للفيديو عالي الجودة للغاية، 720p الجودة المتوسطة، 480p لتوفير باقة الإنترنت).
3. إعدادات التشغيل التلقائي (تفعيل تشغيل الفيلم التالي تلقائياً).
4. تفعيل وضع الرؤية الليلية اللطيف لحماية العين بألوان دافئة وممتازة لقضاء سهرة ممتعة.
5. كيفية إضافة فيلم إلى المفضلة بالنقر على أيقونة القلب الوردي.
6. سجل المشاهدة لمتابعة ما توقف عنده.
7. الإبلاغ عن مشاكل الصوت أو الصورة أو بطء التحميل وطمأنتهم بأن الفريق التقني يعمل على مدار الساعة 24/7 لأجلهم.

إذا كان مفتاح الذكاء الاصطناعي مفقوداً أو حدث خطأ، ستقومين بالرد الذاتي اللطيف بناءً على معارفكِ الراسخة.`;

    if (!client) {
      // Graceful fallback response if API Key is not set or is a placeholder
      const lastMessage = messages[messages.length - 1]?.content || "";
      let answer = "أهلاً بكِ في الدعم الفني السحري لسينما باربي! 💖✨ أنا وردة، رفيقتكِ لمساعدتكِ في أي وقت.\n\n";
      
      const lowerMsg = lastMessage.toLowerCase();
      if (lowerMsg.includes("حمل") || lowerMsg.includes("تحميل") || lowerMsg.includes("انترنت") || lowerMsg.includes("أوفلاين")) {
        answer += "لتحميل أي فيلم للمشاهدة بدون إنترنت 🌸، ما عليكِ سوى الضغط على زر **'تحميل للمشاهدة أوفلاين'** تحت الفيلم المفضل لديكِ. ستظهر لكِ نسبة التحميل الجاري، وفور اكتماله ستجدين الفيلم السحري محفوظاً بالكامل في **'قسم المشاهدة بدون إنترنت'** بالتبويب العلوي! 🎀🦄";
      } else if (lowerMsg.includes("جودة") || lowerMsg.includes("جوده") || lowerMsg.includes("تغيير")) {
        answer += "تغيير الجودة سهل جداً يا جميلة! ✨ أثناء عرض الفيلم في المشغل التلقائي، ستجدين قائمة منسدلة تحت المشغل تتيح لكِ الاختيار بين جودة خارقة (1080p) ✨ أو جودة متوازنة (720p) أو جودة موفرة للباقة (480p) لضمان تجربة مريحة وسلسة للغاية! 🎀";
      } else if (lowerMsg.includes("تلقائي") || lowerMsg.includes("تشغيل")) {
        answer += "ميزة التشغيل التلقائي (Autoplay) متوفرة لدينا لتجربة مشاهدة مريحة! 🎀 يمكنكِ تفعيلها من إعدادات مشغل الفيديو تحت الشاشة لتشغيل الأجزاء التالية والقصص المترابطة لباربي تلقائياً دون تداخل! 💖";
      } else if (lowerMsg.includes("ليلي") || lowerMsg.includes("الوضع") || lowerMsg.includes("مظلم") || lowerMsg.includes("ليل")) {
        answer += "الوضع الليلي (أو الوضع اللطيف على العين) 🌙 مصمم خصيصاً بلون وردي مظلم يريح عينيكِ أثناء المشاهدة في الغرفة الهادئة. يمكنكِ الضغط على زر **'الوضع الليلي'** في أعلى الصفحة للاستمتاع بألوان هادئة للعين! ✨💅";
      } else if (lowerMsg.includes("مفضلة") || lowerMsg.includes("قلب") || lowerMsg.includes("حب")) {
        answer += "لإضافة الأفلام لتبويب المفضلة، تفضلي بالضغط على أيقونة **'القلب الوردي 💖'** الموجودة على بطاقة الفيلم، وسيجتمع كل سحر أفلام باربي التي تعشقينها في تبويب خاص للوصول السريع! 🎀";
      } else {
        answer += "فهمت رغبتكِ يا صديقتي! نحن هنا في خدمتكِ بخصوص أي استفسار تقني حول تشغيل الأفلام وجودتها وسرعة البث. فريق الدعم الفني يسهر 24 ساعة لراحتكِ واستمتاعكِ بعالم باربي الوردي الساحر! 🎀✨ أبلغينا دائماً بما تودين حله!";
      }
      return res.json({ reply: answer });
    }

    // Format chat history for @google/genai SDK format
    // Map messages payload to prompt string structure or use Chat API
    const formattedPrompt = messages.map(m => {
      const roleName = m.role === "user" ? "المستخدم" : "الدعم الفني وردة";
      return `${roleName}: ${m.content}`;
    }).join("\n");

    const fullPrompt = `${systemInstruction}\n\nتاريخ المحادثة حتى الآن:\n${formattedPrompt}\n\nوردة (الرد الحالي):`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
    });

    const reply = response.text || "أعتذر يا صديقتي الرائعة، حدث ارتجاج صغير في عوالمنا الوردية السحرية! كيف يمكنني مساعدتكِ تالياً؟ 💖";
    return res.json({ reply });

  } catch (err: any) {
    console.error("Error with Gemini Support:", err);
    return res.json({ 
      reply: "يا إلهي! كدنا نلمس النجوم السحرية لكن حدث خلل تقني بسيط ✨🎀. ميزة دعم باربي 24/7 تعمل بطاقتها الفائقة حالياً محلياً! كيف يمكنني توجيهكِ اليوم لحل المشكلة؟ 💖" 
    });
  }
});

// Vite middleware setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌸 Barbie Movies Full-Stack Server running on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
});
