interface IconProps {
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export const HasNotification = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C15.3137 4 18 6.68624 18 9.99995C18 11.9131 18 13.8341 18 15C18 18 20 19 20 19L4 19C4 19 6 18 6 15C6 13.8341 6 11.9131 6 9.99995C6 6.68624 8.68629 4 12 4V4Z"
        stroke="#18181B"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 4L12 3" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19" stroke="#18181B" strokeWidth="2" />
      <circle cx="22" cy="2" r="2" fill="#FF3B30" />
    </svg>
  );
};

export const Notification = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C15.3137 4 18 6.68624 18 9.99995C18 11.9131 18 13.8341 18 15C18 18 20 19 20 19L4 19C4 19 6 18 6 15C6 13.8341 6 11.9131 6 9.99995C6 6.68624 8.68629 4 12 4V4Z"
        stroke="#18181B"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 4L12 3" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19" stroke="#18181B" strokeWidth="2" />
    </svg>
  );
};

export const NextArrow = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 18L15.2929 12.7071C15.6834 12.3166 15.6834 11.6834 15.2929 11.2929L10 6"
        stroke="#A1A1AA"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const PrevArrow = ({ className, onClick }: IconProps) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12L3 12M9 6L3.35355 11.6464C3.15829 11.8417 3.15829 12.1583 3.35355 12.3536L9 18"
        stroke="#18181B"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const DownArrow = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 10L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929L18 10"
        stroke="#A1A1AA"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Modification = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_527_14166)">
        <rect x="5" y="5" width="42" height="42" rx="21" fill="white" shape-rendering="crispEdges" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.0858 17.9142C30.8668 17.1332 32.1332 17.1332 32.9142 17.9142L34.0858 19.0858C34.8668 19.8668 34.8668 21.1332 34.0858 21.9142L23.9282 32.0718C23.649 32.351 23.2934 32.5413 22.9062 32.6188L18.7942 33.4412C18.6542 33.4692 18.5308 33.3458 18.5588 33.2058L19.3812 29.0938C19.4587 28.7066 19.649 28.351 19.9282 28.0718L30.0858 17.9142Z"
          stroke="#18181B"
          stroke-width="2"
        />
        <path d="M28.5 19.5L32.5 23.5" stroke="#18181B" stroke-width="2" />
      </g>
      <defs>
        <filter
          id="filter0_d_527_14166"
          x="0"
          y="0"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_527_14166" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_527_14166" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const Setting = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.2842 2.28955C10.4234 2.28955 9.6591 2.84041 9.38688 3.6571L8.97183 4.90223C8.92767 5.0347 8.82974 5.14189 8.70414 5.20291C8.37693 5.3619 8.06292 5.54382 7.7642 5.74657C7.64848 5.82512 7.50647 5.85648 7.36945 5.82844L6.08221 5.56502C5.23883 5.39244 4.37963 5.77889 3.9492 6.52442L3.23282 7.76522C2.80239 8.51075 2.89731 9.44806 3.46846 10.0922L4.34061 11.0757C4.43317 11.1801 4.47705 11.3183 4.46717 11.4575C4.45445 11.6367 4.44798 11.8176 4.44798 12.0001C4.44798 12.1825 4.45445 12.3635 4.46717 12.5427C4.47705 12.6819 4.43317 12.8201 4.34061 12.9245L3.46846 13.908C2.89731 14.5521 2.80239 15.4894 3.23282 16.2349L3.9492 17.4758C4.37963 18.2213 5.23882 18.6077 6.08221 18.4351L7.36944 18.1717C7.50646 18.1437 7.64848 18.1751 7.76419 18.2536C8.06291 18.4564 8.37692 18.6383 8.70414 18.7973C8.82974 18.8583 8.92767 18.9655 8.97183 19.098L9.38688 20.3431C9.6591 21.1598 10.4234 21.7106 11.2842 21.7106H12.717C13.5779 21.7106 14.3421 21.1598 14.6144 20.3431L15.0294 19.098C15.0736 18.9655 15.1715 18.8583 15.2971 18.7973C15.6243 18.6383 15.9383 18.4564 16.237 18.2536C16.3527 18.1751 16.4948 18.1437 16.6318 18.1718L17.919 18.4352C18.7623 18.6077 19.6215 18.2213 20.052 17.4758L20.7683 16.235C21.1988 15.4894 21.1039 14.5521 20.5327 13.908L19.6606 12.9246C19.5681 12.8202 19.5242 12.6819 19.5341 12.5428C19.5468 12.3635 19.5533 12.1826 19.5533 12.0001C19.5533 11.8176 19.5468 11.6366 19.5341 11.4574C19.5242 11.3182 19.5681 11.18 19.6606 11.0756L20.5327 10.0922C21.1039 9.44806 21.1988 8.51074 20.7683 7.76521L20.052 6.52441C19.6215 5.77888 18.7623 5.39243 17.919 5.56501L16.6318 5.82842C16.4947 5.85646 16.3527 5.8251 16.237 5.74656C15.9383 5.5438 15.6243 5.36189 15.2971 5.20291C15.1715 5.14189 15.0736 5.0347 15.0294 4.90223L14.6144 3.6571C14.3421 2.84041 13.5779 2.28955 12.717 2.28955H11.2842Z"
        stroke="#18181B"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0006 15.0001C13.6575 15.0001 15.0006 13.6569 15.0006 12.0001C15.0006 10.3432 13.6575 9.00009 12.0006 9.00009C10.3438 9.00009 9.00062 10.3432 9.00062 12.0001C9.00062 13.6569 10.3438 15.0001 12.0006 15.0001Z"
        stroke="#18181B"
        strokeWidth="2"
      />
    </svg>
  );
};

