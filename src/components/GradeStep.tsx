import { grades, gradeInfo } from '../data';
import type { Gender } from '../types';

interface GradeStepProps {
  gender: Gender;
  onSelect: (gradeKey: string) => void;
  onBack: () => void;
}

const gradeLabels: Record<string, string> = {
  k: 'K',
  '1': '1st',
  '2': '2nd',
  '3': '3rd',
  '4': '4th',
  '5': '5th',
};

export function GradeStep({ gender, onSelect, onBack }: GradeStepProps) {
  return (
    <div className="step">
      <div className="step-icon">📚</div>
      <h1 className="step-title">What grade are they entering?</h1>
      <p className="step-subtitle">Recommendations vary by grade level — we'll pick the right options.</p>
      <div className="card-grid">
        {grades.map(gk => {
          const info = gradeInfo[gk];
          return (
            <button key={gk} className="choice-card choice-grade" data-gender={gender} onClick={() => onSelect(gk)}>
              <span className="card-icon">{gradeLabels[gk]}</span>
              <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 400, color: 'var(--gray-400)', marginTop: 2 }}>
                {info.subtitle.split('·')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>
      <button className="step-back" onClick={onBack}>← Back</button>
    </div>
  );
}