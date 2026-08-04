import type { Gender } from '../types';

interface GenderStepProps {
  onSelect: (gender: Gender) => void;
}

export function GenderStep({ onSelect }: GenderStepProps) {
  return (
    <div className="step">
      <div className="step-icon">🎒</div>
      <h1 className="step-title">Is your child a boy or a girl?</h1>
      <p className="step-subtitle">We'll customize supply recommendations based on their gender.</p>
      <div className="card-grid">
        <button className="choice-card" onClick={() => onSelect('boy')}>
          <span className="card-icon">👦</span>
          Boy
        </button>
        <button className="choice-card" onClick={() => onSelect('girl')}>
          <span className="card-icon">👧</span>
          Girl
        </button>
      </div>
    </div>
  );
}