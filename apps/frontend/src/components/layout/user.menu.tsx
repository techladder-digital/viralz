'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { LogoutComponent } from '@gitroom/frontend/components/layout/logout.component';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

const useUserPersonal = () => {
  const fetch = useFetch();
  const load = useCallback(async () => {
    return await (await fetch('/user/personal')).json();
  }, []);
  return useSWR<{ name?: string; picture?: { path: string } }>(
    'user-menu-personal',
    load,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};

const Avatar: FC<{ name: string; picture?: string | null }> = ({
  name,
  picture,
}) => {
  const [failed, setFailed] = useState(false);
  if (picture && !failed) {
    return (
      <img
        src={picture}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-[36px] h-[36px] rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className="w-[36px] h-[36px] rounded-full bg-btnPrimary text-white flex items-center justify-center text-[15px] font-[600] uppercase shrink-0">
      {name.charAt(0)}
    </div>
  );
};

export const UserMenu: FC = () => {
  const user = useUser();
  const t = useT();
  const { data } = useUserPersonal();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const closeOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const email = user?.email || '';
  const name = data?.name || user?.name || email.split('@')[0] || '';
  const picture = data?.picture?.path || user?.providerPicture;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={t('account_menu', 'Account menu')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-[10px] text-start rounded-[8px] hover:text-newTextColor"
      >
        <Avatar name={name} picture={picture} />
        <span className="flex flex-col max-w-[180px] mobile:hidden">
          <span className="text-[14px] font-[600] text-newTextColor truncate">
            {name}
          </span>
          <span className="text-[12px] truncate">{email}</span>
        </span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-[calc(100%+8px)] end-0 z-[300] w-[260px] max-w-[calc(100vw-24px)] bg-newBgColorInner border border-newTableBorder rounded-[12px] p-[16px] flex flex-col gap-[12px] [box-shadow:var(--menu-shadow)]"
        >
          <div className="flex items-center gap-[10px] min-w-0">
            <Avatar name={name} picture={picture} />
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-[600] text-newTextColor truncate">
                {name}
              </span>
              <span className="text-[12px] text-textItemBlur truncate">
                {email}
              </span>
            </div>
          </div>
          <div className="h-[1px] bg-newTableBorder" />
          <div className="text-[14px]">
            <LogoutComponent />
          </div>
        </div>
      )}
    </div>
  );
};
