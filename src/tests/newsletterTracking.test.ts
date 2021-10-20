import { createConnection, getRepository } from 'typeorm';
import request from 'supertest';

import { dbConnection } from '@/databases';
import { NewsletterTrackingEntity } from '@/entity/newsletterTracking.entity';
import { NewsletterActivityInterface, NewsletterCountPerDayInterface, UserCountPerDayInterface } from '@/interfaces/newsletterTracking.interface';
import App from '@/app';
import NewsletterRoute from '@/routes/newsletter.route';
import UsersRoute from '@/routes/user.route';

beforeAll(async () => {
  await createConnection(dbConnection);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Newsletter Traking', () => {
  describe('[GET] /user/summary/:id', () => {
    it('response getUserCountPerDayByUserId', async () => {
      const userRoute = new UsersRoute();
      const newsletterRepository = getRepository(NewsletterTrackingEntity);

      newsletterRepository.find = jest.fn().mockReturnValue([
        {
          countPerDay: '3',
          activityDate: '2021-06-06 10:41:24',
        },
        {
          countPerDay: '4',
          activityDate: '2021-06-05 04:54:21',
        },
        {
          countPerDay: '5',
          activityDate: '2021-06-04 23:32:23',
        },
      ] as UserCountPerDayInterface[]);

      const app = new App([userRoute]);

      return request(app.getServer()).get(`${userRoute.path}`).expect(200);
    });
  });

  describe('[GET] /newsletter/summary/:id', () => {
    it('response getNewsletterSummary', async () => {
      const newsletterRoute = new NewsletterRoute();
      const newsletterRepository = getRepository(NewsletterTrackingEntity);

      newsletterRepository.find = jest.fn().mockReturnValue([
        {
          countPerDay: '7',
          activityDate: '2021-06-06 01:33:00',
        },
        {
          countPerDay: '3',
          activityDate: '2021-06-05 13:26:32',
        },
        {
          countPerDay: '4',
          activityDate: '2021-06-04 22:52:07',
        },
      ] as NewsletterCountPerDayInterface[]);

      const app = new App([newsletterRoute]);

      return request(app.getServer()).get(`${newsletterRoute.path}`).expect(200);
    });
  });

  describe('[GET] /newsletter/summary/action/:id', () => {
    it('response getNewsletterActionSummary', async () => {
      const newsletterRoute = new NewsletterRoute();
      const newsletterRepository = getRepository(NewsletterTrackingEntity);

      newsletterRepository.find = jest.fn().mockReturnValue([
        {
          openCount: '4',
          clickCount: '3',
          activityDate: '2021-06-06 01:33:00',
        },
        {
          openCount: '3',
          clickCount: '0',
          activityDate: '2021-06-05 13:26:32',
        },
        {
          openCount: '2',
          clickCount: '2',
          activityDate: '2021-06-04 22:52:07',
        },
      ] as NewsletterActivityInterface[]);

      const app = new App([newsletterRoute]);

      return request(app.getServer()).get(`${newsletterRoute.path}`).expect(200);
    });
  });
});
