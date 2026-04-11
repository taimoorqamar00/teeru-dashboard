/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, Input, Typography } from "antd";
import React from "react";
import type { Rule } from "antd/es/form";
import { cn } from "../../lib/utils";

type TInputProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Rule[];
  type?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  inputType?: "normal" | "password" | "textarea" | string;
  rows?: number;
  prefix?: React.ReactNode | null;
  suffix?: React.ReactNode | null;
  wrapperClassName?: string;
  formItemClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

const ReuseInput = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  type = "text",
  placeholder,
  disabled,
  onChange,
  value,
  inputType = "normal",
  rows = 4,
  prefix,
  suffix,
  wrapperClassName,
  formItemClassName,
  labelClassName,
  inputClassName,
}: TInputProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      {label && (
        <Typography.Title
          level={Typolevel}
          className={cn("!text-base-color !font-normal", labelClassName)}
        >
          {label}
        </Typography.Title>
      )}
      <Form.Item className={cn(formItemClassName)} name={name} rules={rules}>
        {inputType === "password" ? (
          <Input.Password
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : inputType === "textarea" ? (
          <Input.TextArea
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg",
              inputClassName
            )}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <Input
            prefix={prefix}
            suffix={suffix}
            value={value}
            onChange={onChange}
            className={cn(
              "!py-1.5 !px-3 !text-lg !bg-primary-color border !border-input-color !text-base-color rounded-lg",
              inputClassName
            )}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default ReuseInput;
