import { SMTPClient } from 'emailjs'


export async function sendMailer(email: string, name: string){
    const client = new SMTPClient({
        user: '0e9c2074cdf8fe',
        password: '675f3e2b6c3a79',
        host: 'sandbox.smtp.mailtrap.io',
        ssl: false,
    })
    
    
    try {
        const message = await client.sendAsync({
            text: `Seja bem vindo a nossa aplicação, ${name}`,
            from: 'devluizg@outlook.com.br',
            to: email,
            subject: 'testing emailjs',
        });
        console.log(message);
    } catch (err) {
        console.error(err);
    }
}

