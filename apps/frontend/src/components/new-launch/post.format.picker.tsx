'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { hasExtension } from '@gitroom/helpers/utils/has.extension';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import {
  PostFormat,
  useLaunchStore,
} from '@gitroom/frontend/components/new-launch/store';

const SHORT_VIDEO_MAX_SECONDS = 180;

const formatDuration = (seconds: number) => {
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return minutes ? `${minutes} min ${rest} sec` : `${rest} sec`;
};

export const PostFormatPicker: FC = () => {
  const t = useT();
  const {
    postFormat,
    setPostFormat,
    providerFormats,
    selectedIntegrations,
    global,
    internal,
  } = useLaunchStore(
    useShallow((state) => ({
      postFormat: state.postFormat,
      setPostFormat: state.setPostFormat,
      providerFormats: state.providerFormats,
      selectedIntegrations: state.selectedIntegrations,
      global: state.global,
      internal: state.internal,
    }))
  );

  const formats: { id: PostFormat; label: string; hint: string }[] = [
    {
      id: 'short',
      label: t('post_format_short', 'Short video'),
      hint: t('post_format_short_hint', 'Reels and Shorts'),
    },
    {
      id: 'long',
      label: t('post_format_long', 'Long video'),
      hint: t('post_format_long_hint', 'Full videos'),
    },
    {
      id: 'photo',
      label: t('post_format_photo', 'Photo or text'),
      hint: t('post_format_photo_hint', 'Feed posts'),
    },
    {
      id: 'story',
      label: t('post_format_story', 'Story'),
      hint: t('post_format_story_hint', 'Gone in 24 hours'),
    },
  ];

  const videoPath = useMemo(() => {
    const media = [
      ...internal
        .filter((p) =>
          selectedIntegrations.some(
            (s) => s.integration.id === p.integration.id
          )
        )
        .flatMap((p) => p.integrationValue),
      ...global,
    ].flatMap((p) => p.media || []);
    return media.find((m) => hasExtension(m.path, 'mp4'))?.path;
  }, [global, internal, selectedIntegrations]);

  const [video, setVideo] = useState<{
    duration: number;
    vertical: boolean;
  } | null>(null);

  useEffect(() => {
    setVideo(null);
    if (!videoPath) {
      return;
    }
    const element = document.createElement('video');
    element.preload = 'metadata';
    element.onloadedmetadata = () => {
      setVideo({
        duration: element.duration,
        vertical: element.videoHeight >= element.videoWidth,
      });
    };
    element.src = videoPath;
    return () => {
      element.onloadedmetadata = null;
      element.src = '';
    };
  }, [videoPath]);

  const suggested: PostFormat | null = video
    ? video.vertical && video.duration <= SHORT_VIDEO_MAX_SECONDS
      ? 'short'
      : 'long'
    : null;

  const unsupported = postFormat
    ? selectedIntegrations.filter((p) => {
        const channelFormats = providerFormats[p.integration.id];
        return channelFormats && !channelFormats[postFormat];
      })
    : [];

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-[14px] font-[600]">
        {t('post_format_title', 'What are you posting?')}
      </div>
      <div className="grid grid-cols-4 mobile:grid-cols-2 gap-[8px]">
        {formats.map((format) => (
          <button
            key={format.id}
            type="button"
            aria-pressed={postFormat === format.id}
            onClick={() => setPostFormat(format.id)}
            className={clsx(
              'flex flex-col gap-[2px] text-start rounded-[8px] border p-[10px] hover:bg-boxHover',
              postFormat === format.id
                ? 'border-btnPrimary bg-boxHover'
                : 'border-newColColor'
            )}
          >
            <span className="text-[14px] font-[600]">{format.label}</span>
            <span className="text-[12px] text-textItemBlur">{format.hint}</span>
          </button>
        ))}
      </div>

      {!!video && !!suggested && suggested !== postFormat && (
        <div className="flex flex-wrap items-center gap-[8px] rounded-[8px] bg-newSettings p-[10px] text-[13px]">
          <span className="flex-1 min-w-[200px]">
            {t('post_format_video_is', 'Your video is')}{' '}
            {formatDuration(video.duration)},{' '}
            {video.vertical
              ? t('post_format_vertical', 'vertical')
              : t('post_format_horizontal', 'horizontal')}
            .{' '}
            {t('post_format_best_as', 'It works best as:')}{' '}
            {formats.find((f) => f.id === suggested)?.label}
          </span>
          <button
            type="button"
            onClick={() => setPostFormat(suggested)}
            className="h-[30px] px-[12px] rounded-[6px] bg-btnPrimary text-white font-[600]"
          >
            {t('post_format_use', 'Use this')}
          </button>
        </div>
      )}

      {!!postFormat && selectedIntegrations.length > 0 && (
        <div className="flex flex-wrap gap-x-[14px] gap-y-[6px] text-[13px]">
          {selectedIntegrations.map((p) => {
            const channelFormats = providerFormats[p.integration.id];
            const label = channelFormats?.[postFormat]?.label;
            if (channelFormats && !label) {
              return null;
            }
            return (
              <span key={p.integration.id} className="flex items-center gap-[6px]">
                <img
                  src={`/icons/platforms/${p.integration.identifier}.png`}
                  alt=""
                  width={18}
                  height={18}
                  className="rounded-[4px]"
                />
                {label || t('post_format_goes_as_post', 'Post')}
              </span>
            );
          })}
        </div>
      )}

      {unsupported.length > 0 && (
        <div className="text-[13px] text-[#FF3F3F]">
          {unsupported.map((p) => p.integration.name).join(', ')}{' '}
          {t(
            'post_format_not_supported',
            'does not have this post type. Unselect it or choose another type.'
          )}
        </div>
      )}
    </div>
  );
};
