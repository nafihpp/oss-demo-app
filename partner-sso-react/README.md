# 🚀  Partner SSO Next.ts Demo

**OAuth2 + PKCE Demo Application for Digital Pass Integration**

This demo application showcases secure OAuth2 integration with Digital Pass identity provider, featuring PKCE (Proof Key for Code Exchange) for enhanced security. Built with Next.js, TypeScript, and modern security best practices.

## 🛠️ Tech Stack

| Category             | Tech                                                                          |
| -------------------- | ----------------------------------------------------------------------------- |
| **Framework**        | [Next.js v15.3.0](https://nextjs.org/)                                        |
| **Language**         | TypeScript                                                                    |
| **Styling**          | Tailwind CSS + AlphaX DS                                                      |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) – Minimal, scalable state management |
| **Tooling**          | ESLint, Prettier, TypeScript, Docker                                          |
| **i18n**             | TypeScript-ready internationalization with locale detection                   |

> 🐳 **Built-in Docker Support** – Containerize your app with included `Dockerfile` and `docker-compose.yml` for reliable development and deployment (Optional).


## 📋 Prerequisites

* Node.js `>= 18.18`
* npm or yarn
* Docker (optional – for containerized environments)


## 📁 Project Structure

```
NEXT-TS-FRONTEND-DIGITAL/
├── src/
│   ├── app/              → Next.js App Router (pages, layouts, routing)
│   ├── modules/          → API-based modules (e.g., auth, dashboard)
│   ├── assets/           → Static assets (images, icons, fonts)
│   ├── hooks/            → Custom React hooks
│   ├── components/       → Shared reusable components and page based components.
│   ├── context/          → React context providers
│   ├── lib/              → Utilities and helpers
│   ├── store/            → Zustand state management logic
│   ├── config/           → Global app configuration
│   ├── types/            → Global TypeScript types and interfaces
│   └── styles/           → Tailwind CSS config and global styles
├── public/               → Public static files (e.g., favicon, robots.txt)
├── .env.local            → Environment variables
├── next.config.js        → Next.js configuration
├── tsconfig.json         → TypeScript configuration
├── Dockerfile            → Docker setup
├── docker-compose.yml    → Docker Compose configuration
├── .dockerignore         → Files to exclude from Docker context
├── .gitignore            → Git ignored files
└── README.md             → Project documentation
```

---

## 🎯 Key Features

- **OAuth2 + PKCE Implementation** – RFC 7636 compliant PKCE for public clients
- **Pass Integration** – Direct integration with Digital Pass identity provider
- **Security Best Practices** – State validation, CSRF protection, secure token storage
- **Type-safe** – Full TypeScript support for OAuth2 flows
- **Automatic Client Detection** – Supports both public and confidential clients
- **Production-Ready** – Designed for real-world partner integrations
- **Real-time Authentication** – SSE-based status monitoring
- **Multi-language Support** – i18n-ready with English and other locales

---

## 🧪 Getting Started - Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/AlphaX-FZO-LLC/partner-sso-react
cd partner-sso-react
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# OAuth2 Configuration
NEXT_PUBLIC_CLIENT_ID=your_partner_client_id
NEXT_PUBLIC_AUTH_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_CALLBACK_URL=http://localhost:3001/en/callback
NEXT_PUBLIC_SCOPES=openid profile

# For Public Clients (Recommended - uses PKCE)
NEXT_PUBLIC_USE_PKCE=true

# For Confidential Clients (Alternative)
# CLIENT_SECRET=your_client_secret
```

## 🔐 PKCE Implementation

This application implements PKCE (Proof Key for Code Exchange) as per RFC 7636 for enhanced OAuth2 security:

### Public Clients (Recommended)
- **PKCE Enabled**: Automatically enabled when `NEXT_PUBLIC_USE_PKCE=true` or when `CLIENT_SECRET` is not set
- **No Client Secret**: Eliminates risk of secret exposure in public clients
- **Enhanced Security**: Prevents authorization code interception attacks

### Key PKCE Features:
- **Code Verifier Generation**: Cryptographically secure random string (43-128 chars)
- **Code Challenge**: SHA256 hash of verifier, base64url encoded
- **Single-Use Security**: Verifier cleared after token exchange
- **RFC 7636 Compliance**: Full specification compliance

### Authentication Flow:
1. Generate PKCE challenge/verifier pair
2. Store verifier securely in session storage
3. Send challenge with authorization request
4. Exchange code + verifier for tokens
5. Clear verifier after successful exchange

## Security Features

- **CSRF Protection**: State parameter validation
- **Code Interception Prevention**: PKCE implementation
- **Secure Token Storage**: Session storage with automatic cleanup
- **Request Validation**: Comprehensive parameter validation
- **Error Handling**: Secure error messages without information leakage

### 4. Run Development Server

```bash
npm run dev
```

🌐 Visit your app at: `http://localhost:3000`

## 📄 License

This project is licensed under the MIT License.
