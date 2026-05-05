import React, { ImgHTMLAttributes, ReactNode, useState, useEffect } from 'react';

export interface ImageOrDefaultProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string | undefined;
  children?: ReactNode;
}

const ImageOrDefault = ({ src, children, className, alt = '', onError, ...rest }: ImageOrDefaultProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return children;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      {...rest}
    />
  );
};

export default ImageOrDefault;
