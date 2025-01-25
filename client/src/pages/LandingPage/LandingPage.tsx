
import { StyledBox, StyledContainer, StyledLogo, StyledText } from './style'

const LandingPage = () => {
  const text = 'Welcome to Virtual Coin'
  return (
    <StyledContainer>
      <StyledBox>
        <StyledLogo>
          <img src="alpha.png" alt="logo" />
        </StyledLogo>

        <StyledText>
          {text.split('').map((char, i) => (
            <span key={i} style={{ '--i': i}}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </StyledText>
        <div>
          login
        </div>
      </StyledBox>

    </StyledContainer>
  )
}

export default LandingPage
