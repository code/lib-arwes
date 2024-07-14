/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, type ReactElement } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtom } from 'jotai'
import {
  Page,
  Codepen,
  CollageFrame,
  DashboardSpeed,
  Github,
  Discord,
  Twitter,
  Keyframes,
  KeyframesMinus,
  SoundHigh,
  SoundOff,
  Menu as MenuIcon,
  Heart
} from 'iconoir-react'
import { cx, AnimatorGeneralProvider, Animator, transition, flicker, fade } from '@arwes/react'

import { atomMotion, atomAudio } from '@app/utils'
import { hiddenLG, hiddenSMDown, hiddenLGDown, hiddenXLDown } from '@app/styles'
import { type HeaderLayoutProps, HeaderLayout, Logo, LogoType, Menu, MenuItem } from '@app/ui'
import { Version } from '../Version'
import { ModalNavigate } from '../ModalNavigate'
import * as classes from './Header.css'

interface HeaderProps extends HeaderLayoutProps {}

const Header = (props: HeaderProps): ReactElement => {
  const router = useRouter()
  const [motion, setMotion] = useAtom(atomMotion)
  const [audio, setAudio] = useAtom(atomAudio)
  const [showModal, setShowModal] = useState(false)

  // The pages where the page content elements are floating instead
  // of being container by containers.
  const isFloatingRoutePath = router.asPath === '/'

  const leftItemAnimation = isFloatingRoutePath ? fade() : [flicker(), transition('x', -4, 0, 0)]
  const rightItemAnimation = isFloatingRoutePath ? fade() : [flicker(), transition('x', 4, 0, 0)]

  return (
    <>
      <HeaderLayout
        {...props}
        hasFrame={!isFloatingRoutePath}
        left={
          <Animator combine manager="stagger">
            <Animator>
              <Logo animated={flicker()}>
                {!isFloatingRoutePath && (
                  <Animator merge>
                    <LogoType className={hiddenSMDown} animated={leftItemAnimation} />
                  </Animator>
                )}
              </Logo>
            </Animator>
            {!isFloatingRoutePath && (
              <Animator combine manager="stagger" duration={{ stagger: 0.03 }}>
                <Menu>
                  <Animator>
                    <MenuItem
                      className={cx(classes.menuItem, hiddenSMDown)}
                      active={router.asPath.startsWith('/docs')}
                      animated={leftItemAnimation}
                    >
                      <Link href="/docs" title="Go to Documentation">
                        <Page /> <span className={hiddenXLDown}>Docs</span>
                      </Link>
                    </MenuItem>
                  </Animator>
                  <Animator>
                    <MenuItem
                      className={cx(classes.menuItem, hiddenSMDown)}
                      active={router.asPath.startsWith('/demos')}
                      animated={leftItemAnimation}
                    >
                      <Link href="/demos" title="Go to Demos">
                        <CollageFrame /> <span className={hiddenXLDown}>Demos</span>
                      </Link>
                    </MenuItem>
                  </Animator>
                  <Animator>
                    <MenuItem
                      className={cx(classes.menuItem, hiddenSMDown)}
                      animated={leftItemAnimation}
                    >
                      <a href="/play" title="Go to Playground">
                        <Codepen /> <span className={hiddenXLDown}>Play</span>
                      </a>
                    </MenuItem>
                  </Animator>
                  <Animator>
                    <MenuItem
                      className={cx(classes.menuItem, hiddenSMDown)}
                      animated={leftItemAnimation}
                    >
                      <a href="/perf" title="Go to Performance">
                        <DashboardSpeed /> <span className={hiddenXLDown}>Perf</span>
                      </a>
                    </MenuItem>
                  </Animator>
                </Menu>
              </Animator>
            )}
          </Animator>
        }
        center={
          <>
            {router.asPath.startsWith('/docs') && (
              <Animator>
                <Menu className={hiddenLGDown} animated={flicker()}>
                  <MenuItem
                    className={classes.menuItem}
                    active={router.asPath.includes('/docs/develop')}
                  >
                    <Link href="/docs/develop">Develop</Link>
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    active={router.asPath.includes('/docs/design')}
                  >
                    <Link href="/docs/design">Design</Link>
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    active={router.asPath.includes('/docs/community')}
                  >
                    <Link href="/docs/community">Community</Link>
                  </MenuItem>
                </Menu>
              </Animator>
            )}
          </>
        }
        right={
          <Animator
            combine
            manager={isFloatingRoutePath ? 'parallel' : 'staggerReverse'}
            duration={{ stagger: 0.03 }}
          >
            <Animator>
              <Version className={hiddenLGDown} animated={rightItemAnimation} />
            </Animator>
            <Menu className={hiddenLGDown}>
              <Animator>
                <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                  <a href="https://github.com/sponsors/romelperez" target="sponsor" title="Sponsor">
                    <Heart />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                  <a href="https://github.com/arwes/arwes" target="github" title="Go to Github">
                    <Github />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                  <a href="https://discord.gg/s5sbTkw" target="discord" title="Go to Discord">
                    <Discord />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                  <a href="https://twitter.com/arwesjs" target="twitter" title="Go to Twitter">
                    <Twitter />
                  </a>
                </MenuItem>
              </Animator>
            </Menu>
            <Menu>
              <Animator>
                <MenuItem
                  className={cx(classes.menuItem, hiddenLGDown)}
                  animated={rightItemAnimation}
                >
                  <button
                    className={classes.button}
                    title={motion ? 'Disable motion' : 'Enable motion'}
                    onClick={() => setMotion(!motion)}
                  >
                    {motion ? <Keyframes /> : <KeyframesMinus />}
                  </button>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem
                  className={cx(classes.menuItem, hiddenLGDown)}
                  animated={rightItemAnimation}
                >
                  <button
                    className={classes.button}
                    title={audio ? 'Disable audio' : 'Enable audio'}
                    onClick={() => setAudio(!audio)}
                  >
                    {audio ? <SoundHigh /> : <SoundOff />}
                  </button>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem className={cx(classes.menuItem, hiddenLG)} animated={rightItemAnimation}>
                  <button
                    className={classes.button}
                    title="Navigate"
                    onClick={() => setShowModal((v) => !v)}
                  >
                    <MenuIcon />
                  </button>
                </MenuItem>
              </Animator>
            </Menu>
          </Animator>
        }
      />

      <AnimatorGeneralProvider
        duration={{
          enter: 0.1,
          exit: 0.1,
          stagger: 0.05
        }}
        // TODO: How to handle the rendering on Animations disabled?
        // The root parent <AnimatorGeneralProvider> disables all <Animator>
        // children components, but the modal components depend on the
        // animations enabled.
        disabled={false}
        dismissed={false}
      >
        <Animator root active={showModal}>
          <ModalNavigate onClose={() => setShowModal(false)} />
        </Animator>
      </AnimatorGeneralProvider>
    </>
  )
}

export type { HeaderProps }
export { Header }
