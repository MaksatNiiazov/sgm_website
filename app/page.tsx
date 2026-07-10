"use client";

import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type Language = "en" | "ru";
type Step = 0 | 1 | 2;

const supportedLanguages = new Set<Language>(["en", "ru"]);

const languageChangeEvent = "sgm-language-change";

function getBrowserLanguageSnapshot(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (supportedLanguages.has(queryLanguage as Language)) {
    return queryLanguage as Language;
  }

  const storedLanguage = window.localStorage.getItem("sgm-language");
  if (supportedLanguages.has(storedLanguage as Language)) {
    return storedLanguage as Language;
  }

  return "en";
}

function getServerLanguageSnapshot(): Language {
  return "en";
}

function subscribeLanguage(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("popstate", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(languageChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(languageChangeEvent, onStoreChange);
  };
}

function usePersistentLanguage() {
  return useSyncExternalStore(subscribeLanguage, getBrowserLanguageSnapshot, getServerLanguageSnapshot);
}

function withLanguage(href: string, language: Language) {
  const [target, hash] = href.split("#");
  const [pathname = "/", search = ""] = (target || "/").split("?");
  const params = new URLSearchParams(search);
  params.set("lang", language);
  return `${pathname}?${params.toString()}${hash ? `#${hash}` : ""}`;
}

function updateCurrentUrlLanguage(language: Language) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
  window.localStorage.setItem("sgm-language", language);
}

