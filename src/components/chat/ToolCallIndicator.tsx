import { Loader2, FileEdit, FilePlus, Eye, FileText, FolderOpen, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolInvocation {
  toolName: string;
  args?: Record<string, any>;
  state?: string;
  result?: any;
}

interface ToolCallIndicatorProps {
  toolInvocation: ToolInvocation;
}

function formatToolMessage(toolInvocation: ToolInvocation): { message: string; icon: React.ReactNode } {
  const { toolName, args } = toolInvocation;

  if (toolName === "str_replace_editor" && args) {
    const { command, path } = args;
    const filename = path ? (path.split('/').pop() || path || 'file') : 'file';

    switch (command) {
      case "create":
        return {
          message: `Creating file: ${filename}`,
          icon: <FilePlus className="w-3 h-3" />
        };
      case "str_replace":
        return {
          message: `Editing file: ${filename}`,
          icon: <FileEdit className="w-3 h-3" />
        };
      case "insert":
        return {
          message: `Inserting into file: ${filename}`,
          icon: <FileText className="w-3 h-3" />
        };
      case "view":
        return {
          message: `Viewing file: ${filename}`,
          icon: <Eye className="w-3 h-3" />
        };
      default:
        return {
          message: `Working with file: ${filename}`,
          icon: <FileEdit className="w-3 h-3" />
        };
    }
  }

  if (toolName === "file_manager" && args) {
    const { command, path, new_path } = args;
    const filename = path ? path.split('/').pop() || path : 'file';

    switch (command) {
      case "rename":
        const newFilename = new_path ? new_path.split('/').pop() || new_path : 'file';
        return {
          message: `Renaming file: ${filename} → ${newFilename}`,
          icon: <FolderOpen className="w-3 h-3" />
        };
      case "delete":
        return {
          message: `Deleting file: ${filename}`,
          icon: <Trash2 className="w-3 h-3" />
        };
      default:
        return {
          message: `Managing file: ${filename}`,
          icon: <FolderOpen className="w-3 h-3" />
        };
    }
  }

  return {
    message: toolName.replace(/_/g, ' '),
    icon: <FileEdit className="w-3 h-3" />
  };
}

export function ToolCallIndicator({ toolInvocation }: ToolCallIndicatorProps) {
  const { message, icon } = formatToolMessage(toolInvocation);
  const isCompleted = toolInvocation.state === "result" && toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isCompleted ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          {icon}
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          {icon}
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}