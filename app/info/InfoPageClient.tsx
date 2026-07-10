"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";

type Language = "en" | "ru";

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

type InfoPageData = {
  title: string;
  ruTitle: string;
  intro: string;
  ruIntro: string;
  points: string[];
  ruPoints: string[];
  cta: string;
  ruCta: string;
};

type TopicGroup = {
  title: string;
  ruTitle: string;
  slugs: string[];
};

type RelatedPage = {
  slug: string;
  page: InfoPageData;
};

type InfoPageClientProps = {
  activeGroup: TopicGroup;
  infoPages: Record<string, InfoPageData>;
  page: InfoPageData;
  relatedPages: RelatedPage[];
  slug: string;
  topicGroups: TopicGroup[];
};

const copy = {
  en: {
    apply: "Apply",
    backHome: "Home",
    faq: "FAQ",
    breadcrumb: "Strawberry Glam Models",
    eyebrow: "Candidate Information",
    return: "Return to main site",
    library: "Information Library",
    standard: "Your Next Level, Explained Clearly",
    summaryTitle: "A premium opportunity should feel exciting and safe",
    summary:
      "This page gives you a clear picture before you share anything personal: how we review profiles, protect privacy, support strong candidates and build opportunities that can grow beyond a first application. You should always know what you are considering, why it matters and what a next step could look like.",
    statuses: ["18+ only", "NDA-minded review", "Private media handling"],
    cardEyebrow: "EN",
    cardTitle: "What this can mean for you",
    processEyebrow: "Your path",
    processTitle: "From first look to a real opportunity",
    depthEyebrow: "Before you apply",
    depthTitle: "What makes a strong start",
    depthSections: [
      {
        title: "Share at your pace",
        text: "A strong start does not require you to reveal everything at once. Understand what each detail is used for, keep your personal boundaries clear and send only the materials that feel right for a confidential first review.",
      },
      {
        title: "Show the full picture",
        text: "We look beyond one photo or one answer. Your presentation, communication, schedule, privacy readiness and technical setup come together to show where your profile can grow and what support could make a difference.",
      },
      {
        title: "Receive a personal next step",
        text: "If the team sees a fit, we continue privately with useful feedback, any missing details and a clearer conversation about support, onboarding or future relocation potential.",
      },
    ],
    steps: [
      {
        title: "See what is possible",
        text: "Explore privacy, support and growth opportunities before you send your first materials.",
      },
      {
        title: "Prepare your introduction",
        text: "Choose the photos and videos that show your natural strengths and potential.",
      },
      {
        title: "Private review",
        text: "A small team reviews your fit, potential and the support that could help you grow.",
      },
      {
        title: "Move with clarity",
        text: "Suitable candidates receive personal feedback, a clear next step and context for a possible offer.",
      },
    ],
    relatedEyebrow: "Explore Your Options",
    relatedTitle: "Find the answers that matter to you",
    finalEyebrow: "Your Private Application",
    finalTitle: "Ready to show us your potential?",
    finalText:
      "When you are ready, send your application and the materials you feel comfortable sharing. Your profile will be reviewed privately and with real attention.",
    finalButton: "Start my application",
  },
  ru: {
    apply: "Заявка",
    backHome: "Главная",
    faq: "FAQ",
    breadcrumb: "Strawberry Glam Models",
    eyebrow: "Информация для кандидатов",
    return: "Вернуться на главную",
    library: "Библиотека информации",
    standard: "Твой следующий уровень — понятно и честно",
    summaryTitle: "Премиальная возможность должна вдохновлять и давать ощущение безопасности",
    summary:
      "Эта страница даёт тебе ясную картину до того, как ты поделишься личной информацией: как мы рассматриваем профили, защищаем приватность, поддерживаем сильных кандидаток и строим возможности, которые могут вырасти далеко за пределы первой заявки. Ты всегда должна понимать, какую возможность рассматриваешь, зачем она нужна и как может выглядеть следующий шаг.",
    statuses: ["Только 18+", "NDA-подход", "Приватная обработка медиа"],
    cardEyebrow: "RU",
    cardTitle: "Что это может дать тебе",
    processEyebrow: "Твой путь",
    processTitle: "От первого знакомства к реальной возможности",
    depthEyebrow: "Перед подачей заявки",
    depthTitle: "Что создаёт сильный старт",
    depthSections: [
      {
        title: "Делись в своём темпе",
        text: "Сильный старт не требует раскрывать всё сразу. Пойми, для чего нужна каждая деталь, сохрани личные границы и отправляй только те материалы, которые считаешь комфортными для конфиденциального первого рассмотрения.",
      },
      {
        title: "Покажи полную картину",
        text: "Мы смотрим шире одной фотографии или ответа. Подача, коммуникация, график, готовность к приватности и технический сетап вместе показывают, как может расти твой профиль и какая поддержка действительно даст результат.",
      },
      {
        title: "Получи личный следующий шаг",
        text: "Если команда видит соответствие, мы продолжаем приватно: с полезной обратной связью, уточнением недостающих деталей и более понятным разговором о поддержке, онбординге или перспективе будущей релокации.",
      },
    ],
    steps: [
      {
        title: "Узнать, что возможно",
        text: "Изучи приватность, поддержку и возможности роста до отправки первых материалов.",
      },
      {
        title: "Подготовить знакомство",
        text: "Выбери фото и видео, которые естественно показывают твои сильные стороны и потенциал.",
      },
      {
        title: "Приватное рассмотрение",
        text: "Небольшая команда оценивает твоё соответствие, потенциал и поддержку, которая поможет тебе вырасти.",
      },
      {
        title: "Двигаться с ясностью",
        text: "Подходящие кандидатки получают личную обратную связь, понятный следующий шаг и контекст возможного оффера.",
      },
    ],
    relatedEyebrow: "Изучи свои возможности",
    relatedTitle: "Найди ответы, которые важны именно тебе",
    finalEyebrow: "Твоя приватная заявка",
    finalTitle: "Готова показать свой потенциал?",
    finalText:
      "Когда почувствуешь готовность, отправь заявку и те материалы, которыми тебе комфортно поделиться. Твой профиль рассмотрят приватно и с настоящим вниманием.",
    finalButton: "Начать мою заявку",
  },
};

