import "./globals.css";
import CallButtons from '@/components/elements/CallButtons';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="5mB612RvXjxvzSZraIsW7FZsHjri7WZQFaTj0KDm21c" />
        <GoogleAnalytics />
      </head>
      <body>
        {/* Google Tag Manager - GTM-K4PNGQHX */}
        <Script
          id="gtm-script-1"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K4PNGQHX');
            `,
          }}
        />
        
        {/* Google Tag Manager - GTM-PFXZKMNF */}
        <Script
          id="gtm-script-2"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PFXZKMNF');
            `,
          }}
        />
        
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4PNGQHX"
              height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>
          </noscript>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFXZKMNF"
              height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>
          </noscript>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PFXZKMNF"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {children}
        <CallButtons />
      </body>
    </html>
  );
}
