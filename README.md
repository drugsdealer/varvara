# Свидание?

Маленький мобильный сайт-приглашение на свидание. Ответ отправляется в Telegram-бот.

## Настройка Telegram-бота

1. Напиши [@BotFather](https://t.me/BotFather) в Telegram, создай бота командой `/newbot`, получишь `TELEGRAM_BOT_TOKEN`.
2. Напиши своему новому боту любое сообщение (например "привет").
3. Открой в браузере `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates` и найди `"chat":{"id":...}` — это твой `TELEGRAM_CHAT_ID`.

## Локальный запуск

```bash
npm install
npm run dev
```

Для проверки отправки в Telegram локально нужен `vercel dev` (он поднимает и фронтенд, и `/api/send`):

```bash
npm i -g vercel
vercel dev
```

Создай файл `.env` по примеру `.env.example` и заполни `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

## Деплой на Vercel

1. Залей проект на GitHub и импортируй в Vercel.
2. В настройках проекта (Settings → Environment Variables) добавь `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
3. Deploy.
