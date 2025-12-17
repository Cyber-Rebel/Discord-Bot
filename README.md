# Discord Bot with Google Gemini AI Integration

A Discord bot that uses Google's Gemini AI to respond to messages in your server.

## Features

- Responds to messages using Google Gemini 2.5 Flash model
- Automatic message handling with AI-generated responses
- Configurable response length (max 40 lines)
- Bot ignores messages from other bots to prevent loops
- **Web interface** with bot information and Discord invite button
- Beautiful, responsive UI built with Express, EJS, HTML, and CSS

## Prerequisites

- Node.js (v16 or higher)
- A Discord account
- A Google AI Studio account

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

This will install:
- `discord.js` - Discord API wrapper
- `@google/genai` - Google Generative AI SDK
- `dotenv` - Environment variable manager
- `express` - Web server framework
- `ejs` - Embedded JavaScript templating

## Getting Your API Keys

### Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/)
2. Click **New Application**, enter a name, and click **Create**
3. In the left sidebar, click **Bot**
4. Click **Reset Token** (you may need to enter your password)
5. **Copy the token immediately** - it's only shown once
6. Save it securely (you'll add it to `.env` file)

### Inviting Bot to Your Server

1. In Developer Portal, go to **OAuth2 → URL Generator**
2. Under "Scopes", select **bot**
3. Under "Bot Permissions", select:
   - **Send Messages**
   - **Read Messages/View Channels**
   - **Read Message History**
   - (For testing, you can use **Administrator**, but avoid in production)
4. Copy the generated URL at the bottom
5. Paste it in your browser, select your server, and click **Authorize**

### Enable Privileged Gateway Intents

1. In Developer Portal, go to **Bot → Privileged Gateway Intents**
2. Enable these intents:
   - ✅ **Message Content Intent** (required to read message content)
   - ✅ **Server Members Intent** (optional)
   - ✅ **Presence Intent** (optional)
3. Click **Save Changes**

### Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Get API Key** or **Create API Key**
4. Select an existing project or create a new one
5. Copy the generated API key
6. **Keep it private** - treat it like a password

## Configuration

1. Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Open `.env` and add your keys:

```env
TOKEN=your_discord_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
DISCORD_CHANNEL_LINK=https://discord.gg/your-invite-link
```

⚠️ **Important**: Never commit `.env` to version control! It's already in [`.gitignore`](.gitignore).

## How It Works

### File Structure

- [`index.js`](index.js) - Main bot file that handles Discord events + Express web server
- [`Geimiai.js`](Geimiai.js) - Google Gemini AI integration module
- [`views/index.ejs`](views/index.ejs) - EJS template for the web interface
- [`public/css/style.css`](public/css/style.css) - Stylesheet for the web page
- [`.env`](.env) - Environment variables (tokens and API keys)
- [`package.json`](package.json) - Project dependencies and metadata

### Core Components

**Discord.js Gateway Intents** ([`index.js`](index.js)):
- `GatewayIntentBits.Guilds` - Access to server information
- `GatewayIntentBits.GuildMessages` - Detects when messages are sent
- `GatewayIntentBits.MessageContent` - Reads the actual message content

**Message Flow**:
1. User sends a message in Discord server
2. Bot receives message via `messageCreate` event
3. Checks if message is from another bot (ignores if true)
4. Sends message content to Gemini AI via [`aireponces`](Geimiai.js)
5. Receives AI-generated response
6. Replies to the user with their name + AI response

**Web Server** ([`index.js`](index.js)):
- Express server runs on port 3000 (configurable via `.env`)
- Serves a beautiful web interface with bot information
- Features a button that opens your Discord channel invite link
- Uses EJS templating to dynamically display bot name and channel link

**AI Configuration** ([`Geimiai.js`](Geimiai.js)):
- Model: `gemini-2.5-flash` (fast and efficient)
- Max response: 40 lines (configured via systemInstruction)
- Thinking budget: 0 (disabled for faster responses)

## Running the Bot

Start the bot with:

```bash
node index.js
```

Or update [`package.json`](package.json) to add a start script:

```json
"scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Then run:

```bash
npm start
```

You should see:
```
Web server running on http://localhost:3000
Logged in as YourBotName#1234!
```

## Accessing the Web Interface

Open your browser and go to:
```
http://localhost:3000
```

You'll see a beautiful page with:
- Bot status and information
- Feature list
- Technical specifications
- **"Open Discord Channel" button** - Click this to join your Discord server
- Built with badges showing the tech stack

## Usage

### Discord Bot

Once the bot is online in your server:

1. Send any message in a channel where the bot has access
2. The bot will reply with an AI-generated response
3. The reply format: `YourUsername:- [AI Response]`

### Web Interface

1. Visit `http://localhost:3000` in your browser
2. View bot information, features, and statistics
3. Click **"Open Discord Channel"** button to join your server
4. Share this URL with others to invite them to your Discord!

## Troubleshooting

### Bot doesn't respond to messages
- ✅ Make sure **Message Content Intent** is enabled in Developer Portal
- ✅ Check that bot has permission to read and send messages in the channel
- ✅ Verify your `TOKEN` in [`.env`](.env) is correct

### "Invalid API Key" error
- ✅ Check your `GEMINI_API_KEY` in [`.env`](.env)
- ✅ Make sure you created the key at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Bot appears offline
- ✅ Verify your Discord token is valid
- ✅ Check your internet connection
- ✅ Make sure `node index.js` is running without errors

### Web page doesn't load
- ✅ Make sure the bot is running (`node index.js`)
- ✅ Check if port 3000 is available (or change PORT in `.env`)
- ✅ Try accessing `http://localhost:3000` or `http://127.0.0.1:3000`

### Discord button doesn't work
- ✅ Update `DISCORD_CHANNEL_LINK` in your `.env` file
- ✅ Get your server invite link from Discord: Right-click channel → Invite People → Copy Link

## Security Notes

🔒 **Never share or commit**:
- Discord bot token
- Gemini API key
- [`.env`](.env) file

✅ **Always use**:
- [`.env.example`](.env.example) for documentation
- [`.gitignore`](.gitignore) to exclude sensitive files

## API Documentation

- [Discord.js Documentation](https://discord.js.org/)
- [Google Generative AI SDK](https://ai.google.dev/docs)
- [Discord Developer Portal](https://discord.com/developers/docs/intro)

## License

ISC

## Author

Created for learning Discord bot development with AI integration.

---

For detailed setup steps, see [`step.md`](step.md) or [`stepsai.md`](stepsai.md).