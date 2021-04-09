import React from "react";

interface OrderedListProps {
  items: { key: string; value: string }[];
}

export const OrderedList: React.FC<OrderedListProps> = ({
  items,
  children,
}) => {
  return (
    <ol>
      {items.map((item) => (
        <li key={item.key}> {item.value}</li>
      ))}
      {children}
    </ol>
  );
};
