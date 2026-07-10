/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";

type Language = "en" | "ru";
type Step = 0 | 1 | 2;

type Personal = {
  fullName: string;
  age: string;
  countryCity: string;
  email: string;
  messenger: string;
  timezone: string;
};

type Answers = {
  motivation: string;
  experience: string;
  hoursPerWeek: string;
  preferredSchedule: string;
  contentComfort: string;
  strongestFeatures: string;
  equipment: string;
  englishLevel: string;
  relocationOpen: string;
  additionalInfo: string;
};

const initialPersonal: Personal = {
  fullName: "",
  age: "",
  countryCity: "",
  email: "",
  messenger: "",
  timezone: "",
};

const initialAnswers: Answers = {
  motivation: "",
  experience: "",
  hoursPerWeek: "",
  preferredSchedule: "",
  contentComfort: "",
  strongestFeatures: "",
  equipment: "",
  englishLevel: "",
  relocationOpen: "",
  additionalInfo: "",
};

const content = {
  en: {
    nav: ["Privacy", "Standards", "Relocation", "FAQ"],
    apply: "Apply Now",
    heroSub:
      "Exclusive Webcam Agency for Premium Clients from New Zealand & Australia",
    heroText:
      "Maximum privacy • High earnings up to $12,000+ NZD/month • Relocation program to Australia for top models",
    heroButton: "Apply Now & Get Your Offer",
    trustTitle: "Safety-first private representation",
    trust:
      "Your safety and privacy are our top priority. All data is strictly confidential. We use NDA agreements and advanced security measures to protect both models and clients.",
    trustPoints: ["NDA protocol", "Private media vault", "Verified 18+ only"],
    whyTitle: "Why Choose Strawberry Glam",
    why: [
      "Work with a narrow, high-paying premium audience from NZ & Australia",
      "Earnings up to $12,000+ NZD per month",
      "Full support: managers, promotion, training",
      "Complete confidentiality and legal protection",
      "Relocation Program to Australia with housing, food and expenses covered for top models",
      "Flexible schedule from anywhere in the world",
    ],
    clientsTitle: "Invitation-only premium audience",
    clientsText:
      "Our client side is designed for a closed subscription audience in New Zealand and Australia. Models are promoted selectively, with privacy standards that protect both sides of the experience.",
    relocationTitle: "Relocation Program",
    relocation:
      "Top models can receive an offer to relocate to our head office in Australia with full coverage of housing, meals, and main expenses.",
    storiesTitle: "Success Stories",
    stories: [
      {
        name: "M., Europe",
        copy: "Joined with no studio background and built a premium schedule after training, lighting guidance and private positioning.",
        stat: "$8,400 NZD/mo",
      },
      {
        name: "A., South America",
        copy: "Moved from inconsistent platform income to a managed subscription audience with stronger safety boundaries.",
        stat: "4 weeks to offer",
      },
      {
        name: "K., Asia-Pacific",
        copy: "Qualified for relocation review after sustained performance and professional portfolio updates.",
        stat: "Relocation track",
      },
    ],
    formTitle: "Private Model Application",
    formLead:
      "Complete the application and upload your portfolio. Our team reviews qualified profiles confidentially and replies with the next step.",
    steps: ["Personal Information", "Questionnaire", "Portfolio"],
    labels: {
      fullName: "Full name",
      age: "Age (18+)",
      countryCity: "Country / City",
      email: "Email",
      messenger: "Telegram / WhatsApp",
      timezone: "Time zone",
      photos: "Upload 8-15 high-quality photos",
      videos: "Upload 2-5 videos",
      ageConsent: "I confirm that I am 18+ and can provide age verification.",
      privacy:
        "I agree that Strawberry Glam Models may securely review my application materials.",
    },
    questions: {
      motivation: "Why do you want to join Strawberry Glam Models?",
      experience: "Do you have any previous experience as a webcam model?",
      hoursPerWeek: "How many hours per week are you ready to work?",
      preferredSchedule: "What is your preferred work schedule?",
      contentComfort:
        "Are you comfortable working in lingerie, nude and explicit content?",
      strongestFeatures:
        "What are your strongest features (face, body, personality, voice, etc.)?",
      equipment:
        "Do you have professional lighting, high-speed internet and a private space?",
      englishLevel: "What is your English level?",
      relocationOpen: "Are you open to relocation to Australia in the future?",
      additionalInfo: "Any additional information you want us to know?",
    },
    portfolioHint:
      "The more professional, high-quality and open your materials are, the faster and better our offer will be.",
    next: "Next",
    back: "Back",
    submit: "Submit Application",
    submitting: "Securing your application...",
    success:
      "Application received. Your materials were stored securely and are ready for confidential review.",
    faqTitle: "FAQ",
    faq: [
      [
        "Is my identity protected?",
        "Yes. Privacy is built into the way we review, onboard and represent models. Your application is handled by a small authorized team, portfolio files are kept in protected storage, and sensitive details are never used for promotion without explicit approval. We also use confidentiality agreements and careful internal access rules so the process feels calm, professional and controlled from the first contact.",
      ],
      [
        "Do I need previous webcam experience?",
        "No. Previous experience can be useful, but it is not required. We look for presentation, consistency, communication, privacy readiness and the ability to follow a premium positioning strategy. If your profile has potential, the team can guide you through lighting, schedule planning, platform etiquette and portfolio improvements.",
      ],
      [
        "How does the relocation program work?",
        "Relocation is a selective opportunity for top-performing models who show strong consistency, professionalism and long-term fit. When a model qualifies, we can prepare a private offer for relocation to our Australian head office, including support for housing, meals and main living expenses. The goal is to make the transition organized, respectful and focused on performance growth.",
      ],
      [
        "What can influence earnings?",
        "Strong earnings usually come from a combination of consistency, polished presentation, clear boundaries, good communication, high-quality media and a schedule that fits premium audience demand. We do not present income as a guarantee, but we do provide structure, management support and positioning designed to help serious models build stronger results.",
      ],
      [
        "What happens after I apply?",
        "After your application and portfolio are received, the review team checks your materials, safety readiness, age confirmation and fit for the premium audience. If your profile is suitable, we contact you privately with next steps, recommendations and a potential offer. The process is designed to be discreet, fast and respectful.",
      ],
      [
        "Will I receive guidance before starting?",
        "Yes. Strong applicants are not left to figure everything out alone. We can help with portfolio presentation, lighting, schedule planning, privacy boundaries, communication style and practical preparation. The aim is to make the first steps feel clear, premium and professionally supported.",
      ],
      [
        "Is relocation guaranteed?",
        "Relocation is not automatic, and that is what keeps the program valuable. It is reserved for models who show consistency, professionalism, strong audience fit and readiness for a more structured environment. When a model qualifies, the offer is prepared carefully so housing, meals and main expenses can be handled in an organized way.",
      ],
    ],
    footerPrivacy:
      "Privacy policy: application data and files are used only to evaluate model suitability, protect safety, and contact applicants. Materials are not sold or published without explicit consent.",
    footerAge:
      "18+ only. Strawberry Glam Models works exclusively with adults who can provide valid age verification.",
  },
  ru: {
    nav: ["Приватность", "Стандарты", "Релокация", "FAQ"],
    apply: "Подать заявку",
    heroSub:
      "Эксклюзивное вебкам-агентство для премиум-клиентов из Новой Зеландии и Австралии",
    heroText:
      "Максимальная конфиденциальность • Заработок до $12,000+ NZD в месяц • Программа релокации в Австралию для топ-моделей",
    heroButton: "Подать заявку",
    trustTitle: "Приватное сопровождение с приоритетом безопасности",
    trust:
      "Ваша безопасность и конфиденциальность — наш главный приоритет. Все данные строго защищены. Мы используем соглашения NDA и современные меры безопасности.",
    trustPoints: ["NDA-протокол", "Приватное хранение медиа", "Только проверка 18+"],
    whyTitle: "Почему выбирают Strawberry Glam",
    why: [
      "Работа с узкой платёжеспособной премиум-аудиторией из Новой Зеландии и Австралии",
      "Заработок до $12,000+ NZD в месяц",
      "Полная поддержка: менеджеры, продвижение, обучение",
      "Полная конфиденциальность и юридическая защита",
      "Программа релокации в Австралию с оплатой жилья, питания и расходов для топ-моделей",
      "Гибкий график из любой точки мира",
    ],
    clientsTitle: "Закрытая премиум-аудитория по подписке",
    clientsText:
      "Клиентская сторона рассчитана на закрытую подписочную аудиторию в Новой Зеландии и Австралии. Продвижение моделей проходит выборочно, с приватными стандартами защиты обеих сторон.",
    relocationTitle: "Программа релокации",
    relocation:
      "Лучшие модели получают предложение о релокации в головной офис в Австралии с полной оплатой жилья, питания и основных расходов.",
    storiesTitle: "Истории успеха",
    stories: [
      {
        name: "М., Европа",
        copy: "Пришла без студийного опыта и выстроила премиальный график после обучения, настройки света и приватного позиционирования.",
        stat: "$8,400 NZD/мес",
      },
      {
        name: "А., Южная Америка",
        copy: "Перешла от нестабильного дохода на платформах к управляемой подписочной аудитории и более сильным границам безопасности.",
        stat: "4 недели до оффера",
      },
      {
        name: "К., Азиатско-Тихоокеанский регион",
        copy: "Попала на трек релокации после стабильных результатов и профессионального обновления портфолио.",
        stat: "Трек релокации",
      },
    ],
    formTitle: "Приватная заявка модели",
    formLead:
      "Заполни анкету и загрузи портфолио. Команда конфиденциально рассмотрит подходящие профили и отправит следующий шаг.",
    steps: ["Личная информация", "Анкета", "Портфолио"],
    labels: {
      fullName: "Полное имя",
      age: "Возраст (18+)",
      countryCity: "Страна / город",
      email: "Email",
      messenger: "Telegram / WhatsApp",
      timezone: "Часовой пояс",
      photos: "Загрузи 8-15 качественных фото",
      videos: "Загрузи 2-5 видео",
      ageConsent:
        "Я подтверждаю, что мне 18+ и я могу предоставить подтверждение возраста.",
      privacy:
        "Я согласна, что Strawberry Glam Models может безопасно рассмотреть мои материалы.",
    },
    questions: {
      motivation: "Почему ты хочешь присоединиться к Strawberry Glam Models?",
      experience: "Есть ли у тебя опыт работы вебкам-моделью?",
      hoursPerWeek: "Сколько часов в неделю ты готова работать?",
      preferredSchedule: "Какой график работы тебе удобен?",
      contentComfort:
        "Комфортно ли тебе работать в нижнем белье, nude и explicit?",
      strongestFeatures:
        "Какие твои сильные стороны (лицо, фигура, харизма, голос и т.д.)?",
      equipment:
        "Есть ли у тебя хорошее освещение, стабильный интернет и приватное пространство?",
      englishLevel: "Какой у тебя уровень английского языка?",
      relocationOpen:
        "Готова ли ты рассматривать релокацию в Австралию в будущем?",
      additionalInfo: "Что ещё ты хочешь нам рассказать?",
    },
    portfolioHint:
      "Чем качественнее и откровеннее будут твои фото и видео — тем быстрее и выгоднее будет наше предложение.",
    next: "Далее",
    back: "Назад",
    submit: "Отправить заявку",
    submitting: "Сохраняем заявку безопасно...",
    success:
      "Заявка получена. Материалы сохранены безопасно и готовы к конфиденциальному рассмотрению.",
    faqTitle: "FAQ",
    faq: [
      [
        "Моя личность действительно защищена?",
        "Да. Конфиденциальность встроена в процесс рассмотрения, онбординга и дальнейшего сопровождения. Анкету видит только ограниченная авторизованная команда, портфолио хранится в защищённом хранилище, а личные данные и материалы не используются для продвижения без отдельного согласия. Мы работаем через NDA, аккуратные правила доступа и приватную коммуникацию, чтобы весь процесс ощущался спокойно, профессионально и безопасно.",
      ],
      [
        "Можно ли подать заявку без опыта?",
        "Да, опыт не обязателен. Он может быть плюсом, но мы в первую очередь смотрим на презентацию, стабильность, коммуникацию, готовность соблюдать приватность и потенциал для премиального позиционирования. Если профиль перспективный, команда поможет с рекомендациями по свету, графику, портфолио, подаче и профессиональной подготовке.",
      ],
      [
        "Как работает программа релокации?",
        "Релокация — это отдельная возможность для сильных моделей, которые показывают стабильность, профессионализм и долгосрочный потенциал. Если модель подходит, мы готовим приватное предложение по переезду в головной офис в Австралии с поддержкой жилья, питания и основных расходов. Цель — сделать переход организованным, комфортным и ориентированным на рост дохода.",
      ],
      [
        "От чего зависит заработок?",
        "Высокий доход обычно складывается из регулярности, качественной визуальной подачи, хорошей коммуникации, сильного портфолио, понятных границ и графика, который совпадает с активностью премиальной аудитории. Мы не подаём доход как гарантию, но даём структуру, менеджмент, продвижение и профессиональные рекомендации, которые помогают серьёзным моделям двигаться к более сильным результатам.",
      ],
      [
        "Что происходит после отправки заявки?",
        "После отправки анкеты и портфолио команда конфиденциально проверяет материалы, возрастное подтверждение, техническую готовность и соответствие премиальному формату. Если профиль подходит, мы связываемся приватно, даём рекомендации и обсуждаем следующий шаг или потенциальное предложение. Процесс построен так, чтобы быть быстрым, уважительным и дискретным.",
      ],
      [
        "Будет ли поддержка перед стартом?",
        "Да. Сильные кандидаты не остаются один на один с процессом. Мы можем помочь с подачей портфолио, светом, графиком, границами приватности, стилем коммуникации и практической подготовкой. Цель — чтобы первые шаги были понятными, премиальными и профессионально поддержанными.",
      ],
      [
        "Релокация гарантирована?",
        "Релокация не автоматическая, и именно поэтому программа остаётся ценной. Она предназначена для моделей, которые показывают стабильность, профессионализм, сильное соответствие аудитории и готовность к более структурированной среде. Если модель подходит, предложение готовится аккуратно: с поддержкой жилья, питания и основных расходов.",
      ],
    ],
    footerPrivacy:
      "Политика конфиденциальности: данные и файлы заявки используются только для оценки профиля, защиты безопасности и связи с кандидатом. Материалы не продаются и не публикуются без отдельного согласия.",
    footerAge:
      "Только 18+. Strawberry Glam Models работает исключительно с совершеннолетними, которые могут подтвердить возраст.",
  },
};

