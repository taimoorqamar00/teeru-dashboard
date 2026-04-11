"use client";
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "highlight"
  | "ghost"
  | "outline"
  | "error"
  | "gradient";

interface ReuseButtonProps {
  url?: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: "!bg-primary-color !text-base-color border !border-base-color ",
  secondary:
    "!bg-secondary-color !text-primary-color border !border-secondary-color",
  highlight: "!bg-[#DDDDDD] !text-base-color border !border-[#DDDDDD]",
  ghost:
    "!bg-primary-color/0 !text-base-color border  !border-primary-color/0 hover:!bg-secondary-color hover:!text-primary-color hover:!border-secondary-color transition-all duration-300 ease-in-out",
  outline: "!bg-transparent !text-base-color !border-secondary-color",
  error:
    "!bg-error-color !text-primary-color border !border-error-color w-auto",
  gradient: "bg-gradient-color !text-primary-color !border-none",
};

const ReuseButton = ({
  url,
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  htmlType = "button",
  onClick,
  children,
  icon,
}: ReuseButtonProps) => {
  return url ? (
    <Link to={url}>
      <Button
        className={cn(
          "!py-5 !px-8 !text-lg w-full text-center  !ring-0 rounded-md",
          variantStyles[variant],
          className
        )}
        disabled={disabled}
        loading={loading}
        htmlType={htmlType}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <Button
      className={cn(
        "!py-5 !px-8 !text-lg w-full text-center  !ring-0 rounded-md",
        variantStyles[variant],
        className
      )}
      disabled={disabled}
      loading={loading}
      htmlType={htmlType}
      onClick={onClick}
      icon={icon}
    >
      {children}
    </Button>
  );
};

export default ReuseButton;
