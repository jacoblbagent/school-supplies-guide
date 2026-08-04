import { useState, useCallback, useEffect } from 'react';
import type { Gender, Step } from './types';
import { gradeInfo } from './data';
import { GenderStep } from './components/GenderStep';
import { GradeStep } from './components/GradeStep';
import { ResultsPage } from './components/ResultsPage';
import './App.css';

function getParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    gender: (p.get('gender') as Gender) || 'boy',
    grade: p.get('grade'),
  };
}

function setParams(gender: Gender, grade: string | null) {
  const p = new URLSearchParams();
  p.set('gender', gender);
  if (grade) p.set('grade', grade);
  const qs = p.toString();
  window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
}

function deriveStep(grade: string | null): Step {
  return grade ? 'results' : 'gender';
}

function App() {
  const init = getParams();
  const [step, setStep] = useState<Step>(() => deriveStep(init.grade));
  const [gender, setGender] = useState<Gender>(init.gender);
  const [gradeKey, setGradeKey] = useState(init.grade);

  // Sync state back to URL on every change
  useEffect(() => {
    setParams(gender, step === 'results' ? gradeKey : null);
  }, [gender, gradeKey, step]);

  const selectGender = useCallback((g: Gender) => {
    setGender(g);
    setStep('grade');
    window.scrollTo(0, 0);
  }, []);

  const selectGrade = useCallback((gk: string) => {
    setGradeKey(gk);
    setStep('results');
    window.scrollTo(0, 0);
  }, []);

  const backToGender = useCallback(() => {
    setStep('gender');
    window.scrollTo(0, 0);
  }, []);

  const startOver = useCallback(() => {
    setStep('gender');
    setGradeKey('k');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      {step === 'gender' && <GenderStep onSelect={selectGender} />}
      {step === 'grade' && <GradeStep onSelect={selectGrade} onBack={backToGender} />}
      {step === 'results' && gradeKey && (
        <ResultsPage
          gender={gender}
          gradeKey={gradeKey}
          gradeInfo={gradeInfo[gradeKey]}
          onStartOver={startOver}
        />
      )}
    </div>
  );
}

export default App;