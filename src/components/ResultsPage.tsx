import { useState, useMemo, useRef, useEffect } from 'react';
import type { Gender, GradeInfo, SupplyOption } from '../types';
import { getSupplies } from '../data';

const bannerPool = [
  { emoji: '🎒', headline: 'Shop Amazon Back to School', tagline: 'Great deals on everything kids need', url: 'https://www.amazon.com/s?k=back+to+school', tall: true },
  { emoji: '📚', headline: 'Shop Books for Kids', tagline: 'Bestsellers and new releases', url: 'https://www.amazon.com/s?k=books+for+kids' },
  { emoji: '🎮', headline: 'Shop Video Games', tagline: 'New releases & top deals', url: 'https://www.amazon.com/s?k=video+games', tall: true },
  { emoji: '👟', headline: 'Shop Sneakers & Shoes', tagline: 'Top brands on sale', url: 'https://www.amazon.com/s?k=sneakers' },
  { emoji: '🧸', headline: 'Shop Toys & Games', tagline: 'Fun for all ages', url: 'https://www.amazon.com/s?k=toys', tall: true },
  { emoji: '🏡', headline: 'Shop Home & Kitchen', tagline: 'Essentials and upgrades', url: 'https://www.amazon.com/s?k=home+kitchen' },
  { emoji: '💻', headline: 'Shop Electronics', tagline: 'Laptops, tablets & more', url: 'https://www.amazon.com/s?k=electronics', tall: true },
  { emoji: '👕', headline: 'Shop Clothing', tagline: 'Seasonal styles for everyone', url: 'https://www.amazon.com/s?k=clothing' },
  { emoji: '🏋️', headline: 'Shop Fitness', tagline: 'Gear, equipment & accessories', url: 'https://www.amazon.com/s?k=fitness', tall: true },
  { emoji: '🌿', headline: 'Shop Outdoor & Garden', tagline: 'Patio, plants & more', url: 'https://www.amazon.com/s?k=outdoor+garden' },
  { emoji: '🐾', headline: 'Shop Pet Supplies', tagline: 'Food, toys & essentials', url: 'https://www.amazon.com/s?k=pet+supplies', tall: true },
  { emoji: '💄', headline: 'Shop Beauty', tagline: 'Skincare, makeup & hair', url: 'https://www.amazon.com/s?k=beauty' },
];

interface ResultsPageProps {
  gender: Gender;
  gradeKey: string;
  gradeInfo: GradeInfo;
  onStartOver: () => void;
  onChangeGender: (g: Gender) => void;
  onChangeGrade: (gk: string) => void;
}

const tips = [
  { title: 'Label Everything', text: 'Use a permanent marker or labels on all supplies — especially pencils, glue sticks, and jackets. Lost items pile up fast.' },
  { title: 'Buy Extra, Keep at Home', text: 'Stock a backup stash of glue sticks, pencils, and erasers. Teachers often run through classroom supplies faster than expected.' },
  { title: 'Check the School List First', text: 'Some schools have specific requirements (e.g., brand, color, or size). Always check before buying in bulk.' },
  { title: 'Involve Your Kid', text: 'Let them pick the colors and design for their backpack, lunchbox, and pencil case. Ownership means they\'ll take better care of their stuff.' },
  { title: 'Go for Washable', text: 'Markers, ink, paint — if it says washable, get it. Teachers will thank you.' },
];

const faqs = [
  { q: 'Do I really need all of this?', a: 'Most teachers expect these basics. Quantities vary — some ask for "one box of 24 crayons" while others want "2 packs of 24." Your school\'s specific list always wins.' },
  { q: 'What if my school provides supplies?', a: 'Even when schools stock community supplies, having labeled personal items (backpack, lunchbox, water bottle) is essential. Many teachers still request individual packs.' },
  { q: 'Should I buy a locker shelf for 5th grade?', a: 'Yes — lockers in upper elementary are narrow and deep. A shelf doubles usable space. You can find affordable options on Amazon.' },
  { q: 'When is the best time to buy supplies?', a: 'Mid-August (July for early birds) has the best sales. If you miss it, wait until mid-September — prices drop again after the rush.' },
];

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" ref={ref}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

const gradeLabels: [string, string][] = [
  ['k', 'K'], ['1', '1st'], ['2', '2nd'], ['3', '3rd'], ['4', '4th'], ['5', '5th'],
];

