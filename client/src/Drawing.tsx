import { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./Drawing.css";
interface MouseProps {
  x: number;
  y: number;
}

export default function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<string>("write");
  const [mouseData, setMouseData] = useState<MouseProps>({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const SetPos: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (e.buttons !== 1) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Adjust mouse x-coordinate relative to canvas
    const mouseY = e.clientY - rect.top; // Adjust mouse y-coordinate relative to canvas

    setMouseData({
      x: mouseX,
      y: mouseY,
    });
  };

  const [color, setColor] = useState<string>("#000000"); // Default color is black
  const [size, setSize] = useState<number>(1); // Default size is 10
  const handleWrite = (n: number) => {
    setSize(n);
    setMode("write");
  };
  const Draw: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (e.buttons !== 1) return;

    const canvas = canvasRef.current;
    const ctx = canvasCTX;
    if (!ctx || !canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Adjust mouse x-coordinate relative to canvas
    const mouseY = e.clientY - rect.top; // Adjust mouse y-coordinate relative to canvas

    ctx.globalCompositeOperation = "source-over";
    if (mode === "write") {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    } else if (mode === "eraser") {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = size;
    }

    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: mouseX,
      y: mouseY,
    });
    ctx.lineTo(mouseX, mouseY);
    ctx.lineCap = "round";
    ctx.stroke();
  };
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas?.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setCanvasCTX(ctx); // Finally, set the state
  }, [canvasRef]);

  return (
    <div className="drawing">
      <div className="controlpanel">
        <button
          onClick={() => {
            setMode("eraser");
            setSize(20);
          }}
        >
          big eraser
        </button>
        <button
          onClick={() => {
            setMode("eraser");
            setSize(5);
          }}
        >
          small eraser
        </button>
        <button
          onClick={() => {
            handleWrite(1);
          }}
        >
          pencil
        </button>
        <button
          onClick={() => {
            handleWrite(4);
          }}
        >
          pen
        </button>
        <button
          onClick={() => {
            handleWrite(20);
          }}
        >
          brush
        </button>
        <input
          type="range"
          value={size}
          max={40}
          onChange={(e) => {
            setSize(e.target.valueAsNumber);
          }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const ctx = canvasCTX;
            if (!ctx) {
              return;
            }
            if (!canvasRef.current) return;
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }}
        >
          Clear
        </button>
      </div>
      <canvas
        onMouseEnter={(e) => SetPos(e)}
        onMouseMove={(e) => {
          SetPos(e);
          Draw(e);
        }}
        onMouseDown={(e) => SetPos(e)}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
