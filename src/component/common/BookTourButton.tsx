import type { MouseEventHandler } from "react";

type BookTourButtonProps = {
  user?: unknown | null;
  className?: string;
  isLoading?:boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const BookTourButton = ({
  user,
  className = "",
  onClick,
  isLoading
}: BookTourButtonProps) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
  >
    {isLoading
      ? "Redirecting..."
      : user
      ? "Book Tour"
      : "Please Login to Book Tour"}
  </button>
);

export default BookTourButton;
