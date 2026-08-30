import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
}

export default function SmartImage({ src, fallbackSrc, alt, ...rest }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? fallbackSrc : src}
      alt={alt}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
