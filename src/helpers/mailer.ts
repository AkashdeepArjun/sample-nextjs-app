import nodemailer from 'nodemailer';

import User from '@/models/userModel';

import bcryptjs from 'bcryptjs';



const sendEmail = async ({ email, emailType, userId }: any) => {


  try {


    const token = await bcryptjs.hash(userId.toString(), 10)

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: token, verifyTokenExpiry: Date.now() + 60000 })

    } else if (emailType == "RESET") {

      await User.findByIdAndUpdate(userId, { forgotPasswordToken: token, forgotPasswordExpiryToken: Date.now() + 60000 })

    } else {
      console.log("meaw");


    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_DROP_USER,
        pass: process.env.MAIL_DROP_PASSWD
      }
    });


    const mail_options = {

      from: 'wadhwaarjun007@gmail.com',
      to: email,
      subject: emailType == 'VERIFY' ? 'verify your email ' : 'reset password ',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">
      Here</a> to ${emailType == 'VERIFY' ? "verify your email" : "reset your password"}
      or copy paste link below in your browser
      ${process.env.DOMAIN}/verifyemail?token=${token}

</p>`
    }


    const mail_response = await transport.sendMail(mail_options);


    return mail_response;


  } catch (error: any) {


    throw new Error(error.message);


  }


}

export default sendEmail


