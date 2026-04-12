import { useState, useEffect, useRef } from "react";
import func2url from "../../backend/func2url.json";

const CONTACT_URL = func2url.contact;
const LOGO_SRC = "https://picsum.photos/seed/portret-logo/200/200";

type TabKey = "lash" | "brow" | "face" | "makeup";

type ServiceItem = {
  tag: string;
  name: string;
  result: string;
  resultBold: string;
  price: string;
  meta?: string;
};

const SERVICES: Record<TabKey, ServiceItem[]> = {
  lash: [
    { tag: "Быстро", name: "Экспресс-наращивание", result: "Готовый выразительный взгляд за короткое время. ", resultBold: "Идеально перед событием.", price: "2 900 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Классика", name: "Классическое наращивание", result: "Один волосок — одна ресница. ", resultBold: "Натуральный выразительный взгляд до 3–4 недель.", price: "2 700 ₽", meta: "⏱ 1 час 45 минут" },
    { tag: "Уголки", name: "Наращивание Уголки", result: "Эффект распахнутого взгляда с акцентом на внешние уголки. ", resultBold: "Лёгко и женственно.", price: "1 800 ₽", meta: "⏱ 1 час" },
    { tag: "Объём", name: "Тройной объём", result: "3D-техника для насыщенного пышного взгляда. ", resultBold: "Объём и драматичность.", price: "3 500 ₽", meta: "⏱ 2 часа 15 минут" },
    { tag: "Хит продаж", name: "Голливудский объём", result: "Максимально пышный роскошный взгляд. ", resultBold: "Как у звёзд — без туши 24/7.", price: "4 000 ₽", meta: "⏱ 2 часа 40 минут" },
    { tag: "Баланс", name: "Полуторный объём", result: "Золотая середина между классикой и объёмом. ", resultBold: "Естественность + пышность.", price: "2 900 ₽", meta: "⏱ 1 час 50 минут" },
    { tag: "Неполное", name: "Не полное наращивание", result: "Лёгкое наращивание для акцента. ", resultBold: "Идеально для первого знакомства с процедурой.", price: "2 000 ₽", meta: "⏱ 1 час" },
    { tag: "Впервые", name: "Пробное наращивание", result: "Не полное наращивание для новых клиентов. ", resultBold: "Попробуй без лишних трат.", price: "1 800 ₽", meta: "⏱ 1 час" },
    { tag: "Поддержка", name: "Коррекция наращённых ресниц", result: "Восстановление и обновление наращённых ресниц. ", resultBold: "Взгляд как после первого раза.", price: "1 800 ₽", meta: "⏱ 1 час" },
    { tag: "Натуральность", name: "Ламинирование ресниц", result: "Стойкий изгиб и объём родных ресниц. ", resultBold: "Красота без наращивания до 6 недель.", price: "от 2 700 ₽", meta: "⏱ 1 час 30 минут" },
    { tag: "Комплекс", name: "Ламинирование ресниц и бровей", result: "Идеальные ресницы и брови за один визит. ", resultBold: "Экономия времени и денег.", price: "4 700 ₽", meta: "⏱ 2 часа 15 минут" },
    { tag: "Быстро", name: "Окрашивание ресниц", result: "Насыщенный стойкий цвет. ", resultBold: "Выразительность без туши до 3 недель.", price: "800 ₽", meta: "⏱ 25 минут" },
    { tag: "Снятие", name: "Снятие наращённых ресниц", result: "Бережное профессиональное снятие без вреда для родных ресниц.", resultBold: "", price: "500 ₽", meta: "⏱ 20 минут" },
  ],
  brow: [
    { tag: "Трансформация", name: "Укладка + Архитектура бровей", result: "Долговременная укладка с полным оформлением формы. ", resultBold: "Лицо моложе без макияжа до 6 недель.", price: "2 700 ₽", meta: "⏱ 1 час 20 минут" },
    { tag: "Популярно", name: "Укладка с окрашиванием", result: "Стойкая форма и насыщенный цвет. ", resultBold: "Идеальные брови с утра до вечера.", price: "2 400 ₽", meta: "⏱ 1 час" },
    { tag: "Укладка", name: "Долговременная укладка бровей", result: "Фиксация формы и направления волосков. ", resultBold: "Ухоженные брови без усилий до 6 недель.", price: "1 800 ₽", meta: "⏱ 40 минут" },
    { tag: "Для мужчин", name: "Мужская коррекция бровей", result: "Аккуратные ухоженные брови для мужчин. ", resultBold: "Естественно и стильно.", price: "1 000 ₽", meta: "⏱ 30 минут" },
    { tag: "Коррекция", name: "Коррекция бровей (пинцет)", result: "Точное оформление формы пинцетом. ", resultBold: "Чёткая линия и аккуратность.", price: "600 ₽", meta: "⏱ 15 минут" },
    { tag: "Коррекция", name: "Коррекция (воск + пинцет)", result: "Комбинированное оформление для идеальной чистоты контура.", resultBold: "", price: "800 ₽", meta: "⏱ 20 минут" },
    { tag: "Цвет", name: "Окрашивание бровей краской", result: "Насыщенный стойкий цвет. ", resultBold: "Выразительные брови без карандаша.", price: "800 ₽", meta: "⏱ 20 минут" },
    { tag: "Депиляция", name: "Удаление волос на лице (1 зона)", result: "Бережное удаление нежелательных волосков на лице.", resultBold: "", price: "400 ₽", meta: "⏱ 15 минут" },
  ],
  face: [
    { tag: "Лифтинг", name: "Пилинг «Голливудский лифтинг»", result: "Моментальное сияние и выравнивание тона. ", resultBold: "Кожа как после профессиональной фотосессии.", price: "4 500 ₽", meta: "⏱ 45 минут" },
    { tag: "Бережно", name: "Атравматичная чистка GiGi", result: "Глубокое очищение без боли и покраснений. ", resultBold: "Кожа чистая и сияющая — сразу после процедуры.", price: "3 700 ₽", meta: "⏱ 1 час 20 минут" },
    { tag: "Глубоко", name: "Комбинированная чистка GiGi", result: "Максимально глубокое очищение. ", resultBold: "Для проблемной кожи и загрязнённых пор.", price: "4 000 ₽", meta: "⏱ 2 часа" },
    { tag: "Пилинг", name: "Мультипилинг ACNON — GiGi", result: "Борьба с акне и постакне. ", resultBold: "Выравнивание текстуры, сужение пор.", price: "2 400 ₽", meta: "⏱ 30 минут" },
    { tag: "Без игл", name: "Неинвазивная карбокситерапия", result: "Насыщение кожи кислородом изнутри. ", resultBold: "Лифтинг, тонус и сияние без инъекций.", price: "2 000 ₽", meta: "⏱ 40 минут" },
    { tag: "Авторский", name: "Массаж по технике Ахабадзе", result: "Фирменный массаж для молодости и сияния кожи. ", resultBold: "Лифтинг, овал, свежесть — с первой процедуры.", price: "2 700 ₽", meta: "⏱ 1 час" },
    { tag: "Royal", name: "Royal Contour: лифтинг + Гуаша", result: "Вакуумный лифтинг + скульптурирование Гуашей. ", resultBold: "Чёткий овал и снятие напряжения.", price: "3 500 ₽", meta: "⏱ 1 час" },
    { tag: "Сияние", name: "«Внутреннее сияние» ESTER C — GiGi", result: "Витамин С + антиоксиданты для сияющей кожи. ", resultBold: "Ровный тон, свежесть, молодость.", price: "3 500 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Anti-age", name: "«ANTI-AGE» INTENSE — VAGHEGGI", result: "Интенсивное омоложение итальянскими препаратами. ", resultBold: "Упругость, лифтинг, молодость кожи.", price: "3 500 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Сияние", name: "«Сияние и лоск» BRIGHT FORMULA — VAGHEGGI", result: "Выравнивание тона и пигментации. ", resultBold: "Кожа светлеет, сияет, выглядит ухоженной.", price: "3 500 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Увлажнение", name: "«Глубокое увлажнение» REHYDRA — VAGHEGGI", result: "Интенсивное увлажнение для сухой и обезвоженной кожи. ", resultBold: "Эффект «напилась воды изнутри».", price: "3 500 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Для мужчин", name: "«Упругость и питание» ATYPICAL — VAGHEGGI", result: "Специальный уход для мужской кожи. ", resultBold: "Тонус, питание, свежий вид.", price: "3 500 ₽", meta: "⏱ 1 час 15 минут" },
    { tag: "Бонус", name: "Руки принцессы", result: "Уходовая процедура для рук. ", resultBold: "Мягкость и ухоженность за 20 минут.", price: "800 ₽", meta: "⏱ 20 минут" },
  ],
  makeup: [
    { tag: "Дневной", name: "Дневной макияж", result: "Лёгкий, естественный макияж для повседневного образа. ", resultBold: "Свежо, красиво, стильно.", price: "2 500 ₽", meta: "⏱ 1 час" },
    { tag: "Быстро", name: "Express-макияж", result: "Быстрый профессиональный макияж. ", resultBold: "Красиво и аккуратно за 40 минут.", price: "2 000 ₽", meta: "⏱ 40 минут" },
  ],
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "lash", label: "👁 Ресницы" },
  { key: "brow", label: "🌿 Брови" },
  { key: "face", label: "✨ Уход за лицом" },
  { key: "makeup", label: "💄 Макияж" },
];

