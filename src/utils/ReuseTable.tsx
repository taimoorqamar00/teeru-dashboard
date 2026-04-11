/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";

interface ReuseTableProps<T> {
  loading?: boolean;
  columns: any; // Type for columns
  data: T[]; // Type for dataSource
  setPage?: (page: any) => void; // Function to update the page
  total?: any; // Total any of items
  limit?: any; // Items per page
  page?: any; // Current page
  scroll?: any;
  onChange?: (
    pagination: any,
    filters: Record<string, any>,
    sorter: any
  ) => void; // Optional onChange handler
  keyValue: string | ((record: T) => string); // Row key
}

const ReuseTable: React.FC<ReuseTableProps<any>> = ({
  loading,
  columns,
  data,
  setPage,
  total,
  limit,
  page,
  scroll = { x: "max-content" },
  onChange,
  keyValue,
}) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={
        total > 0
          ? {
              current: page,
              onChange: (page) => {
                if (setPage) {
                  setPage(page); // Call only if setPage is defined
                }
              },
              showSizeChanger: false,
              total,
              pageSize: limit,
            }
          : false
      }
      scroll={scroll}
      rowKey={keyValue}
    />
  );
};

export default ReuseTable;
