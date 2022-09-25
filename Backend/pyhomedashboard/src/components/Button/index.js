import styled from 'styled-components';

export const Button = ({children, isActive, onClick, pressed}) => {    
    return(
        <Wrapper onClick={onClick} active={isActive} pressed={pressed}>{children}</Wrapper>
    );
}

const Wrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #274941;
    height: 60px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
`;