
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect } from "fabric";
import { Toolbar } from "./Toolbar";
import { toast } from "sonner";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<string>("select");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 200,
      height: window.innerHeight - 100,
      backgroundColor: "#1A1F2C",
    });

    canvas.freeDrawingBrush.color = "#9b87f5";
    canvas.freeDrawingBrush.width = 2;

    setFabricCanvas(canvas);

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth - 200,
        height: window.innerHeight - 100,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = "#9b87f5";
      fabricCanvas.freeDrawingBrush.width = 2;
    }
  }, [activeTool, fabricCanvas]);

  const handleToolClick = (tool: string) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "#7E69AB",
        width: 100,
        height: 100,
        strokeWidth: 2,
        stroke: "#9b87f5",
      });
      fabricCanvas.add(rect);
      fabricCanvas.setActiveObject(rect);
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "#7E69AB",
        radius: 50,
        strokeWidth: 2,
        stroke: "#9b87f5",
      });
      fabricCanvas.add(circle);
      fabricCanvas.setActiveObject(circle);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#1A1F2C";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  const handleSave = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL();
    const link = document.createElement("a");
    link.download = "cad-design.png";
    link.href = dataURL;
    link.click();
    toast("Design saved!");
  };

  return (
    <div className="flex gap-4 p-4 bg-[#1A1F2C] min-h-screen">
      <Toolbar
        activeTool={activeTool}
        onToolClick={handleToolClick}
        onClear={handleClear}
        onSave={handleSave}
      />
      <div className="border border-[#403E43] rounded-lg shadow-lg overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