function setLanguagePreference(language: Language) {
  updateCurrentUrlLanguage(language);
  window.dispatchEvent(new Event(languageChangeEvent));
}

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
    conditionsTitle: "Clear commercial terms from the start",
    conditionsLead:
      "Strawberry Glam Models works with a growing network of more than 150 adult models. The platform pays models 60% of the revenue generated through their work. The premium audience, structured management and consistent schedules are designed to create stronger earning potential than a broad, uncurated traffic model.",
    conditionsStats: [
      { value: "150+", label: "models in our network" },
      { value: "60%", label: "of platform revenue paid to the model" },
      { value: "Premium", label: "audience and higher-income positioning" },
    ],
    conditionsNote:
      "Income is individual and is influenced by schedule, presentation, communication, audience fit and consistency. The 60% share is a platform revenue split, not a guaranteed income level.",
    relocationTitle: "Relocation Program",
    relocation:
      "Top models can receive an offer to relocate to our head office in Australia with full coverage of housing, meals, and main expenses.",
    storiesTitle: "Success Stories",
    stories: [
      {
        name: "Aigerim, Kazakhstan",
        copy: "Started from Almaty with a modest home setup, then rebuilt her portfolio, upgraded lighting and moved into a premium schedule. Within her first strong year, she helped her parents with a home purchase and created a private savings reserve.",
        stat: "Home for parents",
      },
      {
        name: "Mila, Russia",
        copy: "Came from inconsistent platform work and wanted serious management, stronger privacy and higher-value clients. After repositioning, she built enough income to buy her own apartment and stop depending on unstable side work.",
        stat: "Own apartment",
      },
      {
        name: "Ani, Armenia",
        copy: "Submitted a small portfolio first, then followed a stricter presentation plan and became one of the profiles reviewed for Australia. Her relocation path gave her a calmer routine, covered living support and a more ambitious professional environment.",
        stat: "Australia move",
      },
      {
        name: "D., Georgia",
        copy: "Started with flexible evening availability and a private workspace. With schedule discipline and careful coaching, she moved from short-term income goals to buying a car, supporting family expenses and feeling financially independent.",
        stat: "Car and freedom",
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
      photos: "Add high-quality photos",
      videos: "Add short videos",
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
      "There is no required number of files at this stage. Send the photos and videos you are comfortable sharing for a first review. Stronger, more distinctive and better-presented content helps the team understand your potential and may lead to a more relevant offer. This is a selective review process, so applications are assessed individually rather than accepted automatically.",
    portfolioSupport:
      "Selected applicants may be eligible for practical equipment or living support. The full approach and eligibility criteria are explained in our model support guide.",
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
    footerSupport:
      "Support: for private questions about applications, portfolio materials or the review process, contact strawberry.glam.models@gmail.com.",
    footerTagline:
      "Private international representation for adult models working with a curated premium audience in New Zealand and Australia.",
    footerContactTitle: "Private support",
    footerLegalTitle: "Standards",
    footerTrustTitle: "Operating principles",
    footerTrust: ["Confidential review", "Controlled media access", "18+ verification", "Consent-led communication"],
    footerBottom:
      "Strawberry Glam Models reviews adult applications privately. Earnings, offers and relocation opportunities depend on individual profile, consistency and review outcome.",
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
    conditionsTitle: "Понятные коммерческие условия с самого начала",
    conditionsLead:
      "Strawberry Glam Models объединяет сеть из более чем 150 взрослых моделей. Платформа выплачивает модели 60% выручки, полученной от её работы. Премиальная аудитория, системный менеджмент и стабильный график помогают создавать более высокий потенциал дохода по сравнению с массовым, неотобранным трафиком.",
    conditionsStats: [
      { value: "150+", label: "моделей в нашей сети" },
      { value: "60%", label: "выручки платформы получает модель" },
      { value: "Premium", label: "аудитория и позиционирование с высоким доходом" },
    ],
    conditionsNote:
      "Доход индивидуален и зависит от графика, подачи, коммуникации, соответствия аудитории и стабильности. Доля 60% является распределением выручки платформы, а не гарантией конкретного заработка.",
    relocationTitle: "Программа релокации",
    relocation:
      "Лучшие модели получают предложение о релокации в головной офис в Австралии с полной оплатой жилья, питания и основных расходов.",
    storiesTitle: "Истории успеха",
    stories: [
      {
        name: "Айгерим, Казахстан",
        copy: "Начала из Алматы с обычного домашнего сетапа, затем пересобрала портфолио, улучшила свет и вышла на премиальный график. За первый сильный год помогла родителям с покупкой дома и сформировала личный финансовый резерв.",
        stat: "Дом для родителей",
      },
      {
        name: "Мила, Россия",
        copy: "Пришла после нестабильной работы на платформах: ей были нужны серьёзный менеджмент, приватность и более дорогая аудитория. После перепозиционирования она заработала на собственную квартиру и перестала зависеть от случайных подработок.",
        stat: "Своя квартира",
      },
      {
        name: "Ани, Армения",
        copy: "Сначала отправила небольшое портфолио, затем прошла более строгий план подачи и попала в пул кандидаток на Австралию. Релокационный трек дал ей спокойный быт, покрытие основных расходов и более амбициозную профессиональную среду.",
        stat: "Переезд в Австралию",
      },
      {
        name: "Д., Грузия",
        copy: "Начала с вечерней доступности и приватного рабочего пространства. Благодаря дисциплине графика и аккуратному сопровождению перешла от краткосрочных целей к покупке машины, поддержке семьи и ощущению финансовой свободы.",
        stat: "Машина и свобода",
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
      photos: "Добавь качественные фотографии",
      videos: "Добавь короткие видео",
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
      "На этом этапе нет обязательного количества файлов. Отправь столько фотографий и видео, сколько считаешь комфортным для первого рассмотрения. Чем интереснее, качественнее и профессиональнее будет материал, тем лучше команда сможет оценить твой потенциал и подготовить релевантное предложение. Отбор индивидуальный: заявка не означает автоматического принятия.",
    portfolioSupport:
      "Для отдельных кандидаток может быть доступна практическая поддержка с оборудованием или условиями проживания. Полный подход и критерии рассмотрения описаны в гайде по поддержке моделей.",
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
    footerSupport:
      "Поддержка: по приватным вопросам о заявке, портфолио или процессе рассмотрения напишите на strawberry.glam.models@gmail.com.",
    footerTagline:
      "Приватное международное представительство для совершеннолетних моделей, работающих с закрытой премиум-аудиторией Новой Зеландии и Австралии.",
    footerContactTitle: "Приватная поддержка",
    footerLegalTitle: "Стандарты",
    footerTrustTitle: "Принципы работы",
    footerTrust: ["Конфиденциальное рассмотрение", "Контролируемый доступ к медиа", "Проверка 18+", "Коммуникация через согласие"],
    footerBottom:
      "Strawberry Glam Models приватно рассматривает заявки совершеннолетних кандидатов. Доход, офферы и релокация зависят от профиля, стабильности и результата рассмотрения.",
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

const applicationRequirements = {
  en: [
    {
      title: "Portfolio photos",
      copy: "Send the photos you feel comfortable sharing. Clear lighting, a clean background and confident presentation help us see your potential.",
    },
    {
      title: "Short videos",
      copy: "One or several short videos can help us understand your camera presence, movement, voice and natural confidence.",
    },
    {
      title: "NDA review",
      copy: "Applications are handled privately by a limited review team under strict confidentiality standards.",
    },
  ],
  ru: [
    {
      title: "Фотографии для портфолио",
      copy: "Отправь те фото, которыми тебе комфортно поделиться. Чистый свет, аккуратный фон и уверенная подача помогают увидеть твой потенциал.",
    },
    {
      title: "Короткие видео",
      copy: "Одно или несколько коротких видео помогут понять твою работу в кадре, движение, голос и естественную уверенность.",
    },
    {
      title: "NDA-проверка",
      copy: "Заявки рассматриваются приватно ограниченной командой по строгим стандартам конфиденциальности.",
    },
  ],
};

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
    {
      title: "Relocation program",
      copy: "How Australia relocation support can work for qualified top models.",
      href: "/info/relocation-program",
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
    {
      title: "Программа релокации",
      copy: "Как может работать релокация в Австралию для подходящих топ-моделей.",
      href: "/info/relocation-program",
    },
  ],
};

export default function Home() {
  const language = usePersistentLanguage();
  const didHydrateLanguage = useRef(false);
  const [step, setStep] = useState<Step>(0);
  const [personal, setPersonal] = useState<Personal>(initialPersonal);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [photos, setPhotos] = useState<(File | null)[]>([null]);
  const [videos, setVideos] = useState<(File | null)[]>([null]);
  const [legalAgeConfirmed, setLegalAgeConfirmed] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [validationError, setValidationError] = useState<
    "personalAge" | "ageConsent" | "privacy" | null
  >(null);
  const [status, setStatus] = useState<{
    type: "idle" | "working" | "success" | "error";
    message: string;
    progress: number;
  }>({ type: "idle", message: "", progress: 0 });

  const t = content[language];
  useEffect(() => {
    if (status.type !== "error") {
      return;
    }

    const personalAgeReady = Number(personal.age) >= 18;
    const errorIsResolved =
      (validationError === "personalAge" && personalAgeReady) ||
      (validationError === "ageConsent" && legalAgeConfirmed) ||
      (validationError === "privacy" && privacyAccepted);

    if (errorIsResolved) {
      setValidationError(null);
      setStatus({ type: "idle", message: "", progress: 0 });
    }
  }, [
    legalAgeConfirmed,
    personal.age,
    privacyAccepted,
    status.type,
    validationError,
  ]);


  useEffect(() => {
    if (!didHydrateLanguage.current) {
      didHydrateLanguage.current = true;
      return;
    }

    updateCurrentUrlLanguage(language);
  }, [language]);

  function changeLanguage(nextLanguage: Language) {
    setLanguagePreference(nextLanguage);
  }

  const selectedPhotos = useMemo(() => photos.filter((file): file is File => Boolean(file)), [photos]);
  const selectedVideos = useMemo(() => videos.filter((file): file is File => Boolean(file)), [videos]);
  const visiblePhotoInputs = photos.length;
  const visibleVideoInputs = videos.length;

  const fileSummary = useMemo(() => {
    const total = [...selectedPhotos, ...selectedVideos].reduce((sum, file) => sum + file.size, 0);
    return `${selectedPhotos.length} photos • ${selectedVideos.length} videos • ${formatBytes(total)}`;
  }, [selectedPhotos, selectedVideos]);

  function updatePortfolioFile(kind: "photo" | "video", index: number, file: File | null) {
    const update = (current: (File | null)[]) => {
      const next = current.map((item, itemIndex) => (itemIndex === index ? file : item));
      if (file && index === current.length - 1) {
        next.push(null);
      }
      return next;
    };

    if (kind === "photo") {
      setPhotos(update);
      return;
    }

    setVideos(update);
  }

  function updatePersonal(key: keyof Personal, value: string) {
    setPersonal((current) => ({ ...current, [key]: value }));
  }

  function clearStatus() {
    setValidationError(null);
    setStatus({ type: "idle", message: "", progress: 0 });
  }

  function updateAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function canAdvance() {
    return true;
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "", progress: 0 });
    setValidationError(null);

    if (Number(personal.age) < 18) {
      setStep(0);
      setValidationError("personalAge");
      setStatus({
        type: "error",
        message:
          language === "en"
            ? "Enter your age in step 1. Applications are available only to candidates aged 18+."
            : "Укажи возраст в первом шаге анкеты. Заявки принимаются только от кандидаток 18+.",
        progress: 0,
      });
      return;
    }

    if (!legalAgeConfirmed) {
      setValidationError("ageConsent");
      setStatus({
        type: "error",
        message:
          language === "en"
            ? "Confirm that you are 18+ and ready to provide age verification if requested."
            : "Подтверди, что тебе есть 18+ и ты готова предоставить подтверждение возраста по запросу.",
        progress: 0,
      });
      return;
    }

    if (!privacyAccepted) {
      setValidationError("privacy");
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
        ...selectedPhotos.map((file) => ({ file, kind: "photo" })),
        ...selectedVideos.map((file) => ({ file, kind: "video" })),
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
        <a className="brand-lockup" href={withLanguage("#top", language)} aria-label="Strawberry Glam Models">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            <strong>Strawberry</strong>
            <small>Glam Models</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          {t.nav.map((item, index) => (
            <a href={withLanguage(navTargets[index], language)} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <div className="language-switch" aria-label="Language switcher">
            <button
              className={language === "en" ? "active" : ""}
              type="button"
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={language === "ru" ? "active" : ""}
              type="button"
              onClick={() => changeLanguage("ru")}
            >
              RU
            </button>
          </div>
          <a className="nav-cta" href={withLanguage("#apply", language)}>
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
            <a href={withLanguage("/info/privacy", language)}>
              {language === "en" ? "Confidential review" : "Конфиденциальный разбор"}
            </a>
            <a href={withLanguage("/info/premium-clients", language)}>
              {language === "en" ? "Closed subscriber audience" : "Закрытая подписочная аудитория"}
            </a>
            <a href={withLanguage("/info/relocation-program", language)}>
              {language === "en" ? "Australia relocation track" : "Трек релокации в Австралию"}
            </a>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href={withLanguage("#apply", language)}>
              {t.heroButton}
            </a>
            <a className="secondary-button" href={withLanguage("/info/privacy", language)}>
              {language === "en" ? "Privacy standards" : "Стандарты приватности"}
            </a>
          </div>
        </div>
      </section>

      <section className="trust-band" id="safety">
        <div className="section-inner trust-grid">
          <div className="trust-copy">
            <p className="eyebrow">
              {language === "en" ? "Trust & Safety" : "Доверие и безопасность"}
            </p>
            <h2>{t.trustTitle}</h2>
            <p className="trust-text">{t.trust}</p>
            <div className="trust-points">
              {t.trustPoints.map((point, index) => (
                <a href={withLanguage(trustPointLinks[index], language)} key={point}>
                  {point}
                </a>
              ))}
            </div>
          </div>
          <div
            aria-label={
              language === "en"
                ? "Black satin and sealed envelope privacy visual"
                : "Визуал приватности: чёрный сатин и запечатанный конверт"
            }
            className="trust-visual"
            role="img"
          />
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
              <a className="benefit-card" href={withLanguage(benefitLinks[index], language)} key={item}>
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
            <a className="inline-link" href={withLanguage("/info/client-standards", language)}>
              {language === "en" ? "Read client standards" : "Открыть стандарты аудитории"}
            </a>
          </div>
        </div>
      </section>

      <section className="conditions-band">
        <div className="section-inner conditions-layout">
          <div className="conditions-heading">
            <p className="eyebrow">
              {language === "en" ? "Terms & Earnings" : "Условия и доход"}
            </p>
            <h2>{t.conditionsTitle}</h2>
            <p>{t.conditionsLead}</p>
          </div>
          <div className="conditions-grid">
            {t.conditionsStats.map((stat) => (
              <article key={stat.value + stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
          <p className="conditions-note">{t.conditionsNote}</p>
        </div>
      </section>

      <section className="relocation-band" id="relocation">
        <div className="section-inner relocation-layout">
          <div className="relocation-content">
            <p className="eyebrow">
              {language === "en" ? "Australia Head Office" : "Головной офис в Австралии"}
            </p>
            <h2>{t.relocationTitle}</h2>
            <p>{t.relocation}</p>
            <div className="relocation-list" aria-label="Relocation support">
              {["Housing", "Meals", "Main expenses", "Management"].map((item, index) => (
                <a href={withLanguage(relocationSupportLinks[index], language)} key={item}>
                  {language === "en"
                    ? item
                    : ["Жильё", "Питание", "Основные расходы", "Менеджмент"][index]}
                </a>
              ))}
            </div>
          </div>
          <div
            aria-label={
              language === "en"
                ? "Australia relocation mood visual with premium travel tag"
                : "Визуал релокации в Австралию с премиальным travel tag"
            }
            className="relocation-visual"
            role="img"
          />
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
              <a className="story-card" href={withLanguage("/info/success-stories", language)} key={story.name}>
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
              {language === "en" ? "Candidate Information" : "Информация для кандидатов"}
            </p>
            <h2>{language === "en" ? "Clear answers before you apply" : "Подробности перед заявкой"}</h2>
          </div>
          <div className="resource-grid">
            {detailCards[language].map((card) => (
              <a className="resource-card" href={withLanguage(card.href, language)} key={card.href}>
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
              {applicationRequirements[language].map((item) => (
                <div className="application-stat-card" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </div>
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
                    value={personal.fullName}
                    onChange={(event) => updatePersonal("fullName", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.age}>
                  <input
                    aria-invalid={validationError === "personalAge"}
                    className={validationError === "personalAge" ? "input-error" : ""}
                    min="18"
                    type="number"
                    value={personal.age}
                    onChange={(event) => updatePersonal("age", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.countryCity}>
                  <input
                    value={personal.countryCity}
                    onChange={(event) => updatePersonal("countryCity", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.email}>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(event) => updatePersonal("email", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.messenger}>
                  <input
                    value={personal.messenger}
                    onChange={(event) => updatePersonal("messenger", event.target.value)}
                  />
                </Field>
                <Field label={t.labels.timezone}>
                  <input
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
                <div className="portfolio-support">
                  <strong>{language === "en" ? "Practical support for selected applicants" : "Практическая поддержка для отдельных кандидаток"}</strong>
                  <p>{t.portfolioSupport}</p>
                  <a className="text-link" href={withLanguage("/info/model-support", language)}>
                    {language === "en" ? "Read the model support guide" : "Открыть гайд по поддержке моделей"}
                  </a>
                </div>
                <div className="upload-grid">
                  <div className="upload-set">
                    <span>{t.labels.photos}</span>
                    <div className="single-upload-grid">
                      {photos.slice(0, visiblePhotoInputs).map((file, index) => (
                        <label
                          className={`single-upload ${file ? "filled" : "pending"}`}
                          key={`photo-${index + 1}`}
                        >
                          <span>{language === "en" ? `Photo ${index + 1}` : `Фото ${index + 1}`}</span>
                          <input
                            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                            type="file"
                            onChange={(event) =>
                              updatePortfolioFile("photo", index, event.target.files?.[0] ?? null)
                            }
                          />
                          <em>
                            {file
                              ? language === "en"
                                ? "Uploaded"
                                : "Загружено"
                              : language === "en"
                                ? "Next slot"
                                : "Новое поле"}
                          </em>
                          <small>{file?.name ?? (language === "en" ? "No file selected" : "Файл не выбран")}</small>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="upload-set">
                    <span>{t.labels.videos}</span>
                    <div className="single-upload-grid video-upload-grid">
                      {videos.slice(0, visibleVideoInputs).map((file, index) => (
                        <label
                          className={`single-upload ${file ? "filled" : "pending"}`}
                          key={`video-${index + 1}`}
                        >
                          <span>{language === "en" ? `Video ${index + 1}` : `Видео ${index + 1}`}</span>
                          <input
                            accept="video/mp4,video/quicktime,video/webm"
                            type="file"
                            onChange={(event) =>
                              updatePortfolioFile("video", index, event.target.files?.[0] ?? null)
                            }
                          />
                          <em>
                            {file
                              ? language === "en"
                                ? "Uploaded"
                                : "Загружено"
                              : language === "en"
                                ? "Next slot"
                                : "Новое поле"}
                          </em>
                          <small>{file?.name ?? (language === "en" ? "No file selected" : "Файл не выбран")}</small>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="file-summary">{fileSummary}</div>
                <label className={`checkbox-line ${validationError === "ageConsent" ? "has-error" : ""}`}>
                  <input
                    aria-invalid={validationError === "ageConsent"}
                    checked={legalAgeConfirmed}
                    onChange={(event) => setLegalAgeConfirmed(event.target.checked)}
                    type="checkbox"
                  />
                  <span>{t.labels.ageConsent}</span>
                </label>
                <label className={`checkbox-line ${validationError === "privacy" ? "has-error" : ""}`}>
                  <input
                    aria-invalid={validationError === "privacy"}
                    checked={privacyAccepted}
                    onChange={(event) => setPrivacyAccepted(event.target.checked)}
                    type="checkbox"
                  />
                  <span>{t.labels.privacy}</span>
                </label>
              </div>
            )}

            {status.type !== "idle" && (
              <div
                className={`form-status ${status.type}`}
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                <span className="form-status-icon" aria-hidden="true">
                  {status.type === "error" ? "!" : status.type === "success" ? "✓" : "…"}
                </span>
                <div className="form-status-copy">
                  <strong>
                    {status.type === "error"
                      ? language === "en"
                        ? "Please check the highlighted item"
                        : "Проверьте выделенный пункт"
                      : status.type === "success"
                        ? language === "en"
                          ? "Application received"
                          : "Заявка принята"
                        : language === "en"
                          ? "Sending your application"
                          : "Отправляем заявку"}
                  </strong>
                  <span>{status.message}</span>
                  {status.type === "working" && <em>{Math.max(1, status.progress)}%</em>}
                </div>
                {status.type === "error" && (
                  <button
                    className="form-status-close"
                    aria-label={language === "en" ? "Dismiss error" : "Закрыть сообщение"}
                    type="button"
                    onClick={clearStatus}
                  >
                    ×
                  </button>
                )}
                {status.type === "working" && <progress max="100" value={status.progress} />}
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
        <div className="section-inner footer-shell">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="brand-mark" aria-hidden="true" />
              <h2>Strawberry Glam Models</h2>
              <p>{t.footerTagline}</p>
            </div>

            <div className="footer-column">
              <h3>{t.footerLegalTitle}</h3>
              <a className="text-link" href={withLanguage("/info/privacy", language)}>
                {t.footerPrivacy}
              </a>
              <a className="text-link" href={withLanguage("/info/age-verification", language)}>
                {t.footerAge}
              </a>
            </div>

            <div className="footer-column">
              <h3>{t.footerContactTitle}</h3>
              <a className="footer-email" href="mailto:strawberry.glam.models@gmail.com">
                strawberry.glam.models@gmail.com
              </a>
              <p>{t.footerSupport}</p>
            </div>

            <div className="footer-column footer-principles">
              <h3>{t.footerTrustTitle}</h3>
              <ul>
                {t.footerTrust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{t.footerBottom}</span>
            <span>© 2026 Strawberry Glam Models</span>
          </div>
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
