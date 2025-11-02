export const WIDTH = 1584;
export const HEIGHT = 396;
export const LEFT_WIDTH = Math.floor(WIDTH * 0.75);
export const RIGHT_WIDTH = WIDTH - LEFT_WIDTH;

const ICONS_DIR = "/icons";
const FALLBACK_VARIANTS = [
  "original",
  "plain",
  "wordmark",
  "original-wordmark",
  "placeholder",
];

export async function getIconSvg(tech: string): Promise<string> {
  for (const variant of FALLBACK_VARIANTS) {
    const url = `${ICONS_DIR}/${tech}/${tech}-${variant}.svg`;
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const text = await response.text();
      if (text.includes("<html")) continue;

      return text.replace(/<svg[^>]*>|<\/svg>/gi, "").trim();
    } catch {
      /* network failure — try next variant */
    }
  }
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
  row_gap: number;
  column_gap: number;

  constructor(
    x0: number,
    y0: number,
    rows: number,
    cols: number,
    cells: Cell[],
    icon_size: number,
    total_width: number,
    total_height: number,
    row_gap: number,
    column_gap: number
  ) {
    this.x0 = x0;
    this.y0 = y0;
    this.rows = rows;
    this.cols = cols;
    this.cells = cells;
    this.icon_size = icon_size;
    this.total_width = total_width;
    this.total_height = total_height;
    this.row_gap = row_gap;
    this.column_gap = column_gap;
  }

  execute = () => {
    const activeCells: number = this.cells.reduce(
      (count, cell) => count + (cell.active ? 1 : 0),
      0
    );
    let incrementCols = this.icon_size + this.column_gap;
    let incrementRows = this.icon_size + this.row_gap;
    const xStart =
      this.x0 +
      (this.total_width - this.cols * incrementCols) / 2 +
      this.column_gap / 2;

    const yStart =
      this.y0 +
      (this.total_height - this.rows * incrementRows) / 2 +
      this.row_gap / 2;

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
  if (techStackInput.length == 0) return [];
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

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // 32KB chunks

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as any);
  }

  return btoa(binary);
}

export async function loadFontBase64(name: string) {
  if (!name) return null;

  const fontPath = `/fonts/${name}.ttf`;
  const res = await fetch(fontPath, { cache: "no-store" });

  if (res.headers.get("content-type")?.includes("text/html")) {
    console.error("Got HTML instead of font for", fontPath);
    return null;
  }

  const buffer = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(buffer);
  return `data:font/ttf;base64,${base64}`;
}
const createHead = async (
  colors: { left_bg: string; right_bg: string; text_color: string },
  fullName: string,
  jobTitle: string,
  fontSize: number
): Promise<string> => {
  const { left_bg, right_bg, text_color } = colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid meet" width="${WIDTH}" height="${HEIGHT}">
  <defs>

  <style>
      @font-face {
        font-family: 'Montserrat-Variable';
        src: url("${await loadFontBase64("default")}") format("truetype");
      }
    </style>
    <!-- Top light -->
      <radialGradient id="light1" cx="15%" cy="0%" r="15%">
        <stop offset="0%" stop-color="${right_bg}aa" stop-opacity="0.6"></stop>
        <stop offset="100%" stop-color="${right_bg}ff" stop-opacity="0"></stop>
      </radialGradient>

      <!-- Bottom light -->
      <radialGradient id="light2" cx="90%" cy="100%" r="15%">
        <stop offset="0%" stop-color="${right_bg}aa" stop-opacity="0.6"></stop>
        <stop offset="100%" stop-color="${right_bg}ff" stop-opacity="0"></stop>
      </radialGradient>

      <!-- Soft blur -->
      <filter id="softBlur">
        <feGaussianBlur stdDeviation="25"></feGaussianBlur>
      </filter>
  </defs>

  <rect width="100%" height="100%" fill="${left_bg}"/>


<!-- Apply highlight with blur -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#light1)" filter="url(#softBlur)"></rect>

  <!-- Apply shadow with blur -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#light2)" filter="url(#softBlur)"></rect>

  
  <text x="800" y="190" text-anchor="middle" fill="${text_color}"
        text-anchor="end" font-weight="700" font-size="${
          fontSize * 20
        }px"  font-weight="600" letter-spacing="11px">${fullName}</text>
  <text x="800" y="245" text-anchor="middle"  x="${
    LEFT_WIDTH - 20
  }" y="140" fill="${text_color}"
        text-anchor="end" font-size="${
          fontSize * 20 * 0.75
        }px" letter-spacing="5px">${jobTitle}</text>`;
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
  fontSize: number,
  signal?: AbortSignal
): Promise<string> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  let svg = await createHead(colors, fullName, jobTitle, fontSize);

  svg += await createIconsMatrix(
    techStack,
    x0,
    y0,
    icon_size,
    total_width,
    total_height
  );
  svg += "\n</svg>";
  return svg;
}

export async function createIconsMatrix(
  techStack: (string | undefined)[],
  x0: number,
  y0: number,
  icon_size: number,
  total_width: number,
  total_height: number
) {
  if (techStack.length > 0) {
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
      total_height,
      50,
      30
    );

    matrix.execute();

    return matrix.getSvg();
  }
  return;
}

export async function generateBannerPng() {
  // find the rendered SVG in the DOM by ID
  const svg = document.querySelector("#wrapper-banner svg") as SVGSVGElement;
  if (!svg) {
    console.warn("SVG not found in DOM");
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const encodedSvg =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = encodedSvg;

  await new Promise<void>((res, rej) => {
    img.onload = () => res();
    img.onerror = rej;
  });

  const canvas = document.createElement("canvas");
  canvas.width = svg.viewBox.baseVal.width || svg.clientWidth;
  canvas.height = svg.viewBox.baseVal.height || svg.clientHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const link = document.createElement("a");
  link.download = "linkedin-banner.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
