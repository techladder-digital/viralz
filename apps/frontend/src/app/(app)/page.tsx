export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getT } from '@gitroom/react/translation/get.translation.service.backend';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const metadata: Metadata = {
  title: 'Viralz: schedule your social media posts',
  description:
    'Write a post once, choose your channels and a time. Viralz publishes it for you on YouTube, Instagram, Facebook and more.',
};

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-current';

// Sample week for the hero board. It shows what the calendar looks like, not real data.
const week: { day: string; posts: { time: string; title: string; channels: string[] }[] }[] = [
  { day: 'Mon', posts: [{ time: '9:00 AM', title: 'New recipe video', channels: ['youtube', 'facebook'] }] },
  { day: 'Tue', posts: [{ time: '6:30 PM', title: 'Behind the scenes', channels: ['instagram'] }] },
  { day: 'Wed', posts: [] },
  {
    day: 'Thu',
    posts: [
      { time: '8:00 AM', title: 'Weekly tips', channels: ['linkedin', 'x'] },
      { time: '7:00 PM', title: 'Short reel', channels: ['instagram', 'tiktok', 'youtube'] },
    ],
  },
  { day: 'Fri', posts: [{ time: '12:30 PM', title: 'Customer story', channels: ['facebook', 'linkedin'] }] },
  { day: 'Sat', posts: [{ time: '10:00 AM', title: 'Weekend offer', channels: ['instagram', 'facebook', 'pinterest'] }] },
  { day: 'Sun', posts: [] },
];

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
        'Your post goes on the calendar and is published at that time, even when your computer is off.'
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F97316] text-[#1F0E03]">
      <header className="bg-[#1F0E03] text-white">
        <div className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] h-[72px] flex items-center justify-between gap-[12px]">
          <Link href="/" className={`rounded-[4px] ${focusRing}`}>
            <LogoTextComponent />
          </Link>
          <nav className="flex items-center gap-[8px] text-[15px] font-[600]">
            {loggedIn ? (
              <Link
                href={dashboard}
                className={`h-[42px] px-[18px] flex items-center rounded-[8px] bg-white text-[#1F0E03] hover:bg-[#FFEDD5] ${focusRing}`}
              >
                {t('landing_go_to_dashboard', 'Go to dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`h-[42px] px-[14px] flex items-center rounded-[8px] hover:underline ${focusRing}`}
                >
                  {t('sign_in', 'Sign In')}
                </Link>
                <Link
                  href="/auth"
                  className={`h-[42px] px-[18px] flex items-center rounded-[8px] bg-white text-[#1F0E03] hover:bg-[#FFEDD5] ${focusRing}`}
                >
                  {t('sign_up', 'Sign Up')}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] pt-[72px] mobile:pt-[40px]">
          <h1 className="text-[84px] tablet:text-[64px] mobile:!text-[42px] leading-[1.02] -tracking-[0.03em] font-[600] max-w-[1000px]">
            {t(
              'landing_headline',
              'Plan your week of posts once. Viralz publishes them on time.'
            )}
          </h1>
          <p className="text-[21px] mobile:text-[17px] leading-[1.5] font-[500] max-w-[640px] mt-[28px]">
            {t(
              'landing_description',
              'Write a post, choose your channels and pick a time. Viralz posts it to YouTube, Instagram, Facebook and more, so you do not have to open each app.'
            )}
          </p>
          <div className="flex flex-wrap items-center gap-[12px] mt-[36px]">
            <Link
              href={loggedIn ? dashboard : '/auth'}
              className={`h-[56px] px-[28px] flex items-center rounded-[10px] bg-[#1F0E03] text-white text-[17px] font-[600] hover:bg-black ${focusRing}`}
            >
              {loggedIn
                ? t('landing_go_to_dashboard', 'Go to dashboard')
                : t('landing_create_account', 'Create your account')}
            </Link>
            {!loggedIn && (
              <Link
                href="/auth/login"
                className={`h-[56px] px-[20px] flex items-center rounded-[10px] text-[17px] font-[600] underline underline-offset-4 ${focusRing}`}
              >
                {t('landing_have_account', 'I already have an account')}
              </Link>
            )}
          </div>
        </section>

        {/* The week board bleeds off the orange into the cream section below it */}
        <div className="bg-[linear-gradient(to_bottom,#F97316_0,#F97316_50%,#FFF7ED_50%,#FFF7ED_100%)] mt-[64px] mobile:mt-[40px]">
          <div className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px]">
            <div
              role="img"
              aria-label={t(
                'landing_board_label',
                'Example of a week in the Viralz calendar, with posts scheduled on different days and channels'
              )}
              className="bg-[#1F0E03] rounded-[20px] p-[12px] overflow-x-auto"
            >
              <div className="grid grid-cols-7 gap-[6px] min-w-[860px]">
                {week.map(({ day, posts }) => (
                  <div key={day} className="flex flex-col gap-[6px]">
                    <div className="text-white/70 text-[14px] font-[600] px-[10px] py-[8px]">
                      {t(`landing_day_${day.toLowerCase()}`, day)}
                    </div>
                    <div className="flex flex-col gap-[6px] min-h-[250px] rounded-[10px] bg-white/[0.06] p-[6px]">
                      {posts.map((post) => (
                        <div
                          key={post.title}
                          className="bg-[#FFF7ED] rounded-[8px] p-[10px] flex flex-col gap-[8px]"
                        >
                          <div className="text-[12px] font-[600] text-[#9A3412]">
                            {post.time}
                          </div>
                          <div className="text-[14px] font-[600] leading-[1.25]">
                            {post.title}
                          </div>
                          <div className="flex gap-[4px]">
                            {post.channels.map((channel) => (
                              <img
                                key={channel}
                                src={`/icons/platforms/${channel}.png`}
                                alt=""
                                width={22}
                                height={22}
                                className="rounded-[5px]"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF7ED]">
          <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] pt-[88px] mobile:pt-[56px]">
            <h2 className="text-[40px] mobile:text-[30px] leading-[1.1] -tracking-[0.02em] font-[600]">
              {t('landing_how_it_works', 'How it works')}
            </h2>
            <ol className="grid grid-cols-3 mobile:grid-cols-1 gap-[40px] mobile:gap-[28px] mt-[36px]">
              {steps.map((step, index) => (
                <li key={step.title} className="flex flex-col gap-[10px]">
                  <span className="text-[56px] leading-none font-[600] text-[#EA580C]">
                    {index + 1}
                  </span>
                  <h3 className="text-[21px] font-[600]">{step.title}</h3>
                  <p className="text-[16px] leading-[1.55] font-[500] text-[#5C3A21] max-w-[360px]">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] py-[88px] mobile:py-[56px]">
            <h2 className="text-[40px] mobile:text-[30px] leading-[1.1] -tracking-[0.02em] font-[600]">
              {t('landing_platforms', 'Post to the platforms you use')}
            </h2>
            <ul className="flex flex-wrap gap-x-[28px] gap-y-[16px] mt-[32px]">
              {platforms.map(([icon, name]) => (
                <li key={icon} className="flex items-center gap-[10px] text-[17px] font-[600]">
                  <img
                    src={`/icons/platforms/${icon}.png`}
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-[7px]"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-[#1F0E03] text-white/80">
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
