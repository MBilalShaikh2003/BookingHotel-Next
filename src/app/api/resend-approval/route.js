import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, hotelName } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'hotelbooking@yourdomain.com', // ✅ This must be a verified domain on Resend
      to: email,
      subject: 'Hotel Booking Approved!',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for booking <strong>${hotelName}</strong>.</p>
        <p>Your reservation has been approved!</p>
        <p>We look forward to hosting you. 🌟</p>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
