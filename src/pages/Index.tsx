import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d9c84571-cb98-4999-9a6f-9b954ebdb492/files/ebb5d308-5e35-4bf2-9415-c604088a5dad.jpg";

const services = [
  {
    icon: "Scan",
    title: "Диагностика кожи",
    desc: "Профессиональный анализ состояния кожи перед каждым визитом. Подбираем процедуры индивидуально под ваши задачи.",
    tag: "Основа ухода",
  },
  {
    icon: "Sparkles",
    title: "Чистка и пилинги",
    desc: "Ручная и аппаратная чистка, химические пилинги разной глубины. Восстанавливаем чистоту и сияние кожи.",
    tag: "Популярное",
  },
  {
    icon: "Droplets",
    title: "Увлажнение и питание",
    desc: "Биоревитализация, мезотерапия, маски. Интенсивное восполнение влаги и питательных веществ.",
    tag: "Антивозраст",
  },
  {
    icon: "Zap",
    title: "Аппаратные методики",
    desc: "Лазерные процедуры, RF-лифтинг, микротоки. Современное оборудование для видимого результата.",
    tag: "Технологии",
  },
  {
    icon: "Heart",
    title: "Релакс-уход",
    desc: "Массажные техники и spa-протоколы для лица. Снимаем напряжение, улучшаем контуры и цвет кожи.",
    tag: "Антистресс",
  },
  {
    icon: "Star",
    title: "Авторские протоколы",
    desc: "Комплексные программы, составленные под конкретные запросы. Курсовая работа с измеримым результатом.",
    tag: "Эксклюзив",
  },
];

const prices = [
  {
    title: "Старт",
    subtitle: "Для знакомства",
    price: "от 2 500 ₽",
    featured: false,
    items: ["Консультация мастера", "Диагностика кожи", "Экспресс-уход", "Рекомендации домой"],
  },
  {
    title: "Комплекс",
    subtitle: "Самый популярный",
    price: "от 5 900 ₽",
    featured: true,
    items: ["Диагностика + анализ", "Чистка лица", "Пилинг или маска", "Массаж лица", "Рекомендации и уход домой"],
  },
  {
    title: "Премиум",
    subtitle: "Максимальный результат",
    price: "от 12 000 ₽",
    featured: false,
    items: ["Полная диагностика", "Аппаратная методика", "Авторский протокол", "Курс ухода домой", "Контроль через 2 нед."],
  },
];

