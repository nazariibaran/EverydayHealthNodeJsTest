import { getRepository } from 'typeorm';

import { NewsletterTrackingEntity } from '@/entity/newsletterTracking.entity';
import {
  NewsletterActivityInterface,
  NewsletterCountPerDayInterface,
  NewsletterTracking,
  UserCountPerDayInterface,
} from '@/interfaces/newsletterTracking.interface';

class NewsletterTrackingService {
  public newsletterEntity = NewsletterTrackingEntity;

  public async insert(row: NewsletterTracking): Promise<void> {
    const newletterRepository = getRepository(this.newsletterEntity);

    newletterRepository.save(row);
  }

  public async truncate(): Promise<void> {
    const newletterRepository = getRepository(this.newsletterEntity);

    newletterRepository.clear();
  }

  /**
   * Select and group counts of activityDate per userId
   * Order them by DESC
   */
  public async getUserCountPerDayByUserId(userId: number): Promise<UserCountPerDayInterface[]> {
    const newletterRepository = getRepository(this.newsletterEntity);

    const userSummary = newletterRepository
      .createQueryBuilder('userTracking')
      .where({ userId })
      .select('COUNT(activityDate) as countPerDay, activityDate')
      .groupBy('day(activityDate)')
      .orderBy('day(activityDate)', 'DESC')
      .getRawMany();

    return userSummary;
  }

  /**
   * Select and group counts of activityDate per newsletterId
   * Order them by DESC
   */
  public async getNewsletterCountPerDayByNewsletterId(newsletterId: number): Promise<NewsletterCountPerDayInterface[]> {
    const newletterRepository = getRepository(this.newsletterEntity);

    const newsletterSummary = newletterRepository
      .createQueryBuilder('newsletterTracking')
      .where({ newsletterId })
      .select('COUNT(activityDate) as countPerDay, activityDate')
      .groupBy('day(activityDate)')
      .orderBy('day(activityDate)', 'DESC')
      .getRawMany();

    return newsletterSummary;
  }

  /**
   * Select and group counts of actions(open/click) per newsletterId and activityDate
   * Order them by DESC
   */
  public async getNewsletterActivityCountsByNewsletterId(newsletterId: number): Promise<NewsletterActivityInterface[]> {
    const newletterRepository = getRepository(this.newsletterEntity);

    const newsletterSummary = newletterRepository
      .createQueryBuilder('newsletterActivityTracking')
      .where({ newsletterId })
      .select("activityDate, COUNT(CASE WHEN action = 'open' THEN 1 END) as openCount, COUNT(CASE WHEN action = 'click' THEN 1 END) as clickCount")
      .groupBy('day(activityDate)')
      .orderBy('day(activityDate)', 'DESC')
      .getRawMany();

    return newsletterSummary;
  }
}

export default NewsletterTrackingService;
