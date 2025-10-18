const WIDTH = 1584;
const HEIGHT = 396;
const LEFT_WIDTH = Math.floor(WIDTH * 0.75);
const RIGHT_WIDTH = WIDTH - LEFT_WIDTH;

const ICONS_DIR = "/icons";

const FALLBACK_VARIANTS = [
  "original",
  "plain",
  "wordmark",
  "original-wordmark",
  "placeholder",
];

export async function getIconSvg(tech: string): Promise<string> {
  try {
    const response = await fetch(`${ICONS_DIR}/${tech}/${tech}-original.svg`);
    if (response.ok) {
      const raw = await response.text();
      return raw.replace(/<svg[^>]*>|<\/svg>/gi, "").trim();
    }
  } catch {}
  console.warn(`⚠️ Missing icon for '${tech}'`);
  return "";
}
class Cell {
  data: string | undefined;
  active: boolean;
  x = 0;
  y = 0;

  constructor(data: string | undefined) {
    this.data = data;
    this.active = data !== undefined;
  }

  setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Matrix {
  x0: number;
  y0: number;
  rows: number;
  cols: number;
  cells: Cell[] = [];
  icon_size: number;
  total_width: number;
  total_height: number;

  constructor(
    x0: number,
    y0: number,
    rows: number,
    cols: number,
    cells: Cell[],
    icon_size: number,
    total_width: number,
    total_height: number
  ) {
    this.x0 = x0;
    this.y0 = y0;
    this.rows = rows;
    this.cols = cols;
    this.cells = cells;
    this.icon_size = icon_size;
    this.total_width = total_width;
    this.total_height = total_height;
  }

  execute = () => {
    const activeCells: number = this.cells.reduce(
      (count, cell) => count + (cell.active ? 1 : 0),
      0
    );
    let columnGap = 25;
    let rowGap = 0;

    rowGap = (this.total_height - this.rows * this.icon_size) / 4;

    let incrementCols = this.icon_size + columnGap;
    let incrementRows = this.icon_size + rowGap;
    const xStart =
      LEFT_WIDTH +
      (this.total_width - this.cols * incrementCols) / 2 +
      columnGap / 2;

    const yStart =
      this.y0 +
      (this.total_height - this.rows * incrementRows) / 2 +
      rowGap / 2;

    for (let i = 0; i < this.rows; i++) {
      let y_coord = yStart + incrementRows * i;
      for (let j = 0; j < this.cols; j++) {
        const index = j + i * (this.rows + Math.abs(this.cols - this.rows));
        this.cells[index]?.setCoordinates(xStart + incrementCols * j, y_coord);
      }
    }
  };

  async getSvg(): Promise<string> {
    let outputSvg = "";

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const index = j + i * (this.rows + Math.abs(this.cols - this.rows));
        const cell: Cell = this.cells[index];
        if (!cell || !cell.active) continue;

        const innerSvg = await getIconSvg(cell.data ?? "");
        outputSvg += `
        <g transform="translate(${cell.x},${cell.y})">
          <g transform="scale(${this.icon_size / 128})">
            ${innerSvg}
          </g>
        </g>
      `;
      }
    }

    return outputSvg;
  }
}

const transformInput = (techStackInput: (string | undefined)[]) => {
  // Clone to avoid mutating frozen Redux data
  let techStack = [...techStackInput];

  let techStackMatrix: (string | undefined)[][];
  if (techStack.length <= 4) {
    if (techStack.length === 1) {
      techStack = [undefined, techStack[0], undefined];
    } else if (techStack.length === 2) {
      techStack = [undefined, techStack[0], techStack[1], undefined];
    }
    const empty_row: undefined[] = techStack.map(() => undefined);
    techStackMatrix = [empty_row, techStack, empty_row];
  } else {
    while (techStack.length < 12) techStack.push(undefined);
    techStackMatrix = [
      techStack.slice(0, 4),
      techStack.slice(4, 8),
      techStack.slice(8, 12),
    ];
  }
  return techStackMatrix;
};

const createCells = (techStackMatrix: (string | undefined)[][]): Cell[] => {
  const cells: Cell[] = techStackMatrix.flatMap((row) =>
    row.map((data) => new Cell(data))
  );
  return cells;
};

const createHead = (
  colors: { left_bg: string; right_bg: string; text_color: string },
  fullName: string,
  jobTitle: string,
  fontSize: number
): string => {
  const { left_bg, right_bg, text_color } = colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <style>
      @font-face {
        font-family: 'Poppins';
        src: url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2') format('woff2');
      }
      text { font-family: 'Poppins', sans-serif; }
    </style>
  </defs>

  <rect width="${LEFT_WIDTH}" height="${HEIGHT}" fill="${left_bg}" />
  <rect x="${LEFT_WIDTH}" width="${RIGHT_WIDTH}" height="${HEIGHT}" fill="${right_bg}" />

  <text x="${LEFT_WIDTH - 20}" y="${
    HEIGHT / 2 - fontSize * 10
  }" fill="${text_color}"
        text-anchor="end" font-weight="700" font-size="${
          fontSize * 20
        }px">${fullName}</text>
  <text x="${LEFT_WIDTH - 20}" y="${
    HEIGHT / 2 + fontSize * 18
  }" fill="${text_color}"
        text-anchor="end" font-size="${fontSize * 20}px">${jobTitle}</text>`;
};
// Main Entry

export async function createSvg(
  techStack: (string | undefined)[],
  x0: number,
  y0: number,
  icon_size: number,
  total_width: number,
  total_height: number,
  colors: { left_bg: string; right_bg: string; text_color: string },
  fullName: string,
  jobTitle: string,
  fontSize: number
): Promise<string> {
  let svg = createHead(colors, fullName, jobTitle, fontSize);
  const techStackMatrix = transformInput(techStack);
  const cells = createCells(techStackMatrix);

  const matrix = new Matrix(
    x0,
    y0,
    techStackMatrix.length,
    techStackMatrix[0].length,
    cells,
    icon_size,
    total_width,
    total_height
  );

  matrix.execute();
  svg += await matrix.getSvg();
  svg += "\n</svg>";
  return svg;
}
export async function generateBannerPng(props: {
  techStack: string[];
  colors: { left_bg: string; right_bg: string; text_color: string };
  fullName: string;
  jobTitle: string;
  fontSize: number;
}) {
  const svg = await createSvg(
    props.techStack,
    LEFT_WIDTH,
    0,
    62,
    RIGHT_WIDTH,
    HEIGHT,
    props.colors,
    props.fullName,
    props.jobTitle,
    props.fontSize
  );

  const cleanSvg = svg.replace(/\n/g, "").trim();
  const encodedSvg =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(cleanSvg);

  const img = new Image();
  img.crossOrigin = "anonymous"; // prevent potential CORS issues
  img.src = encodedSvg;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1584;
  canvas.height = 396;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const link = document.createElement("a");
  link.download = "linkedin-banner.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
