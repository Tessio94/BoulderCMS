import { cn } from "@/lib/utils";
import React from "react";
import { ToasterProps } from "sonner";
import { toast } from "sonner";

interface customProps extends ToasterProps {
  type?: string;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

const Toast = (props: customProps) => {
  const { type, title, description, button, id } = props;
  console.log(title, description, button, id);
  return (
    <div
      className={cn(
        "flex w-full items-center rounded-lg bg-cyan-100 p-4 shadow-lg ring-1 ring-black/5 md:max-w-[364px]",
        type === "yes" ? "shadow-green-500" : "shadow-red-500",
      )}
    >
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-cyan-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-cyan-700">{description}</p>
          )}
        </div>
      </div>
      {button && (
        <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
          <button
            className="cursor-pointer rounded bg-cyan-900 px-3 py-1 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:text-amber-400 hover:shadow-sm hover:shadow-amber-400"
            onClick={() => {
              button.onClick();
              toast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default Toast;
