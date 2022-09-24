import styled from 'styled-components';

export const Toggle = ({isOn, handleToggle}) => {
    return(
        <Wrapper onClick={handleToggle}>
            <InnerWrapper isOn={isOn} />
            <InnerTextWrapper>
                <div>Off</div>
                <div>On</div>
            </InnerTextWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #274941;
    height: 60px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    `;
    
const InnerWrapper = styled.div`
    background-color: #25bf63;
    width: 100%;
    height: 100%;
    position: absolute;
    left: ${props => props.isOn ? '-50%' : '50%'};
    
    transition: all 0.2s ease-in-out;
    margin: 0px;
`;

const InnerTextWrapper = styled.div`
    width: 100%;
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 10;
    color: #FFFFFF;
    font-weight: bold;
`;

