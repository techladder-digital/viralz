import { Metadata } from 'next';
import Link from 'next/link';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Viralz Terms of Service',
  description: 'Terms of Service for Viralz.',
};

const lastUpdated = 'September 13, 2026';

export default function TermsPage() {
  return (
    <div className="bg-[#0E0E0E] min-h-screen w-full text-white">
      <div className="max-w-[820px] mx-auto px-[20px] py-[40px]">
        <Link href="/" className="inline-block mb-[32px]">
          <LogoTextComponent />
        </Link>
        <h1 className="text-[32px] font-bold mb-[8px]">Terms of Service</h1>
        <p className="text-gray-400 mb-[32px]">Last updated: {lastUpdated}</p>

        <div className="flex flex-col gap-[24px] text-[15px] leading-[1.7] text-gray-200">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to
            and use of Viralz (&quot;Viralz&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;), a social media scheduling and
            management platform available at{' '}
            <strong>viralz.online</strong>. By creating an account or using
            Viralz, you agree to these Terms. If you do not agree, do not use
            the service.
          </p>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              1. Description of Service
            </h2>
            <p>
              Viralz lets you connect third-party social media accounts,
              compose content, and schedule or publish posts across those
              connected accounts. Features may include a calendar view,
              analytics, team collaboration, a media library, and related
              tools. We may add, change, or remove features at any time.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              2. Accounts and Eligibility
            </h2>
            <p>
              You must be at least 16 years old (or the age of digital
              consent in your country) to use Viralz. You are responsible for
              maintaining the confidentiality of your login credentials and
              for all activity that occurs under your account. Notify us
              immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              3. Connected Social Media Accounts
            </h2>
            <p>
              When you connect a social media account (e.g. X, LinkedIn,
              Facebook, Instagram, TikTok, YouTube, and others we support),
              you authenticate directly with that platform through its own
              official OAuth login flow. We never ask for or store your
              social media passwords. You can disconnect a connected account
              at any time from your settings.
            </p>
            <p className="mt-[8px]">
              You are solely responsible for complying with each connected
              platform&apos;s own terms of service, developer policies, and
              community guidelines. Viralz is not responsible for actions
              taken by a third-party platform against your account
              (including suspension or API access changes), or for changes
              the platform makes to its API that affect Viralz&apos;s
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              4. Your Content
            </h2>
            <p>
              You retain all ownership rights to the content you create,
              upload, or schedule through Viralz (&quot;Your Content&quot;).
              By submitting Your Content, you grant Viralz a limited,
              non-exclusive license to store, process, and transmit Your
              Content solely for the purpose of providing the service to you
              (for example, publishing a scheduled post to your connected
              account). You represent that you have all necessary rights to
              Your Content and that it does not infringe the rights of any
              third party or violate applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              5. Acceptable Use
            </h2>
            <p>You agree not to use Viralz to:</p>
            <ul className="list-disc pl-[24px] mt-[8px] flex flex-col gap-[4px]">
              <li>
                Post unlawful, defamatory, harassing, hateful, or infringing
                content;
              </li>
              <li>
                Spam, engage in coordinated inauthentic behavior, or
                artificially inflate engagement in violation of a connected
                platform&apos;s policies;
              </li>
              <li>
                Attempt to gain unauthorized access to Viralz&apos;s systems,
                other users&apos; accounts, or connected third-party
                platforms;
              </li>
              <li>
                Reverse-engineer, resell, or use the service in a way that
                violates applicable law or these Terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              6. Subscriptions and Payment
            </h2>
            <p>
              Certain features require a paid subscription, billed and
              processed through our payment provider (Stripe). By
              subscribing, you authorize recurring charges until you cancel.
              Fees are non-refundable except where required by law or
              expressly stated at checkout. You may cancel your subscription
              at any time from your billing settings; cancellation takes
              effect at the end of the current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              7. Intellectual Property
            </h2>
            <p>
              Viralz and its original branding, design, and software are
              owned by us or our licensors. Viralz is built on top of
              Postiz, an open-source project licensed under AGPL-3.0; the
              modified source code is available as described in our open
              source disclosure. Nothing in these Terms transfers ownership
              of our intellectual property to you, except the limited rights
              expressly granted here.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              8. Termination
            </h2>
            <p>
              You may stop using Viralz and delete your account at any time.
              We may suspend or terminate your access if you violate these
              Terms, misuse the service, or if required by law. Upon
              termination, your right to use the service ends immediately;
              provisions of these Terms that by their nature should survive
              (e.g. intellectual property, disclaimers, limitation of
              liability) will continue to apply.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              9. Disclaimers
            </h2>
            <p>
              Viralz is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, express or
              implied, including merchantability, fitness for a particular
              purpose, and non-infringement. We do not guarantee that the
              service will be uninterrupted, error-free, or that any
              particular post will publish successfully, as this can depend
              on factors outside our control (including third-party platform
              outages, API changes, or account restrictions imposed by those
              platforms).
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              10. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Viralz and its
              officers, employees, and affiliates will not be liable for any
              indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits, data, or goodwill, arising
              from your use of the service. Our total liability for any
              claim arising from these Terms or the service is limited to
              the amount you paid us in the twelve (12) months preceding the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. If we make
              material changes, we will notify you (e.g. by email or an
              in-app notice) before the changes take effect. Continued use
              of Viralz after changes take effect constitutes acceptance of
              the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of{' '}
              <strong>[INSERT GOVERNING JURISDICTION]</strong>, without
              regard to conflict-of-law principles.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold mb-[8px]">
              13. Contact Us
            </h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a
                href="mailto:legal@viralz.online"
                className="underline hover:font-bold"
              >
                legal@viralz.online
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
