
export interface DishItem {
  id: string;
  name: string;
  contributor: string;
  status: 'Finalised' | 'Under Review' | 'Bribed';
  category: string;
}

export interface CommitteeMember {
  role: string;
  description: string;
  power: string;
  icon: string;
}
