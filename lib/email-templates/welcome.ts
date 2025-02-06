export const welcomeEmailTemplate = (username: string) => `
<table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #5a2c7f; text-align: center; border-radius: 8px; padding: 20px;" cellspacing="0" cellpadding="0">
  <tr>
    <td style="padding-bottom: 15px;" align="center">
      <img style="width: 120px; height: auto;" src="https://www.jotform.com/uploads/innovatehubph/form_files/Platapaynew.679b4853897250.77259637.png" alt="PlataPay Logo" />
    </td>
  </tr>
  <tr>
    <td style="font-size: 22px; font-weight: bold; color: #ffffff; background-color: #482164; padding: 12px; border-radius: 8px;">
      Welcome to PlataPay!
    </td>
  </tr>
  <tr>
    <td style="background-color: #dbcbe5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 16px; color: #482164;">
      <p style="margin: 0; font-weight: bold;">Hello ${username},</p>
      <p style="margin: 10px 0;">Your PlataPay account has been created successfully. To complete your registration, please verify your email address and mobile number.</p>
      <p style="margin: 0; font-style: italic; font-size: 14px; color: #612984;">If you have any questions, please contact our support team at <strong>support@platapay.com</strong>.</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #482164; color: white; text-align: center; padding: 10px; font-size: 14px; border-radius: 0 0 8px 8px;">
      Thank you for choosing <strong>PlataPay</strong>!
    </td>
  </tr>
</table>
`
