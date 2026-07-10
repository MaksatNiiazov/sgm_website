import InfoPageClient from "./InfoPageClient";
import { infoPages, topicGroups, type InfoPage } from "./[slug]/page";

const overviewPage: InfoPage = {
  title: "Information Center",
  ruTitle: "Информационный центр",
  intro:
    "This is your space to understand what Strawberry Glam can offer before you share anything personal. Explore how we protect privacy, help promising models grow, build a premium audience and create bigger opportunities, including equipment support, stable work conditions and future Australia relocation for the right profiles.",
  ruIntro:
    "Это твоё пространство, чтобы понять, что Strawberry Glam может дать тебе до того, как ты поделишься личной информацией. Здесь можно узнать, как мы защищаем приватность, помогаем перспективным моделям расти, строим премиальную аудиторию и создаём большие возможности: от поддержки с оборудованием и стабильным рабочим пространством до будущей релокации в Австралию для подходящих профилей.",
  points: [
    "Privacy and safety explain how your personal details and portfolio are protected while the team gets to know your potential.",
    "Agency standards show why a focused premium audience from New Zealand and Australia can be more valuable than chasing mass traffic.",
    "Model support covers the practical details that can change your start: portfolio, light, schedule, communication, equipment and a private workspace.",
    "Relocation explains how a strong collaboration can grow into an Australia offer with housing, meals and practical support for the move.",
    "Application guidance helps you create an honest, memorable first impression without pretending to be someone you are not.",
    "Success stories show the kinds of life changes that can follow when a talented model receives the right structure, support and opportunity.",
  ],
  ruPoints: [
    "Приватность и безопасность объясняют, как защищаются твои личные данные и портфолио, пока команда знакомится с твоим потенциалом.",
    "Стандарты агентства показывают, почему сфокусированная премиальная аудитория Новой Зеландии и Австралии может быть ценнее погони за массовым трафиком.",
    "Поддержка моделей раскрывает практические детали, которые могут изменить твой старт: портфолио, свет, график, общение, оборудование и приватное рабочее пространство.",
    "Релокация объясняет, как сильное сотрудничество может вырасти в предложение по Австралии с жильём, питанием и практической поддержкой переезда.",
    "Гайд по заявке помогает создать честное и запоминающееся первое впечатление, не пытаясь казаться кем-то другим.",
    "Истории успеха показывают, какие жизненные изменения могут прийти, когда талантливая модель получает правильную структуру, поддержку и возможность.",
  ],
  cta: "Show us your potential",
  ruCta: "Показать свой потенциал",
};

function getFeaturedPages() {
  return [
    "privacy",
    "why-strawberry",
    "premium-audience",
    "application-process",
    "portfolio-guide",
    "success-stories",
    "relocation-program",
    "management-support",
  ]
    .map((slug) => ({
      slug,
      page: infoPages[slug],
    }))
    .filter((item): item is { slug: string; page: InfoPage } => Boolean(item.page));
}

export const metadata = {
  title: "Information Center | Strawberry Glam Models",
  description:
    "Detailed privacy, safety, application, portfolio, premium audience and relocation information for Strawberry Glam Models applicants.",
};

export default function InfoIndexPage() {
  return (
    <InfoPageClient
      activeGroup={topicGroups[0]}
      infoPages={infoPages}
      page={overviewPage}
      relatedPages={getFeaturedPages()}
      slug="overview"
      topicGroups={topicGroups}
    />
  );
}
