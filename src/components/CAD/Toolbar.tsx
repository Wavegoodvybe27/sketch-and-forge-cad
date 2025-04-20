
import { Button } from "@/components/ui/button";
import { MousePointer, Square, Circle, Pencil, Trash2, Download } from "lucide-react";

interface ToolbarProps {
  activeTool: string;
  onToolClick: (tool: string) => void;
  onClear: () => void;
  onSave?: () => void;
}

export const Toolbar = ({ activeTool, onToolClick, onClear, onSave }: ToolbarProps) => {
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'draw', icon: Pencil, label: 'Draw' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
  ];

  return (
    <div className="flex flex-col gap-2 bg-[#403E43] p-3 rounded-lg">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={activeTool === tool.id ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onToolClick(tool.id)}
          className={`w-10 h-10 ${
            activeTool === tool.id ? 'bg-[#7E69AB] text-white' : 'text-white hover:bg-[#7E69AB]/50'
          }`}
        >
          <tool.icon className="h-5 w-5" />
        </Button>
      ))}
      <div className="w-full h-px bg-gray-600 my-2" />
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="w-10 h-10 text-white hover:bg-[#7E69AB]/50"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onSave}
        className="w-10 h-10 text-white hover:bg-[#7E69AB]/50"
      >
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};