const reviews = [
  {
    name: "Анастасия М.",
    date: "Март 2024",
    text: "Впервые за долгое время моя кожа выглядит живой. Диагностика перед процедурой — это то, чего не хватало везде раньше. Мастер объяснила каждый шаг.",
    stars: 5,
  },
  {
    name: "Екатерина Р.",
    date: "Февраль 2024",
    text: "Пришла по рекомендации подруги. Атмосфера уютная и спокойная, никаких навязчивых продаж. Бесплатная консультация по уходу дома — отдельное спасибо!",
    stars: 5,
  },
  {
    name: "Марина В.",
    date: "Январь 2024",
    text: "Первый визит с диагностикой в подарок — очень приятный жест. После курса из 4 процедур кожа стала значительно ровнее. Продолжаю ходить каждый месяц.",
    stars: 5,
  },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "hsl(40 20% 88%)" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(15, 13, 11, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(30 15% 16%)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="font-display text-xl tracking-widest" style={{ color: "var(--gold)" }}>
            LUMIÈRE
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[["hero", "Главная"], ["services", "Услуги"], ["prices", "Цены"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">
                {label}
              </button>
            ))}
          </div>

          <button className="btn-gold hidden md:block" onClick={() => scrollTo("contacts")}>
            Записаться
          </button>

          <button
            className="md:hidden p-2"
            style={{ color: "var(--gold)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-5"
            style={{ backgroundColor: "rgba(15, 13, 11, 0.98)" }}
          >
            {[["hero", "Главная"], ["services", "Услуги"], ["prices", "Цены"], ["reviews", "Отзывы"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-left">
                {label}
              </button>
            ))}
            <button className="btn-gold mt-2" onClick={() => scrollTo("contacts")}>
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Студия красоты"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(15,13,11,0.95) 0%, rgba(15,13,11,0.6) 50%, rgba(15,13,11,0.85) 100%)",
            }}
          />
        </div>

        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-10 w-64 h-64 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <div className="section-label mb-8 animate-fade-up delay-100" style={{ animationFillMode: "forwards" }}>
              Студия красоты
              <span className="ornament">✦</span>
              Персональный уход
            </div>

            <h1
              className="font-display animate-fade-up delay-200 mb-8"
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                lineHeight: "1.05",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                animationFillMode: "forwards",
              }}
            >
              Ваша кожа
              <br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>заслуживает</em>
              <br />
              лучшего
            </h1>

            <p
              className="animate-fade-up delay-300 mb-12 leading-relaxed"
              style={{
                fontSize: "1.05rem",
                color: "hsl(40 15% 68%)",
                maxWidth: "480px",
                animationFillMode: "forwards",
              }}
            >
              Персональная диагностика кожи и подбор процедур перед каждым визитом. Никаких шаблонов — только ваш индивидуальный результат.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400" style={{ animationFillMode: "forwards" }}>
              <button className="btn-gold" onClick={() => scrollTo("contacts")}>
                Записаться на диагностику
              </button>
              <button className="btn-outline" onClick={() => scrollTo("services")}>
                Наши услуги
              </button>
            </div>
          </div>

          <div
            className="absolute bottom-16 right-6 md:right-16 animate-fade-up delay-500"
            style={{
              animationFillMode: "forwards",
              border: "1px solid var(--gold)",
              padding: "1.5rem",
              maxWidth: "220px",
              backgroundColor: "rgba(15,13,11,0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="section-label mb-2" style={{ fontSize: "0.6rem" }}>Спецпредложение</div>
            <p className="font-display text-lg" style={{ color: "var(--gold-light)", lineHeight: 1.3 }}>
              Первый визит — диагностика в подарок
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--gold)", opacity: 0.5 }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Далее</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ backgroundColor: "var(--dark-surface)", borderTop: "1px solid hsl(30 15% 16%)", borderBottom: "1px solid hsl(30 15% 16%)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-0">
          {[
            { icon: "Scan", title: "Диагностика кожи", desc: "Перед каждым визитом — индивидуальный анализ состояния кожи и подбор процедур" },
            { icon: "MessageCircle", title: "Бесплатная консультация", desc: "Мастер расскажет, как ухаживать за кожей дома, и даст конкретные рекомендации" },
            { icon: "Gift", title: "Подарок при первом визите", desc: "Диагностика кожи в подарок при записи на первую процедуру" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-10"
              style={{ borderRight: i < 2 ? "1px solid hsl(30 15% 16%)" : "none" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 rounded-full"
                style={{ border: "1px solid var(--gold)", color: "var(--gold)" }}
              >
                <Icon name={f.icon} size={20} />
              </div>
              <h3 className="font-display text-xl mb-3" style={{ fontWeight: 400 }}>{f.title}</h3>
              <p style={{ color: "hsl(40 10% 58%)", fontSize: "0.9rem", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <div className="section-label mb-5">Что мы делаем</div>
          <h2 className="font-display text-5xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
            Услуги студии
          </h2>
          <div className="divider-gold"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className="service-card p-8">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ color: "var(--gold)", border: "1px solid hsl(38 30% 28%)" }}
                >
                  <Icon name={s.icon} size={18} />
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    opacity: 0.7,
                    border: "1px solid hsl(38 30% 22%)",
                    padding: "0.2rem 0.6rem",
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl mb-3" style={{ fontWeight: 400 }}>{s.title}</h3>
              <p style={{ color: "hsl(40 10% 58%)", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICES */}
      <section
        id="prices"
        style={{ backgroundColor: "var(--dark-surface)", borderTop: "1px solid hsl(30 15% 16%)", borderBottom: "1px solid hsl(30 15% 16%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="text-center mb-20">
            <div className="section-label mb-5">Стоимость</div>
            <h2 className="font-display text-5xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
              Цены
            </h2>
            <div className="divider-gold"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {prices.map((p, i) => (
              <div key={i} className={`price-card p-10 ${p.featured ? "featured" : ""} flex flex-col`}>
                {p.featured && (
                  <div className="section-label mb-4 text-center" style={{ color: "var(--gold)", fontSize: "0.6rem" }}>
                    ✦ Рекомендуем ✦
                  </div>
                )}
                <div className="mb-2 section-label" style={{ color: p.featured ? "var(--gold)" : "hsl(40 10% 50%)" }}>
                  {p.subtitle}
                </div>
                <h3 className="font-display text-3xl mb-2" style={{ fontWeight: 400 }}>{p.title}</h3>
                <div className="font-display text-4xl mb-8" style={{ color: "var(--gold)", fontWeight: 300 }}>
                  {p.price}
                </div>
                <div className="divider-gold mb-8" style={{ marginLeft: 0 }}></div>
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Icon name="Check" size={14} />
                      <span style={{ color: "hsl(40 10% 65%)", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={p.featured ? "btn-gold" : "btn-outline"}
                  onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>

          <p className="text-center mt-10" style={{ color: "hsl(40 10% 45%)", fontSize: "0.8rem" }}>
            Точная стоимость рассчитывается после консультации. Все процедуры проводятся после диагностики кожи.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <div className="section-label mb-5">Мнения клиентов</div>
          <h2 className="font-display text-5xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
            Отзывы
          </h2>
          <div className="divider-gold"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="review-card p-8">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} style={{ color: "var(--gold)", fontSize: "0.75rem" }}>★</span>
                ))}
              </div>
              <p className="mb-8 leading-relaxed" style={{ color: "hsl(40 15% 68%)", fontSize: "0.95rem", fontStyle: "italic" }}>
                «{r.text}»
              </p>
              <div style={{ borderTop: "1px solid hsl(30 15% 18%)", paddingTop: "1.25rem" }}>
                <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{r.name}</div>
                <div style={{ color: "hsl(40 10% 45%)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        style={{ backgroundColor: "var(--dark-surface)", borderTop: "1px solid hsl(30 15% 16%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-28">
          <div className="text-center mb-20">
            <div className="section-label mb-5">Свяжитесь с нами</div>
            <h2 className="font-display text-5xl md:text-6xl mb-6" style={{ fontWeight: 300 }}>
              Записаться
            </h2>
            <div className="divider-gold"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div>
              <p className="mb-8" style={{ color: "hsl(40 10% 58%)", lineHeight: 1.8 }}>
                Оставьте свои данные, и мы свяжемся с вами в течение часа, чтобы подобрать удобное время.
              </p>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 outline-none transition-all duration-300"
                  style={{
                    backgroundColor: "var(--dark-card)",
                    border: "1px solid hsl(30 15% 20%)",
                    color: "hsl(40 20% 88%)",
                    fontSize: "0.9rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(30 15% 20%)")}
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-3 outline-none transition-all duration-300"
                  style={{
                    backgroundColor: "var(--dark-card)",
                    border: "1px solid hsl(30 15% 20%)",
                    color: "hsl(40 20% 88%)",
                    fontSize: "0.9rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(30 15% 20%)")}
                />
                <textarea
                  placeholder="Расскажите о своём запросе (необязательно)"
                  rows={4}
                  className="w-full px-4 py-3 outline-none resize-none transition-all duration-300"
                  style={{
                    backgroundColor: "var(--dark-card)",
                    border: "1px solid hsl(30 15% 20%)",
                    color: "hsl(40 20% 88%)",
                    fontSize: "0.9rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(30 15% 20%)")}
                />
                <button type="submit" className="btn-gold mt-2">
                  Отправить заявку
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <div className="section-label mb-4">Контакты</div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "Phone", text: "+7 (999) 000-00-00" },
                    { icon: "MessageCircle", text: "WhatsApp / Telegram" },
                    { icon: "MapPin", text: "г. Москва, ул. Примерная, 1" },
                    { icon: "Clock", text: "Пн–Вс: 9:00 – 21:00" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div
                        className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                        style={{ color: "var(--gold)", border: "1px solid hsl(38 30% 22%)" }}
                      >
                        <Icon name={c.icon} size={14} />
                      </div>
                      <span style={{ color: "hsl(40 15% 68%)", fontSize: "0.95rem" }}>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: "1px solid var(--gold)",
                  padding: "1.5rem 2rem",
                  backgroundColor: "rgba(200, 169, 110, 0.05)",
                }}
              >
                <div className="section-label mb-3" style={{ fontSize: "0.6rem" }}>Первый визит</div>
                <p className="font-display text-xl mb-2" style={{ color: "var(--gold-light)", fontWeight: 400 }}>
                  Диагностика кожи — в подарок
                </p>
                <p style={{ color: "hsl(40 10% 55%)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  При записи на любую процедуру новый клиент получает персональную диагностику кожи бесплатно.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid hsl(30 15% 14%)",
          backgroundColor: "var(--dark-bg)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="font-display text-2xl tracking-widest" style={{ color: "var(--gold)" }}>LUMIÈRE</div>
          <p style={{ color: "hsl(40 10% 40%)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            Студия красоты
            <span className="ornament">✦</span>
            Персональный уход за кожей
          </p>
          <p style={{ color: "hsl(40 10% 32%)", fontSize: "0.7rem" }}>© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}