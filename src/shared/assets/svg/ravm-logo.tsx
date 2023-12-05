import { FC } from "react";
import { RavnLogoProps } from "./ravm-logo.type";

const RavnLogo: FC<RavnLogoProps> = (props) => {
  const {
    isShowR = true,
    isShowA = true,
    isShowV = true,
    isShowN = true,
  } = props;

  const getWidth = () => {
    const TOTAL_WIDTH = 148;
    const TOTAL_LETTERS = 4;
    const WIDTH_PER_LETTER = TOTAL_WIDTH / TOTAL_LETTERS;

    let key: keyof RavnLogoProps;
    let totalLettersShowed = 0;

    // Searching how many letters are shown
    for (key in props) {
      if (props.hasOwnProperty(key)) {
        const valor = props[key];
        if (valor) totalLettersShowed += 1;
      }
    }

    return WIDTH_PER_LETTER * totalLettersShowed;
  };

  return (
    <svg
      className="flex justify-center items-center"
      width={`${getWidth()}`}
      height="33"
      viewBox={`0 0 ${getWidth()} 33`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- N --> */}
      {isShowN && (
        <path
          d="M147.001 0.000976562H139.097V21.1196L120.763 0.00198534H112.859V32.9979H120.763V11.8853L139.095 33.001L139.098 32.9979H147.001V0.000976562Z"
          fill="white"
          opacity="1"
        />
      )}

      {/* <!-- V --> */}
      {isShowV && (
        <path
          d="M94.3156 33H85.8811L73.0273 0H81.4608L90.0978 22.1056L98.7348 0H107.169L94.3156 33Z"
          fill="white"
          opacity="1"
        />
      )}

      {/* <!-- A --> */}
      {isShowA && (
        <path
          d="M64.4406 0H56.0061L43.1523 33H51.5868L60.2238 10.8934L68.8598 33H77.2943L64.4406 0Z"
          fill="white"
          opacity="1"
        />
      )}

      {/* <!-- R --> */}
      {isShowR && (
        <path
          d="M28.8517 22.5101C33.8779 21.1825 37.5735 16.7376 37.5735 11.4583C37.5735 5.23989 32.4481 0.178564 26.0589 0.00605301V0H7.64995H0L6.34956 7.63688H7.64995V7.6389H25.7781C27.9333 7.66916 29.671 9.36703 29.671 11.4573C29.671 13.5668 27.902 15.2768 25.7197 15.2768H22.8382H12.7002L27.4355 33H37.5724L28.8517 22.5101Z"
          fill="rgba(255, 255, 255, 1)"
          opacity="1"
        />
      )}

      {/* <!-- Circle --> */}
      {isShowR && (
        <path
          d="M8.53644 32.9974C11.4172 32.9974 13.7526 30.7402 13.7526 27.9557C13.7526 25.1713 11.4172 22.9141 8.53644 22.9141C5.65565 22.9141 3.32031 25.1713 3.32031 27.9557C3.32031 30.7402 5.65565 32.9974 8.53644 32.9974Z"
          fill="rgba(255, 255, 255, 1)"
          opacity="1"
        />
      )}
    </svg>
  );
};

export default RavnLogo;
