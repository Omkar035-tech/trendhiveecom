// import nodemailer from 'nodemailer';  // Correct import for nodemailer

// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false,
//     auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//     },
// });

// // async..await is not allowed in the global scope, must use a wrapper
// const fireMail = async (req, res) => {
//     const { emailID, HTMLmsg, subject, body } = req.body;
//     try {
//         const info = await transporter.sendMail({
//             from: process.env.SMTP_EMAIL, // sender address
//             to: emailID, // dynamic email receiver
//             subject: subject, // dynamic subject
//             text: body, // dynamic plain text body
//             html: HTMLmsg, // dynamic HTML body
//         });

//         if (info.messageId) {
//             res.json({ success: true, msg: 'Mail sent to your mentioned email ID' });
//         } else {
//             res.json({ success: false, msg: 'Check the email ID and try later' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, msg: 'Failed to send email. Please try again later.' });
//     }
// };

// export default fireMail;




import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
    logger: true,
    debug: true, // Enable debug output
});

// Mail sending function
const fireMail = async (req, res) => {
    const { emailID, HTMLmsg, subject, body } = req.body;

    try {
        // Verify SMTP connection
        await transporter.verify();

        const info = await transporter.sendMail({
            from: process.env.SMTP_BRAVO_MAIL, // sender address
            to: emailID, // dynamic email receiver
            subject: subject, // dynamic subject
            text: body, // dynamic plain text body
            html: HTMLmsg, // dynamic HTML body
        });

        if (info.messageId) {
            res.json({ success: true, msg: 'Mail sent to your mentioned email ID' });
        } else {
            res.json({ success: false, msg: 'Check the email ID and try later' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, msg: 'Failed to send email. Please try again later.' });
    }
};

export default fireMail;
