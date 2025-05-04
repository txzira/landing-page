/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export function SendEmail(
  toEmail: string,
  toName: string,
  subject: string,
  htmlPart: string
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      ...(process.env.DEV_ENV ? { secure: false } : { secure: true }),
      auth: {
        user: process.env.GMAILNODEMAILER_EMAIL,
        pass: process.env.GMAILNODEMAILER_PASSWORD,
      },
      from: process.env.GMAILNODEMAILER_EMAIL,
    });

    const mailOptions: MailOptions = {
      from: `"SkiraTech" <${process.env.GMAILNODEMAILER_EMAIL}>`,
      to: `"${toName}" <${toEmail}>`,
      subject: subject,
      html: htmlPart,
      text: "This email is your notice that we have receive your request to join Logic's mailing list.",
      list: {
        unsubscribe: {
          url: `https://example.com/unsubscribe`,
          comment: "Unsubscribe from Daily Updates",
        },
      },
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
}
