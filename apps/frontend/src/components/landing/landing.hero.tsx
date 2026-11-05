'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

type BoardPost = {
  id: string;
  time: string;
  title: string;
  channels: string[];
  added?: boolean;
};

const focusRing =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-current';

const channels = [
  ['youtube', 'YouTube'],
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
  ['x', 'X'],
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Sample week for the demo board. Nothing here is real data or gets published.
const sampleWeek: Record<string, BoardPost[]> = {
  Mon: [{ id: 'mon', time: '9:00 AM', title: 'New recipe video', channels: ['youtube', 'facebook'] }],
  Tue: [{ id: 'tue', time: '6:30 PM', title: 'Behind the scenes', channels: ['instagram'] }],
  Wed: [],
  Thu: [{ id: 'thu', time: '8:00 AM', title: 'Weekly tips', channels: ['linkedin', 'x'] }],
  Fri: [{ id: 'fri', time: '12:30 PM', title: 'Customer story', channels: ['facebook', 'linkedin'] }],
  Sat: [],
  Sun: [],
};

export const LandingHero: FC<{ loggedIn: boolean; dashboard: string }> = ({
  loggedIn,
  dashboard,
}) => {
  const t = useT();
  const [text, setText] = useState('New video goes live tonight. Set your reminder!');
  const [selected, setSelected] = useState(['youtube', 'instagram', 'facebook']);
  const [day, setDay] = useState('Wed');
  const [week, setWeek] = useState(sampleWeek);
  const [status, setStatus] = useState('');

  const toggleChannel = (channel: string) => {
    setSelected((current) =>
      current.includes(channel)
        ? current.filter((c) => c !== channel)
        : [...current, channel]
    );
  };

  const canSchedule = !!text.trim() && selected.length > 0;

  const schedule = () => {
    if (!canSchedule) {
      return;
    }
    setWeek((current) => ({
      ...current,
      [day]: [
        ...current[day],
        {
          id: `${day}-${current[day].length}-${text.length}`,
          time: '7:00 PM',
          title: text.trim(),
          channels: selected,
          added: true,
        },
      ],
    }));
    setStatus(
      `${t('landing_demo_added', 'Added to your calendar for')} ${t(
        `landing_day_${day.toLowerCase()}`,
        day
      )}, 7:00 PM`
    );
  };

  return (
    <>
      <section className="max-w-[1280px] mx-auto px-[32px] mobile:px-[16px] pt-[24px] mobile:pt-[12px]">
        <div className="rounded-[36px] mobile:rounded-[24px] bg-gradient-to-br from-[#FFF3E2] via-[#FFFDF9] to-[#F8EEDC] border border-[#EADFCE] shadow-[0_18px_50px_rgba(15,59,62,0.08)] p-[56px] tablet:p-[36px] mobile:p-[20px] grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] mobile:grid-cols-1 gap-[56px] mobile:gap-[28px] items-center">
        <div>
          <div className="text-[12px] font-[700] tracking-[0.18em] uppercase text-[#EA580C] mb-[18px]">
            {t('landing_eyebrow', 'Social media scheduler')}
          </div>
          <h1 className="font-display text-[76px] tablet:text-[58px] mobile:!text-[46px] leading-[1.04] text-[#0F3B3E]">
            {t('landing_headline_1', 'Write once.')}
            <br />
            {t('landing_headline_2', 'Post everywhere.')}
          </h1>
          <p className="text-[19px] mobile:text-[17px] leading-[1.55] font-[500] text-[#55696A] max-w-[500px] mt-[24px]">
            {t(
              'landing_description',
              'Plan your week in one calendar. Viralz publishes to YouTube, Instagram, Facebook and more at the time you pick, even when your computer is off.'
            )}
          </p>
          <div className="flex flex-wrap items-center gap-[12px] mt-[32px]">
            <Link
              href={loggedIn ? dashboard : '/auth'}
              className={`h-[54px] px-[28px] flex items-center rounded-full bg-[#F97316] text-white hover:bg-[#EA580C] text-[16px] font-[600] transition-transform hover:-translate-y-[2px] motion-reduce:transform-none ${focusRing}`}
            >
              {loggedIn
                ? t('landing_go_to_dashboard', 'Go to dashboard')
                : t('landing_create_account', 'Create your account')}
            </Link>
            {!loggedIn && (
              <Link
                href="/auth/login"
                className={`h-[54px] px-[24px] flex items-center rounded-full bg-white text-[#0F3B3E] text-[16px] font-[600] shadow-[0_2px_12px_rgba(15,59,62,0.08)] ${focusRing}`}
              >
                {t('landing_have_account', 'I already have an account')}
              </Link>
            )}
          </div>
        </div>

        <div className="bg-[#0F3B3E] text-[#FBF5EC] rounded-[28px] p-[28px] mobile:p-[18px] shadow-[0_24px_60px_rgba(15,59,62,0.28)]">
          <div className="flex items-baseline justify-between gap-[12px]">
            <h2 className="font-display text-[30px] leading-none">
              {t('landing_demo_title', 'Try it here')}
            </h2>
            <span className="text-[13px] font-[500] text-[#FBF5EC]/70">
              {t('landing_demo_note', 'Just a demo. Nothing gets posted.')}
            </span>
          </div>
          <label htmlFor="landing-demo-text" className="sr-only">
            {t('landing_demo_label', 'Your post')}
          </label>
          <textarea
            id="landing-demo-text"
            value={text}
            maxLength={80}
            rows={2}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('landing_demo_placeholder', 'Write your post')}
            className="w-full mt-[12px] p-[14px] rounded-[14px] bg-[#FFFDF9] border-2 border-transparent text-[#0F3B3E] text-[17px] font-[500] leading-[1.35] resize-none outline-none focus:border-[#EA580C]"
          />
          <div className="text-[14px] font-[600] mt-[14px] mb-[8px]">
            {t('landing_demo_channels', 'Post to')}
          </div>
          <div className="flex flex-wrap gap-[8px]">
            {channels.map(([id, name]) => (
              <button
                key={id}
                type="button"
                aria-pressed={selected.includes(id)}
                aria-label={name}
                title={name}
                onClick={() => toggleChannel(id)}
                className={clsx(
                  'w-[46px] h-[46px] flex items-center justify-center rounded-[12px] border-2 transition-all',
                  focusRing,
                  selected.includes(id)
                    ? 'border-[#F97316] bg-white'
                    : 'border-transparent bg-white/70 opacity-60 grayscale'
                )}
              >
                <img
                  src={`/icons/platforms/${id}.png`}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-[6px]"
                />
              </button>
            ))}
          </div>
          <div className="text-[14px] font-[600] mt-[14px] mb-[8px]">
            {t('landing_demo_when', 'When, at 7:00 PM')}
          </div>
          <div className="grid grid-cols-7 gap-[4px]">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === d}
                onClick={() => setDay(d)}
                className={clsx(
                  'h-[38px] rounded-[10px] text-[13px] font-[600]',
                  focusRing,
                  day === d
                    ? 'bg-[#F97316] text-white'
                    : 'bg-white/10 text-[#FBF5EC] hover:bg-white/20'
                )}
              >
                {t(`landing_day_${d.toLowerCase()}`, d)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={schedule}
            disabled={!canSchedule}
            className={`w-full h-[52px] mt-[16px] rounded-full bg-[#F97316] text-white text-[16px] font-[600] hover:bg-[#EA580C] disabled:opacity-50 disabled:cursor-not-allowed ${focusRing}`}
          >
            {t('add_to_calendar', 'Add to calendar')}
          </button>
          <p
            aria-live="polite"
            className="min-h-[20px] mt-[8px] text-[14px] font-[600] text-[#FDBA74]"
          >
            {status}
          </p>
        </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-[32px] mobile:px-[16px] mt-[56px] mobile:mt-[40px]">
        <div className="bg-[#FFFDF9] border border-[#EADFCE] rounded-[28px] p-[12px] overflow-x-auto">
          <div className="grid grid-cols-7 gap-[6px] min-w-[860px]">
            {days.map((d) => (
              <div key={d} className="flex flex-col gap-[6px] min-w-0">
                <div className="text-[#55696A] text-[14px] font-[600] px-[10px] py-[8px]">
                  {t(`landing_day_${d.toLowerCase()}`, d)}
                </div>
                <div className="flex flex-col gap-[6px] min-h-[170px] rounded-[14px] bg-[#F8F0E3] p-[6px]">
                  {week[d].map((post) => (
                    <div
                      key={post.id}
                      className={clsx(
                        'rounded-[10px] p-[10px] flex flex-col gap-[8px]',
                        post.added
                          ? 'bg-[#F97316] text-white landing-pop'
                          : 'bg-white text-[#0F3B3E] shadow-[0_2px_8px_rgba(15,59,62,0.07)]'
                      )}
                    >
                      <div
                        className={clsx(
                          'text-[12px] font-[600]',
                          !post.added && 'text-[#C2410C]'
                        )}
                      >
                        {post.time}
                      </div>
                      <div className="text-[14px] font-[600] leading-[1.25] break-words">
                        {post.title}
                      </div>
                      <div className="flex flex-wrap gap-[4px]">
                        {post.channels.map((channel) => (
                          <img
                            key={channel}
                            src={`/icons/platforms/${channel}.png`}
                            alt={channel}
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
    </>
  );
};
