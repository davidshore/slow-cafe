"use client";

import * as React from "react";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";

const HERO_DELAY_MS = 650;
const PROMOTION_DELAY_MS = 1_300;

export function CafeExperience() {
  const [category, setCategory] = React.useState<MenuCategory>("Alla");
  const [heroVisible, setHeroVisible] = React.useState(false);
  const [promotionVisible, setPromotionVisible] = React.useState(false);
  const [visibleItems, setVisibleItems] = React.useState(MENU_ITEMS);

  React.useEffect(() => {
    const heroTimer = window.setTimeout(
      () => setHeroVisible(true),
      HERO_DELAY_MS,
    );
    const promotionTimer = window.setTimeout(
      () => setPromotionVisible(true),
      PROMOTION_DELAY_MS,
    );

    return () => {
      window.clearTimeout(heroTimer);
      window.clearTimeout(promotionTimer);
    };
  }, []);

  function selectCategory(nextCategory: MenuCategory) {
    setCategory(nextCategory);
    setVisibleItems(prepareMenuResults(nextCategory));
  }

  return (
    <main>
      {promotionVisible ? (
        <aside className="promotion" role="status">
          <strong>Eftermiddagsfika</strong>
          <span>Kaffe och valfri bulle för 69 kr efter kl. 14.</span>
        </aside>
      ) : null}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Långsamt kaffe. Snabb paus.</span>
          <h1 id="hero-title">Slow Café</h1>
          <p>
            Kaffe, fika och lunch lagat med tålamod mitt på Södermalm.
          </p>
          <a className="primary-link" href="#menu">
            Se dagens meny
          </a>
        </div>

        {heroVisible ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Ett varmt café med kaffe och nybakade kanelbullar"
            className="hero-image"
            src="/slow-cafe-hero.png"
          />
        ) : null}
      </section>

      <section className="intro" aria-label="Om Slow Café">
        <p>
          Vi bakar på plats, rostar i små omgångar och serverar en kort meny
          med råvaror efter säsong.
        </p>
        <dl>
          <div>
            <dt>Vardagar</dt>
            <dd>07:30–18:00</dd>
          </div>
          <div>
            <dt>Helg</dt>
            <dd>09:00–17:00</dd>
          </div>
          <div>
            <dt>Adress</dt>
            <dd>Skånegatan 42</dd>
          </div>
        </dl>
      </section>

      <section className="menu-section" id="menu" aria-labelledby="menu-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Dagens utbud</span>
            <h2 id="menu-title">Meny</h2>
          </div>
          <p>{visibleItems.length} saker att välja mellan</p>
        </div>

        <div className="category-filter" aria-label="Filtrera menyn">
          {MENU_CATEGORIES.map((option) => (
            <button
              aria-pressed={option === category}
              key={option}
              onClick={() => selectCategory(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="menu-grid" aria-live="polite">
          {visibleItems.map((item) => (
            <article className="menu-card" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                {item.popular ? <span>Populär</span> : null}
              </div>
              <p>{item.description}</p>
              <strong>{item.price} kr</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function prepareMenuResults(category: MenuCategory): MenuItem[] {
  const startedAt = performance.now();
  let recommendationScore = 0;

  while (performance.now() - startedAt < 420) {
    for (let index = 0; index < 12_000; index += 1) {
      recommendationScore += Math.sqrt(index * 17) % 11;
    }
  }

  if (recommendationScore < 0) {
    return [];
  }

  return category === "Alla"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === category);
}
