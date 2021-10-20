import csvtojson from 'csvtojson';

import { NewsletterTracking } from '@/interfaces/newsletterTracking.interface';
import NewsletterTrackingService from '@/services/newsletterTracking.service';

class CSVController {
  public csvService = new NewsletterTrackingService();

  constructor() {
    this.uploadCSV({}, {});
  }

  /**
   * Proccess, format and upload CSV file to Database
   */
  public uploadCSV = async (req, res): Promise<void> => {
    try {
      const source = await csvtojson().fromFile('src/data/user_nl_tracking_data.csv');

      /**
       * Truncate the table to avoid inconsistencies
       */
      await this.csvService.truncate();

      /**
       * Prepare and insert rows into the dataabase
       */
      for (let i = 0; i < source.length; i++) {
        const { user_id, newsletter_id, action, activity_date } = source[i];

        const row: NewsletterTracking = {
          userId: user_id,
          newsletterId: newsletter_id,
          action,
          activityDate: activity_date,
        };

        await this.csvService.insert(row);
      }
      res.status(200).json({ message: 'Inserted' });
    } catch (error) {
      console.log(error);
    }
  };
}

export default CSVController;