export default function InfoPageClient({
  activeGroup,
  infoPages,
  page,
  relatedPages,
  slug,
  topicGroups,
}: InfoPageClientProps) {
  const language = usePersistentLanguage();
  const didHydrateLanguage = useRef(false);
  const t = copy[language];
  const isRu = language === "ru";

  const title = isRu ? page.ruTitle : page.title;
  const intro = isRu ? page.ruIntro : page.intro;
  const points = isRu ? page.ruPoints : page.points;
  const cta = isRu ? page.ruCta : page.cta;

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

  return (
    <main className="info-shell" lang={language}>
      <header className="info-nav">
        <Link className="brand-lockup" href={withLanguage("/", language)}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            <strong>Strawberry</strong>
            <small>Glam Models</small>
          </span>
        </Link>
        <div className="info-nav-actions">
          <Link href={withLanguage("/", language)}>{t.backHome}</Link>
          <Link href={withLanguage("/#apply", language)}>{t.apply}</Link>
          <Link href={withLanguage("/#faq", language)}>{t.faq}</Link>
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
        </div>
      </header>

      <section className="info-hero">
        <div className="info-crumbs">
          <Link href={withLanguage("/", language)}>{t.breadcrumb}</Link>
          <span>{isRu ? activeGroup.ruTitle : activeGroup.title}</span>
        </div>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="info-hero-actions">
          <Link className="primary-button" href={withLanguage("/#apply", language)}>
            {cta}
          </Link>
          <Link className="secondary-button" href={withLanguage("/", language)}>
            {t.return}
          </Link>
        </div>
      </section>

      <section className="info-body">
        <aside className="info-sidebar" aria-label={t.library}>
          <p className="info-sidebar-title">{t.library}</p>
          {topicGroups.map((group) => (
            <div className="info-sidebar-group" key={group.title}>
              <span>{isRu ? group.ruTitle : group.title}</span>
              {group.slugs.map((itemSlug) => {
                const item = infoPages[itemSlug];
                if (!item) {
                  return null;
                }

                return (
                  <Link
                    className={itemSlug === slug ? "active" : ""}
                    href={withLanguage(`/info/${itemSlug}`, language)}
                    key={itemSlug}
                  >
                    {isRu ? item.ruTitle : item.title}
                  </Link>
                );
              })}
            </div>
          ))}
        </aside>

        <div className="info-main">
          <section className="info-summary-card">
            <div>
              <p className="eyebrow">{t.standard}</p>
              <h2>{t.summaryTitle}</h2>
              <p>{t.summary}</p>
            </div>
            <div className="info-status-list" aria-label={t.standard}>
              {t.statuses.map((status) => (
                <span key={status}>{status}</span>
              ))}
            </div>
          </section>

          <section className="info-language-grid single-language-grid">
            <article className="info-card">
              <div className="info-card-heading">
                <span>{t.cardEyebrow}</span>
                <h2>{t.cardTitle}</h2>
              </div>
              <p>{intro}</p>
              <ul>
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="primary-button" href={withLanguage("/#apply", language)}>
                {cta}
              </Link>
            </article>
          </section>

          <section className="info-depth">
            <div className="info-process-heading">
              <p className="eyebrow">{t.depthEyebrow}</p>
              <h2>{t.depthTitle}</h2>
            </div>
            <div className="info-depth-grid">
              {t.depthSections.map((section) => (
                <article key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="info-process">
            <div className="info-process-heading">
              <p className="eyebrow">{t.processEyebrow}</p>
              <h2>{t.processTitle}</h2>
            </div>
            <div className="info-step-grid">
              {t.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="info-related">
            <div className="info-process-heading">
              <p className="eyebrow">{t.relatedEyebrow}</p>
              <h2>{t.relatedTitle}</h2>
            </div>
            <div className="info-related-grid">
              {relatedPages.map(({ slug: relatedSlug, page: relatedPage }) => (
                <Link href={withLanguage(`/info/${relatedSlug}`, language)} key={relatedSlug}>
                  <span>{isRu ? relatedPage.ruTitle : relatedPage.title}</span>
                  <p>{isRu ? relatedPage.ruIntro : relatedPage.intro}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="info-final-cta">
            <div>
              <p className="eyebrow">{t.finalEyebrow}</p>
              <h2>{t.finalTitle}</h2>
              <p>{t.finalText}</p>
            </div>
            <Link className="primary-button" href={withLanguage("/#apply", language)}>
              {t.finalButton}
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
