import { Metadata } from 'next';
import Link from 'next/link';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Viralz Privacy Policy',
  description: 'Privacy Policy for Viralz.',
};

const lastUpdated = 'September 13, 2026';

export default function PrivacyPage() {
  return (
    <div className="bg-[#0E0E0E] min-h-screen w-full text-white">
      <div className="max-w-[820px] mx-auto px-[20px] py-[40px]">
        <Link href="/" className="inline-block mb-[32px]">
          <LogoTextComponent />
        </Link>
        <h1 className="text-[32px] font-bold mb-[8px]">Privacy Policy</h1>
        <p className="text-gray-400 mb-[32px]">Last updated: {lastUpdated}</p>

        <div className="flex flex-col gap-[24px] text-[15px] leading-[1.7] text-gray-200">
          <p>
            This Privacy Policy explains how Viralz (&quot;Viralz&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
            uses, and shares information when you use our social media
            scheduling platform at <strong>viralz.online</strong>.
          </p>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              1. Information We Collect
            </h2>
            <p className="font-semibold mt-[8px]">Account information</p>
            <p>
              Your name, email address, and password (stored as a salted
              hash, never in plain text) when you register.
            </p>
            <p className="font-semibold mt-[8px]">
              Connected social media accounts
            </p>
            <p>
              When you connect a platform (X, LinkedIn, Facebook, Instagram,
              TikTok, YouTube, and others), we receive and store an OAuth
              access token and basic profile information (e.g. your handle,
              display name, and avatar) from that platform, as authorized by
              you through that platform&apos;s own login screen. We never
              see or store your social media password.
            </p>
            <p className="font-semibold mt-[8px]">Content</p>
            <p>
              Posts, captions, and media (images/videos) you create or
              upload for scheduling, and any comments or analytics data we
              retrieve from connected platforms on your behalf.
            </p>
            <p className="font-semibold mt-[8px]">Payment information</p>
            <p>
              If you subscribe to a paid plan, payment card details are
              collected and processed directly by Stripe, our payment
              processor. We do not store your full card number on our
              servers.
            </p>
            <p className="font-semibold mt-[8px]">Usage data</p>
            <p>
              Log data, device/browser information, and analytics events
              (e.g. via Plausible, PostHog, or Sentry for error monitoring)
              to help us operate and improve the service.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              2. How We Use Information
            </h2>
            <ul className="list-disc pl-[24px] flex flex-col gap-[4px]">
              <li>To provide, operate, and maintain Viralz;</li>
              <li>
                To publish or schedule your posts to the social media
                accounts you connect;
              </li>
              <li>To process payments and manage subscriptions;</li>
              <li>
                To send you service-related emails (e.g. account activation,
                password reset, billing receipts);
              </li>
              <li>
                To monitor, debug, and improve the reliability and security
                of the service;
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              3. How We Share Information
            </h2>
            <p>We do not sell your personal information. We share data with:</p>
            <ul className="list-disc pl-[24px] mt-[8px] flex flex-col gap-[4px]">
              <li>
                <strong>The social media platforms you connect</strong> -
                solely to publish content and retrieve analytics you request,
                as authorized by your OAuth connection;
              </li>
              <li>
                <strong>Service providers</strong> who process data on our
                behalf, such as Stripe (payments), Cloudflare (file/media
                storage), Resend (transactional email), and analytics/error
                monitoring providers;
              </li>
              <li>
                <strong>Legal authorities</strong>, if required to comply
                with a legal obligation, protect our rights, or ensure user
                safety.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              4. Data Retention
            </h2>
            <p>
              We retain your account data for as long as your account is
              active. If you delete your account, we delete or anonymize your
              personal data within a reasonable period, except where we are
              required to retain it for legal, tax, or security purposes
              (e.g. fraud prevention).
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              5. Your Rights
            </h2>
            <p>
              Depending on where you live, you may have the right to access,
              correct, export, or delete your personal data, and to object to
              or restrict certain processing. You can manage most of this
              yourself from your account settings (including disconnecting
              social accounts and deleting your account), or contact us at{' '}
              <a
                href="mailto:privacy@viralz.online"
                className="underline hover:font-bold"
              >
                privacy@viralz.online
              </a>{' '}
              to make a request.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              6. Cookies
            </h2>
            <p>
              We use cookies and similar technologies to keep you signed in,
              remember your preferences, and understand how Viralz is used.
              You can control cookies through your browser settings, though
              disabling some cookies may affect core functionality like
              staying logged in.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              7. Data Security
            </h2>
            <p>
              We use industry-standard measures (encryption in transit,
              hashed passwords, access controls) to protect your data.
              However, no method of transmission or storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              8. Children&apos;s Privacy
            </h2>
            <p>
              Viralz is not directed at children under 16, and we do not
              knowingly collect personal information from them. If you
              believe a child has provided us personal information, contact
              us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              9. International Data Transfers
            </h2>
            <p>
              Your information may be processed in countries other than
              your own. Where required, we rely on appropriate safeguards
              (such as standard contractual clauses) for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be communicated via email or an in-app notice
              before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              11. Contact Us
            </h2>
            <p>
              Questions about this Privacy Policy? Contact us at{' '}
              <a
                href="mailto:privacy@viralz.online"
                className="underline hover:font-bold"
              >
                privacy@viralz.online
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
