import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolCallIndicator } from "../ToolCallIndicator";

describe("ToolCallIndicator", () => {
  describe("str_replace_editor tool", () => {
    test("displays create file message", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "create",
          path: "src/components/Button.tsx"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Creating file: Button.tsx")).toBeDefined();
    });

    test("displays edit file message", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "str_replace",
          path: "src/utils/helpers.ts"
        },
        state: "result",
        result: "success"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Editing file: helpers.ts")).toBeDefined();
    });

    test("displays insert into file message", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "insert",
          path: "src/lib/config.js"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Inserting into file: config.js")).toBeDefined();
    });

    test("displays view file message", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "view",
          path: "README.md"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Viewing file: README.md")).toBeDefined();
    });

    test("displays default message for unknown command", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "unknown",
          path: "test.txt"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Working with file: test.txt")).toBeDefined();
    });

    test("handles nested file paths", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "create",
          path: "src/deeply/nested/folder/file.ts"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Creating file: file.ts")).toBeDefined();
    });
  });

  describe("file_manager tool", () => {
    test("displays rename file message", () => {
      const toolInvocation = {
        toolName: "file_manager",
        args: {
          command: "rename",
          path: "old-name.tsx",
          new_path: "new-name.tsx"
        },
        state: "result",
        result: "success"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Renaming file: old-name.tsx → new-name.tsx")).toBeDefined();
    });

    test("displays delete file message", () => {
      const toolInvocation = {
        toolName: "file_manager",
        args: {
          command: "delete",
          path: "temp-file.js"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Deleting file: temp-file.js")).toBeDefined();
    });

    test("displays default message for unknown file_manager command", () => {
      const toolInvocation = {
        toolName: "file_manager",
        args: {
          command: "unknown",
          path: "file.txt"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Managing file: file.txt")).toBeDefined();
    });
  });

  describe("unknown tools", () => {
    test("displays formatted tool name for unknown tools", () => {
      const toolInvocation = {
        toolName: "some_custom_tool",
        args: {},
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("some custom tool")).toBeDefined();
    });
  });

  describe("edge cases", () => {
    test("handles missing args gracefully", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("str replace editor")).toBeDefined();
    });

    test("handles missing path gracefully", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        args: {
          command: "create"
        },
        state: "call"
      };

      render(<ToolCallIndicator toolInvocation={toolInvocation} />);
      
      expect(screen.getByText("Creating file: file")).toBeDefined();
    });

  });
});