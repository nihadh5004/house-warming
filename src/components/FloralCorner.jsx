import { useId } from "react";

export default function FloralCorner({ position = "top-left" }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`floral-corner floral-corner--${position}`} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
    <defs><radialGradient id={`${id}-petal`} cx=".4" cy=".25" r=".8"><stop stopColor="#f5e3e4" /><stop offset=".6" stopColor="#dfb9c4" /><stop offset="1" stopColor="#bc899c" /></radialGradient><linearGradient id={`${id}-leaf`}><stop stopColor="#b6b799" /><stop offset="1" stopColor="#7b8565" /></linearGradient></defs>
    <g fill="none" stroke="#989575" strokeWidth="1.2"><path d="M20 232C85 165 90 84 160 12M45 198C115 200 162 176 220 151M66 159C24 129 16 83 16 40M96 104C143 112 170 88 201 55M85 134C127 148 161 140 177 124" /></g>
    {[[32,213,-42],[54,181,26],[73,153,-25],[88,116,30],[104,85,-30],[127,51,25],[151,23,-20],[102,194,70],[145,182,25],[180,168,65],[210,153,30],[46,132,-60],[23,101,10],[17,62,-20],[144,102,65],[177,78,25],[122,142,80],[160,131,45]].map(([x,y,r], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 0C-15-3-19-18-17-30-4-23 4-12 0 0Z" fill={`url(#${id}-leaf)`} opacity=".85" /><path d="M0 0-15-26" stroke="#7d8265" strokeWidth=".6" fill="none" /></g>)}
    {[[71,163,1],[144,67,.78],[27,72,.56]].map(([x,y,s], i) => <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>{[0,60,120,180,240,300].map(angle => <g key={angle} transform={`rotate(${angle})`}><path d="M0 2C-30-8-32-37-15-38 2-44 17-23 0 2Z" fill={`url(#${id}-petal)`} stroke="#c49ba7" strokeWidth=".5" /><path d="M-1-3c-7-10-12-19-13-29" stroke="#f3dce1" strokeWidth="1" fill="none" /></g>)}<circle r="8" fill="#b8a477" />{[0,45,90,135,180,225,270,315].map(angle => <g key={angle} transform={`rotate(${angle})`}><path d="M0 0v-10" stroke="#827552" strokeWidth=".8" /><circle cy="-10" r="1.6" fill="#a68b53" /></g>)}<circle r="3.5" fill="#806a48" /></g>)}
    <g fill="#d8afbc"><ellipse cx="186" cy="132" rx="4" ry="9" transform="rotate(45 186 132)" /><ellipse cx="211" cy="122" rx="4" ry="8" transform="rotate(35 211 122)" /><ellipse cx="56" cy="50" rx="4" ry="9" transform="rotate(20 56 50)" /></g>
  </svg>;
}
