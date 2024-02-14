export interface BackgroundMenuItem {
  id: string;
  icon: string;
  description: string;
  background: string;
}

export const backgroundMenuItems: BackgroundMenuItem[] = [
  {
    id: 'library',
    icon: 'library',
    description: 'Bürogebäude',
    background: 'office',
  },
  {
    id: 'home',
    icon: 'home',
    description: 'Haus',
    background: 'house',
  },
  {
    id: 'file',
    icon: 'file',
    description: 'Leer',
    background: 'default',
  },
];
