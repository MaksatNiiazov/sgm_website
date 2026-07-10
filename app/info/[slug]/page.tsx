import { notFound } from "next/navigation";
import InfoPageClient from "../InfoPageClient";

export type InfoPage = {
  title: string;
  ruTitle: string;
  intro: string;
  ruIntro: string;
  points: string[];
  ruPoints: string[];
  cta: string;
  ruCta: string;
};

export const infoPages: Record<string, InfoPage> = {
  safety: {
    title: "Safety & Privacy",
    ruTitle: "Безопасность и приватность",
    intro:
      "Your identity, personal boundaries and portfolio deserve careful handling from the very first conversation. Strawberry Glam Models is built around confidential review, clear consent and a small authorized team, so you can explore an opportunity without turning your private life into public content.",
    ruIntro:
      "Твоя личность, границы и материалы портфолио заслуживают бережного отношения с первого сообщения. Strawberry Glam Models строится вокруг конфиденциального рассмотрения, понятного согласия и небольшой авторизованной команды, чтобы ты могла изучить возможность сотрудничества, не превращая личную жизнь в публичный контент.",
    points: [
      "Your application is seen only by the people who need it to assess fit, safety and the next practical step.",
      "Photos and videos are reviewed to understand your presentation, working potential and the support that could be useful to you.",
      "Your contact details and materials are never used for public promotion or client presentation without separate, explicit approval.",
      "You can ask questions before sharing more: a serious process should always feel clear, calm and respectful.",
    ],
    ruPoints: [
      "Твою заявку видят только те люди, которым она нужна для оценки профиля, безопасности и следующего практического шага.",
      "Фото и видео помогают понять твою подачу, рабочий потенциал и формат поддержки, который может быть полезен именно тебе.",
      "Контакты и материалы не используются для публичного продвижения или клиентской презентации без отдельного понятного согласия.",
      "До отправки дополнительных данных ты можешь задать любые вопросы: серьёзный процесс должен быть ясным, спокойным и уважительным.",
    ],
    cta: "Explore your private application",
    ruCta: "Открыть приватную заявку",
  },
  "why-strawberry": {
    title: "Why Strawberry Glam",
    ruTitle: "Почему Strawberry Glam",
    intro:
      "Strawberry Glam is for women who want more than random traffic and inconsistent income. We combine a carefully curated audience, private representation and hands-on guidance to help a strong profile become a lasting, higher-value career path.",
    ruIntro:
      "Strawberry Glam создано для девушек, которым нужно больше, чем случайный трафик и нестабильный доход. Мы соединяем тщательно отобранную аудиторию, приватное представительство и практическое сопровождение, чтобы сильный профиль мог вырасти в долгосрочную и более дорогую карьеру.",
    points: [
      "You work toward a narrow subscription audience in New Zealand and Australia, not uncontrolled mass exposure.",
      "From portfolio and lighting to schedule and communication, we help you present your strongest version with intention.",
      "Private materials stay part of a confidential review process, not a public audition.",
      "Models who build consistency can unlock deeper support, stronger positioning and future relocation consideration.",
    ],
    ruPoints: [
      "Ты работаешь на узкую подписочную аудиторию Новой Зеландии и Австралии, а не на неконтролируемый массовый трафик.",
      "От портфолио и света до графика и общения: мы помогаем показать твою сильную сторону осознанно и дорого.",
      "Личные материалы остаются частью конфиденциального рассмотрения, а не публичного кастинга.",
      "Стабильные модели получают больше возможностей: усиление позиционирования, более глубокую поддержку и перспективу релокации.",
    ],
    cta: "See how we can support you",
    ruCta: "Узнать, как мы помогаем расти",
  },
  relocation: {
    title: "Relocation to Australia",
    ruTitle: "Релокация в Австралию",
    intro:
      "For the right model, Australia can become more than a destination: it can be a focused new chapter with stronger structure, support and room to grow. Relocation is considered after the team sees consistency, trust and genuine long-term potential in the collaboration.",
    ruIntro:
      "Для подходящей модели Австралия может стать не просто новой страной, а следующим этапом с более сильной структурой, поддержкой и пространством для роста. Релокация рассматривается после того, как команда видит стабильность, доверие и настоящий долгосрочный потенциал сотрудничества.",
    points: [
      "Relocation is discussed when your results, readiness and communication show that a larger step makes sense for both sides.",
      "A tailored offer can include housing, meals and practical living support, with every condition explained before you decide.",
      "The move is prepared step by step: documents, accommodation, schedule, adaptation and professional expectations are discussed in advance.",
      "The purpose is simple: give a strong model a stable environment to work safely, earn confidently and focus on growth.",
    ],
    ruPoints: [
      "Релокация обсуждается тогда, когда твои результаты, готовность и коммуникация показывают, что более серьёзный шаг действительно нужен обеим сторонам.",
      "Индивидуальный оффер может включать жильё, питание и практическую поддержку в быту, а все условия объясняются до твоего решения.",
      "Переезд готовится поэтапно: документы, жильё, график, адаптация и профессиональные ожидания обсуждаются заранее.",
      "Цель проста: дать сильной модели стабильную среду, чтобы она могла безопасно работать, уверенно зарабатывать и сосредоточиться на росте.",
    ],
    cta: "Tell us about your relocation goals",
    ruCta: "Рассказать о планах на релокацию",
  },
  privacy: {
    title: "Privacy Policy",
    ruTitle: "Политика конфиденциальности",
    intro:
      "Privacy is part of the value we offer, not small print. Your application, contacts and portfolio are used only to understand whether we can build the right opportunity together and to communicate with you privately about the next step.",
    ruIntro:
      "Приватность — часть ценности, которую мы даём, а не мелкий шрифт. Твоя анкета, контакты и портфолио нужны только для понимания, можем ли мы построить правильную возможность вместе, и для приватного общения о следующем шаге.",
    points: [
      "Your materials are used for profile review, safety checks and preparing a relevant private response.",
      "Your portfolio is not sold, posted or reused in marketing without your separate permission.",
      "Access is limited to the authorized team handling your review and support.",
      "You always have the right to understand how a next step will work before you agree to it.",
    ],
    ruPoints: [
      "Твои материалы используются для оценки профиля, проверки безопасности и подготовки релевантного приватного ответа.",
      "Портфолио не продаётся, не публикуется и не используется в маркетинге без отдельного согласия.",
      "Доступ есть только у авторизованной команды, которая рассматривает заявку и отвечает за поддержку.",
      "Ты всегда можешь понять, как будет устроен следующий шаг, до того как согласишься на него.",
    ],
    cta: "Apply privately",
    ruCta: "Подать заявку приватно",
  },
  nda: {
    title: "NDA & Confidential Review",
    ruTitle: "NDA и конфиденциальное рассмотрение",
    intro:
      "Trust starts when both sides know that private conversations stay private. Our confidentiality approach protects your identity, portfolio, communication and boundaries while the team gets to know your potential and discusses the right format of cooperation.",
    ruIntro:
      "Доверие начинается там, где обе стороны знают: личные разговоры останутся личными. Наш подход к конфиденциальности защищает твою личность, портфолио, переписку и границы, пока команда знакомится с твоим потенциалом и обсуждает подходящий формат сотрудничества.",
    points: [
      "Application details, media, internal recommendations and commercial discussions are treated as confidential.",
      "Conversations stay focused on what matters: your fit, safety, comfort and the opportunity in front of you.",
      "Only the relevant people inside the team handle your information.",
      "Confidentiality gives you a safer space to be honest about your goals and boundaries.",
      "Before a deeper review, onboarding or relocation discussion, every important condition can be clarified directly with you.",
    ],
    ruPoints: [
      "Детали заявки, медиа, внутренние рекомендации и коммерческие обсуждения считаются конфиденциальными.",
      "Общение остаётся предметным: мы говорим о твоём соответствии, безопасности, комфорте и реальной возможности сотрудничества.",
      "С твоей информацией работают только нужные сотрудники команды.",
      "Конфиденциальность даёт тебе безопасное пространство, чтобы честно говорить о целях и границах.",
      "До углублённого рассмотрения, онбординга или обсуждения релокации все важные условия можно прояснить лично с тобой.",
    ],
    cta: "Start safely",
    ruCta: "Начать безопасно",
  },
  "secure-storage": {
    title: "Secure File Storage",
    ruTitle: "Защищённое хранение файлов",
    intro:
      "Your portfolio is not content for the public internet. It is a private introduction to your potential, kept separately from the visible site and reviewed only by the authorized people who can give you a meaningful response.",
    ruIntro:
      "Твоё портфолио — не контент для публичного интернета. Это приватное знакомство с твоим потенциалом: материалы хранятся отдельно от сайта и рассматриваются только авторизованными людьми, которые могут дать тебе содержательный ответ.",
    points: [
      "Uploaded files are stored outside the public site so they are not exposed like ordinary web images.",
      "Your file details stay connected to your private application for an organized review.",
      "Media access is tied to a real review need, not casual browsing.",
      "The team looks at presentation, technical quality and potential for premium positioning.",
      "Send only materials you feel comfortable sharing for a confidential first impression.",
    ],
    ruPoints: [
      "Загруженные файлы хранятся вне публичного сайта, поэтому не становятся обычными открытыми изображениями в интернете.",
      "Данные файлов остаются привязаны к твоей приватной заявке для аккуратного рассмотрения.",
      "Доступ к медиа возможен только при реальной необходимости оценить профиль.",
      "Команда смотрит на подачу, техническое качество и потенциал для премиального позиционирования.",
      "Отправляй только те материалы, которыми тебе комфортно поделиться для конфиденциального первого впечатления.",
    ],
    cta: "Choose your materials",
    ruCta: "Выбрать материалы",
  },
  "age-verification": {
    title: "18+ Age Verification",
    ruTitle: "Подтверждение 18+",
    intro:
      "Strawberry Glam Models is an adults-only agency. Confirming that you are 18+ protects you, the agency and the private environment we create for every model and client.",
    ruIntro:
      "Strawberry Glam Models работает только со взрослыми. Подтверждение 18+ защищает тебя, агентство и приватную среду, которую мы создаём для каждой модели и клиента.",
    points: [
      "You confirm that you are 18+ before sending materials for review.",
      "If a profile cannot meet the age requirement, we cannot continue the process.",
      "Verification keeps every stage lawful, responsible and safe for everyone involved.",
      "Age-related information is handled as sensitive data and requested only when a legitimate next step requires it.",
      "This standard protects the professional reputation and trust that a premium agency depends on.",
    ],
    ruPoints: [
      "Ты подтверждаешь 18+ до отправки материалов на рассмотрение.",
      "Если профиль не соответствует возрастному требованию, мы не можем продолжить процесс.",
      "Проверка делает каждый этап законным, ответственным и безопасным для всех сторон.",
      "Информация о возрасте относится к чувствительным данным и запрашивается только тогда, когда она действительно нужна для следующего шага.",
      "Этот стандарт защищает репутацию и доверие, на которых строится премиальное агентство.",
    ],
    cta: "Confirm 18+ and apply",
    ruCta: "Подтвердить 18+ и подать заявку",
  },
  "premium-audience": {
    title: "Premium NZ & Australia Audience",
    ruTitle: "Премиум-аудитория NZ и Австралии",
    intro:
      "Our audience is intentionally small, subscription-based and focused on New Zealand and Australia. Instead of chasing broad traffic, we build a more controlled space where strong presentation, personality and consistency can be valued at a higher level.",
    ruIntro:
      "Наша аудитория намеренно небольшая, подписочная и сфокусирована на Новой Зеландии и Австралии. Вместо погони за массовым трафиком мы создаём более контролируемую среду, где сильная подача, харизма и стабильность ценятся выше.",
    points: [
      "A focused audience means less unnecessary exposure and more attention on the profiles that truly fit.",
      "Here, presentation, communication and your personal boundaries matter more than raw traffic volume.",
      "We look for women who can create a polished, warm and discreet subscriber experience in their own style.",
      "Client privacy is supported alongside model safety, age checks and clear internal rules.",
    ],
    ruPoints: [
      "Сфокусированная аудитория означает меньше лишней публичности и больше внимания к профилям, которые действительно подходят.",
      "Здесь важнее твоя подача, общение и личные границы, чем сухой объём массового трафика.",
      "Мы ищем девушек, которые могут создавать красивый, тёплый и дискретный подписочный опыт в собственном стиле.",
      "Приватность клиентов поддерживается вместе с безопасностью моделей, проверкой возраста и понятными внутренними правилами.",
    ],
    cta: "See your premium potential",
    ruCta: "Узнать свой премиальный потенциал",
  },
  earnings: {
    title: "Earnings Potential",
    ruTitle: "Потенциал заработка",
    intro:
      "Higher earnings are built, not handed out. The models who grow fastest usually combine a memorable profile, a stable rhythm, strong communication and the willingness to improve with feedback from an experienced team.",
    ruIntro:
      "Высокий доход не выдаётся автоматически — он строится. Быстрее всего растут модели, которые соединяют запоминающийся профиль, стабильный ритм, сильную коммуникацию и готовность усиливаться с обратной связью опытной команды.",
    points: [
      "Up to $12,000+ NZD/month reflects the upper potential of exceptional, consistent profiles; your personal offer is always based on your actual starting point and fit.",
      "A polished portfolio, reliable schedule and clear comfort boundaries help you build trust with the right audience.",
      "Managers focus on practical levers: lighting, presentation, content planning, positioning and consistency.",
      "The more honestly you show your availability and potential, the more relevant and useful the first review can be.",
    ],
    ruPoints: [
      "До $12,000+ NZD в месяц — это верхний потенциал исключительных стабильных профилей; твой личный оффер всегда строится от реальной стартовой точки и соответствия формату.",
      "Сильное портфолио, надёжный график и понятные границы комфорта помогают выстроить доверие с правильной аудиторией.",
      "Менеджеры работают с тем, что реально влияет на результат: светом, подачей, планом контента, позиционированием и регулярностью.",
      "Чем честнее ты показываешь свою доступность и потенциал, тем точнее и полезнее будет первое рассмотрение.",
    ],
    cta: "Get your personal review",
    ruCta: "Получить личное рассмотрение",
  },
  "model-support": {
    title: "Model Support",
    ruTitle: "Поддержка моделей",
    intro:
      "You do not need to arrive with a perfect studio, finished strategy or years of experience. We look at your potential first, then help strong candidates turn it into a better setup, stronger presentation and a working rhythm that can grow with them.",
    ruIntro:
      "Тебе не нужно приходить с идеальной студией, готовой стратегией или многолетним опытом. Сначала мы смотрим на твой потенциал, а затем помогаем сильным кандидаткам превратить его в лучший сетап, более дорогую подачу и рабочий ритм, который можно развивать.",
    points: [
      "A manager reviews your profile and shows you what will make the strongest first impression.",
      "Support can cover home setup, lighting, camera framing, portfolio quality, schedule windows and profile tone.",
      "Your positioning is built around your consent, comfort and privacy boundaries.",
      "If the team sees strong potential but your equipment is holding you back, we can discuss arranging suitable gear through representatives in Bishkek, Almaty, Moscow and Yerevan.",
      "For exceptional candidates who cannot maintain a stable private workspace at home, we may also discuss a comfortable apartment for the period of cooperation. The exact format is agreed personally and in writing.",
      "The point of support is simple: remove the obstacles that keep a promising model from showing her best work.",
    ],
    ruPoints: [
      "Менеджер разбирает твой профиль и показывает, что поможет создать сильное первое впечатление.",
      "Поддержка может включать домашний сетап, свет, кадр, качество портфолио, рабочие окна и тон профиля.",
      "Твоё позиционирование строится вокруг согласия, комфорта и границ приватности.",
      "Если команда видит сильный потенциал, но тебя ограничивает техника, мы можем обсудить подходящее оборудование через представителей в Бишкеке, Алматы, Москве и Ереване.",
      "Для исключительных кандидаток, которые не могут поддерживать стабильное приватное рабочее пространство дома, мы также можем обсудить комфортную квартиру на период сотрудничества. Формат всегда согласовывается лично и письменно.",
      "Смысл поддержки простой: убрать препятствия, которые не дают перспективной модели показать лучшую работу.",
    ],
    cta: "See what we can build together",
    ruCta: "Узнать, что мы можем построить вместе",
  },
  "legal-protection": {
    title: "Legal & Confidential Protection",
    ruTitle: "Юридическая и конфиденциальная защита",
    intro:
      "A high-value opportunity should come with clear boundaries. Our legal and confidentiality standards are here to protect your choices, your materials and your reputation while keeping every stage respectful and transparent.",
    ruIntro:
      "Возможность высокого уровня должна идти вместе с понятными границами. Наши юридические стандарты и правила конфиденциальности защищают твой выбор, материалы и репутацию, сохраняя каждый этап уважительным и прозрачным.",
    points: [
      "You must be 18+ and ready to confirm your age before we move forward.",
      "Your consent comes before any deeper review of portfolio files or application details.",
      "Only the people handling your confidential review and support can access sensitive information.",
      "Clear confidentiality rules protect your identity, strategy and media at every stage.",
    ],
    ruPoints: [
      "Тебе должно быть 18+, и ты должна быть готова подтвердить возраст до следующего этапа.",
      "Твоё согласие необходимо до углублённого просмотра портфолио или деталей анкеты.",
      "К чувствительной информации имеют доступ только люди, которые рассматривают заявку и занимаются поддержкой.",
      "Понятные правила конфиденциальности защищают твою личность, стратегию и медиа на каждом этапе.",
    ],
    cta: "See how you are protected",
    ruCta: "Узнать, как тебя защищают",
  },
  "relocation-program": {
    title: "Relocation Program",
    ruTitle: "Программа релокации",
    intro:
      "The relocation program is designed for models who are ready to turn a strong start into a bigger life move. When the collaboration has proven its potential, we can build an Australia offer around the stability, structure and support needed to make that transition feel real.",
    ruIntro:
      "Программа релокации создана для моделей, которые готовы превратить сильный старт в большой жизненный шаг. Когда сотрудничество уже показывает потенциал, мы можем собрать предложение по Австралии вокруг стабильности, структуры и поддержки, необходимых для реального переезда.",
    points: [
      "Relocation begins with a private conversation about your results, goals, readiness and the future you want to build.",
      "A suitable Australia offer can include housing, meals and help with the main practical expenses.",
      "You receive the details before making a decision, so the schedule, responsibilities and living arrangements are clear.",
      "The program exists to turn a serious move into a stable, well-prepared next level rather than a stressful leap into the unknown.",
    ],
    ruPoints: [
      "Релокация начинается с приватного разговора о твоих результатах, целях, готовности и жизни, которую ты хочешь построить дальше.",
      "Подходящее предложение по Австралии может включать жильё, питание и помощь с основными практическими расходами.",
      "Ты получаешь все детали до решения, чтобы график, ответственность и бытовые условия были понятны заранее.",
      "Программа нужна, чтобы превратить серьёзный переезд в стабильный и подготовленный следующий уровень, а не в стрессовый прыжок в неизвестность.",
    ],
    cta: "Explore your Australia potential",
    ruCta: "Узнать свой потенциал в Австралии",
  },
  "flexible-schedule": {
    title: "Flexible Schedule",
    ruTitle: "Гибкий график",
    intro:
      "Your schedule should support your life, not consume it. We work with models across time zones and help you find realistic, repeatable hours that fit both your availability and the rhythm of a premium audience.",
    ruIntro:
      "Твой график должен поддерживать твою жизнь, а не забирать её. Мы работаем с моделями из разных часовых поясов и помогаем найти реалистичные повторяемые часы, которые подходят и твоей доступности, и ритму премиальной аудитории.",
    points: [
      "Your time zone and weekly availability help us suggest a rhythm that is realistic from the first week.",
      "Flexibility becomes valuable when your audience can count on seeing you at familiar times.",
      "A private space, stable internet and good lighting make your work calmer and more confident.",
      "If you have potential but no clear structure yet, the team can help you build one.",
    ],
    ruPoints: [
      "Часовой пояс и недельная доступность помогают нам предложить реалистичный ритм уже с первой недели.",
      "Гибкость становится ценностью, когда аудитория может рассчитывать встретить тебя в знакомые часы.",
      "Приватное пространство, стабильный интернет и хороший свет делают работу спокойнее и увереннее.",
      "Если у тебя есть потенциал, но пока нет понятной структуры, команда поможет её выстроить.",
    ],
    cta: "Share your ideal schedule",
    ruCta: "Рассказать об идеальном графике",
  },
  "premium-clients": {
    title: "Exclusive Client Side",
    ruTitle: "Эксклюзивная клиентская сторона",
    intro:
      "The Strawberry Glam client side is invitation-led and built for people who value quality, discretion and real connection. For the right model, this means less noise, stronger positioning and a more predictable way to grow a premium presence.",
    ruIntro:
      "Клиентская сторона Strawberry Glam строится вокруг приглашений и создана для людей, которым важны качество, дискретность и настоящее внимание. Для подходящей модели это означает меньше шума, более сильное позиционирование и более предсказуемый путь к премиальному росту.",
    points: [
      "Subscription access creates a clearer, more intentional environment than broad traffic platforms.",
      "Selective positioning helps keep your public visibility under control while making your profile feel more valuable.",
      "The experience is built around quality, discretion, boundaries and respectful communication.",
      "Premium access never replaces your consent or the safety standards that protect you.",
    ],
    ruPoints: [
      "Подписочный доступ создаёт более ясную и осознанную среду, чем платформы с массовым трафиком.",
      "Выборочное позиционирование помогает держать публичную видимость под контролем и делает твой профиль более ценным.",
      "Клиентский опыт строится вокруг качества, дискретности, границ и уважительного общения.",
      "Премиальный доступ никогда не отменяет твоё согласие и стандарты безопасности, которые тебя защищают.",
    ],
    cta: "See the audience you could reach",
    ruCta: "Узнать, какой аудитории ты можешь быть интересна",
  },
  "client-standards": {
    title: "Client Standards",
    ruTitle: "Стандарты аудитории",
    intro:
      "A premium audience only works when respect is built into the experience. We set clear expectations from the beginning so models can feel valued, heard and protected while clients receive the quality and discretion they came for.",
    ruIntro:
      "Премиальная аудитория работает только тогда, когда уважение встроено в сам опыт. Мы задаём понятные ожидания с самого начала, чтобы модели чувствовали ценность, внимание и защиту, а клиенты получали качество и дискретность, за которыми пришли.",
    points: [
      "The audience is curated, so the brand stays focused rather than becoming another mass-market platform.",
      "We respect client privacy while protecting model safety and maintaining age and review standards.",
      "Respect, clear boundaries and consent-led communication are the baseline, never an optional extra.",
      "Anyone who cannot meet those standards does not belong in the Strawberry Glam environment.",
    ],
    ruPoints: [
      "Аудитория курируется, а не строится как массовый рынок: это сохраняет фокус и ценность бренда.",
      "Мы уважаем приватность клиентов, одновременно защищая безопасность моделей и соблюдая возрастные и внутренние стандарты.",
      "Уважение, понятные границы и коммуникация на основе согласия — это основа, а не дополнительное пожелание.",
      "Тот, кто не готов соблюдать эти стандарты, не подходит среде Strawberry Glam.",
    ],
    cta: "Explore your opportunities",
    ruCta: "Посмотреть свои возможности",
  },
  "success-stories": {
    title: "How Strong Outcomes Can Happen",
    ruTitle: "Как формируются сильные результаты",
    intro:
      "A strong model career can change far more than a monthly balance. It can mean helping parents, buying your own home, building savings, choosing where you live and finally feeling independent. These stories show what becomes possible when talent meets consistency and the right support.",
    ruIntro:
      "Сильная карьера модели может изменить гораздо больше, чем сумму в конце месяца. Это возможность помочь родителям, купить своё жильё, собрать накопления, выбирать, где жить, и наконец почувствовать независимость. Эти истории показывают, что становится возможным, когда талант встречается со стабильностью и правильной поддержкой.",
    points: [
      "Some models begin by upgrading their home setup; later they use their income for family support, property, a car or real financial freedom.",
      "For the strongest profiles, Australia can become a real next chapter after trust, results and readiness have been built over time.",
      "Independence grows through the details: better materials, clear boundaries, a reliable schedule, manager feedback and responsible choices with income.",
      "Names and details are protected, but the milestones are real: stronger options, more control and a life that no longer depends on short-term survival.",
      "Every path is individual. Your result will depend on your profile, consistency, communication, setup and readiness to work with a plan.",
    ],
    ruPoints: [
      "Кто-то начинает с улучшения домашнего сетапа, а затем направляет доход на помощь семье, жильё, машину или настоящую финансовую свободу.",
      "Для самых сильных профилей Австралия может стать реальной следующей главой после того, как сформировались доверие, результаты и готовность к переезду.",
      "Независимость строится из деталей: более сильных материалов, понятных границ, надёжного графика, обратной связи менеджера и ответственного отношения к доходу.",
      "Имена и детали защищены, но ключевые изменения реальны: больше возможностей, больше контроля и жизнь, которая больше не зависит от выживания от месяца к месяцу.",
      "Каждый путь индивидуален. Твой результат будет зависеть от профиля, стабильности, коммуникации, сетапа и готовности работать по понятному плану.",
    ],
    cta: "Start your own story",
    ruCta: "Начать свою историю",
  },
  "portfolio-guide": {
    title: "Photo Portfolio Guide",
    ruTitle: "Гайд по фото-портфолио",
    intro:
      "Your first portfolio does not need to be perfect; it needs to feel like you. Clear, confident images help the team see your natural presentation, potential and the direction we could build together.",
    ruIntro:
      "Твоё первое портфолио не должно быть идеальным — оно должно быть настоящим. Чёткие и уверенные фотографии помогают команде увидеть твою естественную подачу, потенциал и направление, которое мы сможем развивать вместе.",
    points: [
      "Send the number of photos you feel comfortable sharing; a varied set gives us a clearer picture, but quality matters more than quantity.",
      "Use natural or stable lighting, a clean background and framing that lets your best features come through.",
      "Include face and full-body angles only where you feel comfortable and only in materials you are ready to share privately.",
      "Avoid heavy filters, dark screenshots and random image sets that hide rather than show your potential.",
      "A thoughtful portfolio helps us give you a more personal response and more useful next steps.",
    ],
    ruPoints: [
      "Отправь столько фото, сколько тебе комфортно; разнообразный набор даёт больше понимания, но качество важнее количества.",
      "Используй естественный или стабильный свет, чистый фон и кадр, в котором видны твои сильные стороны.",
      "Добавляй лицо и полный рост только там, где тебе комфортно, и только в материалах, которыми ты готова поделиться приватно.",
      "Избегай тяжёлых фильтров, тёмных скриншотов и случайных наборов, которые скрывают, а не показывают твой потенциал.",
      "Продуманное портфолио помогает нам дать тебе более личный ответ и полезные следующие шаги.",
    ],
    cta: "Prepare your photos",
    ruCta: "Подготовить фотографии",
  },
  "video-guide": {
    title: "Video Portfolio Guide",
    ruTitle: "Гайд по видео-портфолио",
    intro:
      "Short videos let your personality speak. They show the confidence, energy, voice and camera presence that photos cannot always capture, helping the team understand how you may shine in a premium private format.",
    ruIntro:
      "Короткие видео дают твоей личности заговорить. Они показывают уверенность, энергию, голос и работу в кадре, которые не всегда видны на фото, и помогают команде понять, как ты можешь раскрыться в премиальном приватном формате.",
    points: [
      "One or several short videos are enough for a first impression; choose the format that shows you naturally.",
      "Face, voice and movement can be helpful when you are comfortable, but your materials should always stay within your boundaries.",
      "Record in a private, visually calm space without distractions or other people in frame.",
      "Keep editing light: the team wants to see your real confidence, communication and technical potential.",
      "Clearer videos help us understand you faster and give more relevant feedback.",
    ],
    ruPoints: [
      "Для первого впечатления достаточно одного или нескольких коротких видео; выбирай формат, в котором ты выглядишь естественно.",
      "Лицо, голос и движение могут помочь, если тебе комфортно, но материалы всегда должны оставаться в твоих границах.",
      "Снимай в приватном и визуально спокойном пространстве без лишнего фона и посторонних людей в кадре.",
      "Не усложняй монтаж: команде важно увидеть твою настоящую уверенность, коммуникацию и технический потенциал.",
      "Чем понятнее видео, тем быстрее мы сможем тебя почувствовать и дать релевантную обратную связь.",
    ],
    cta: "Prepare your videos",
    ruCta: "Подготовить видео",
  },
  "housing-support": {
    title: "Housing Support",
    ruTitle: "Поддержка жилья",
    intro:
      "A new country is easier to build in when you are not worrying about where you will live. For selected Australia offers, housing support can give a model a calm, comfortable base while she adapts, works and begins the next stage of her career.",
    ruIntro:
      "Строить жизнь в новой стране легче, когда не нужно переживать о том, где жить. Для отдельных предложений по Австралии поддержка с жильём может дать модели спокойную и комфортную базу, пока она адаптируется, работает и начинает следующий этап карьеры.",
    points: [
      "Housing is considered as part of a tailored relocation offer, built around a model's readiness and the practical needs of the move.",
      "Location, duration, living format and responsibilities are explained privately before any commitment.",
      "A comfortable home works best when it is matched with professional respect, schedule discipline and care for the space.",
      "The aim is to create stability and focus, never to pressure you into a move.",
      "All housing terms are clarified in writing before travel or onboarding begins.",
    ],
    ruPoints: [
      "Жильё рассматривается как часть индивидуального предложения по релокации, собранного вокруг готовности модели и практических задач переезда.",
      "Локация, срок, формат проживания и ответственность объясняются приватно до любых обязательств.",
      "Комфортный дом лучше всего работает вместе с профессиональным уважением, дисциплиной графика и бережным отношением к пространству.",
      "Цель — создать стабильность и фокус, а не подталкивать тебя к переезду.",
      "Все условия по жилью фиксируются письменно до поездки или онбординга.",
    ],
    cta: "Explore an Australia move",
    ruCta: "Узнать о переезде в Австралию",
  },
  "meals-support": {
    title: "Meals Support",
    ruTitle: "Поддержка питания",
    intro:
      "The first months in a new country should be about settling into your rhythm, not carrying every everyday task alone. For selected relocation offers, meals support can make adaptation lighter and more focused.",
    ruIntro:
      "Первые месяцы в новой стране должны быть про адаптацию к своему ритму, а не про необходимость тянуть весь быт в одиночку. Для отдельных предложений по релокации поддержка с питанием может сделать этот период легче и спокойнее.",
    points: [
      "The format is tailored to the city, accommodation, duration and individual relocation plan.",
      "Its purpose is to give you more energy for onboarding, work and adaptation during the first stage.",
      "Meals are discussed together with housing, schedule and the practical rhythm of your arrival.",
      "You receive a clear explanation of what is included and how the support works.",
      "Good planning before the move keeps the whole offer calm, respectful and reliable.",
    ],
    ruPoints: [
      "Формат подбирается под город, жильё, срок и индивидуальный план релокации.",
      "Его цель — дать тебе больше сил на онбординг, работу и адаптацию на первом этапе.",
      "Питание обсуждается вместе с жильём, графиком и практическим ритмом приезда.",
      "Ты получаешь понятное объяснение, что входит в поддержку и как она работает.",
      "Хорошее планирование до переезда делает весь оффер спокойным, уважительным и надёжным.",
    ],
    cta: "Explore relocation support",
    ruCta: "Узнать о поддержке при релокации",
  },
  "expenses-support": {
    title: "Main Expenses",
    ruTitle: "Основные расходы",
    intro:
      "A serious relocation should create momentum, not financial pressure. For selected top models, support with key practical expenses can make the move to Australia feel more secure and let you focus on building the opportunity you earned.",
    ruIntro:
      "Серьёзная релокация должна создавать импульс, а не финансовое давление. Для выбранных топ-моделей поддержка с ключевыми практическими расходами может сделать переезд в Австралию спокойнее и дать возможность сосредоточиться на возможности, которую ты заслужила.",
    points: [
      "Support is built around your actual relocation plan and discussed directly with you before it begins.",
      "It can cover agreed practical needs such as relocation steps, basic setup and living essentials.",
      "The offer clearly defines scope, duration and the support that is most useful at that stage.",
      "This level of support is designed for models with demonstrated long-term potential.",
      "A clear plan gives both sides confidence and lets you arrive focused rather than overwhelmed.",
    ],
    ruPoints: [
      "Поддержка строится вокруг твоего реального плана релокации и обсуждается лично до её начала.",
      "Она может касаться согласованных практических задач: переезда, базового обустройства и бытовых потребностей.",
      "В оффере понятно указываются объём, срок и поддержка, которая наиболее полезна на этом этапе.",
      "Такой уровень поддержки создан для моделей с подтверждённым долгосрочным потенциалом.",
      "Понятный план даёт уверенность обеим сторонам и позволяет приехать с фокусом, а не с перегрузкой.",
    ],
    cta: "Explore support options",
    ruCta: "Узнать о вариантах поддержки",
  },
  "management-support": {
    title: "Management Support",
    ruTitle: "Менеджмент и сопровождение",
    intro:
      "Great management is not about controlling you; it is about helping you see your value, make smarter decisions and keep growing without losing yourself. Our role is to bring structure, perspective and practical support to a profile that is ready to move forward.",
    ruIntro:
      "Сильный менеджмент — не про контроль над тобой, а про помощь увидеть собственную ценность, принимать более умные решения и расти, не теряя себя. Наша задача — дать структуру, взгляд со стороны и практическую поддержку профилю, который готов двигаться дальше.",
    points: [
      "Your manager helps you see what already makes your profile valuable and what can make it stronger: light, framing, language, availability and communication.",
      "Promotion and positioning are built around your consent, privacy needs and comfort boundaries.",
      "Support can include clear feedback, a stronger portfolio plan, schedule structure and practical preparation for your next level.",
      "The working relationship is built on trust, respect, honest feedback and clear next steps.",
      "The best results happen when both sides understand the shared goal and their responsibilities from the beginning.",
    ],
    ruPoints: [
      "Твой менеджер помогает увидеть, что уже делает профиль ценным и что может его усилить: свет, кадр, язык, доступность и коммуникация.",
      "Продвижение и позиционирование строятся вокруг твоего согласия, потребности в приватности и границ комфорта.",
      "Поддержка может включать понятную обратную связь, план более сильного портфолио, структуру графика и практическую подготовку к следующему уровню.",
      "Рабочие отношения строятся на доверии, уважении, честной обратной связи и понятных следующих шагах.",
      "Лучшие результаты появляются, когда обе стороны с начала понимают общую цель и свою ответственность.",
    ],
    cta: "Request a personal review",
    ruCta: "Запросить личное рассмотрение",
  },
  "application-process": {
    title: "Application Process",
    ruTitle: "Процесс заявки",
    intro:
      "Your application is not an exam. It is your first private conversation with the team: a chance to show who you are, what you want and how we might help you reach a more ambitious next step.",
    ruIntro:
      "Твоя заявка — не экзамен. Это первый приватный разговор с командой: возможность показать, кто ты, чего хочешь и как мы можем помочь тебе прийти к более амбициозному следующему шагу.",
    points: [
      "Step 1 gives us the basics for a comfortable private conversation: who you are, where you are and how to reach you.",
      "Step 2 lets you share your goals, experience, availability and personal boundaries in your own words.",
      "Step 3 is where your portfolio brings the profile to life; send only the materials you feel comfortable sharing for a first review.",
      "Honest answers matter more than trying to look perfect: they help us understand where you are now and what could be possible next.",
      "A thoughtful application receives a more personal answer, clearer feedback and a more relevant offer context.",
    ],
    ruPoints: [
      "Шаг 1 даёт нам основу для комфортного приватного общения: кто ты, где находишься и как с тобой связаться.",
      "На шаге 2 ты можешь своими словами рассказать о целях, опыте, доступности и личных границах.",
      "На шаге 3 портфолио оживляет твой профиль; отправляй только те материалы, которыми тебе комфортно поделиться для первого рассмотрения.",
      "Честные ответы важнее попытки выглядеть идеально: они помогают понять, где ты сейчас и что может быть следующим шагом.",
      "Продуманная заявка получает более личный ответ, понятную обратную связь и более релевантный контекст оффера.",
    ],
    cta: "Start your private conversation",
    ruCta: "Начать приватный разговор",
  },
};

