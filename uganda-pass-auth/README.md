# Digital Pass Authentication 

A standalone Next.js application that provides authentication for the Digital Pass digital identity system. This app handles both direct login and OAuth2/SSO flows.

## Features

- **WebAuthn/Passkey Authentication**: Biometric authentication using platform authenticators
- **Digital Pass Authentication**: Phone-based challenge-response authentication with real-time monitoring
- **OAuth2 Integration**: Seamless integration with third-party applications and partner SSO
- **Server-Sent Events**: Real-time status updates with polling fallback for challenge monitoring
- **Responsive Design**: Mobile-first design with modern UI components
- **Type-Safe**: Full TypeScript coverage with comprehensive error handling

## Development Setup

### Prerequisites

- Node.js 18+ 
- Backend API running (Digital Pass authentication service)

### Installation

```bash
npm install
```

### Environment Configuration

Configure `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
NODE_ENV=development

#Webauthn
NEXT_PUBLIC_APP_NAME="Uganda Pass Authentication"
NEXT_PUBLIC_WEBAUTHN_RP_ID=localhost
NEXT_PUBLIC_WEBAUTHN_RP_NAME="Uganda Pass"
NEXT_PUBLIC_DIGITAL_PASS_ENABLED=true
```

### Development Server

```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Usage Scenarios

### Authentication Flow
Visit `http://localhost:3000/login` for phone-based Digital Pass authentication.

### OAuth2 Integration
Partner applications can redirect users for SSO:
```
http://localhost:3000/login?client_id=partner123&redirect_uri=https://partner.com/callback&state=xyz
```

Users authenticate via phone number and Digital Pass challenge, then are redirected back with authorization code.

## Architecture

```
src/
├── app/
│   ├── login/           # Authentication page
│   └── api/auth/        # Token management API routes
├── components/
│   ├── auth/           # Modular authentication components (8 files)
│   ├── ui/             # shadcn/ui component library
│   └── loading.tsx     # Loading component
├── constants/          # Authentication constants and app metadata
├── service/            # API services and interceptors
├── types/              # TypeScript type definitions
└── utils/              # Styling and validation utilities
```

## Security

- **httpOnly Cookies**: Secure token storage
- **CSRF Protection**: Cross-site request forgery prevention
- **Content Security Policy**: XSS protection
- **CORS Configuration**: Proper cross-origin handling
- **Rate Limiting**: Protection against brute force attacks

## Integration with Backend

This frontend consumes the following backend APIs:

- `/auth/webauthn/authenticate/*` - WebAuthn authentication
- `/auth/digital-pass/initiate` - Start Digital Pass authentication
- `/auth/digital-pass/status` - Challenge status monitoring (SSE)
- `/auth/authorize` - OAuth2 authorization endpoint
- `/auth/token` - Token exchange and management