const genders: Gender[] = ['boy', 'girl'];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function SideBanners() {
  const ads = useMemo(() => shuffle(bannerPool).slice(0, 2), []);

  return (
    <div className="side-banners">
      {ads.map((b, i) => (
        <a key={i} className={`side-banner${b.tall ? ' side-banner--tall' : ''}`} href={b.url} target="_blank" rel="noopener">
          <span className="side-banner-emoji">{b.emoji}</span>
          <span className="side-banner-text">
            <span className="side-banner-headline">{b.headline}</span>
            <span className="side-banner-tagline">{b.tagline}</span>
          </span>
          <span className="side-banner-sponsored">Ad</span>
        </a>
      ))}
    </div>
  );
}

export function ResultsPage({ gender, gradeKey, gradeInfo: info, onStartOver, onChangeGender, onChangeGrade }: ResultsPageProps) {
  const supplies = useMemo(() => getSupplies(gradeKey), [gradeKey]);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [whyIdx, setWhyIdx] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => setCollapsed(c => ({ ...c, [idx]: !c[idx] }));

  return (
    <div className="results-layout">
      <SideBanners />

      <div className="results-hero">
        <div className="results-header" style={{ position: 'fixed', top: 0, left: 0, width: '100vw' }}>
          <span className="header-brand" role="button" tabIndex={0} onClick={onStartOver} onKeyDown={e => e.key === 'Enter' && onStartOver()}>School Supplies Helper</span>
          <div className="header-actions">
            <button className="info-btn" onClick={() => setTipsOpen(true)}>💡 Tips for Parents</button>
            <button className="info-btn" onClick={() => setFaqOpen(true)}>❓ FAQ</button>
            <button className="start-over-btn" onClick={onStartOver}>Start Over</button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28, paddingTop: 16 }}>
          <h1>{info.title} Supplies</h1>
          <div className="picker-row" data-gender={gender}>
            <div className="picker">
              <span className="picker-label">Gender</span>
              <div className="picker-seg">
                {genders.map(g => (
                  <button key={g} className={`picker-btn${g === gender ? ' active' : ''}`} onClick={() => onChangeGender(g)}>{g}</button>
                ))}
              </div>
            </div>
            <div className="picker">
              <span className="picker-label">Grade</span>
              <div className="picker-seg">
                {gradeLabels.map(([gk, label]) => (
                  <button key={gk} className={`picker-btn${gk === gradeKey ? ' active' : ''}`} onClick={() => onChangeGrade(gk)}>{label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modal open={tipsOpen} onClose={() => setTipsOpen(false)} title="💡 Tips for Parents">
          {tips.map((tip, i) => (
            <div className="tip-card" key={i}>
              <div className="tip-title">{tip.title}</div>
              <div className="tip-text">{tip.text}</div>
            </div>
          ))}
        </Modal>

        <Modal open={faqOpen} onClose={() => setFaqOpen(false)} title="❓ Frequently Asked Questions">
          {faqs.map((faq, i) => (
            <details className="faq-item" key={i}>
              <summary className="faq-question">{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </Modal>

        <div className="grade-info" data-gender={gender}>
          <p>{info.description}</p>
        </div>

        <div className="supply-grid" data-gender={gender}>
          {supplies.map((item, idx) => {
            let opts: SupplyOption[];
            if (item.gendered) {
              opts = (gender === 'boy' ? item.boy : item.girl) ?? [];
            } else {
              opts = item.options ?? [];
            }

            return (
              <div className={`supply-item${!collapsed[idx] ? ' is-collapsed' : ''}`} key={idx}>
                <span className="supply-item-name" onClick={() => toggle(idx)}>{item.name}
                  {item.why && <span className="why-icon" onMouseEnter={() => setWhyIdx(idx)} onMouseLeave={() => setWhyIdx(null)}>ⓘ</span>}
                  {item.why && whyIdx === idx && (
                    <div className="why-tip" onMouseEnter={() => setWhyIdx(idx)} onMouseLeave={() => setWhyIdx(null)}>
                      <span>{item.why}</span>
                    </div>
                  )}
                  <span className="collapse-arrow">❯</span>
                </span>
                {collapsed[idx] && (
                <div className="supply-options">
                  {opts.map((opt, oi) => (
                    <a className="supply-option" key={oi} href={opt.link} target="_blank" rel="noopener">
                      <div className="option-header">
                        <span className="option-name">{opt.name}</span>
                        {opt.rec && <span className="rec-star">★</span>}
                      </div>
                      <div className="option-desc">{opt.desc}</div>
                    </a>
                  ))}
                </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <SideBanners />
    </div>
  );
}