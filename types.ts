
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface WorkoutPlan {
  goal: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    note: string;
  }[];
}
