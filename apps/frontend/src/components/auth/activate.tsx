'use client';

import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { Button } from '@gitroom/react/form/button';
import { Input } from '@gitroom/react/form/input';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type VerifyInputs = {
  email: string;
  code: string;
};

const COOLDOWN_SECONDS = 60;

export function Activate() {
  const t = useT();
  const fetch = useFetch();
  const searchParams = useSearchParams();
  const emailFromLink = searchParams?.get('email') || '';
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const form = useForm<VerifyInputs>({
    defaultValues: { email: emailFromLink, code: '' },
  });

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit: SubmitHandler<VerifyInputs> = async (data) => {
    setLoading(true);
    try {
      // On success the fetch wrapper stores the session and opens the dashboard
      const response = await fetch('/auth/activate-code', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, code: data.code.trim() }),
      });
      if (response.status !== 200) {
        const body = await response.text();
        let message = body;
        try {
          const parsed = JSON.parse(body).message;
          message = Array.isArray(parsed) ? parsed[0] : parsed;
        } catch (e) {
          // the wrong-code errors are plain text
        }
        form.setError('code', { message });
      }
    } catch (e) {
      form.setError('code', {
        message: t('error_occurred', 'An error occurred. Please try again.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const resend = useCallback(async () => {
    const email = form.getValues('email');
    if (!email) {
      form.setError('email', {
        message: t('enter_your_email', 'Enter your email address'),
      });
      return;
    }
    setResending(true);
    setResent(false);
    try {
      const response = await fetch('/auth/resend-activation', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (result.success) {
        setResent(true);
        form.clearErrors();
      } else {
        form.setError('code', {
          message:
            result.message ||
            t('failed_to_resend', 'Could not send a new code. Try again.'),
        });
      }
      setCooldown(COOLDOWN_SECONDS);
    } catch (e) {
      form.setError('code', {
        message: t('error_occurred', 'An error occurred. Please try again.'),
      });
    } finally {
      setResending(false);
    }
  }, []);

  return (
    <FormProvider {...form}>
      <form className="flex flex-col flex-1" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-display text-[44px] mobile:text-[32px] -tracking-[0.8px] text-start">
          {t('verify_your_email', 'Verify your email')}
        </h1>
        <p className="text-[14px] mt-[12px] mb-[24px]">
          {emailFromLink
            ? `${t('we_sent_a_code_to', 'We sent a 6-digit code to')} ${emailFromLink}.`
            : t(
                'enter_the_code_we_sent',
                'Enter your email and the 6-digit code we sent you.'
              )}{' '}
          {t('code_expires', 'The code expires in 10 minutes.')}
        </p>
        <div className="flex flex-col gap-[12px] text-textColor">
          <div className={emailFromLink ? 'hidden' : ''}>
            <Input
              label="Email"
              translationKey="label_email"
              {...form.register('email', { required: true })}
              type="email"
              placeholder={t('email_address', 'Email Address')}
            />
          </div>
          <Input
            label="Verification code"
            translationKey="label_verification_code"
            {...form.register('code', {
              required: t('enter_the_code', 'Enter the 6-digit code'),
            })}
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
          />
        </div>
        {resent && (
          <p className="text-green-400 text-[14px] mt-[12px]">
            {t('new_code_sent', 'New code sent. Check your inbox and spam folder.')}
          </p>
        )}
        <div className="w-full flex mt-[24px]">
          <Button
            type="submit"
            className="flex-1 rounded-[10px] !h-[52px]"
            loading={loading}
          >
            {t('verify_email', 'Verify email')}
          </Button>
        </div>
        <button
          type="button"
          onClick={resend}
          disabled={cooldown > 0 || resending}
          className="mt-[16px] text-[14px] underline disabled:no-underline disabled:opacity-60"
        >
          {cooldown > 0
            ? `${t('resend_available_in', 'You can resend in')} ${cooldown}s`
            : t('send_new_code', 'Send a new code')}
        </button>
        <p className="mt-[16px] text-[14px] text-center">
          {t('already_verified', 'Already verified?')}&nbsp;
          <Link href="/auth/login" className="underline cursor-pointer">
            {t('sign_in', 'Sign In')}
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
