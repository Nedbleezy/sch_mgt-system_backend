import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.Client_ID, process.env.Client_secret);
OAuth2_client.setCredentials({ refresh_token: process.env.refresh_token });

const SendEmail = async (senderAddress, schoolName, link) => {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,

    auth: {
      type: 'OAuth2',
      user: process.env.NODEMAILER_EMAIL,
      clientId: process.env.Client_ID,
      clientSecret: process.env.Client_secret,
      refreshToken: process.env.refresh_token,
      accessToken: accessToken,
    },
  });

  try {
    const info = await transport.sendMail({
      from: {
        name: process.env.COMPANY_NAME,
        address: process.env.NODEMAILER_EMAIL,
      }, // sender address
      to: senderAddress, // list of receivers
      subject: 'Confirm your registration with our sch_mgt', // Subject line
      html: `
      <h2>Welcome to NedbleezyTech School Management System <br/> Confirm Your Email to Get Started</h2> <br/><br/> 
      <img src="https://www.pschoolonline.in/Content/BlogImage/23_Benefits-of-School-Management-ERP-Software---Get-Free-Demo-Now.jpg"/>
      <h3>Hey! ${schoolName}, </h3> <br/> 
      <p>Thank you for signing up for NebleezyPresh School Management system We're thrilled to have you onboard.</p><br/>
      <p>Before you get started on your journey  we need you to confirm your email address.</p> <br/> 
      <b>Click the button below to verify your email:</b> <br/>
       <a href=${link}>Click to Verify </a>
      `,
    });

    return { message: `Email sent successfully` };
  } catch (error) {
    return { message: `email not sent ${error.message}` };
  }
};

export default SendEmail;
//https://engineer.kodekloud.com/verify_email/updated
