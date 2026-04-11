"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Upload, Button, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { cn } from "../../lib/utils";

type TUploadProps = {
  Typolevel?: 1 | 2 | 3 | 4 | 5;
  label?: React.ReactNode;
  name: string;
  rules?: Array<Record<string, any>>;
  buttonText?: string;
  accept?: string;
  maxCount?: number;
  children?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  formItemClassName?: string;
  uploadClassName?: string;
};

const ReuseUpload = ({
  Typolevel = 5,
  label,
  name,
  rules = [],
  buttonText = "Upload",
  accept = "image/*",
  maxCount = 1,
  children = (
    <Button
      icon={<UploadOutlined />}
      className="!text-primary-color sm:text-lg !bg-secondary-color  w-full border !border-dashed !border-secondary-color rounded-md flex items-center justify-center !py-5"
    >
      {buttonText}
    </Button>
  ),
  wrapperClassName,
  labelClassName,
  formItemClassName,
  uploadClassName,
}: TUploadProps) => {
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
      <Form.Item
        name={name}
        rules={rules}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        className={cn("!m-0", formItemClassName)}
      >
        <Upload
          customRequest={(options) => {
            setTimeout(() => {
              if (options.onSuccess) {
                options.onSuccess("ok");
              }
            }, 1000);
          }}
          maxCount={maxCount}
          accept={accept}
          listType="picture"
          className={cn(uploadClassName)}
        >
          {children}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default ReuseUpload;
