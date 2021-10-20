export interface NewsletterTracking {
  id?: number;
  userId: number;
  newsletterId: number;
  action: 'open' | 'click';
  activityDate: string;
}

export interface UserCountPerDayInterface {
  countPerDay: string;
  activityDate: string;
}

export interface NewsletterCountPerDayInterface {
  countPerDay: string;
  activityDate: string;
}

export interface NewsletterActivityInterface {
  activityDate: string;
  openCount: string;
  clickCount: string;
}