export const topicGroups = [
  {
    title: "Privacy & Safety",
    ruTitle: "Приватность и безопасность",
    slugs: ["privacy", "safety", "nda", "secure-storage", "age-verification", "legal-protection"],
  },
  {
    title: "Agency Standards",
    ruTitle: "Стандарты агентства",
    slugs: ["why-strawberry", "premium-audience", "premium-clients", "client-standards", "earnings"],
  },
  {
    title: "Model Support",
    ruTitle: "Поддержка модели",
    slugs: ["model-support", "flexible-schedule", "portfolio-guide", "video-guide", "application-process", "success-stories"],
  },
  {
    title: "Relocation",
    ruTitle: "Релокация",
    slugs: ["relocation", "relocation-program", "housing-support", "meals-support", "expenses-support", "management-support"],
  },
];

function getActiveGroup(slug: string) {
  return topicGroups.find((group) => group.slugs.includes(slug)) ?? topicGroups[0];
}

function getRelatedPages(slug: string) {
  const activeGroup = getActiveGroup(slug);
  const relatedSlugs = [
    ...activeGroup.slugs.filter((relatedSlug) => relatedSlug !== slug),
    ...topicGroups.flatMap((group) => group.slugs).filter((relatedSlug) => relatedSlug !== slug),
  ];

  return Array.from(new Set(relatedSlugs))
    .slice(0, 4)
    .map((relatedSlug) => ({
      slug: relatedSlug,
      page: infoPages[relatedSlug],
    }))
    .filter((item): item is { slug: string; page: InfoPage } => Boolean(item.page));
}

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

  const activeGroup = getActiveGroup(slug);
  const relatedPages = getRelatedPages(slug);

  return (
    <InfoPageClient
      activeGroup={activeGroup}
      infoPages={infoPages}
      page={page}
      relatedPages={relatedPages}
      slug={slug}
      topicGroups={topicGroups}
    />
  );
}
