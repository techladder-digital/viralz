export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { LandingHero } from '@gitroom/frontend/components/landing/landing.hero';

export const metadata: Metadata = {
  title: 'Viralz: write once, post everywhere',
  description:
    'Write a post once, choose your channels and a time. Viralz publishes it for you on YouTube, Instagram, Facebook and more.',
};

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-current';

const platforms = [
  ['youtube', 'YouTube'],
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
  ['x', 'X'],
  ['tiktok', 'TikTok'],
  ['threads', 'Threads'],
  ['pinterest', 'Pinterest'],
  ['reddit', 'Reddit'],
  ['telegram', 'Telegram'],
  ['discord', 'Discord'],
  ['bluesky', 'Bluesky'],
];

const PlatformRow = ({ hidden }: { hidden?: boolean }) => (
  <ul
    aria-hidden={hidden}
    className="flex shrink-0 items-center gap-[44px] pe-[44px] py-[22px]"
  >
    {platforms.map(([icon, name]) => (
      <li
        key={icon}
        className="flex items-center gap-[12px] text-[24px] font-[600] whitespace-nowrap"
      >
        <img
          src={`/icons/platforms/${icon}.png`}
          alt=""
          width={36}
          height={36}
          className="rounded-[9px]"
        />
        {name}
      </li>
    ))}
  </ul>
);

export default async function LandingPage() {
  const t = await getT();
  const cookieStore = await cookies();
  const loggedIn = !!cookieStore.get('auth')?.value;
  const dashboard = process.env.IS_GENERAL ? '/launches' : '/analytics';

  const steps = [
    {
      title: t('landing_step_connect', 'Connect your accounts'),
      text: t(
        'landing_step_connect_text',
        'Sign in to each platform once. Viralz can then post to those accounts when you ask it to.'
      ),
    },
    {
      title: t('landing_step_write', 'Write your post'),
      text: t(
        'landing_step_write_text',
        'Add your text, photos or video, and change the wording for each platform if you want to.'
      ),
    },
    {
      title: t('landing_step_schedule', 'Pick a time'),
      text: t(
        'landing_step_schedule_text',
        'Your post goes on the calendar and is published at that time.'
      ),
    },
  ];

  const features = [
    {
      title: t('landing_feature_calendar', 'See your whole month'),
      text: t(
        'landing_feature_calendar_text',
        'Every post on every channel, in one calendar. Drag a post to move it.'
      ),
    },
    {
      title: t('landing_feature_analytics', 'Find out what worked'),
      text: t(
        'landing_feature_analytics_text',
        'Check how your channels and posts are doing without opening each app.'
      ),
    },
    {
      title: t('landing_feature_team', 'Work with your team'),
      text: t(
        'landing_feature_team_text',
        'Invite people to your workspace and plan posts together.'
      ),
    },
    {
      title: t('landing_feature_media', 'Keep your media in one place'),
      text: t(
        'landing_feature_media_text',
        'Upload photos and videos once, then use them in any post.'
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FBF5EC] text-[#0F3B3E] overflow-x-hidden">
      <header className="text-[#0F3B3E]">
        <div className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] h-[72px] flex items-center justify-between gap-[12px]">
          <Link href="/" className={`rounded-[4px] ${focusRing}`}>
            <LogoTextComponent />
          </Link>
          <nav className="flex items-center gap-[8px] text-[15px] font-[600]">
            {loggedIn ? (
              <Link
                href={dashboard}
                className={`h-[42px] px-[18px] flex items-center rounded-full bg-[#F97316] text-white hover:bg-[#EA580C] ${focusRing}`}
              >
                {t('landing_go_to_dashboard', 'Go to dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`h-[42px] px-[14px] flex items-center rounded-[10px] hover:underline ${focusRing}`}
                >
                  {t('sign_in', 'Sign In')}
                </Link>
                <Link
                  href="/auth"
                  className={`h-[42px] px-[18px] flex items-center rounded-full bg-[#F97316] text-white hover:bg-[#EA580C] ${focusRing}`}
                >
                  {t('sign_up', 'Sign Up')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <LandingHero loggedIn={loggedIn} dashboard={dashboard} />

        <section
          aria-label={t('landing_platforms', 'Platforms you can post to')}
          className="mt-[56px] mobile:mt-[40px] border-y border-[#EADFCE] overflow-hidden"
        >
          <div className="flex w-max landing-marquee">
            <PlatformRow />
            <PlatformRow hidden />
          </div>
        </section>

        <div>
          <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] pt-[64px] mobile:pt-[44px]">
            <h2 className="font-display text-[56px] mobile:text-[36px] leading-[1.08]">
              {t('landing_how_it_works', 'Three steps, then it runs itself')}
            </h2>
            <ol className="grid grid-cols-3 mobile:grid-cols-1 gap-[40px] mobile:gap-[28px] mt-[40px]">
              {steps.map((step, index) => (
                <li key={step.title} className="flex flex-col gap-[10px]">
                  <span className="font-display text-[72px] leading-none text-[#F97316]">
                    {index + 1}
                  </span>
                  <h3 className="text-[23px] font-[600]">{step.title}</h3>
                  <p className="text-[17px] leading-[1.5] font-[500] text-[#55696A] max-w-[360px]">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] py-[88px] mobile:py-[56px] grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] mobile:grid-cols-1 gap-[48px] mobile:gap-[24px]">
            <h2 className="font-display text-[56px] mobile:text-[36px] leading-[1.08]">
              {t('landing_features', 'Everything in one place')}
            </h2>
            <ul className="flex flex-col">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="py-[22px] border-t border-[#E2D6C3] last:border-b"
                >
                  <h3 className="text-[23px] font-[600]">{feature.title}</h3>
                  <p className="text-[17px] leading-[1.5] font-[500] text-[#55696A] mt-[4px]">
                    {feature.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] py-[96px] mobile:py-[64px]">
          <h2 className="font-display text-[84px] tablet:text-[64px] mobile:!text-[44px] leading-[1.04] max-w-[900px]">
            {t('landing_cta', 'Your next post is one click away.')}
          </h2>
          <Link
            href={loggedIn ? dashboard : '/auth'}
            className={`inline-flex h-[62px] px-[34px] mt-[36px] items-center rounded-full bg-[#F97316] text-white hover:bg-[#EA580C] text-[18px] font-[600] transition-transform hover:-translate-y-[2px] motion-reduce:transform-none ${focusRing}`}
          >
            {loggedIn
              ? t('landing_go_to_dashboard', 'Go to dashboard')
              : t('landing_create_account', 'Create your account')}
          </Link>
        </section>
      </main>

      <footer className="bg-[#0F3B3E] text-[#FBF5EC]/80">
        <div className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] py-[28px] flex flex-wrap items-center justify-between gap-[12px] text-[14px] font-[500]">
          <span>Viralz</span>
          <nav className="flex gap-[20px]">
            <Link href="/privacy" className={`hover:underline ${focusRing}`}>
              {t('privacy_policy', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className={`hover:underline ${focusRing}`}>
              {t('terms_of_service', 'Terms of Service')}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