export const Home = ({ className, active }: IconProps) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={active ? '#B94600' : 'none'}
    >
      <path
        d="M3.5 12.5L5.5 10.5M5.5 10.5L12.5 3.5L19.5 10.5M5.5 10.5V20.5C5.5 21.0523 5.94772 21.5 6.5 21.5H9.5M19.5 10.5L21.5 12.5M19.5 10.5V20.5C19.5 21.0523 19.0523 21.5 18.5 21.5H15.5M9.5 21.5C10.0523 21.5 10.5 21.0523 10.5 20.5V16.5C10.5 15.9477 10.9477 15.5 11.5 15.5H13.5C14.0523 15.5 14.5 15.9477 14.5 16.5V20.5C14.5 21.0523 14.9477 21.5 15.5 21.5M9.5 21.5H15.5"
        stroke={active ? '#B94600' : '#71717A'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Chat = ({ className, active }: IconProps) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill={active ? '#B94600' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7837 5.34097L19.9523 5.89654L19.9523 5.89655L20.7837 5.34097ZM20.7837 16.4383L19.9523 15.8828L19.9523 15.8828L20.7837 16.4383ZM19.6112 17.6109L19.0556 16.7794H19.0556L19.6112 17.6109ZM15.125 18.3257L15.1206 17.3257C14.5701 17.3281 14.125 17.7751 14.125 18.3257H15.125ZM15.125 18.3271L16.0194 18.7744C16.0889 18.6355 16.125 18.4824 16.125 18.3271H15.125ZM10.875 18.3271H9.875C9.875 18.4824 9.91115 18.6355 9.98057 18.7744L10.875 18.3271ZM10.875 18.3257H11.875C11.875 17.7751 11.4299 17.3281 10.8794 17.3257L10.875 18.3257ZM6.38883 17.6109L5.83326 18.4424H5.83326L6.38883 17.6109ZM5.21625 16.4383L6.04772 15.8828L6.04772 15.8828L5.21625 16.4383ZM5.21625 5.34097L6.04772 5.89655H6.04772L5.21625 5.34097ZM6.38883 4.1684L6.9444 4.99987V4.99987L6.38883 4.1684ZM19.6112 4.1684L19.0556 4.99987L19.0556 4.99987L19.6112 4.1684ZM22.5 10.8896C22.5 9.41822 22.5012 8.23938 22.4053 7.29691C22.3078 6.33772 22.1014 5.51308 21.6152 4.7854L19.9523 5.89655C20.1823 6.24082 20.3341 6.69827 20.4156 7.49932C20.4988 8.31708 20.5 9.3766 20.5 10.8896H22.5ZM21.6152 16.9939C22.1014 16.2662 22.3078 15.4416 22.4053 14.4824C22.5012 13.5399 22.5 12.3611 22.5 10.8896H20.5C20.5 12.4027 20.4988 13.4622 20.4156 14.28C20.3341 15.081 20.1823 15.5385 19.9523 15.8828L21.6152 16.9939ZM20.1667 18.4424C20.74 18.0593 21.2322 17.5671 21.6152 16.9939L19.9523 15.8828C19.7152 16.2376 19.4105 16.5423 19.0556 16.7794L20.1667 18.4424ZM15.1294 19.3257C16.2709 19.3207 17.221 19.2993 18.0136 19.1898C18.8222 19.078 19.5312 18.867 20.1667 18.4424L19.0556 16.7794C18.7547 16.9805 18.3669 17.1219 17.7397 17.2086C17.0965 17.2975 16.2717 17.3207 15.1206 17.3257L15.1294 19.3257ZM16.125 18.3271V18.3257H14.125V18.3271H16.125ZM14.7889 21.2355L16.0194 18.7744L14.2306 17.8799L13 20.3411L14.7889 21.2355ZM11.2111 21.2355C11.9482 22.7096 14.0518 22.7096 14.7889 21.2355L13 20.3411L13 20.3411L11.2111 21.2355ZM9.98057 18.7744L11.2111 21.2355L13 20.3411L11.7694 17.8799L9.98057 18.7744ZM9.875 18.3257V18.3271H11.875V18.3257H9.875ZM5.83326 18.4424C6.46879 18.867 7.17776 19.078 7.98644 19.1898C8.77905 19.2993 9.72912 19.3207 10.8706 19.3257L10.8794 17.3257C9.72833 17.3207 8.90352 17.2975 8.2603 17.2086C7.63314 17.1219 7.2453 16.9805 6.9444 16.7794L5.83326 18.4424ZM4.38478 16.9939C4.76782 17.5671 5.26001 18.0593 5.83326 18.4424L6.9444 16.7794C6.58953 16.5423 6.28484 16.2376 6.04772 15.8828L4.38478 16.9939ZM3.5 10.8896C3.5 12.3611 3.49879 13.5399 3.59467 14.4824C3.69224 15.4416 3.89857 16.2662 4.38478 16.9939L6.04772 15.8828C5.81768 15.5385 5.66589 15.081 5.5844 14.28C5.50121 13.4622 5.5 12.4027 5.5 10.8896H3.5ZM4.38478 4.7854C3.89857 5.51308 3.69224 6.33772 3.59467 7.29691C3.49879 8.23938 3.5 9.41822 3.5 10.8896H5.5C5.5 9.3766 5.50121 8.31708 5.5844 7.49932C5.66589 6.69827 5.81768 6.24082 6.04772 5.89655L4.38478 4.7854ZM5.83326 3.33693C5.26001 3.71997 4.76782 4.21216 4.38478 4.7854L6.04772 5.89655C6.28484 5.54168 6.58953 5.23699 6.9444 4.99987L5.83326 3.33693ZM11.9375 2.45215C10.4661 2.45215 9.28723 2.45094 8.34476 2.54681C7.38558 2.64439 6.56093 2.85072 5.83326 3.33693L6.9444 4.99987C7.28867 4.76983 7.74612 4.61803 8.54717 4.53655C9.36493 4.45336 10.4244 4.45215 11.9375 4.45215V2.45215ZM14.0625 2.45215H11.9375V4.45215H14.0625V2.45215ZM20.1667 3.33693C19.4391 2.85072 18.6144 2.64439 17.6552 2.54681C16.7128 2.45094 15.5339 2.45215 14.0625 2.45215V4.45215C15.5756 4.45215 16.6351 4.45336 17.4528 4.53655C18.2539 4.61803 18.7113 4.76983 19.0556 4.99987L20.1667 3.33693ZM21.6152 4.78541C21.2322 4.21216 20.74 3.71996 20.1667 3.33693L19.0556 4.99987C19.4105 5.23699 19.7152 5.54168 19.9523 5.89654L21.6152 4.78541Z"
        fill={active ? '#B94600' : '#71717A'}
      />
      <circle cx="8.75" cy="10.75" r="1.25" fill={active ? '#B94600' : '#71717A'} />
      <circle cx="13.25" cy="10.75" r="1.25" fill={active ? '#B94600' : '#71717A'} />
      <circle cx="17.75" cy="10.75" r="1.25" fill={active ? '#B94600' : '#71717A'} />
    </svg>
  );
};

