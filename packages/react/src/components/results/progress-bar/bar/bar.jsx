import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  p {
    color: ${props => (props.main ? 'rgb(0,0,0)' : 'rgb(87,102,110)')};
    margin: 0;
    text-align: right;
    width: 8.5rem;
  }
`;

const Progress = styled.div `
  background-color: rgb(220,220,220);
  border-radius: 4rem;
  height: 0.55rem;
  width: 100%;
`;

const Bar = styled.div `
  background: linear-gradient(to right, ${props => props.color}, ${props => props.lightenColor || props.color} 50%);
  border-radius: 4rem;
  height: 0.55rem;
  width: ${props => props.percent}%;
`;

const bar = ({ main, color, percent, numbers }) => {
    const rgb2hex = rgb => {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? `${
            (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
        }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
        }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}` : '';
    };

    const LightenDarkenColor = (col, amt) => {
        let usePound = false;
        if (col[0] === '#') {
            col = col.slice(1);
            usePound = true;
        }

        const isOk = /(^[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(col);

        if (!isOk) {
            col = rgb2hex(col);
            usePound = true;
        }

        const num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    };

    return (
        <Container main={main}>
            <Progress>
                {main ? <Bar color={color} percent={percent} lightenColor={LightenDarkenColor(color, 80)} /> : <Bar color={color} percent={percent} />}
            </Progress>
            <p>{numbers}</p>
        </Container>
    );
};

export default bar;
