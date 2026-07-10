import Link from "next/link";
import { notFound } from "next/navigation";

type InfoPage = {
  title: string;
  ruTitle: string;
  intro: string;
  ruIntro: string;
  points: string[];
  ruPoints: string[];
  cta: string;
  ruCta: string;
};

const infoPages: Record<string, InfoPage> = {
  safety: {
    title: "Safety & Privacy",
    ruTitle: "Безопасность и приватность",
    intro:
      "Strawberry Glam Models is built around discreet review, controlled communication and careful protection of model and client information.",
    ruIntro:
      "Strawberry Glam Models строится вокруг приватного рассмотрения, контролируемой коммуникации и бережной защиты данных моделей и клиентов.",
    points: [
      "Applications are reviewed by a limited internal team.",
      "Portfolio files are used only for suitability assessment and private offer preparation.",
      "Sensitive identity details are not used publicly without explicit written approval.",
      "Our process is designed to help models feel informed, respected and in control.",
    ],
    ruPoints: [
      "Анкеты рассматривает ограниченная внутренняя команда.",
      "Портфолио используется только для оценки профиля и подготовки приватного предложения.",
      "Личные данные не используются публично без отдельного письменного согласия.",
      "Процесс построен так, чтобы модель чувствовала контроль, уважение и ясность.",
    ],
    cta: "Start a confidential application",
    ruCta: "Начать конфиденциальную заявку",
  },
  "why-strawberry": {
    title: "Why Strawberry Glam",
    ruTitle: "Почему Strawberry Glam",
    intro:
      "The agency combines premium positioning, selective client access and hands-on model support for applicants who want a more organized path.",
    ruIntro:
      "Агентство сочетает премиальное позиционирование, выборочный доступ аудитории и сопровождение моделей для тех, кто хочет более организованный путь.",
    points: [
      "A narrow, subscription-based audience from New Zealand and Australia.",
      "Structured onboarding with portfolio, schedule and presentation guidance.",
      "A privacy-first review process with clear communication.",
      "Growth opportunities for strong, consistent models, including relocation review.",
    ],
    ruPoints: [
      "Узкая подписочная аудитория из Новой Зеландии и Австралии.",
      "Структурный онбординг с рекомендациями по портфолио, графику и подаче.",
      "Приватный процесс рассмотрения с понятной коммуникацией.",
      "Возможности роста для стабильных сильных моделей, включая рассмотрение релокации.",
    ],
    cta: "Review the application steps",
    ruCta: "Посмотреть шаги заявки",
  },
  relocation: {
    title: "Relocation to Australia",
    ruTitle: "Релокация в Австралию",
    intro:
      "Top-performing models can be considered for relocation to the Australian head office with practical support around living needs.",
    ruIntro:
      "Сильные модели могут рассматриваться для релокации в головной офис в Австралии с практической поддержкой основных бытовых потребностей.",
    points: [
      "Relocation is selective and based on performance, professionalism and long-term fit.",
      "Qualified models can receive housing, meals and main expense support.",
      "The move is prepared privately and step by step.",
      "The goal is to create a stable environment for premium growth.",
    ],
    ruPoints: [
      "Релокация предоставляется выборочно и зависит от результатов, профессионализма и долгосрочного соответствия.",
      "Подходящие модели могут получить поддержку жилья, питания и основных расходов.",
      "Переезд готовится приватно и поэтапно.",
      "Цель — создать стабильную среду для премиального роста.",
    ],
    cta: "Apply for future review",
    ruCta: "Подать заявку на рассмотрение",
  },
  privacy: {
    title: "Privacy Policy",
    ruTitle: "Политика конфиденциальности",
    intro:
      "Application data and media are collected only to assess model suitability, protect safety and communicate next steps.",
    ruIntro:
      "Данные заявки и медиа собираются только для оценки профиля, защиты безопасности и коммуникации по следующим шагам.",
    points: [
      "Files are not sold, published or shared with external parties for promotion without consent.",
      "Admin access is protected and intended only for authorized review.",
      "Submitted materials are used to prepare a relevant, private response.",
      "Applicants can ask questions before moving forward with any offer.",
    ],
    ruPoints: [
      "Файлы не продаются, не публикуются и не передаются для продвижения без согласия.",
      "Доступ администратора защищён и предназначен только для авторизованного рассмотрения.",
      "Материалы используются для подготовки релевантного приватного ответа.",
      "Кандидат может задать вопросы перед переходом к любому предложению.",
    ],
    cta: "Submit materials securely",
    ruCta: "Безопасно отправить материалы",
  },
  nda: {
    title: "NDA & Confidential Review",
    ruTitle: "NDA и конфиденциальное рассмотрение",
    intro:
      "Confidentiality agreements support a professional relationship where models and clients can trust the process.",
    ruIntro:
      "Соглашения о конфиденциальности поддерживают профессиональные отношения, где модели и клиенты могут доверять процессу.",
    points: [
      "NDA terms help protect sensitive identity, strategy and portfolio details.",
      "Review conversations are kept discreet and purposeful.",
      "Only relevant team members handle applicant information.",
      "Confidentiality is treated as part of the premium service, not as an afterthought.",
    ],
    ruPoints: [
      "NDA помогает защищать личность, стратегию и детали портфолио.",
      "Коммуникация по заявке остаётся дискретной и предметной.",
      "Информацию кандидата обрабатывают только релевантные сотрудники.",
      "Конфиденциальность является частью премиального сервиса, а не формальностью.",
    ],
    cta: "Continue to the private form",
    ruCta: "Перейти к приватной форме",
  },
  "secure-storage": {
    title: "Secure File Storage",
    ruTitle: "Защищённое хранение файлов",
    intro:
      "Photos and videos are stored separately from public site content and are available only for protected admin review.",
    ruIntro:
      "Фото и видео хранятся отдельно от публичного сайта и доступны только через защищённый админ-просмотр.",
    points: [
      "Media uploads are stored in private object storage.",
      "File metadata is kept in the application database for controlled review.",
      "Downloads are available only through admin authorization.",
      "The system is designed so portfolio files are not exposed as public assets.",
    ],
    ruPoints: [
      "Загруженные медиа хранятся в приватном объектном хранилище.",
      "Метаданные файлов сохраняются в базе заявок для контролируемого просмотра.",
      "Скачивание доступно только через авторизацию администратора.",
      "Система устроена так, чтобы портфолио не становилось публичными файлами.",
    ],
    cta: "Prepare portfolio files",
    ruCta: "Подготовить портфолио",
  },
  "age-verification": {
    title: "18+ Age Verification",
    ruTitle: "Подтверждение 18+",
    intro:
      "The agency works only with adults who can provide valid age verification before any professional next step.",
    ruIntro:
      "Агентство работает только с совершеннолетними, которые могут предоставить подтверждение возраста перед профессиональными следующими шагами.",
    points: [
      "Applicants must confirm they are 18 or older.",
      "Age verification protects models, clients and the agency.",
      "Any profile that cannot satisfy age requirements cannot move forward.",
      "This standard keeps the process professional, lawful and trustworthy.",
    ],
    ruPoints: [
      "Кандидат должен подтвердить возраст 18+.",
      "Проверка возраста защищает моделей, клиентов и агентство.",
      "Профиль без подтверждения возраста не может перейти дальше.",
      "Этот стандарт делает процесс профессиональным, законным и надёжным.",
    ],
    cta: "Apply if you are 18+",
    ruCta: "Подать заявку, если вам 18+",
  },
  "premium-audience": {
    title: "Premium NZ & Australia Audience",
    ruTitle: "Премиум-аудитория NZ и Австралии",
    intro:
      "The client side is designed around a narrow, higher-value subscription audience instead of broad public traffic.",
    ruIntro:
      "Клиентская сторона построена вокруг узкой более ценной подписочной аудитории, а не массового публичного трафика.",
    points: [
      "Selective access helps maintain a more controlled experience.",
      "Premium positioning supports stronger boundaries and clearer presentation.",
      "Audience quality matters more than public volume.",
      "Models are positioned carefully so the offer feels exclusive and trusted.",
    ],
    ruPoints: [
      "Выборочный доступ помогает сохранять более контролируемый опыт.",
      "Премиальное позиционирование поддерживает границы и качественную подачу.",
      "Качество аудитории важнее публичного объёма.",
      "Модели позиционируются аккуратно, чтобы предложение ощущалось эксклюзивным и надёжным.",
    ],
    cta: "Learn how to position your profile",
    ruCta: "Узнать, как подать профиль",
  },
  earnings: {
    title: "Earnings Potential",
    ruTitle: "Потенциал заработка",
    intro:
      "High earnings are possible for serious models, but results depend on consistency, quality, communication and market fit.",
    ruIntro:
      "Высокий доход возможен для серьёзных моделей, но результат зависит от регулярности, качества, коммуникации и соответствия рынку.",
    points: [
      "The site communicates potential up to $12,000+ NZD/month for strong profiles.",
      "No income is presented as guaranteed.",
      "Management support helps improve schedule, media and presentation strategy.",
      "Professional habits usually create better long-term outcomes.",
    ],
    ruPoints: [
      "Сайт показывает потенциал до $12,000+ NZD в месяц для сильных профилей.",
      "Доход не подаётся как гарантия.",
      "Менеджмент помогает улучшать график, материалы и стратегию подачи.",
      "Профессиональные привычки обычно дают более сильный долгосрочный результат.",
    ],
    cta: "Send a serious application",
    ruCta: "Отправить серьёзную заявку",
  },
  "model-support": {
    title: "Model Support",
    ruTitle: "Поддержка моделей",
    intro:
      "Support is practical: profile review, presentation advice, training, promotion planning and schedule guidance.",
    ruIntro:
      "Поддержка практическая: разбор профиля, рекомендации по подаче, обучение, план продвижения и настройка графика.",
    points: [
      "Managers help models understand what improves a premium profile.",
      "Training can include lighting, camera framing, communication and consistency.",
      "Promotion is selective and aligned with privacy rules.",
      "The goal is to help each qualified model look polished, safe and confident.",
    ],
    ruPoints: [
      "Менеджеры помогают понять, что усиливает премиальный профиль.",
      "Обучение может включать свет, кадр, коммуникацию и регулярность.",
      "Продвижение проходит выборочно и с учётом приватности.",
      "Цель — помочь подходящей модели выглядеть профессионально, безопасно и уверенно.",
    ],
    cta: "Apply for review",
    ruCta: "Подать профиль на разбор",
  },
  "legal-protection": {
    title: "Legal & Confidential Protection",
    ruTitle: "Юридическая и конфиденциальная защита",
    intro:
      "A professional agency process needs clear consent, age verification, confidentiality and respectful communication.",
    ruIntro:
      "Профессиональному агентскому процессу нужны понятное согласие, проверка возраста, конфиденциальность и уважительная коммуникация.",
    points: [
      "Applicants confirm age and consent before materials are reviewed.",
      "Privacy and confidentiality are treated as core operating principles.",
      "Internal access is limited to review and operational needs.",
      "The process is intended to protect both models and clients.",
    ],
    ruPoints: [
      "Кандидаты подтверждают возраст и согласие до рассмотрения материалов.",
      "Приватность и конфиденциальность являются ключевыми принципами работы.",
      "Внутренний доступ ограничен задачами рассмотрения и операционной работы.",
      "Процесс защищает и моделей, и клиентов.",
    ],
    cta: "Review privacy details",
    ruCta: "Посмотреть детали приватности",
  },
  "relocation-program": {
    title: "Relocation Program",
    ruTitle: "Программа релокации",
    intro:
      "Relocation is a high-trust growth path for selected top models who are ready for a more structured environment.",
    ruIntro:
      "Релокация — это путь роста для избранных топ-моделей, готовых к более структурированной профессиональной среде.",
    points: [
      "Selected models may be invited to the Australian head office.",
      "Housing, meals and main expenses can be covered for qualified offers.",
      "The decision is based on fit, consistency and operational readiness.",
      "The program is designed to make the move calm, organized and focused.",
    ],
    ruPoints: [
      "Избранные модели могут быть приглашены в головной офис в Австралии.",
      "Жильё, питание и основные расходы могут покрываться по подходящему предложению.",
      "Решение зависит от соответствия, стабильности и готовности к процессу.",
      "Программа создана, чтобы переезд был спокойным, организованным и сфокусированным.",
    ],
    cta: "Share relocation interest",
    ruCta: "Указать интерес к релокации",
  },
  "flexible-schedule": {
    title: "Flexible Schedule",
    ruTitle: "Гибкий график",
    intro:
      "Qualified models can work from different countries while building a consistent schedule that fits premium demand.",
    ruIntro:
      "Подходящие модели могут работать из разных стран, выстраивая стабильный график под премиальный спрос.",
    points: [
      "Flexibility works best when paired with consistency.",
      "Schedule planning helps models align with active audience windows.",
      "Private space, stable internet and lighting strongly improve readiness.",
      "The application asks for availability so the team can assess realistic fit.",
    ],
    ruPoints: [
      "Гибкость лучше работает вместе со стабильностью.",
      "Планирование графика помогает совпадать с активными окнами аудитории.",
      "Приватное пространство, стабильный интернет и свет сильно повышают готовность.",
      "Анкета спрашивает доступность, чтобы команда оценила реальное соответствие.",
    ],
    cta: "Tell us your schedule",
    ruCta: "Указать свой график",
  },
  "premium-clients": {
    title: "Exclusive Client Side",
    ruTitle: "Эксклюзивная клиентская сторона",
    intro:
      "The client audience is intentionally narrow: premium subscribers from New Zealand and Australia who value discretion and quality.",
    ruIntro:
      "Клиентская аудитория намеренно узкая: премиальные подписчики из Новой Зеландии и Австралии, которым важны приватность и качество.",
    points: [
      "Subscription access supports a more private client environment.",
      "Selective positioning helps models avoid broad public exposure.",
      "The experience is designed around quality, trust and boundaries.",
      "Client communication is treated as part of the agency's safety culture.",
    ],
    ruPoints: [
      "Подписочный доступ поддерживает более приватную клиентскую среду.",
      "Выборочное позиционирование помогает избегать широкой публичной экспозиции.",
      "Опыт построен вокруг качества, доверия и границ.",
      "Клиентская коммуникация считается частью культуры безопасности агентства.",
    ],
    cta: "Read client standards",
    ruCta: "Открыть стандарты аудитории",
  },
  "client-standards": {
    title: "Client Standards",
    ruTitle: "Стандарты аудитории",
    intro:
      "Premium client access works best when expectations, privacy and respectful interaction are clear from the beginning.",
    ruIntro:
      "Премиальный клиентский доступ лучше работает, когда ожидания, приватность и уважительное взаимодействие ясны с самого начала.",
    points: [
      "The audience is curated rather than mass-market.",
      "Client-side privacy is balanced with model safety.",
      "Respectful interaction and boundaries are core expectations.",
      "This keeps the brand positioned as exclusive, polished and trustworthy.",
    ],
    ruPoints: [
      "Аудитория курируется, а не строится как массовый рынок.",
      "Приватность клиентов балансируется с безопасностью моделей.",
      "Уважительное взаимодействие и границы являются базовыми ожиданиями.",
      "Это поддерживает бренд как эксклюзивный, аккуратный и надёжный.",
    ],
    cta: "Return to the main site",
    ruCta: "Вернуться на главный сайт",
  },
  "success-stories": {
    title: "Success Story Context",
    ruTitle: "Контекст историй успеха",
    intro:
      "Stories on the site are representative examples of what structured support and strong consistency can create.",
    ruIntro:
      "Истории на сайте показывают, к чему может привести структурная поддержка и стабильная профессиональная работа.",
    points: [
      "Examples are anonymized to protect privacy.",
      "Results depend on each model's schedule, profile, communication and readiness.",
      "The positive pattern is clear: polish, consistency and guidance improve outcomes.",
      "Stories are meant to show direction, not promise identical results.",
    ],
    ruPoints: [
      "Примеры анонимизированы для защиты приватности.",
      "Результат зависит от графика, профиля, коммуникации и готовности модели.",
      "Позитивная закономерность понятна: качество, регулярность и сопровождение улучшают перспективы.",
      "Истории показывают направление, а не обещают одинаковый результат.",
    ],
    cta: "Apply with your own profile",
    ruCta: "Подать свой профиль",
  },
  "portfolio-guide": {
    title: "Photo Portfolio Guide",
    ruTitle: "Гайд по фото-портфолио",
    intro:
      "A strong photo set helps the team understand your presentation, style range and readiness for premium positioning.",
    ruIntro:
      "Сильный набор фото помогает команде понять вашу подачу, диапазон образов и готовность к премиальному позиционированию.",
    points: [
      "Upload 8-15 clear, high-quality photos.",
      "Use good lighting, clean background and confident framing.",
      "Include face and full-body angles where you feel comfortable.",
      "Professional, open and polished materials usually help review move faster.",
    ],
    ruPoints: [
      "Загрузите 8-15 чётких качественных фото.",
      "Используйте хороший свет, чистый фон и уверенный кадр.",
      "Добавьте лицо и полный рост в комфортном для вас формате.",
      "Профессиональные, открытые и аккуратные материалы обычно ускоряют рассмотрение.",
    ],
    cta: "Upload your photo set",
    ruCta: "Загрузить фото",
  },
  "video-guide": {
    title: "Video Portfolio Guide",
    ruTitle: "Гайд по видео-портфолио",
    intro:
      "Short videos help the team evaluate camera presence, movement, voice and overall confidence.",
    ruIntro:
      "Короткие видео помогают оценить работу в кадре, движение, голос и общую уверенность.",
    points: [
      "Upload 2-5 videos with clear lighting and stable internet-quality recording.",
      "Face and body presentation is recommended when comfortable.",
      "Keep the environment private and visually clean.",
      "The more polished the files are, the more accurate the offer can be.",
    ],
    ruPoints: [
      "Загрузите 2-5 видео с хорошим светом и стабильным качеством записи.",
      "Рекомендуется показать лицо и фигуру в комфортном формате.",
      "Снимайте в приватном и визуально чистом пространстве.",
      "Чем качественнее материалы, тем точнее может быть предложение.",
    ],
    cta: "Upload your videos",
    ruCta: "Загрузить видео",
  },
  "housing-support": {
    title: "Housing Support",
    ruTitle: "Поддержка жилья",
    intro:
      "For selected relocation offers, housing support is intended to make the transition to Australia more stable and focused.",
    ruIntro:
      "Для избранных предложений по релокации поддержка жилья помогает сделать переезд в Австралию стабильнее и спокойнее.",
    points: [
      "Housing support is connected to a qualified relocation offer.",
      "The aim is to reduce practical stress during the move.",
      "Details are discussed privately with selected models.",
      "A stable living setup supports better professional performance.",
    ],
    ruPoints: [
      "Поддержка жилья связана с подходящим предложением по релокации.",
      "Цель — снизить бытовой стресс во время переезда.",
      "Детали обсуждаются приватно с выбранными моделями.",
      "Стабильные условия проживания помогают профессиональному росту.",
    ],
    cta: "Ask about relocation in your application",
    ruCta: "Указать интерес к релокации в анкете",
  },
  "meals-support": {
    title: "Meals Support",
    ruTitle: "Поддержка питания",
    intro:
      "Meals support can be included for selected relocation offers to keep the transition practical and comfortable.",
    ruIntro:
      "Поддержка питания может входить в избранные предложения по релокации, чтобы переход был практичным и комфортным.",
    points: [
      "Support details depend on the specific relocation offer.",
      "The purpose is to help models focus on onboarding and performance.",
      "Basic living needs are considered as part of the relocation plan.",
      "All details are discussed clearly before any move.",
    ],
    ruPoints: [
      "Детали поддержки зависят от конкретного предложения по релокации.",
      "Цель — помочь модели сфокусироваться на онбординге и результатах.",
      "Базовые бытовые потребности учитываются в плане переезда.",
      "Все детали обсуждаются понятно до переезда.",
    ],
    cta: "Continue to application",
    ruCta: "Перейти к заявке",
  },
  "expenses-support": {
    title: "Main Expenses",
    ruTitle: "Основные расходы",
    intro:
      "Main expense coverage can be part of a selected relocation offer for top models who qualify.",
    ruIntro:
      "Покрытие основных расходов может быть частью избранного предложения по релокации для подходящих топ-моделей.",
    points: [
      "Coverage is offer-specific and discussed privately.",
      "The program is intended for strong long-term profiles.",
      "Clear planning helps the move feel professional and predictable.",
      "Expense support is designed around practical stability.",
    ],
    ruPoints: [
      "Покрытие зависит от конкретного предложения и обсуждается приватно.",
      "Программа рассчитана на сильные долгосрочные профили.",
      "Чёткое планирование делает переезд профессиональным и предсказуемым.",
      "Поддержка расходов создана ради практической стабильности.",
    ],
    cta: "Share your relocation openness",
    ruCta: "Указать готовность к релокации",
  },
  "management-support": {
    title: "Management Support",
    ruTitle: "Менеджмент и сопровождение",
    intro:
      "Management support gives qualified models a clearer professional path, from review to positioning and growth.",
    ruIntro:
      "Менеджмент даёт подходящим моделям более понятный профессиональный путь: от рассмотрения до позиционирования и роста.",
    points: [
      "Managers help with presentation, schedule and portfolio improvements.",
      "Promotion is aligned with privacy and premium positioning.",
      "Support is practical and focused on consistent progress.",
      "The relationship is built on trust, respect and clear next steps.",
    ],
    ruPoints: [
      "Менеджеры помогают с подачей, графиком и улучшением портфолио.",
      "Продвижение согласуется с приватностью и премиальным позиционированием.",
      "Поддержка практичная и ориентирована на стабильный прогресс.",
      "Отношения строятся на доверии, уважении и понятных следующих шагах.",
    ],
    cta: "Request review",
    ruCta: "Запросить рассмотрение",
  },
  "application-process": {
    title: "Application Process",
    ruTitle: "Процесс заявки",
    intro:
      "The application is designed to collect the information needed for a fast, respectful and accurate private review.",
    ruIntro:
      "Заявка создана, чтобы собрать данные для быстрого, уважительного и точного приватного рассмотрения.",
    points: [
      "Step 1 collects contact and location basics.",
      "Step 2 helps the team understand motivation, experience, schedule and comfort boundaries.",
      "Step 3 collects portfolio materials for realistic offer preparation.",
      "A complete, polished application usually receives a clearer response.",
    ],
    ruPoints: [
      "Шаг 1 собирает контакты и базовую географию.",
      "Шаг 2 помогает понять мотивацию, опыт, график и комфортные границы.",
      "Шаг 3 собирает портфолио для более точной подготовки предложения.",
      "Полная и аккуратная заявка обычно получает более понятный ответ.",
    ],
    cta: "Start the application",
    ruCta: "Начать заявку",
  },
};

export function generateStaticParams() {
  return Object.keys(infoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = infoPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Strawberry Glam Models`,
    description: page.intro,
  };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = infoPages[slug];

  if (!page) {
    notFound();
  }

  return (
    <main className="info-shell">
      <header className="info-nav">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">SG</span>
          <span>Strawberry Glam</span>
        </Link>
        <div>
          <Link href="/#apply">Apply</Link>
          <Link href="/#faq">FAQ</Link>
        </div>
      </header>

      <section className="info-hero">
        <p className="eyebrow">Prepared Information</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      <section className="info-layout">
        <article className="info-card">
          <h2>What this means</h2>
          <ul>
            {page.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link className="primary-button" href="/#apply">
            {page.cta}
          </Link>
        </article>

        <article className="info-card ru-card" lang="ru">
          <h2>{page.ruTitle}</h2>
          <p>{page.ruIntro}</p>
          <ul>
            {page.ruPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Link className="secondary-button" href="/#apply">
            {page.ruCta}
          </Link>
        </article>
      </section>
    </main>
  );
}