export const User = ({ className, active }: IconProps) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      stroke={active ? '#B94600' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 7.5C16.5 9.70914 14.7091 11.5 12.5 11.5C10.2909 11.5 8.5 9.70914 8.5 7.5C8.5 5.29086 10.2909 3.5 12.5 3.5C14.7091 3.5 16.5 5.29086 16.5 7.5Z"
        stroke={active ? '#B94600' : '#71717A'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 14.5C8.63401 14.5 5.5 17.634 5.5 21.5H19.5C19.5 17.634 16.366 14.5 12.5 14.5Z"
        stroke={active ? '#B94600' : '#71717A'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Comments = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12V17.09C20 17.938 20 18.36 19.874 18.699C19.7738 18.9676 19.617 19.2116 19.4143 19.4143C19.2116 19.617 18.9676 19.7738 18.699 19.874C18.36 20 17.937 20 17.09 20H12C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12Z"
        stroke="black"
        strokeWidth="1.5"
      />
      <path d="M9 11H15M12 15H15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Menu = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9993 17.3334C16.7357 17.3334 17.3327 16.7365 17.3327 16.0001C17.3327 15.2637 16.7357 14.6667 15.9993 14.6667C15.263 14.6667 14.666 15.2637 14.666 16.0001C14.666 16.7365 15.263 17.3334 15.9993 17.3334Z"
        fill="#A1A1AA"
        stroke="#A1A1AA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9993 7.99992C16.7357 7.99992 17.3327 7.40296 17.3327 6.66659C17.3327 5.93021 16.7357 5.33325 15.9993 5.33325C15.263 5.33325 14.666 5.93021 14.666 6.66659C14.666 7.40296 15.263 7.99992 15.9993 7.99992Z"
        fill="#A1A1AA"
        stroke="#A1A1AA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9993 26.6667C16.7357 26.6667 17.3327 26.0697 17.3327 25.3333C17.3327 24.597 16.7357 24 15.9993 24C15.263 24 14.666 24.597 14.666 25.3333C14.666 26.0697 15.263 26.6667 15.9993 26.6667Z"
        fill="#A1A1AA"
        stroke="#A1A1AA"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Calendar = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2222 5H5.77778C4.79594 5 4 5.79594 4 6.77778V19.2222C4 20.2041 4.79594 21 5.77778 21H18.2222C19.2041 21 20 20.2041 20 19.2222V6.77778C20 5.79594 19.2041 5 18.2222 5Z"
        stroke="#71717A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 3V7" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 3V7" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10H20" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Alarm = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#71717A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 7V12.25L16 14" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 2L2 5" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 2L22 5" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Plus = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4V20M20 12L4 12" stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Search = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" stroke="#18181B" strokeWidth="2" />
      <path d="M20 20L17 17" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
