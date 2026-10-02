import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body: any;
  query: { [key: string]: string | string[] };
  cookies: { [key: string]: string };
}

interface VercelResponse extends ServerResponse {
  send: (body: any) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let sentToTelegram = false;
    let telegramError = null;

    if (token && chatId) {
      try {
        const message = `🚀 <b>Новая заявка с сайта!</b>\n\n` +
          `👤 <b>Имя:</b> ${data.name || 'Не указано'}\n` +
          `📱 <b>Контакт:</b> ${data.contact || 'Не указано'}\n` +
          `💼 <b>Тариф/Услуга:</b> ${data.tariff || data.service || 'Не выбран'}\n` +
          `🔗 <b>Ссылка / Проект:</b> ${data.projectUrl || 'Нет'}\n` +
          `📝 <b>Описание:</b>\n${data.message || 'Без описания'}\n\n` +
          `🌐 <b>Язык сайта:</b> ${data.lang || 'ru'}\n` +
          `🕒 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`;

        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        });

        const tgData = await tgRes.json();
        if (tgData.ok) {
          sentToTelegram = true;
        } else {
          telegramError = tgData.description;
        }
      } catch (err: any) {
        telegramError = err.message;
      }
    }

    return res.status(200).json({
      success: true,
      sentToTelegram,
      simulated: !token || !chatId,
      telegramError,
      leadId: 'lead_' + Date.now(),
    });
  } catch (err: any) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  }
}