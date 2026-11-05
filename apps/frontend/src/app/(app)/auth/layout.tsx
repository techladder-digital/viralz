import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import loadDynamic from 'next/dynamic';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <div className="bg-newBgColor flex flex-1 p-[12px] gap-[12px] min-h-screen w-full text-textColor mobile:p-[6px]">
      <ReturnUrlComponent />
      <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[24px] p-[12px] bg-newBgColorInner border border-newBorder mobile:py-[24px] mobile:px-[16px]">
        <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col">
          <LogoTextComponent />
          <div className="flex">{children}</div>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex flex-col justify-center rounded-[24px] bg-[#0F3B3E] text-[#FBF5EC] p-[64px]">
        <div className="font-display text-[64px] leading-[1.05] max-w-[560px]">
          {t('auth_side_title', 'Write once. Post everywhere.')}
        </div>
        <p className="text-[18px] leading-[1.5] text-[#FBF5EC]/80 max-w-[460px] mt-[20px]">
          {t(
            'auth_side_text',
            'Plan your week in one calendar and let your posts go out on time.'
          )}
        </p>
      </div>
    </div>
  );
}
