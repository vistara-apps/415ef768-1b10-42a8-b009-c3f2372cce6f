# Expert-On-Demand Diagnostics

Real-time, verifiable expert diagnostics for complex equipment, powered by Farcaster and onchain reputation.

## Features

- 🔍 **Instant Expert Consults** - Connect with verified specialists for immediate equipment troubleshooting
- 🏆 **Onchain Reputation** - Transparent, immutable credentials and performance history
- 🎓 **NFT Credentials** - Verifiable skill attestations from manufacturers and certification bodies
- 📊 **Performance Scoring** - Merit-based reputation system rewarding expertise
- 📚 **Knowledge Base** - Collaborative troubleshooting guides and repair protocols

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Identity**: Farcaster Mini Apps
- **Wallet**: OnchainKit + Wagmi
- **Styling**: Tailwind CSS with Coinbase theme
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # React components
│   ├── Providers.tsx   # OnchainKit + Wagmi providers
│   ├── ExpertCard.tsx  # Expert profile card
│   └── ConsultationRequestModal.tsx
├── page.tsx            # Main page
├── layout.tsx          # Root layout
└── globals.css         # Global styles with theme

.well-known/
└── farcaster.json      # Farcaster manifest

public/
├── icon.png           # App icon
└── splash.png         # Splash screen
```

## Key Features Implementation

### Expert Discovery
- Browse verified experts by specialization
- Filter by rating, availability, and credentials
- View onchain reputation scores

### Consultation Flow
1. Select expert and describe problem
2. Attach diagnostic images/videos
3. Pay consultation fee (gasless via Paymaster)
4. Receive real-time expert guidance
5. Rate and provide feedback

### Reputation System
- Onchain performance tracking
- NFT credential display
- Transparent rating history
- Merit-based expert ranking

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Ensure environment variables are set in your deployment platform.

## License

MIT
