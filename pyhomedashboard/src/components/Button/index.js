import styled from 'styled-components';

export const Button = ({children, isActive, onClick, pressed}) => {    
    return(
        <Wrapper active={isActive} pressed={pressed}>{children}</Wrapper>
    );
}

const Wrapper = styled.div`
    border-radius: 60px;
    background: #e0e0e0;
    height: 24px;
    ${props => props.pressed ? `box-shadow:  24px 24px 47px #bebebe,
        -24px -24px 47px #ffffff;` : `box-shadow: inset 24px 24px 47px #bebebe,
        inset -24px -24px 47px #ffffff;`
    }
`;