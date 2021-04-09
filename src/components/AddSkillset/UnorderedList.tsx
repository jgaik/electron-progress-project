import React from "react";

interface UnorderedListProps {
  items: { key: string; value: string }[];
}

export const UnorderedList: React.FC<UnorderedListProps> = ({
  items,
  children,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.key}> {item.value}</li>
      ))}
      {children}
    </ul>
  );
};
