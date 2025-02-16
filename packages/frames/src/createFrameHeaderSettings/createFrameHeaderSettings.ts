import { filterProps } from '@arwes/tools'
import { type AnimatedCSSProps, type AnimatedProp } from '@arwes/animated'
import type { FrameSettings, FrameSettingsElement } from '../types.js'
import { animate } from 'motion'

type CreateFrameHeaderSettingsProps = {
  styled?: boolean
  animated?: boolean
  padding?: number
  strokeWidth?: number
  decoWidth?: number
  contentLength?: number
  direction?: 'horizontal' | 'vertical'
  align?: 'left' | 'right' | 'top' | 'bottom'
}

const defaultProps: Required<CreateFrameHeaderSettingsProps> = {
  styled: true,
  animated: true,
  padding: 0,
  strokeWidth: 1,
  decoWidth: 4,
  direction: 'horizontal',
  align: 'left',
  contentLength: 0
}

const createFrameHeaderSettings = (props?: CreateFrameHeaderSettingsProps): FrameSettings => {
  const {
    styled,
    animated,
    padding: p,
    strokeWidth,
    decoWidth,
    direction,
    align,
    contentLength
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const strokeOffset = strokeWidth / 2

  const lineStyle: AnimatedCSSProps = {
    filter: styled ? 'var(--arwes-frames-line-filter)' : undefined,
    stroke: styled ? 'var(--arwes-frames-line-color, currentcolor)' : undefined,
    fill: styled ? 'none' : undefined,
    strokeWidth: String(strokeWidth)
  }

  const decoDashStyle: AnimatedCSSProps = {
    filter: styled ? 'var(--arwes-frames-deco-filter)' : undefined,
    stroke: styled ? 'var(--arwes-frames-deco-color, currentcolor)' : undefined,
    fill: styled ? 'none' : undefined,
    strokeWidth: String(strokeWidth)
  }

  const decoBoxesStyle: AnimatedCSSProps = {
    filter: styled ? 'var(--arwes-frames-deco-filter)' : undefined,
    fill: styled ? 'var(--arwes-frames-deco-color, currentcolor)' : undefined,
    strokeWidth: '0'
  }

  const decoDashAnimated: AnimatedProp = animated
    ? {
        transitions: {
          entering: ({ element, duration }) =>
            animate(element, { opacity: [0, 1, 0.5, 1] }, { duration: duration * 0.4 }),
          exiting: ({ element, duration }) =>
            animate(
              element,
              { opacity: [1, 0, 0.5, 0] },
              { duration: duration * 0.4, delay: duration * 0.6 }
            )
        }
      }
    : undefined

  const lineAnimated: AnimatedProp = animated ? ['draw'] : undefined

  const decoBoxesAnimated: AnimatedProp = animated
    ? {
        transitions: {
          entering: ({ element, duration }) =>
            animate(
              element,
              { opacity: [0, 1, 0.5, 1] },
              { delay: duration * 0.6, duration: duration * 0.4 }
            ),
          exiting: { opacity: [1, 0, 0.5, 0] }
        }
      }
    : undefined

  const verticalBoxes: FrameSettingsElement[] = [
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: '100%',
      height: '20%'
    },
    {
      type: 'rect',
      x: 0,
      y: '40%',
      width: '100%',
      height: '20%'
    },
    {
      type: 'rect',
      x: 0,
      y: '80%',
      width: '100%',
      height: '20%'
    }
  ]

  if (direction === 'vertical') {
    if (align === 'bottom') {
      return {
        elements: [
          {
            type: 'path',
            name: 'deco',
            style: decoDashStyle,
            animated: decoDashAnimated,
            path: [
              ['M', contentLength ? `100% - ${p + strokeOffset}` : p + strokeOffset, `100% - ${p}`],
              ['v', -decoWidth * 2],
              ['m', 0, -decoWidth],
              ['v', -decoWidth * 2]
            ]
          },
          {
            type: 'path',
            name: 'line',
            style: lineStyle,
            animated: lineAnimated,
            path: ({ width, height }) =>
              [
                'M',
                contentLength ? width - (p + strokeOffset) : p + strokeOffset,
                height - (p + decoWidth * 6),
                'v',
                -Math.max(0, contentLength - decoWidth * 6),
                'L',
                contentLength ? width * 0.5 : p + strokeOffset,
                height - (p + contentLength + width * 0.5),
                'V',
                p + decoWidth * 6.5
              ].join(' ')
          },
          {
            type: 'g',
            name: 'deco',
            style: {
              ...decoBoxesStyle,
              skewY: -45,
              transformOrigin: contentLength ? 'top center' : 'top left'
            },
            animated: decoBoxesAnimated,
            elements: [
              {
                type: 'svg',
                viewBox: `0 0 ${decoWidth * 2} ${decoWidth * 5}`,
                x: contentLength ? `50% - ${strokeOffset}` : p,
                y: p + decoWidth * 2,
                width: decoWidth * 2,
                height: decoWidth * 5,
                elements: verticalBoxes
              }
            ]
          }
        ]
      }
    }

    return {
      elements: [
        {
          type: 'path',
          name: 'deco',
          style: decoDashStyle,
          animated: decoDashAnimated,
          path: [
            ['M', contentLength ? `100% - ${p + strokeOffset}` : p + strokeOffset, p],
            ['v', decoWidth * 2],
            ['m', 0, decoWidth],
            ['v', decoWidth * 2]
          ]
        },
        {
          type: 'path',
          name: 'line',
          style: lineStyle,
          animated: lineAnimated,
          path: ({ width, height }) =>
            [
              'M',
              contentLength ? width - (p + strokeOffset) : p + strokeOffset,
              p + decoWidth * 6,
              'v',
              Math.max(0, contentLength - decoWidth * 6),
              'L',
              contentLength ? width * 0.5 : p + strokeOffset,
              p + contentLength + width * 0.5,
              'V',
              height - (p + decoWidth * 6.5)
            ].join(' ')
        },
        {
          type: 'g',
          name: 'deco',
          style: {
            ...decoBoxesStyle,
            transformOrigin: contentLength ? 'bottom center' : 'bottom left',
            skewY: 45
          },
          animated: decoBoxesAnimated,
          elements: [
            {
              type: 'svg',
              viewBox: `0 0 ${decoWidth * 2} ${decoWidth * 5}`,
              x: contentLength ? `50% - ${strokeOffset}` : p,
              y: `100% - ${p + decoWidth * 7}`,
              width: decoWidth * 2,
              height: decoWidth * 5,
              elements: verticalBoxes
            }
          ]
        }
      ]
    }
  }

  const horizontalBoxes: FrameSettingsElement[] = [
    {
      type: 'rect',
      x: 0,
      y: 0,
      width: '20%',
      height: '100%'
    },
    {
      type: 'rect',
      x: '40%',
      y: 0,
      width: '20%',
      height: '100%'
    },
    {
      type: 'rect',
      x: '80%',
      y: 0,
      width: '20%',
      height: '100%'
    }
  ]

  if (align === 'right') {
    return {
      elements: [
        {
          type: 'path',
          name: 'deco',
          style: decoDashStyle,
          animated: decoDashAnimated,
          path: [
            ['M', `100% - ${p}`, contentLength ? `100% - ${p + strokeOffset}` : p + strokeOffset],
            ['h', -decoWidth * 2],
            ['m', -decoWidth, 0],
            ['h', -decoWidth * 2]
          ]
        },
        {
          type: 'path',
          name: 'line',
          style: lineStyle,
          animated: lineAnimated,
          path: ({ width, height }) =>
            [
              'M',
              width - (p + decoWidth * 6),
              contentLength ? height - (p + strokeOffset) : p + strokeOffset,
              'h',
              -Math.max(0, contentLength - decoWidth * 6),
              'L',
              width - (p + contentLength + height * 0.5),
              contentLength ? height * 0.5 : p + strokeOffset,
              'H',
              p + decoWidth * 6.5
            ].join(' ')
        },
        {
          type: 'g',
          name: 'deco',
          animated: decoBoxesAnimated,
          style: {
            ...decoBoxesStyle,
            transformOrigin: contentLength ? 'left center' : 'left top',
            skewX: -45
          },
          elements: [
            {
              type: 'svg',
              viewBox: `0 0 ${decoWidth * 5} ${decoWidth * 2}`,
              x: p + decoWidth * 2,
              y: contentLength ? `50% - ${strokeOffset}` : p,
              width: decoWidth * 5,
              height: decoWidth * 2,
              elements: horizontalBoxes
            }
          ]
        }
      ]
    }
  }

  // direction = horizontal, align = left
  return {
    elements: [
      {
        type: 'path',
        name: 'deco',
        style: decoDashStyle,
        animated: decoDashAnimated,
        path: [
          ['M', p, contentLength ? `100% - ${p + strokeOffset}` : p + strokeOffset],
          ['h', decoWidth * 2],
          ['m', decoWidth, 0],
          ['h', decoWidth * 2]
        ]
      },
      {
        type: 'path',
        name: 'line',
        style: lineStyle,
        animated: lineAnimated,
        path: ({ width, height }) =>
          [
            'M',
            p + decoWidth * 6,
            contentLength ? height - (p + strokeOffset) : p + strokeOffset,
            'h',
            Math.max(0, contentLength - decoWidth * 6),
            'L',
            p + contentLength + height * 0.5,
            contentLength ? height * 0.5 : p + strokeOffset,
            'H',
            width - (p + decoWidth * 6.5)
          ].join(' ')
      },
      {
        type: 'g',
        name: 'deco',
        animated: decoBoxesAnimated,
        style: {
          ...decoBoxesStyle,
          transformOrigin: contentLength ? 'right center' : 'right top',
          skewX: 45
        },
        elements: [
          {
            type: 'svg',
            viewBox: `0 0 ${decoWidth * 5} ${decoWidth * 2}`,
            x: `100% - ${p + decoWidth * 7}`,
            y: contentLength ? `50% - ${strokeOffset}` : p,
            width: decoWidth * 5,
            height: decoWidth * 2,
            elements: horizontalBoxes
          }
        ]
      }
    ]
  }
}

export type { CreateFrameHeaderSettingsProps }
export { createFrameHeaderSettings }
