"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ReusableFormProps = {
  form?: any;
  children: ReactNode;
  defaultValues?: any;
  className?: string;
  handleFinish: (values: Record<string, any>) => void;
};

const ReusableForm = ({
  form,
  children,
  defaultValues,
  className,
  handleFinish,
}: ReusableFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      onFinish={handleFinish}
      className={cn("space-y-1", className)}
    >
      {children}
    </Form>
  );
};

export default ReusableForm;
