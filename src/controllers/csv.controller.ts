import csvtojson from 'csvtojson';

import { NewsletterTracking } from '@/interfaces/newsletterTracking.interface';
import NewsletterTrackingService from '@/services/newsletterTracking.service';

class CSVController {
  public csvService = new NewsletterTrackingService();

  /**
   * Proccess, format and upload CSV file to Database
   */
  public uploadCSV = async (csvPath: string): Promise<void> => {
    try {
      const source = await csvtojson().fromFile(csvPath);

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
    } catch (error) {
      console.log(error);
    }
  };
}

export default CSVController;
