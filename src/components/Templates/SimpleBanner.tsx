type BannerProps = {
  width?: number;
  height?: number;
  colors: {
    left: string;
    right: string;
    text: string;
  };
  fontFamily: string;
  fontBase64: string | null;
  fullName: string;
  fullNameIsBold: boolean;
  jobTitle: string;
  jobTitleIsBold: boolean;
  fontSizeMain?: number;
  fontSizeSub?: number;
  letterSpacingMain?: number;
  letterSpacingSub?: number;
  extra?: React.ReactNode;
};

export function SimpleBanner({
  width = 1584,
  height = 396,
  colors,
  fontFamily = "default",
  fontBase64 = "",
  fullName,
  fullNameIsBold,
  jobTitle,
  jobTitleIsBold,
  fontSizeMain = 50,
  fontSizeSub = 30,
  letterSpacingMain = 11,
  letterSpacingSub = 4,
  extra,
}: BannerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className="responsive-banner"
    >
      <defs>
        <style>{`
          @font-face {
            font-family: '${fontFamily}';
            src: url("${fontBase64}") format('truetype');
          }
          text {
            font-family: '${fontFamily}', sans-serif;
          }
      `}</style>

        <linearGradient id="Gradient2" x1="1" x2="0" y1="0" y2="0">
          <stop offset="0%" stopColor={colors.left} />
          <stop offset="100%" stopColor={colors.right} />
        </linearGradient>

        <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="12" dy="7" stdDeviation="2" floodOpacity="0.16" />
        </filter>
      </defs>

      <rect width={width} height={height} fill={colors.left} />
      <rect width={width} height={height} fill="url(#Gradient2)" />
      <rect
        width={width}
        height={height}
        fill="url(#light2)"
        filter="url(#softBlur)"
      />

      <g>
        <text
          x={width / 2}
          y={height / 2 - 10}
          fill={colors.text}
          textAnchor="middle"
          fontSize={fontSizeMain}
          letterSpacing={letterSpacingMain}
          fontFamily={fontFamily}
          fontWeight={fullNameIsBold ? 700 : 400}
          style={{
            fontVariationSettings: `'wght' ${fullNameIsBold ? 700 : 400}`,
          }}
        >
          {fullName}
        </text>

        <text
          x={width / 2}
          y={height / 2 + 40}
          fill={colors.text}
          textAnchor="middle"
          fontSize={fontSizeSub}
          letterSpacing={letterSpacingSub}
          fontFamily={fontFamily}
          fontWeight={jobTitleIsBold ? 700 : 400}
          style={{
            fontVariationSettings: `'wght' ${jobTitleIsBold ? 700 : 400}`,
          }}
        >
          {jobTitle}
        </text>
      </g>

      {extra}
    </svg>
  );
}
