import styled from 'styled-components';

export const Widget = ({title, children}) => {
    return(
        <Wrapper>
            <Title>{title}</Title>
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const Title = styled.div`
    display: flex;
    justify-content: start;
    margin: 8px 0;
    font-family: 'Secular One', sans-serif;
`;