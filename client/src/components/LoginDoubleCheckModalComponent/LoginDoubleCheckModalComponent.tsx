import { useState } from "react"
import { StyledBox, StyledBtns, StyledClear, StyledContainer, StyledKeyPad, StyledPassword, StyledPasswordSlot, StyledSubmit, StyledZero } from "./style";


const LoginDoubleCheckModalComponent = () => {
    // const [password, setPassword] = useState<string>('')
    const [password, setPassword] = useState<string[]>(['', '', '', '']);
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    // const handleKeyClick = (digit: string) => {
    //     if (password.length < 4) {
    //       setPassword(password + digit);
    //     }
    //   };
    // const handleClear = () => {
    //   setPassword('');
    // };

    const handleKeyClick = (digit: string) => {
        if (currentIndex < 4) {
            const newPassword = ["", "", "", ""];
            newPassword[currentIndex] = digit; // 현재 위치에 숫자 입력
            setPassword(newPassword);
            setCurrentIndex(currentIndex + 1); // 다음 위치로 이동
        }
    };

      const handleClear = () => {
        setPassword(['', '', '', '']);
        setCurrentIndex(0);
      };
    
    //   TODO 2차 비밀번호 입력 폼처리
      
      
  return (
    <StyledContainer>
      <StyledBox className="">
        <h1>2차 비밀번호</h1>
        <StyledPassword>
        {password.map((char, i) => (
            <StyledPasswordSlot key={i}>
              <p>{char !== "" ? char : "•"}</p> 
            </StyledPasswordSlot>
          ))}
        </StyledPassword>

        <StyledKeyPad>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <StyledBtns key={num} onClick={() => handleKeyClick(num.toString())}>
              {num}
            </StyledBtns>
          ))}
          <StyledClear onClick={handleClear}>Clear</StyledClear>
          <StyledBtns onClick={() => handleKeyClick('0')}>0</StyledBtns>
          <StyledSubmit>확인</StyledSubmit>
        </StyledKeyPad>
      </StyledBox>
    </StyledContainer>
  )
}

export default LoginDoubleCheckModalComponent
