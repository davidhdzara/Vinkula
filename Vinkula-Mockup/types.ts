export enum Screen {
  Home = 'Home',
  Budget = 'Budget',
  Shared = 'Shared',
  Statistics = 'Statistics',
  Settings = 'Settings',
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: 'expense' | 'income';
}
