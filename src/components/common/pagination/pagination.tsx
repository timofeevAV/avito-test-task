import { useMemo, useCallback } from 'react';
import { PaginationProps } from './types';
import Icon from '../icon';
import clsx from 'clsx';

const navButtonClasses =
  'flex items-center gap-1 p-1 uppercase sm:p-0 text-muted-foreground hover:text-primary transition-colors';

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  prevLabel = 'Предыдущая',
  nextLabel = 'Следующая',
  dotsLabel = '...',
  prevIcon,
  nextIcon,
}: PaginationProps) {
  const handlePageChange = useCallback(
    (page: number) => {
      if (onPageChange) {
        onPageChange(page);
      }
    },
    [onPageChange],
  );

  const renderPageNumbers = useMemo(() => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={
            i === currentPage
              ? 'pseudo-underline pseudo-underline--show text-primary'
              : 'text-muted-foreground transition-colors hover:text-primary'
          }
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </button>
        </li>,
      );
    }

    return pages;
  }, [currentPage, totalPages, handlePageChange]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  }, [currentPage, totalPages, handlePageChange]);

  if (totalPages < 2) return null;

  return (
    <nav
      aria-label="pagination"
      className="px-4 py-5"
    >
      <ul className="flex w-full items-center justify-between text-sm text-muted-foreground">
        <li>
          <button
            onClick={handlePrevClick}
            className={clsx(navButtonClasses, {
              ['pointer-events-none']: currentPage === 1,
            })}
          >
            {prevIcon ? prevIcon : <Icon id="icon-arrow-left" />}
            <span className="hidden sm:inline">{prevLabel}</span>
          </button>
        </li>

        <li>
          <ul className="flex flex-wrap justify-center gap-2">
            {currentPage > 3 && (
              <>
                <li>
                  <button
                    onClick={() => {
                      handlePageChange(1);
                    }}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    1
                  </button>
                </li>
                <li>
                  <span>{dotsLabel}</span>
                </li>
              </>
            )}

            {renderPageNumbers}

            {currentPage < totalPages - 2 && (
              <>
                <li>
                  <span>{dotsLabel}</span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handlePageChange(totalPages);
                    }}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}
          </ul>
        </li>

        <li>
          <button
            onClick={handleNextClick}
            className={clsx(navButtonClasses, {
              ['pointer-events-none']: currentPage === totalPages,
            })}
          >
            <span className="hidden sm:inline">{nextLabel}</span>
            {nextIcon ? nextIcon : <Icon id="icon-arrow-right" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
