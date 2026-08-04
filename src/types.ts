export interface SupplyOption {
  name: string;
  desc: string;
  link: string;
  rec: boolean;
}

export interface SupplyItem {
  icon: string;
  name: string;
  image: string;
  gendered: boolean;
  minGrade?: number;
  why?: string;
  boy?: SupplyOption[];
  girl?: SupplyOption[];
  options?: SupplyOption[];
}

export interface GradeInfo {
  key: string;
  title: string;
  subtitle: string;
  iconClass: string;
}

export type Gender = 'boy' | 'girl';
export type Step = 'gender' | 'grade' | 'results';
