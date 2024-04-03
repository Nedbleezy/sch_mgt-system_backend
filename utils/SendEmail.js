import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.GMAIL_APP_ID,
  },
});
const SendEmail = async (senderAddress, schoolName, link) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: process.env.COMPANY_NAME,
        address: process.env.NODEMAILER_EMAIL,
      }, // sender address
      to: senderAddress, // list of receivers
      subject: 'Confirm your registration with our sch_mgt', // Subject line
      html: `
      <h2>Welcome to NedbleezyTech! Confirm Your Email to Get Started</h2> <br/><br/> 
      <img src="https://www.pschoolonline.in/Content/BlogImage/23_Benefits-of-School-Management-ERP-Software---Get-Free-Demo-Now.jpg"/>
      <h2>Hey! ${schoolName}, </h2> <br/> 
      <p>Thank you for signing up for NebleezyPresh School Management system We're thrilled to have you onboard.</p><br/>
      <p>Before you get started on your journey  we need you to confirm your email address.</p> <br/> 
      <b>Click the button below to verify your email:</b> <br/>
       <a href=\`${link}\`>Click to Verify </a>
      `,
    });

    console.log(info);
    return { message: `success` };
  } catch (error) {
    return { message: `email not sent ${error.message}` };
  }
};

export default SendEmail;
//https://engineer.kodekloud.com/verify_email/updated
