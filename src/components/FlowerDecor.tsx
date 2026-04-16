const Peony = ({ id }: { id: string }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`ctr-${id}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fde68a"/>
        <stop offset="60%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </radialGradient>
      <radialGradient id={`p1-${id}`} cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#ffd6e7"/>
        <stop offset="50%" stopColor="#ffadc7"/>
        <stop offset="100%" stopColor="#f472b6"/>
      </radialGradient>
      <radialGradient id={`p2-${id}`} cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#fecdd3"/>
        <stop offset="50%" stopColor="#fda4af"/>
        <stop offset="100%" stopColor="#fb7185"/>
      </radialGradient>
      <radialGradient id={`p3-${id}`} cx="30%" cy="20%" r="80%">
        <stop offset="0%" stopColor="#ffe4f0"/>
        <stop offset="50%" stopColor="#f9a8d4"/>
        <stop offset="100%" stopColor="#ec4899"/>
      </radialGradient>
    </defs>
    {/* Внешние лепестки */}
    <path d="M100 100 C80 60, 40 50, 30 20 C50 30, 75 45, 100 100Z" fill={`url(#p1-${id})`} opacity="0.9"/>
    <path d="M100 100 C120 60, 160 50, 170 20 C150 30, 125 45, 100 100Z" fill={`url(#p2-${id})`} opacity="0.9"/>
    <path d="M100 100 C60 80, 45 120, 15 130 C30 110, 55 95, 100 100Z" fill={`url(#p3-${id})`} opacity="0.9"/>
    <path d="M100 100 C140 80, 155 120, 185 130 C170 110, 145 95, 100 100Z" fill={`url(#p1-${id})`} opacity="0.9"/>
    <path d="M100 100 C75 130, 70 170, 50 185 C65 165, 85 140, 100 100Z" fill={`url(#p2-${id})`} opacity="0.85"/>
    <path d="M100 100 C125 130, 130 170, 150 185 C135 165, 115 140, 100 100Z" fill={`url(#p3-${id})`} opacity="0.85"/>
    {/* Средние лепестки */}
    <path d="M100 100 C85 70, 55 65, 50 40 C68 55, 88 72, 100 100Z" fill={`url(#p3-${id})`} opacity="0.95"/>
    <path d="M100 100 C115 70, 145 65, 150 40 C132 55, 112 72, 100 100Z" fill={`url(#p1-${id})`} opacity="0.95"/>
    <path d="M100 100 C70 95, 55 115, 40 140 C58 122, 78 105, 100 100Z" fill={`url(#p2-${id})`} opacity="0.9"/>
    <path d="M100 100 C130 95, 145 115, 160 140 C142 122, 122 105, 100 100Z" fill={`url(#p3-${id})`} opacity="0.9"/>
    <path d="M100 100 C90 120, 85 148, 75 162 C83 145, 94 122, 100 100Z" fill={`url(#p1-${id})`} opacity="0.9"/>
    <path d="M100 100 C110 120, 115 148, 125 162 C117 145, 106 122, 100 100Z" fill={`url(#p2-${id})`} opacity="0.9"/>
    {/* Внутренние лепестки */}
    <path d="M100 100 C90 82, 72 78, 68 62 C80 72, 94 84, 100 100Z" fill={`url(#p2-${id})`}/>
    <path d="M100 100 C110 82, 128 78, 132 62 C120 72, 106 84, 100 100Z" fill={`url(#p3-${id})`}/>
    <path d="M100 100 C84 106, 76 120, 66 128 C76 118, 88 106, 100 100Z" fill={`url(#p1-${id})`}/>
    <path d="M100 100 C116 106, 124 120, 134 128 C124 118, 112 106, 100 100Z" fill={`url(#p2-${id})`}/>
    {/* Сердцевина */}
    <circle cx="100" cy="100" r="18" fill={`url(#ctr-${id})`}/>
    <circle cx="100" cy="100" r="10" fill="#fef3c7" opacity="0.8"/>
    <circle cx="96" cy="96" r="3" fill="#fbbf24"/>
    <circle cx="104" cy="97" r="2.5" fill="#f59e0b"/>
    <circle cx="100" cy="104" r="2" fill="#fbbf24"/>
    <circle cx="95" cy="103" r="1.5" fill="#f59e0b"/>
    <circle cx="105" cy="103" r="1.5" fill="#fbbf24"/>
  </svg>
);

const Rose = ({ id }: { id: string }) => (
  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={`rc-${id}`} cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fecdd3"/>
        <stop offset="40%" stopColor="#fda4af"/>
        <stop offset="100%" stopColor="#e11d48"/>
      </radialGradient>
      <radialGradient id={`ri-${id}`} cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#ffe4e6"/>
        <stop offset="50%" stopColor="#fecdd3"/>
        <stop offset="100%" stopColor="#fb7185"/>
      </radialGradient>
      <radialGradient id={`ro-${id}`} cx="30%" cy="25%" r="80%">
        <stop offset="0%" stopColor="#fda4af"/>
        <stop offset="60%" stopColor="#f43f5e"/>
        <stop offset="100%" stopColor="#be123c"/>
      </radialGradient>
    </defs>
    {/* Внешние лепестки */}
    <path d="M90 90 Q60 40 35 25 Q55 50 90 90Z" fill={`url(#ro-${id})`} opacity="0.85"/>
    <path d="M90 90 Q140 40 155 20 Q135 48 90 90Z" fill={`url(#ro-${id})`} opacity="0.85"/>
    <path d="M90 90 Q30 80 10 100 Q35 90 90 90Z" fill={`url(#ro-${id})`} opacity="0.85"/>
    <path d="M90 90 Q160 80 170 105 Q148 92 90 90Z" fill={`url(#ro-${id})`} opacity="0.85"/>
    <path d="M90 90 Q55 145 40 165 Q62 145 90 90Z" fill={`url(#ro-${id})`} opacity="0.8"/>
    <path d="M90 90 Q125 145 140 165 Q118 145 90 90Z" fill={`url(#ro-${id})`} opacity="0.8"/>
    {/* Средние лепестки */}
    <path d="M90 90 Q65 55 50 40 Q68 60 90 90Z" fill={`url(#rc-${id})`} opacity="0.92"/>
    <path d="M90 90 Q118 52 132 38 Q114 60 90 90Z" fill={`url(#rc-${id})`} opacity="0.92"/>
    <path d="M90 90 Q48 95 35 112 Q54 98 90 90Z" fill={`url(#rc-${id})`} opacity="0.92"/>
    <path d="M90 90 Q135 92 148 112 Q130 96 90 90Z" fill={`url(#rc-${id})`} opacity="0.92"/>
    <path d="M90 90 Q72 128 65 148 Q76 128 90 90Z" fill={`url(#rc-${id})`} opacity="0.88"/>
    <path d="M90 90 Q108 128 115 148 Q104 128 90 90Z" fill={`url(#rc-${id})`} opacity="0.88"/>
    {/* Внутренние лепестки */}
    <path d="M90 90 Q75 70 68 58 Q78 72 90 90Z" fill={`url(#ri-${id})`}/>
    <path d="M90 90 Q108 68 116 56 Q104 72 90 90Z" fill={`url(#ri-${id})`}/>
    <path d="M90 90 Q68 98 60 110 Q72 98 90 90Z" fill={`url(#ri-${id})`}/>
    <path d="M90 90 Q112 100 120 112 Q108 98 90 90Z" fill={`url(#ri-${id})`}/>
    <path d="M90 90 Q82 112 80 124 Q86 112 90 90Z" fill={`url(#ri-${id})`}/>
    <path d="M90 90 Q100 112 102 124 Q96 112 90 90Z" fill={`url(#ri-${id})`}/>
    {/* Сердцевина */}
    <path d="M90 90 Q82 80 84 72 Q90 78 96 72 Q98 80 90 90Z" fill="#fecdd3"/>
    <ellipse cx="90" cy="84" rx="8" ry="10" fill="#ffe4e6" opacity="0.7"/>
  </svg>
);

export default function FlowerDecor() {
  return (
    <div className="hero__flowers" aria-hidden="true">
      <div className="hero__flower hero__flower--1"><Peony id="f1" /></div>
      <div className="hero__flower hero__flower--2"><Rose id="f2" /></div>
      <div className="hero__flower hero__flower--3"><Peony id="f3" /></div>
      <div className="hero__flower hero__flower--4"><Rose id="f4" /></div>
    </div>
  );
}

export function FlowerDecorReviews() {
  return <>
    <div className="section-flower section-flower--reviews-l"><Peony id="r1" /></div>
    <div className="section-flower section-flower--reviews-r"><Rose id="r2" /></div>
  </>;
}
