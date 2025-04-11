import React from "react";

type ButtonProps = {
  onClick: (...args: unknown[]) => void;
  filled?: boolean;
  filledColor?: string;
  iconName: IconNames;
};
type IconNames = keyof typeof icons;
export default function IconButton({
  onClick,
  filled = false,
  filledColor = "currentColor",
  iconName,
}: ButtonProps) {
  return (
    <div onClick={onClick}>{icons[iconName]({ filled, filledColor })}</div>
  );
}
type IconProps = Pick<ButtonProps, "filled" | "filledColor">;
const icons = {
  heart: ({ filled = false, filledColor = "currentColor" }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? filledColor : "none"}
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-heart-icon lucide-heart hover:scale-105 transition-transform.duration-200 hover:cursor-pointer"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  star: ({ filled = false, filledColor = "currentColor" }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? filledColor : "none"}
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-star-icon lucide-star hover:scale-105 transition-transform.duration-200 hover:cursor-pointer"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  ),
};
