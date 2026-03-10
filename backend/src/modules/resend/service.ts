import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/framework/types"
import { Resend } from "resend"

type ResendOptions = {
  api_key: string
  from: string
}

export default class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "resend"
  protected resendClient: Resend
  protected options: ResendOptions
  protected logger: Logger

  constructor({ logger }: { logger: Logger }, options: ResendOptions) {
    super()
    this.logger = logger
    this.options = options
    this.resendClient = new Resend(options.api_key)
  }

  async send(notification: any): Promise<any> {
    try {
      const { data, error } = await this.resendClient.emails.send({
        from: this.options.from,
        to: notification.to,
        subject: notification.data?.subject || "Update from Interflow Marketplace",
        html: notification.data?.html || `<p>New Notification Received</p>`
      })

      if (error) {
        this.logger.error(`Resend email error: ${error.message}`)
        return {}
      }

      this.logger.info(`Email sent successfully to ${notification.to}`)
      return { id: data?.id }
    } catch (e: any) {
      this.logger.error(`Failed to send email via Resend: ${e.message}`)
      return {}
    }
  }
}
