import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useId,
  useRef,
  useEffect
} from 'react';
import { cx } from '@arwes/tools';

interface IlluminatorSVGProps {
  hue?: string
  saturation?: string
  lightness?: string
  size?: number
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGGElement>
}

const IlluminatorSVG = (props: IlluminatorSVGProps): ReactElement => {
  const {
    hue = '0',
    saturation = '0%',
    lightness = '50%',
    size = 300,
    className,
    style
  } = props;

  const gradientId = useId();
  const rectElementRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const element = rectElementRef.current as SVGRectElement;
    const svg = element.parentElement?.parentElement as unknown as SVGSVGElement; // TODO:

    element.style.transform = `translate(-${size / 2}px, -${size / 2}px)`;

    const onMove = (event: MouseEvent): void => {
      const bounds = svg.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      element.style.opacity = '1';
      element.setAttribute('x', String(x));
      element.setAttribute('y', String(y));
    };

    const onHide = (): void => {
      element.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onHide);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onHide);
    };
  }, [hue, saturation, lightness, size]);

  return (
    <g
      className={cx('arwes-react-frames-illuminatorsvg', className)}
      style={{
        pointerEvents: 'none',
        ...style
      }}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset='0%' stopColor={`hsl(${hue} ${saturation} ${lightness} / 7%)`} />
          <stop offset='50%' stopColor={`hsl(${hue} ${saturation} ${lightness} / 4%)`} />
          <stop offset='100%' stopColor='transparent' />
        </radialGradient>
      </defs>
      <rect
        ref={rectElementRef}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          transition: 'opacity 200ms ease-out',
          opacity: 0
        }}
        fill={`url(#${gradientId})`}
      />
    </g>
  );
};

export type { IlluminatorSVGProps };
export { IlluminatorSVG };