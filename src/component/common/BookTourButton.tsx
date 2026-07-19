import type { MouseEventHandler } from "react";

type BookTourButtonProps = {
  user?: unknown | null;
  className?: string;
  hasBooked?: boolean;
  isLoading?:boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const BookTourButton = ({
   user,
  className = "",
  hasBooked = false,
  isLoading = false,
  onClick
}: BookTourButtonProps) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
  >
     {isLoading
      ? "Redirecting..."
      : !user
      ? "Please Login to Book Tour"
      : hasBooked
      ? "Review Tour"
      : "Book Tour"}
  </button>
);

export default BookTourButton;
