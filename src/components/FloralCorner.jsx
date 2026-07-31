export default function FloralCorner({ position = "top-left" }) {
  return (
    <svg
      className={`floral-corner floral-corner--${position}`}
      viewBox="0 0 240 240"
      aria-hidden="true"
      focusable="false"
    >
      <path className="floral-stem" d="M16 220C57 173 84 126 122 31" />
      <path className="floral-stem" d="M47 181c35-4 65-24 83-54" />
      <path className="floral-stem" d="M73 139c-3-28 5-54 26-77" />
      <ellipse className="floral-leaf floral-leaf--sage" cx="58" cy="176" rx="18" ry="9" transform="rotate(-30 58 176)" />
      <ellipse className="floral-leaf floral-leaf--sage" cx="87" cy="145" rx="20" ry="10" transform="rotate(35 87 145)" />
      <ellipse className="floral-leaf floral-leaf--plum" cx="100" cy="111" rx="19" ry="9" transform="rotate(-42 100 111)" />
      <ellipse className="floral-leaf floral-leaf--sage" cx="119" cy="77" rx="17" ry="8" transform="rotate(38 119 77)" />
      <g transform="translate(130 122)">
        <circle className="petal petal--rose" cx="0" cy="-15" r="14" />
        <circle className="petal petal--rose" cx="14" cy="-5" r="14" />
        <circle className="petal petal--rose" cx="9" cy="12" r="14" />
        <circle className="petal petal--rose" cx="-9" cy="12" r="14" />
        <circle className="petal petal--rose" cx="-14" cy="-5" r="14" />
        <circle className="flower-center" r="7" />
      </g>
      <g transform="translate(119 44) scale(.72)">
        <circle className="petal petal--lavender" cx="0" cy="-15" r="14" />
        <circle className="petal petal--lavender" cx="14" cy="-5" r="14" />
        <circle className="petal petal--lavender" cx="9" cy="12" r="14" />
        <circle className="petal petal--lavender" cx="-9" cy="12" r="14" />
        <circle className="petal petal--lavender" cx="-14" cy="-5" r="14" />
        <circle className="flower-center" r="7" />
      </g>
    </svg>
  );
}
