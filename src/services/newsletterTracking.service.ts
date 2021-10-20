import { getRepository } from 'typeorm';

import { NewsletterTrackingEntity } from '@/entity/newsletterTracking.entity';
import {
  NewsletterActivityInterface,
  NewsletterCountPerDayInterface,
  NewsletterTracking,
  UserCountPerDayInterface,
} from '@/interfaces/newsletterTracking.interface';

class NewsletterTrackingService {
  public newsletterRepository = NewsletterTrackingEntity;

  public async insert(row: NewsletterTracking): Promise<void> {
    const repository = getRepository(this.newsletterRepository);

    repository.save(row);
  }

  public async truncate(): Promise<void> {
    const repository = getRepository(this.newsletterRepository);

    repository.clear();
  }

  /**
   * Select and group counts of activityDate per userId
   * Order them by DESC
   */
  public async getUserCountPerDayByUserId(userId: number): Promise<UserCountPerDayInterface[]> {
    const repository = getRepository(this.newsletterRepository);

    const userSummary = repository
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
    const repository = getRepository(this.newsletterRepository);

    const newsletterSummary = repository
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
    const repository = getRepository(this.newsletterRepository);

    const newsletterSummary = repository
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
