import { useState, useMemo, useRef, useEffect } from 'react';
import type { Gender, GradeInfo, SupplyOption } from '../types';
import { getSupplies } from '../data';

interface ResultsPageProps {
  gender: Gender;
  gradeKey: string;
  gradeInfo: GradeInfo;
  onStartOver: () => void;
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

export function ResultsPage({ gender, gradeKey, gradeInfo: info, onStartOver }: ResultsPageProps) {
  const supplies = useMemo(() => getSupplies(gradeKey), [gradeKey]);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const [whyIdx, setWhyIdx] = useState<number | null>(null);

  return (
    <div className="results-hero" style={{ animation: 'fadeIn .35s ease' }}>
      <div className="results-header">
        <button className="info-btn" onClick={() => setTipsOpen(true)}>💡 Tips for Parents</button>
        <button className="info-btn" onClick={() => setFaqOpen(true)}>❓ FAQ</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 28, paddingTop: 16 }}>
        <h1>{info.title} Supplies</h1>
        <p className="summary">
          For your <strong>{gender}</strong> · {info.subtitle}
        </p>
        <button className="start-over-btn" onClick={onStartOver} style={{ marginTop: 12 }}>Start Over</button>
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

      <div className="supply-grid" data-gender={gender}>
        {supplies.map((item, idx) => {
          let opts: SupplyOption[];
          if (item.gendered) {
            opts = (gender === 'boy' ? item.boy : item.girl) ?? [];
          } else {
            opts = item.options ?? [];
          }

          return (
            <div className="supply-item" key={idx}>
              <span className="supply-item-name">{item.name}
                {item.why && <span className="why-icon" onClick={e => { e.stopPropagation(); setWhyIdx(whyIdx === idx ? null : idx); }}>ⓘ</span>}
                {item.why && whyIdx === idx && (
                  <div className="why-tip" onClick={e => e.stopPropagation()}>
                    <span>{item.why}</span>
                  </div>
                )}
              </span>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}