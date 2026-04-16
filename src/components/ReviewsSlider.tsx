import { useRef, useEffect, useState, useCallback } from "react";

const REVIEWS = [
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
];

const CARD_WIDTH = 400;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;
const PAUSE_MS = 3500;
const SCROLL_INTERVAL_MS = 4500;

export default function ReviewsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isPaused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = REVIEWS.length;

  const scrollTo = useCallback((index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: index * STEP, behavior: "smooth" });
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const nextIdx = prev >= total - 1 ? 0 : prev + 1;
      scrollTo(nextIdx);
      return nextIdx;
    });
  }, [total, scrollTo]);

  const prev = useCallback(() => {
    setCurrent((prev) => {
      const prevIdx = prev <= 0 ? total - 1 : prev - 1;
      scrollTo(prevIdx);
      return prevIdx;
    });
  }, [total, scrollTo]);

  const pause = () => {
    isPaused.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isPaused.current = false;
    }, PAUSE_MS);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) next();
    }, SCROLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [next]);

  const handleManual = (fn: () => void) => {
    pause();
    fn();
  };

  return (
    <div className="reviews-slider-wrap">
      <button
        className="reviews-nav-btn reviews-nav-btn--prev"
        onClick={() => handleManual(prev)}
        aria-label="Предыдущий отзыв"
      >
        ‹
      </button>
      <div className="reviews-slider" ref={sliderRef}>
        {REVIEWS.map((r) => (
          <div className="review-card" key={r.name}>
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
      <button
        className="reviews-nav-btn reviews-nav-btn--next"
        onClick={() => handleManual(next)}
        aria-label="Следующий отзыв"
      >
        ›
      </button>
      <div className="reviews-dots">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            className={`reviews-dot${i === current ? " reviews-dot--active" : ""}`}
            onClick={() => { pause(); scrollTo(i); }}
            aria-label={`Отзыв ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
