import { useRef } from 'react'
import CustomButton from 'components/button'
import CustomLink from 'components/link'
import gsap from 'gsap'
import { Container, Logo, sizes } from 'styles'
import {
  LetterWrapper,
  LogoWrapper,
  MainLogo,
  NavLinks,
  NavWrapper,
  PageHeader,
} from './styles'
import {
  useIsomorphicLayoutEffect,
  useMedia,
  useStartTyping,
  useWindowSize,
} from 'react-use'

const Nav = ({ logo }) => {
  let sectionRef = useRef(null)
  let logoRef = useRef(null)
  let fontRef = useRef(null)
  let linksRef = useRef(null)
  let letterRef = useRef([])

  const root = useRef()
  const { width } = useWindowSize()

  const isMobile = useMedia(`(min-width: ${sizes.tiny})px`) || false

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline()

      // we have to do this to prevent the flicker from happening
      // on initial page load
      tl.set(sectionRef, { opacity: 1 })
      tl.set("#logo", { opacity: 1 })

      tl.from(
        fontRef.querySelectorAll('div'),
        {
          yPercent: 100,
          ease: 'power3.inOut',
          stagger: 0.05,
          delay: 0.5,
        },
        0
      ).from(
        linksRef.querySelectorAll('li'),
        {
          opacity: 0,
          ease: 'power3.inOut',
          stagger: 0.05,
          delay: 0.5,
        },
        0
      )
    })

    return () => ctx.revert()
  }, [])

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#home',
          start: '1px top',
          end: 'bottom center',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      tl.to(logoRef, { top: '0%', left: '0%', transform: 'unset' }, 0).to(
        fontRef,
        {
          fontSize: '24px',
        },
        0
      )
    })

    return () => ctx.revert()
  }, [width])

  return (
    <>
      <PageHeader ref={(el) => (sectionRef = el)}>
        <Container>
          <NavWrapper>
            <div />
            <NavLinks ref={(el) => (linksRef = el)}>
              <li>
                <CustomLink to="#about" className="about">
                  About
                </CustomLink>
              </li>
              <li>
                <CustomButton href="/contact">Contact</CustomButton>
              </li>
            </NavLinks>
          </NavWrapper>
        </Container>
      </PageHeader>

      <MainLogo ref={(el) => (logoRef = el)}>
        <Logo ref={(el) => (fontRef = el)} id="logo">
          {logo.split('').map((letter, index) => (
            <LetterWrapper key={index}>
              {letter === ' ' ? '\u00A0' : letter}
            </LetterWrapper>
          ))}
        </Logo>
      </MainLogo>
    </>
  )
}

export default Nav