const EXTRA_EFFECTS = [
  { name: "Эффект стрелочки", meta: "⏱ 20 минут", price: "+ 400 ₽" },
  { name: "Цветные вставки", meta: "⏱ 20 минут", price: "+ 400 ₽" },
  { name: "Эффект мокрых ресниц", meta: "⏱ 10 минут", price: "+ 400 ₽" },
  { name: "Эффект Лучики", meta: "⏱ 20 минут", price: "+ 400 ₽" },
];

const ALL_SERVICES = [
  "Экспресс-наращивание",
  "Классическое наращивание",
  "Голливудский объём",
  "Ламинирование ресниц",
  "Окрашивание ресниц",
  "Укладка + Архитектура бровей",
  "Долговременная укладка бровей",
  "Коррекция бровей",
  "Окрашивание бровей",
  "Пилинг «Голливудский лифтинг»",
  "Чистка лица",
  "Массаж по технике Ахабадзе",
  "Royal Contour",
  "Дневной макияж",
  "Express-макияж",
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--space-4) var(--space-5)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)",
    background: "var(--color-bg)",
    color: "var(--color-text)",
    fontSize: "var(--text-sm)",
    outline: "none",
    transition: "border-color var(--transition-interactive)",
    fontFamily: "var(--font-body)",
  };

  return (
    <div style={{ display: "grid", gap: "var(--space-12)", alignItems: "start" }} className="cta-grid">
      <div className="fade-in">
        <h2 className="cta-title" id="cta-title">Запишись на процедуру<br/><em>прямо сейчас</em></h2>
        <p className="cta-subtitle" style={{ marginTop: "var(--space-4)" }}>Студия Портрет, Владивосток · Пн–вс, 9:00–21:00</p>
        <p className="cta-info" style={{ marginTop: "var(--space-3)" }}>Ответим в течение 15 минут</p>
        <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <a href="https://t.me/portret_vlad" className="btn-tg" target="_blank" rel="noopener noreferrer" style={{ width: "fit-content" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.952z"/></svg>
            Написать в Telegram
          </a>
          <a href="tel:+79146934343" className="btn-call" style={{ width: "fit-content" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Позвонить
          </a>
        </div>
      </div>

      <div className="fade-in" style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "var(--space-8)" }}>
        {status === "ok" ? (
          <div style={{ textAlign: "center", padding: "var(--space-10) 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "var(--space-4)" }}>✨</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 300, color: "var(--color-text)", marginBottom: "var(--space-3)" }}>
              Заявка принята!
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              Мы свяжемся с тобой в течение 15 минут,<br/>чтобы подтвердить запись.
            </p>
            <button
              style={{ marginTop: "var(--space-6)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setStatus("idle")}
            >
              Отправить ещё одну заявку
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-2)", letterSpacing: "0.05em" }}>
                Твоё имя *
              </label>
              <input
                type="text"
                placeholder="Как тебя зовут?"
                value={form.name}
                onChange={set("name")}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-2)", letterSpacing: "0.05em" }}>
                Телефон *
              </label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={set("phone")}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-2)", letterSpacing: "0.05em" }}>
                Интересующая процедура
              </label>
              <select
                value={form.service}
                onChange={set("service")}
                style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a6d63' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right var(--space-4) center", paddingRight: "var(--space-10)", cursor: "pointer" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              >
                <option value="">Выбери услугу (необязательно)</option>
                {ALL_SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--space-2)", letterSpacing: "0.05em" }}>
                Комментарий
              </label>
              <textarea
                placeholder="Любые пожелания или вопросы..."
                value={form.message}
                onChange={set("message")}
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>
            {status === "error" && (
              <p style={{ fontSize: "var(--text-xs)", color: "#c0392b" }}>
                Что-то пошло не так. Напиши нам в Telegram или позвони.
              </p>
            )}
            <button
              type="submit"
              className="btn-primary"
              disabled={status === "loading"}
              style={{ justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading" ? "Отправляем..." : "Записаться на процедуру"}
            </button>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-faint)", textAlign: "center" }}>
              Нажимая кнопку, ты соглашаешься на обработку персональных данных
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Index() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<TabKey>("lash");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
            <img
              src="https://cdn.poehali.dev/projects/d9c84571-cb98-4999-9a6f-9b954ebdb492/bucket/3abf15d7-ff8d-4cae-8612-b9ca7ae82beb.jpg"
              alt="Студия Портрет"
              className="nav__logo-img"
              width="44"
              height="44"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div>
              <div className="nav__logo-text">Портрет</div>
              <div className="nav__tagline">Студия эстетики лица</div>
            </div>
          </a>
          <div className="nav__actions">
            <a href="tel:+79146934343" className="nav__phone">+7 (914) 693-43-43</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button className="btn-nav" onClick={() => scrollTo("cta")}>Записаться</button>
          </div>
        </div>
      </nav>

      <main id="hero">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden="true"></div>
          <div className="hero__content">
            <div>
              <p className="hero__eyebrow">Студия эстетики лица · Владивосток</p>
              <h1 className="hero__title" id="hero-title">
                Люди замечают что-то другое в тебе.<br/>
                Они просто не знают — <em>что именно.</em>
              </h1>
              <p className="hero__subtitle">Без макияжа. Без лишних усилий. Наращивание ресниц, оформление бровей и уходовые процедуры, после которых хочется смотреться в зеркало.</p>
              <div className="hero__cta-group">
                <button className="btn-primary" onClick={() => scrollTo("cta")}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  Записаться онлайн
                </button>
                <button className="btn-secondary" onClick={() => scrollTo("services")}>Смотреть услуги</button>
              </div>
              <p className="hero__note">Ответим в течение 15 минут · Работаем по записи пн–вс 9:00–21:00</p>
            </div>
            <div>
              <div className="hero__image-wrap">
                <img src="https://cdn.poehali.dev/files/6baa2a69-2bc3-472c-bf46-e60e410f3bd4.jpeg" alt="Студия Портрет — красота и уход" width="600" height="750" loading="eager"/>
                <div className="hero__badge">
                  <span className="hero__badge-icon">⭐</span>
                  <div className="hero__badge-text">
                    <strong>4.9 / 5.0</strong>
                    Яндекс.Карты · 2ГИС
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="stats-bar fade-in">
          <div className="container">
            <div className="stats-bar__grid">
              {[
                { num: "500+", label: "Довольных клиенток" },
                { num: "5+", label: "Лет в профессии" },
                { num: "12", label: "Видов процедур" },
                { num: "100%", label: "Безопасные материалы" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat__number">{s.num}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAIN BLOCK */}
        <section className="pain-block section" aria-labelledby="pain-title">
          <div className="container">
            <div className="section-header fade-in">
              <p className="section-eyebrow">Тебе знакомо?</p>
              <h2 className="section-title" id="pain-title">Когда красота<br/>отнимает время,<br/>а не <em>дарит уверенность</em></h2>
            </div>
            <div className="pain-grid">
              {[
                { icon: "⏰", title: "40 минут на макияж каждое утро", desc: "Стрелки, тушь, брови — и всё равно к вечеру это сползает" },
                { icon: "😔", title: "Лицо выглядит уставшим", desc: "Выспалась, а тональник всё равно не скрывает то, что хочется скрыть" },
                { icon: "🪞", title: "Брови и ресницы «никакие»", desc: "Без карандаша и туши чувствуешь себя бледной тенью себя же" },
                { icon: "💸", title: "Деньги на косметику уходят, а результата нет", desc: "Новые тушь, сыворотки, кремы — а кожа всё равно не такая, какой хочется" },
              ].map((p) => (
                <div className="pain-card fade-in" key={p.title}>
                  <div className="pain-card__icon">{p.icon}</div>
                  <h3 className="pain-card__title">{p.title}</h3>
                  <p className="pain-card__desc">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="pain-solution fade-in">
              <p className="pain-solution__text">Студия Портрет решает всё это <strong>за один визит</strong> — и ты уходишь красивой на 3–6 недель вперёд.</p>
              <button className="btn-primary" onClick={() => scrollTo("cta")}>Записаться на консультацию</button>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-block section" aria-labelledby="about-title">
          <div className="container">
            <div className="about-grid">
              <div className="fade-in">
                <div className="about-image-wrap">
                  <img src="https://cdn.poehali.dev/projects/d9c84571-cb98-4999-9a6f-9b954ebdb492/bucket/e1b0db49-8629-4480-b33b-b94d0b1fd67e.jpg" alt="Светлана — мастер студии Портрет" width="500" height="600" loading="lazy"/>
                </div>
              </div>
              <div className="fade-in">
                <p className="section-eyebrow">О студии</p>
                <h2 className="section-title" id="about-title">Студия Портрет —<br/>это <em>другой уровень</em></h2>
                <p className="section-subtitle">Мы не делаем «как все». Перед каждой процедурой — диагностика формы лица, состояния кожи и образа жизни. Потому что ресницы, которые идут модели из Москвы, могут совсем не подойти тебе.</p>
                <div className="about-advantages">
                  {[
                    { title: "Сертифицированный косметолог-эстетист", desc: "Образование и практика — не курсы выходного дня" },
                    { title: "Индивидуальный подбор техник и форм", desc: "Под твой тип лица, кожи и образ жизни" },
                    { title: "Только проверенные профессиональные материалы", desc: "Никакого оптового Китая — только то, что работает" },
                    { title: "Ты здесь главная, а не следующий номер очереди", desc: "Атмосфера заботы, а не конвейера" },
                  ].map((a) => (
                    <div className="advantage" key={a.title}>
                      <div className="advantage__dot"></div>
                      <div className="advantage__text">
                        <strong>{a.title}</strong>
                        {a.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-block section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-header fade-in">
              <p className="section-eyebrow">Услуги</p>
              <h2 className="section-title" id="services-title">Что мы делаем<br/>с твоим взглядом и <em>кожей</em></h2>
            </div>
            <div className="services-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  className={`tab-btn${activeTab === t.key ? " active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === t.key}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="services-grid">
              {SERVICES[activeTab].map((s) => (
                <div className="service-card fade-in" key={s.name}>
                  <div className="service-card__tag">{s.tag}</div>
                  <div className="service-card__name">{s.name}</div>
                  <div className="service-card__result">
                    {s.result}<strong>{s.resultBold}</strong>
                  </div>
                  {s.meta && <div className="service-card__meta">{s.meta}</div>}
                  <div className="service-card__price">{s.price}</div>
                </div>
              ))}
            </div>

            {activeTab === "lash" && (
              <div style={{ marginTop: "var(--space-10)" }}>
                <p className="section-eyebrow" style={{ marginBottom: "var(--space-6)" }}>
                  Дополнительные эффекты{" "}
                  <span style={{ fontStyle: "normal", opacity: 0.6 }}>(+к стоимости услуги)</span>
                </p>
                <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                  {EXTRA_EFFECTS.map((e) => (
                    <div className="service-card fade-in" key={e.name}>
                      <div className="service-card__name">{e.name}</div>
                      <div className="service-card__meta">{e.meta}</div>
                      <div className="service-card__price">{e.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery-block section--sm" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-header fade-in">
              <p className="section-eyebrow">Результаты</p>
              <h2 className="section-title" id="gallery-title">Говорят <em>результаты,</em><br/>не слова</h2>
              <p className="section-subtitle">Реальные работы, реальные клиентки. Никакой обработки — только честный результат.</p>
            </div>
          </div>
          <div className="container--wide">
            <div className="gallery-grid">
              <div className="gallery-item gallery-item--large reveal-up">
                <img src="https://cdn.poehali.dev/projects/d9c84571-cb98-4999-9a6f-9b954ebdb492/files/cc412563-a180-47e3-b58e-c062e466e2bb.jpg" alt="Наращивание ресниц — до и после" width="400" height="600" loading="lazy"/>
                <div className="gallery-item__label">Ресницы · Объём 3D</div>
              </div>
              {[
                { src: "https://cdn.poehali.dev/projects/d9c84571-cb98-4999-9a6f-9b954ebdb492/bucket/c475e586-cb96-460e-9c89-73fdc7c6df66.jpeg", alt: "Уход за лицом — результат", label: "Уход за лицом" },
                { src: "https://cdn.poehali.dev/files/1768b397-af72-4d43-837a-b38d8e6a2715.jpeg", alt: "Ламинирование ресниц", label: "Ламинирование" },
                { src: "https://cdn.poehali.dev/files/5616271a-9bd5-427a-a040-55733ba13fc4.jpeg", alt: "Долговременная укладка бровей", label: "Долговременная укладка бровей" },
                { src: "https://cdn.poehali.dev/files/4ea36f48-f71b-4b6b-92a1-b5d076d3e992.jpeg", alt: "Пилинг Голливудский лифтинг", label: 'Пилинг "Голливудский лифтинг"' },
                { src: "https://cdn.poehali.dev/files/460d4f60-e64f-4eb6-a3ce-62fda75f441a.JPG", alt: "Классическое наращивание ресниц", label: "Ресницы · Классика" },
              ].map((g) => (
                <div className="gallery-item fade-in" key={g.src}>
                  <img src={g.src} alt={g.alt} width="400" height="530" loading="lazy"/>
                  <div className="gallery-item__label">{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-block section" aria-labelledby="reviews-title">
          <div className="container">
            <div className="section-header fade-in">
              <p className="section-eyebrow">Отзывы</p>
              <h2 className="section-title" id="reviews-title">Что говорят<br/><em>клиентки</em> студии Портрет</h2>
            </div>
            <div className="reviews-grid">
              {[
                { init: "А", name: "Анастасия, 29 лет", proc: "Архитектура бровей", text: "Первый раз в жизни ушла от мастера довольной на 100%. Светлана подобрала форму бровей, которую я искала 3 года. Теперь хожу только сюда!" },
                { init: "М", name: "Марина, 36 лет", proc: "Скульптурный массаж", text: "Сделала буккальный массаж — думала, буду выглядеть как после драки. А вышла как после недельного отдыха. Теперь хожу каждые 3 недели." },
                { init: "О", name: "Ольга, 31 год", proc: "Наращивание ресниц", text: "Наращивала ресницы в разных местах — нигде не держались дольше 2 недель. У Светланы стоят 4 недели без потерь. Наконец-то нашла своего мастера!" },
                { init: "Н", name: "Наталья, 27 лет", proc: "Долговременная укладка бровей", text: "Ламинирование бровей — лучшее, что я сделала! Утром просто умылась и уже красивая. Экономлю 20 минут каждое утро. Спасибо Светлане!" },
                { init: "И", name: "Ирина, 41 год", proc: "Комплексный уход", text: "Обращаюсь уже больше года. Каждый раз чувствую себя как на отдыхе — атмосфера, чай, внимание к деталям. Результат всегда превышает ожидания." },
                { init: "Д", name: "Дарья, 25 лет", proc: "Ламинирование ресниц", text: "Делала ламинирование первый раз в жизни и очень боялась. Светлана всё объяснила, показала как будет выглядеть результат. Теперь я без туши вообще — и чувствую себя красивее, чем когда красилась. Муж сразу заметил и спросил, что изменилось 😄" },
                { init: "Т", name: "Татьяна, 43 года", proc: "Чистка лица", text: "Давно откладывала чистку — думала, будет больно и потом всё лицо в красных пятнах. Оказалось всё совсем не так. Светлана делала всё очень аккуратно, кожа после процедуры была чистой и гладкой, без раздражений. Муж вечером спросил, сделала ли я новый макияж — а я была вообще без тональника!" },
                { init: "А", name: "Алина, 22 года", proc: "Архитектура + окрашивание бровей", text: "Раньше вообще не придавала значения бровям — рисовала карандашом кое-как. Подруга уговорила сходить. Светлана нарисовала форму прямо на лице маркером, объяснила почему именно такая будет лучше. Я не верила — а потом увидела результат и чуть не заплакала от радости. Совсем другое лицо!" },
                { init: "В", name: "Виктория, 38 лет", proc: "Скульптурный массаж лица", text: "Пришла после долгого стресса — лицо было как будто чужое, серое и обвисшее. После первой процедуры почувствовала разницу, после курса из 5 сеансов — дочь спросила, не отдыхала ли я на море. Это лучший комплимент! Теперь хожу на поддерживающий массаж раз в месяц." },
                { init: "К", name: "Кристина, 31 год", proc: "Наращивание ресниц, постоянный клиент", text: "Хожу к Светлане уже больше двух лет. За это время ни разу не ушла разочарованной. Она помнит, что мне нравится, что не подходит, предупреждает заранее если нужно скорректировать уход. Это не просто мастер — это человек, которому доверяешь своё лицо. Всем подругам только к ней!" },
              ].map((r) => (
                <div className="review-card fade-in" key={r.name}>
                  <div className="review-card__stars">★★★★★</div>
                  <p className="review-card__text">{r.text}</p>
                  <div className="review-card__author">
                    <div className="review-card__avatar">{r.init}</div>
                    <div>
                      <div className="review-card__name">{r.name}</div>
                      <div className="review-card__procedure">{r.proc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reviews-platforms fade-in">
              <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Читать все отзывы:</span>
              <a href="https://yandex.ru/maps/org/portret/142663856086/?ll=131.890946%2C43.119241&z=16" target="_blank" rel="noopener noreferrer" className="platform-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                Яндекс.Карты
              </a>
              <a href="https://2gis.ru/vladivostok/firm/70000001094594555?m=131.891029%2C43.1193%2F16" target="_blank" rel="noopener noreferrer" className="platform-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                2ГИС
              </a>
            </div>
          </div>
        </section>

        {/* OFFER */}
        <section className="offer-block section" aria-labelledby="offer-title">
          <div className="container">
            <div className="offer-inner">
              <div className="fade-in">
                <p className="offer-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  Специально для первого визита
                </p>
                <h2 className="offer-title" id="offer-title">Запишись сегодня<br/>и получи <em>подарок</em></h2>
                <ul className="offer-list">
                  <li>Бесплатная экспресс-диагностика кожи лица к любой процедуре</li>
                  <li>Индивидуальная консультация по уходу домой</li>
                  <li>Подбор оптимальной программы процедур под твои задачи</li>
                </ul>
              </div>
              <div className="fade-in">
                <div className="offer-card">
                  <span className="offer-card__gift">🎁</span>
                  <div className="offer-card__title">Диагностика кожи лица</div>
                  <p className="offer-card__desc">Мастер оценит состояние кожи, тип, проблемные зоны и подберёт процедуры, которые дадут максимальный результат именно тебе.</p>
                  <div className="offer-card__value">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                    Стоимость 500 ₽ — в подарок при записи
                  </div>
                  <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => scrollTo("cta")}>
                    Записаться и получить подарок
                  </button>
                  <p className="offer-card__limit">⏳ Ограниченное количество мест в месяц</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA + FORM */}
        <section className="cta-section section--sm" id="cta" aria-labelledby="cta-title">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container--wide">
          <div className="footer__inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                <img
                  src="https://cdn.poehali.dev/files/d53a0118-9ca1-4209-a37f-9d8874515560.jpg"
                  alt="Студия Портрет"
                  className="footer__logo-img"
                  width="48"
                  height="48"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div className="footer__brand-name">Портрет</div>
              </div>
              <p className="footer__brand-desc">Студия эстетики лица и взгляда во Владивостоке. Наращивание ресниц, брови, уходовые процедуры и макияж.</p>
            </div>
            <div>
              <div className="footer__heading">Услуги</div>
              <ul className="footer__links" role="list">
                {["Наращивание ресниц", "Ламинирование", "Архитектура бровей", "Уход за лицом", "Макияж"].map((l) => (
                  <li key={l}><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer__heading">Контакты</div>
              <ul className="footer__links" role="list">
                <li><a href="tel:+79146934343">+7 (914) 693-43-43</a></li>
                <li><a href="https://t.me/portret_vlad" target="_blank" rel="noopener noreferrer">Telegram</a></li>

                <li><a href="https://yandex.ru/maps/org/portret/142663856086/?ll=131.890946%2C43.119241&z=16" target="_blank" rel="noopener noreferrer">Яндекс.Карты</a></li>
              </ul>
            </div>
            <div>
              <div className="footer__heading">Адрес</div>
              <ul className="footer__links" role="list">
                <li style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                  г. Владивосток<br/>
                  ул. Уборевича, д. 19, каб. 201<br/>
                  По записи: пн–вс<br/>
                  9:00 — 21:00
                </li>
                <li style={{ marginTop: "var(--space-3)" }}>
                  <a href="https://2gis.ru/vladivostok/firm/70000001094594555?m=131.891029%2C43.1193%2F16" target="_blank" rel="noopener noreferrer">Открыть в 2ГИС</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Студия Портрет. Все права защищены.</span>
            <span>Наращивание ресниц · Брови · Уход за лицом · Макияж · Владивосток</span>
          </div>
        </div>
      </footer>

      {/* STICKY CTA MOBILE */}
      <div className="sticky-cta" role="complementary">
        <div className="sticky-cta__text">
          <strong>Записаться сейчас</strong>
          Ответим за 15 минут
        </div>
        <button className="btn-primary" style={{ padding: "var(--space-3) var(--space-5)", fontSize: "var(--text-xs)" }} onClick={() => scrollTo("cta")}>
          Записаться
        </button>
      </div>
    </>
  );
}