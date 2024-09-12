export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  activeClassName?: string;
  dotsLabel?: string;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}
