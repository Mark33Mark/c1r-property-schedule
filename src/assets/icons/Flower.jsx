
import React from 'react';

// adapted from https://css-tricks.com/guide-svg-animations-smil/

export const Flower = (props) => (
  <svg
  width={props.width}
  height={props.height}
  viewBox='0 0 320 320'
  fill='none'
  stroke='black'
  strokeLinecap='round'
  xmlns='http://www.w3.org/2000/svg'
>
  <defs>
    <path id='r1'>
      <animate
        id='p1'
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin'
      />
    </path>
    <path id='r2'>
      <animate
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+1s'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+1s'
      />
    </path>
    <path id='r3'>
      <animate
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+2s'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+2s'
      />
    </path>
    <path id='r4'>
      <animate
        id='p1'
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+3s'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+3s'
      />
    </path>
    <path id='r5'>
      <animate
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+4s'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+4s'
      />
    </path>
    <path id='r6'>
      <animate
        attributeName='d'
        values='m160,160l0,0 0,0;m130,110l30,-17 30,17;m130,60l30,-17 30,17;m160,20l0,0 0,0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+5s'
      />
      <animate
        attributeName='stroke-width'
        values='0;4;4;4;0'
        dur='6s'
        repeatCount='indefinite'
        begin='p1.begin+5s'
      />
    </path>
  </defs>

  {/* 1st Ring */}
  <use xlinkHref='#r1' stroke="BlueViolet"/>
  <use
    xlinkHref='#r1'
    transform='rotate(60 160 160)'
    stroke="orange"
  />
  <use
    xlinkHref='#r1'
    transform='rotate(120 160 160)'
    stroke="green"
  />
  <use
    xlinkHref='#r1'
    transform='rotate(180 160 160)'
    stroke="red"
  />
  <use
    xlinkHref='#r1'
    transform='rotate(240 160 160)'
    stroke="purple"
  />
  <use
    xlinkHref='#r1'
    transform='rotate(300 160 160)'
    stroke="blue"
  />

  {/* 2nd Ring */}
  <use
    xlinkHref='#r2'
    transform='rotate(30 160 160)'
    stroke="violet"
  />
  <use
    xlinkHref='#r2'
    transform='rotate(90 160 160)'
    stroke="#00BFFF"
  />
  <use
    xlinkHref='#r2'
    transform='rotate(150 160 160)'
    stroke="#FFEBCD"
  />
  <use
    xlinkHref='#r2'
    transform='rotate(210 160 160)'
    stroke="#FF69B4"
  />
  <use
    xlinkHref='#r2'
    transform='rotate(270 160 160)'
    stroke="#4B0082"
  />
  <use
    xlinkHref='#r2'
    transform='rotate(330 160 160)'
    stroke="#FFD700"
  />
  <use xlinkHref='#r3' stroke='#7FFF00'/>
  <use
    xlinkHref='#r3'
    transform='rotate(60 160 160)'
    stroke="#B22222"
  />

  {/* 3rd Ring */}
  <use
    xlinkHref='#r3'
    transform='rotate(120 160 160)'
    stroke="#F0E68C"
  />
  <use
    xlinkHref='#r3'
    transform='rotate(180 160 160)'
    stroke="#F08080"
  />
  <use
    xlinkHref='#r3'
    transform='rotate(240 160 160)'
    stroke="#ADD8E6"
  />
  <use
    xlinkHref='#r3'
    transform='rotate(300 160 160)'
    stroke="#FF69B4"
  />

  {/* 4th Ring */}
  <use
    xlinkHref='#r4'
    transform='rotate(30 160 160)'
    stroke="#00BFFF"
  />
  <use
    xlinkHref='#r4'
    transform='rotate(90 160 160)'
    stroke="#BA55D3"
  />
  <use
    xlinkHref='#r4'
    transform='rotate(150 160 160)'
    stroke="#7B68EE"
  />
  <use
    xlinkHref='#r4'
    transform='rotate(210 160 160)'
    stroke="#3CB371"
  />
  <use
    xlinkHref='#r4'
    transform='rotate(270 160 160)'
    stroke="#9370DB"
  />
  <use
    xlinkHref='#r4'
    transform='rotate(330 160 160)'
    stroke="#F0FFFF"
  />

  {/* 5th Ring */}
  <use xlinkHref='#r5' stroke='#FFA07A'/>
  <use
    xlinkHref='#r5'
    transform='rotate(60 160 160)'
    stroke="#6B8E23"
  />
  <use
    xlinkHref='#r5'
    transform='rotate(120 160 160)'
    stroke="#DA70D6"
  />
  <use
    xlinkHref='#r5'
    transform='rotate(180 160 160)'
    stroke="#AFEEEE"
  />
  <use
    xlinkHref='#r5'
    transform='rotate(240 160 160)'
    stroke="#FFDAB9"
  />
  <use
    xlinkHref='#r5'
    transform='rotate(300 160 160)'
    stroke="#DB7093"
  />

  {/* 6th Ring */}
  <use
    xlinkHref='#r6'
    transform='rotate(30 160 160)'
    stroke="#FFA500"
  />
  <use
    xlinkHref='#r6'
    transform='rotate(90 160 160)'
    stroke="#98FB98"
  />
  <use
    xlinkHref='#r6'
    transform='rotate(150 160 160)'
    stroke="#FF4500"
  />
  <use
    xlinkHref='#r6'
    transform='rotate(210 160 160)'
    stroke="#A0522D"
  />
  <use
    xlinkHref='#r6'
    transform='rotate(270 160 160)'
    stroke="#6A5ACD"
  />
  <use
    xlinkHref='#r6'
    transform='rotate(330 160 160)'
    stroke="#00BFFF"
  />
</svg>
)
