import styled from 'styled-components';

const arrowSize = 24;
const height = arrowSize / 3;

export const Arrow = styled.div`
    height: ${arrowSize}px;
    position: absolute;
    width: ${arrowSize}px;

    &[data-placement*="bottom"] {
        height: ${height}px;
        left: 0;
        margin-top: -${height - 2}px;
        top: 0;
        width: ${arrowSize}px;

        &::before {
            border-color: transparent transparent #fff transparent;
            border-width: 0 ${arrowSize / 2}px ${height}px ${arrowSize / 2}px;
        }
    }

    &[data-placement*="top"] {
        bottom: 0;
        height: ${height}px;
        left: 0;
        margin-bottom: -${height - 2}px;
        width: ${arrowSize / 2}px;

        &::before {
            border-color: #fff transparent transparent transparent;
            border-width: ${height}px ${arrowSize / 2}px 0 ${arrowSize / 2}px;
        }
    }

    &[data-placement*="right"] {
        height: ${arrowSize}px;
        left: 0;
        margin-left: -${height - 2}px;
        width: ${height}px;

        &::before {
            border-color: transparent #fff transparent transparent;
            border-width: ${arrowSize / 2}px ${height}px ${arrowSize / 2}px 0;
        }
    }

    &[data-placement*="left"] {
        height: ${arrowSize}px;
        margin-right: -${height - 2}px;
        right: 0;
        width: ${height}px;

        &::before {
            border-color: transparent transparent transparent #fff;
            border-width: ${arrowSize / 2}px 0 ${arrowSize / 2}px ${height}px;
        }
    }

    &::before {
        border-style: solid;
        content: "";
        display: block;
        height: 0;
        margin: auto;
        width: 0;
    }
`;
