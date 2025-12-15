@'
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'SideBet',
  description: 'Every Party Needs Stakes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
'@ | Out-File -FilePath "C:\Users\Phil\Documents\SideBet-Prototype\app\layout.js" -Encoding UTF8
