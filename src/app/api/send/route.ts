import EmailTemplate from '@/components/emails/confirm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    if(!process.env.RESEND_AUDIENCE_ID) {
      return Response.json({ error: 'RESEND_AUDIENCE_ID is not set' }, { status: 500 });
    }

    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: firstName,
      unsubscribed: true,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    if(data) {
      await resend.emails.send({
        from: 'State Wizard <thankyou@statewizard.com>',
        to: [email],
        subject: 'State Wizard - confirme seu e-mail',
        react: EmailTemplate({ userId: data.id }),
      })
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
