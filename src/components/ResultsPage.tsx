import { useState, useMemo, useRef, useEffect } from 'react';
import type { Gender, GradeInfo } from '../types';
import { getSupplies } from '../data';

const banners: Record<string, { emoji: string; headline: string; tagline: string; url: string }> = {
  Backpack:     { emoji: '🎒', headline: 'Shop Kids Backpacks', tagline: 'Find the perfect backpack for every grade', url: 'https://www.amazon.com/s?k=kids+school+backpack' },
  Lunchbox:    { emoji: '🍱', headline: 'Shop Lunch Boxes', tagline: 'Insulated, bento, and classic options', url: 'https://www.amazon.com/s?k=kids+lunchbox' },
  Pencils:     { emoji: '✏️', headline: 'Shop Pencils & Writing Tools', tagline: 'From fat primary to mechanical', url: 'https://www.amazon.com/s?k=school+pencils+bulk' },
  Crayons:     { emoji: '🖍️', headline: 'Shop Crayons', tagline: 'Crayola packs for every age', url: 'https://www.amazon.com/s?k=crayola+crayons' },
  Markers:     { emoji: '🖊️', headline: 'Shop Markers', tagline: 'Washable broad and fine line', url: 'https://www.amazon.com/s?k=washable+markers' },
  'Colored Pencils': { emoji: '🎨', headline: 'Shop Colored Pencils', tagline: 'Pre-sharpened, vibrant, classroom-ready', url: 'https://www.amazon.com/s?k=colored+pencils+crayola' },
  'Glue & Paste':  { emoji: '🧴', headline: 'Shop Glue & Paste', tagline: 'Glue sticks, liquid glue, and more', url: 'https://www.amazon.com/s?k=school+glue+sticks' },
  Scissors:    { emoji: '✂️', headline: 'Shop Scissors', tagline: 'Safety, blunt, and pointed tip options', url: 'https://www.amazon.com/s?k=kids+school+scissors' },
  Notebooks:   { emoji: '📓', headline: 'Shop Notebooks', tagline: 'Composition, spiral, and subject notebooks', url: 'https://www.amazon.com/s?k=school+notebooks+bulk' },
  Folders:     { emoji: '📁', headline: 'Shop Folders & Binders', tagline: 'Pocket folders, 3-ring, and dividers', url: 'https://www.amazon.com/s?k=school+folders+pocket' },
  'Dry-Erase Markers': { emoji: '⬜', headline: 'Shop Dry-Erase Markers', tagline: 'Low-odor, fine tip, classroom packs', url: 'https://www.amazon.com/s?k=dry+erase+markers+bulk' },
  'Water Bottle': { emoji: '💧', headline: 'Shop Water Bottles', tagline: 'Leak-proof, insulated, dishwasher-safe', url: 'https://www.amazon.com/s?k=kids+water+bottle+school' },
  Headphones:  { emoji: '🎧', headline: 'Shop Headphones', tagline: 'On-ear, volume-limited, school-friendly', url: 'https://www.amazon.com/s?k=kids+school+headphones' },
  'Pencil Case': { emoji: '🧰', headline: 'Shop Pencil Cases', tagline: 'Pencil pouches, boxes, and organizers', url: 'https://www.amazon.com/s?k=pencil+case+school' },
  Highlighters: { emoji: '🔆', headline: 'Shop Highlighters', tagline: 'Bright, smear-safe, assorted colors', url: 'https://www.amazon.com/s?k=highlighters+assorted' },
  Erasers:     { emoji: '🧹', headline: 'Shop Erasers', tagline: 'Pink, vinyl, pencil-top, and block erasers', url: 'https://www.amazon.com/s?k=school+erasers+bulk' },
  'Ruler':      { emoji: '📏', headline: 'Shop Rulers', tagline: 'Standard and metric rulers for every desk', url: 'https://www.amazon.com/s?k=school+ruler' },
  'Paper & Journals': { emoji: '📄', headline: 'Shop Paper & Journals', tagline: 'Loose leaf, graph paper, and journals', url: 'https://www.amazon.com/s?k=notebook+paper+wide+ruled' },
  'Index Cards': { emoji: '🗂️', headline: 'Shop Index Cards', tagline: 'Blank, lined, and ruled — study-ready', url: 'https://www.amazon.com/s?k=index+cards+3x5' },
  'Post-it Notes': { emoji: '📝', headline: 'Shop Post-it Notes', tagline: 'Sticky notes, flags, and tabs', url: 'https://www.amazon.com/s?k=post+it+notes+bulk' },
  'Hand Sanitizer': { emoji: '🧼', headline: 'Shop Hand Sanitizer', tagline: 'Pocket-size and classroom-safe', url: 'https://www.amazon.com/s?k=hand+sanitizer+school' },
  'Tissues':   { emoji: '🧻', headline: 'Shop Tissues', tagline: 'Lotion-infused, hypoallergenic packs', url: 'https://www.amazon.com/s?k=facial+tissues+bulk' },
  'Paper Towels': { emoji: '🧴', headline: 'Shop Paper Towels', tagline: 'Classroom pack for cleanup', url: 'https://www.amazon.com/s?k=paper+towels+bulk' },
  'Ziploc Bags': { emoji: '🛍️', headline: 'Shop Ziploc Bags', tagline: 'Sandwich, quart, and gallon sizes', url: 'https://www.amazon.com/s?k=ziploc+bags+assorted' },
  'Wipes':    { emoji: '🧻', headline: 'Shop Cleaning Wipes', tagline: 'Disinfecting wipes for desks and surfaces', url: 'https://www.amazon.com/s?k=disinfecting+wipes+school' },
};

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

export function ResultsPage({ gender, gradeKey, gradeInfo: info, onStartOver, onChangeGender, onChangeGrade }: ResultsPageProps) {
  const supplies = useMemo(() => getSupplies(gradeKey), [gradeKey]);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [whyIdx, setWhyIdx] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => setCollapsed(c => ({ ...c, [idx]: !c[idx] }));

  return (
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
        <p className="summary">
          {info.subtitle}
        </p>
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
          const ad = banners[item.name];

          return (
            <div className={`supply-item${!collapsed[idx] ? ' is-collapsed' : ''}`} key={idx}>
              <span className="supply-item-name" onClick={() => toggle(idx)}>{item.name}
                {item.why && <span className="why-icon" onMouseEnter={() => setWhyIdx(idx)} onMouseLeave={() => setWhyIdx(null)}>ⓘ</span>}
                {item.why && whyIdx === idx && (
                  <div className="why-tip" onMouseEnter={() => setWhyIdx(idx)} onMouseLeave={() => setWhyIdx(null)}>
                    <span>{item.why}</span>
                  </div>
                )}
                <span className="collapse-arrow">{collapsed[idx] ? '▼' : '▶'}</span>
              </span>
              {collapsed[idx] && ad && (
                <a className="banner-ad" href={ad.url} target="_blank" rel="noopener">
                  <span className="banner-emoji">{ad.emoji}</span>
                  <span className="banner-text">
                    <span className="banner-headline">{ad.headline}</span>
                    <span className="banner-tagline">{ad.tagline}</span>
                  </span>
                  <span className="banner-cta">Shop Now</span>
                  <span className="banner-sponsored">Sponsored</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}