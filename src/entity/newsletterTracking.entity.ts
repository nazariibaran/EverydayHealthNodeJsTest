import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { NewsletterTracking } from '@/interfaces/newsletterTracking.interface';

@Entity()
export class NewsletterTrackingEntity implements NewsletterTracking {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column()
  @IsNotEmpty()
  userId: number;

  @Column()
  @IsNotEmpty()
  newsletterId: number;

  @Column()
  @IsNotEmpty()
  action: 'open' | 'click';

  @Column()
  @IsNotEmpty()
  activityDate: string;
}
