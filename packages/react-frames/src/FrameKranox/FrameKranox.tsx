import React, { useMemo } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameKranoxSettingsProps, createFrameKranoxSettings } from '@arwes/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameKranoxProps = Omit<FrameBaseProps, 'settings'> & CreateFrameKranoxSettingsProps

const FrameKranox = memo((props: FrameKranoxProps): JSX.Element => {
  const {
    styled,
    animated,
    padding,
    strokeWidth,
    bgStrokeWidth,
    squareSize,
    smallLineLength,
    largeLineLength
  } = props

  const settings = useMemo(
    () =>
      createFrameKranoxSettings({
        styled,
        animated,
        padding,
        strokeWidth,
        bgStrokeWidth,
        squareSize,
        smallLineLength,
        largeLineLength
      }),
    [
      styled,
      animated,
      padding,
      strokeWidth,
      bgStrokeWidth,
      squareSize,
      smallLineLength,
      largeLineLength
    ]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framekranox', props.className)}
      settings={settings}
    />
  )
})

export type { FrameKranoxProps }
export { FrameKranox }