const englishLevels = ["Beginner", "Intermediate", "Upper-intermediate", "Advanced", "Fluent"];
const relocationOptions = ["Yes", "Maybe", "No"];
const navTargets = ["/info/privacy", "/info/why-strawberry", "/info/relocation", "#faq"];
const trustPointLinks = ["/info/nda", "/info/secure-storage", "/info/age-verification"];
const benefitLinks = [
  "/info/premium-audience",
  "/info/earnings",
  "/info/model-support",
  "/info/legal-protection",
  "/info/relocation-program",
  "/info/flexible-schedule",
];
const relocationSupportLinks = [
  "/info/housing-support",
  "/info/meals-support",
  "/info/expenses-support",
  "/info/management-support",
];
const applicationStatLinks = ["/info/portfolio-guide", "/info/video-guide", "/info/nda"];

const detailCards = {
  en: [
    {
      title: "Privacy standards",
      copy: "How applications, files, NDA rules and internal access are handled.",
      href: "/info/privacy",
    },
    {
      title: "Premium audience",
      copy: "Why the client side is curated around NZ and Australian subscribers.",
      href: "/info/premium-clients",
    },
    {
      title: "Application guide",
      copy: "What a strong portfolio includes and how review decisions are made.",
      href: "/info/application-process",
    },
  ],
  ru: [
    {
      title: "Стандарты приватности",
      copy: "Как обрабатываются анкеты, файлы, NDA и внутренний доступ.",
      href: "/info/privacy",
    },
    {
      title: "Премиум-аудитория",
      copy: "Почему клиентская сторона сфокусирована на подписчиках NZ и Австралии.",
      href: "/info/premium-clients",
    },
    {
      title: "Гайд по заявке",
      copy: "Что входит в сильное портфолио и как проходит рассмотрение.",
      href: "/info/application-process",
    },
  ],
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [step, setStep] = useState<Step>(0);
  const [personal, setPersonal] = useState<Personal>(initialPersonal);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [legalAgeConfirmed, setLegalAgeConfirmed] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "working" | "success" | "error";
    message: string;
    progress: number;
  }>({ type: "idle", message: "", progress: 0 });

  const t = content[language];

  const fileSummary = useMemo(() => {
    const total = [...photos, ...videos].reduce((sum, file) => sum + file.size, 0);
    return `${photos.length} photos • ${videos.length} videos • ${formatBytes(total)}`;
  }, [photos, videos]);

  function updatePersonal(key: keyof Personal, value: string) {
    setPersonal((current) => ({ ...current, [key]: value }));
  }

  function updateAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function canAdvance() {
    if (step === 0) {
      return (
        personal.fullName.trim() &&
        Number(personal.age) >= 18 &&
        personal.countryCity.trim() &&
        personal.email.trim() &&
        personal.messenger.trim() &&
        personal.timezone.trim()
      );
    }

    if (step === 1) {
      return Object.values(answers).every((value) => value.trim().length > 0);
    }

    return true;
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "", progress: 0 });

    if (Number(personal.age) < 18 || !legalAgeConfirmed) {
      setStatus({
        type: "error",
        message:
          language === "en"
            ? "You must be 18+ and confirm age verification readiness."
            : "Необходимо подтвердить возраст 18+ и готовность к проверке.",
        progress: 0,
      });
      return;
    }

    if (!privacyAccepted) {
      setStatus({
        type: "error",
        message:
          language === "en"
            ? "Please accept confidential review of your application materials."
            : "Подтверди согласие на конфиденциальное рассмотрение материалов.",
        progress: 0,
      });
      return;
    }

    if (photos.length < 8 || photos.length > 15 || videos.length < 2 || videos.length > 5) {
      setStatus({
        type: "error",
        message:
          language === "en"
            ? "Please upload 8-15 photos and 2-5 videos."
            : "Загрузи 8-15 фото и 2-5 видео.",
        progress: 0,
      });
      return;
    }

    try {
      setStatus({ type: "working", message: t.submitting, progress: 5 });
      const createResponse = await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          language,
          personal,
          answers,
          legalAgeConfirmed,
          privacyAccepted,
        }),
      });

      const createPayload = await createResponse.json();
      if (!createResponse.ok) {
        throw new Error(createPayload.error ?? "Application could not be saved.");
      }

      const applicationId = createPayload.applicationId as string;
      const uploads = [
        ...photos.map((file) => ({ file, kind: "photo" })),
        ...videos.map((file) => ({ file, kind: "video" })),
      ];

      for (let index = 0; index < uploads.length; index += 1) {
        const { file, kind } = uploads[index];
        setStatus({
          type: "working",
          message: t.submitting,
          progress: Math.round(10 + (index / uploads.length) * 78),
        });

        const uploadResponse = await fetch(
          `/api/applications/${applicationId}/files?kind=${kind}`,
          {
            method: "POST",
            headers: {
              "content-type": file.type || "application/octet-stream",
              "x-file-name": encodeURIComponent(file.name),
              "x-file-size": String(file.size),
            },
            body: file,
          }
        );

        const uploadPayload = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadPayload.error ?? `Could not upload ${file.name}.`);
        }
      }

      const finalizeResponse = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "submitted" }),
      });

      const finalizePayload = await finalizeResponse.json();
      if (!finalizeResponse.ok) {
        throw new Error(finalizePayload.error ?? "Application could not be finalized.");
      }

      setStatus({ type: "success", message: t.success, progress: 100 });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unexpected error",
        progress: 0,
      });
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Strawberry Glam Models">
          <span className="brand-mark">SGM</span>
          <span className="brand-name">
            <strong>Strawberry</strong>
            <small>Glam Models</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map((item, index) =>
            navTargets[index].startsWith("/") ? (
              <a href={navTargets[index]} key={item}>
                {item}
              </a>
            ) : (
              <a href={navTargets[index]} key={item}>
                {item}
              </a>
            )
          )}
        </nav>
        <div className="topbar-actions">
          <div className="language-switch" aria-label="Language switcher">
            <button
              className={language === "en" ? "active" : ""}
              type="button"
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              className={language === "ru" ? "active" : ""}
              type="button"
              onClick={() => setLanguage("ru")}
            >
              RU
            </button>
          </div>
          <a className="nav-cta" href="#apply">
            {t.apply}
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            {language === "en"
              ? "Private International Representation"
              : "Приватное международное представительство"}
          </p>
          <h1>Strawberry Glam Models</h1>
          <p className="hero-subtitle">{t.heroSub}</p>
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-proof" aria-label="Key standards">
            <a href="/info/privacy">
              {language === "en" ? "Confidential review" : "Конфиденциальный разбор"}
            </a>
            <a href="/info/premium-clients">
              {language === "en" ? "Closed subscriber audience" : "Закрытая подписочная аудитория"}
            </a>
            <a href="/info/relocation-program">
              {language === "en" ? "Australia relocation track" : "Трек релокации в Австралию"}
            </a>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="#apply">
              {t.heroButton}
            </a>
            <a className="secondary-button" href="/info/privacy">
              {language === "en" ? "Privacy standards" : "Стандарты приватности"}
            </a>
          </div>
        </div>
      </section>

      <section className="trust-band" id="safety">
        <div className="section-inner trust-grid">
          <div>
            <p className="eyebrow">
              {language === "en" ? "Trust & Safety" : "Доверие и безопасность"}
            </p>
            <h2>{t.trustTitle}</h2>
          </div>
          <p>{t.trust}</p>
          <div className="trust-points">
            {t.trustPoints.map((point, index) => (
              <a href={trustPointLinks[index]} key={point}>
                {point}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="why">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">
              {language === "en" ? "Premium Model Agency" : "Премиальное модельное агентство"}
            </p>
            <h2>{t.whyTitle}</h2>
          </div>
          <div className="benefit-grid">
            {t.why.map((item, index) => (
              <a className="benefit-card" href={benefitLinks[index]} key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
                <small>{language === "en" ? "Read details" : "Подробнее"}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="client-band">
        <div className="section-inner split-row">
          <div>
            <p className="eyebrow">
              {language === "en" ? "NZ & Australia" : "NZ и Австралия"}
            </p>
            <h2>{t.clientsTitle}</h2>
          </div>
          <div>
            <p>{t.clientsText}</p>
            <a className="inline-link" href="/info/client-standards">
              {language === "en" ? "Read client standards" : "Открыть стандарты аудитории"}
            </a>
          </div>
        </div>
      </section>

      <section className="relocation-band" id="relocation">
        <div className="section-inner relocation-content">
          <p className="eyebrow">
            {language === "en" ? "Australia Head Office" : "Головной офис в Австралии"}
          </p>
          <h2>{t.relocationTitle}</h2>
          <p>{t.relocation}</p>
          <div className="relocation-list" aria-label="Relocation support">
            {["Housing", "Meals", "Main expenses", "Management"].map((item, index) => (
              <a href={relocationSupportLinks[index]} key={item}>
                {language === "en"
                  ? item
                  : ["Жильё", "Питание", "Основные расходы", "Менеджмент"][index]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">
              {language === "en" ? "Selected Outcomes" : "Выборочные результаты"}
            </p>
            <h2>{t.storiesTitle}</h2>
          </div>
          <div className="story-grid">
            {t.stories.map((story) => (
              <a className="story-card" href="/info/success-stories" key={story.name}>
                <strong>{story.stat}</strong>
                <p>{story.copy}</p>
                <span>{story.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="section-inner details-layout">
          <div>
            <p className="eyebrow">
              {language === "en" ? "Prepared Information" : "Подготовленная информация"}
            </p>
            <h2>{language === "en" ? "Clear answers before you apply" : "Подробности перед заявкой"}</h2>
          </div>
          <div className="resource-grid">
            {detailCards[language].map((card) => (
              <a className="resource-card" href={card.href} key={card.href}>
                <span>{card.title}</span>
                <p>{card.copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="application-section" id="apply">
        <div className="section-inner application-layout">
          <div className="application-intro">
            <p className="eyebrow">
              {language === "en" ? "Private Application" : "Приватная заявка"}
            </p>
            <h2>{t.formTitle}</h2>
            <p>{t.formLead}</p>
            <div className="application-stats">
              {["8-15 photos", "2-5 videos", "NDA review"].map((item, index) => (
                <a href={applicationStatLinks[index]} key={item}>
                  {language === "en"
                    ? item
                    : ["8-15 фото", "2-5 видео", "NDA-проверка"][index]}
                </a>
              ))}
            </div>
          </div>

          <form className="application-form" onSubmit={submitApplication}>
            <div className="stepper" aria-label="Application steps">
              {t.steps.map((label, index) => (
                <button
                  className={step === index ? "active" : ""}
                  key={label}
                  type="button"
                  onClick={() => setStep(index as Step)}
                >
                  <span>{index + 1}</span>
                  {label}
                </button>
              ))}
            </div>

            {step === 0 && (
              <div className="form-grid">
                <Field label={t.labels.fullName}>
                  <input
                    required
                    value={personal.fullName}
                    onChange={(event) => updatePersonal("fullName", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.age}>
                  <input
                    min="18"
                    required
                    type="number"
                    value={personal.age}
                    onChange={(event) => updatePersonal("age", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.countryCity}>
                  <input
                    required
                    value={personal.countryCity}
                    onChange={(event) => updatePersonal("countryCity", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.email}>
                  <input
                    required
                    type="email"
                    value={personal.email}
                    onChange={(event) => updatePersonal("email", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.messenger}>
                  <input
                    required
                    value={personal.messenger}
                    onChange={(event) => updatePersonal("messenger", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.timezone}>
                  <input
                    required
                    value={personal.timezone}
                    onChange={(event) => updatePersonal("timezone", event.target.value)}
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="question-list">
                {(Object.keys(t.questions) as Array<keyof Answers>).map((key) => (
                  <Field key={key} label={t.questions[key]}>
                    {key === "englishLevel" ? (
                      <select
                        required
                        value={answers[key]}
                        onChange={(event) => updateAnswer(key, event.target.value)}
                      >
                        <option value="">{language === "en" ? "Select" : "Выбрать"}</option>
                        {englishLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    ) : key === "relocationOpen" ? (
                      <select
                        required
                        value={answers[key]}
                        onChange={(event) => updateAnswer(key, event.target.value)}
                      >
                        <option value="">{language === "en" ? "Select" : "Выбрать"}</option>
                        {relocationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <textarea
                        required
                        rows={key === "additionalInfo" ? 4 : 3}
                        value={answers[key]}
                        onChange={(event) => updateAnswer(key, event.target.value)}
                      />
                    )}
                  </Field>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="portfolio-panel">
                <p>{t.portfolioHint}</p>
                <div className="upload-grid">
                  <Field label={t.labels.photos}>
                    <input
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      multiple
                      required
                      type="file"
                      onChange={(event) => setPhotos(Array.from(event.target.files ?? []))}
                    />
                  </Field>
                  <Field label={t.labels.videos}>
                    <input
                      accept="video/mp4,video/quicktime,video/webm"
                      multiple
                      required
                      type="file"
                      onChange={(event) => setVideos(Array.from(event.target.files ?? []))}
                    />
                  </Field>
                </div>
                <div className="file-summary">{fileSummary}</div>
                <label className="checkbox-line">
                  <input
                    checked={legalAgeConfirmed}
                    onChange={(event) => setLegalAgeConfirmed(event.target.checked)}
                    type="checkbox"
                  />
                  <span>{t.labels.ageConsent}</span>
                </label>
                <label className="checkbox-line">
                  <input
                    checked={privacyAccepted}
                    onChange={(event) => setPrivacyAccepted(event.target.checked)}
                    type="checkbox"
                  />
                  <span>{t.labels.privacy}</span>
                </label>
              </div>
            )}

            {status.type !== "idle" && (
              <div className={`form-status ${status.type}`}>
                <div>
                  <span>{status.message}</span>
                  {status.type === "working" && (
                    <strong>{Math.max(1, status.progress)}%</strong>
                  )}
                </div>
                {status.type === "working" && (
                  <progress max="100" value={status.progress} />
                )}
              </div>
            )}

            <div className="form-actions">
              <button
                disabled={step === 0 || status.type === "working"}
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1) as Step)}
              >
                {t.back}
              </button>
              {step < 2 ? (
                <button
                  className="primary-form-button"
                  disabled={!canAdvance()}
                  type="button"
                  onClick={() => setStep((current) => Math.min(2, current + 1) as Step)}
                >
                  {t.next}
                </button>
              ) : (
                <button
                  className="primary-form-button"
                  disabled={status.type === "working"}
                  type="submit"
                >
                  {t.submit}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">
              {language === "en" ? "Confidential Review" : "Конфиденциальное рассмотрение"}
            </p>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {t.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="section-inner footer-grid">
          <div>
            <span className="brand-mark">SGM</span>
            <h2>Strawberry Glam Models</h2>
          </div>
          <p>
            <a className="text-link" href="/info/privacy">
              {t.footerPrivacy}
            </a>
          </p>
          <p>
            <a className="text-link" href="/info/age-verification">
              {t.footerAge}
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

function Field({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function formatBytes(bytes: number) {
  if (!bytes) {
    return "0 MB";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
