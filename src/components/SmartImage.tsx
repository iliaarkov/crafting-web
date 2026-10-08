import React, { useState, useEffect, useRef } from 'react';

const EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'];

export interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackExts?: string[];
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  onError,
  fallbackExts = EXTENSIONS,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const attemptedExts = useRef<Set<string>>(new Set());

  useEffect(() => {
    setCurrentSrc(src);
    attemptedExts.current.clear();
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!currentSrc) return;
    const match = currentSrc.match(/^(.*?)(\.(jpe?g|png|webp))$/i);
    if (match) {
      const basePath = match[1];
      const currentExt = match[2].toLowerCase();
      attemptedExts.current.add(currentExt);

      const nextExt = fallbackExts.find((ext) => !attemptedExts.current.has(ext.toLowerCase()));
      if (nextExt) {
        attemptedExts.current.add(nextExt.toLowerCase());
        setCurrentSrc(`${basePath}${nextExt}`);
        return;
      }
    }
    if (onError) onError(e);
  };

  return <img src={currentSrc} onError={handleError} {...props} />;
};

export default SmartImage;