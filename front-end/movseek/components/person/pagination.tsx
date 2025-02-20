import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  endpoint: string;
}

const PaginationCustom = ({ currentPage, totalPage, endpoint }: PaginationProps) => {
  return (
    <div>
      {totalPage <= 10 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage - 1}`}
              />
            </PaginationItem>
            {[...Array(totalPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={`${currentPage == index + 1 ? 'bg-gray-100' : ''}`}
                  isActive={currentPage == index + 1}
                  href={`${endpoint}?page=${index + 1}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`${currentPage === totalPage ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : currentPage < 5 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 1}
                href={`${endpoint}?page=1`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 2 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 2}
                href={`${endpoint}?page=2`}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 3 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 3}
                href={`${endpoint}?page=3`}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 4 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 4}
                href={`${endpoint}?page=4`}
              >
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 5 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 5}
                href={`${endpoint}?page=5`}
              >
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage}
                href={`${endpoint}?page=${totalPage}`}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${currentPage === totalPage ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : currentPage > totalPage - 4 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 1}
                href={`${endpoint}?page=1`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage - 4 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage - 4}
                href={`${endpoint}?page=${totalPage - 4}`}
              >
                {totalPage - 4}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage - 3 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage - 3}
                href={`${endpoint}?page=${totalPage - 3}`}
              >
                {totalPage - 3}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage - 2 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage - 2}
                href={`${endpoint}?page=${totalPage - 2}`}
              >
                {totalPage - 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage - 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage - 1}
                href={`${endpoint}?page=${totalPage - 1}`}
              >
                {totalPage - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage}
                href={`${endpoint}?page=${totalPage}`}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${currentPage === totalPage ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${currentPage === totalPage ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == 1}
                href={`${endpoint}?page=1`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == currentPage - 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == currentPage - 1}
                href={`${endpoint}?page=${currentPage - 1}`}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive href="#">
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == currentPage + 1 ? 'bg-gray-100' : ''}`}
                isActive={currentPage == currentPage + 1}
                href={`${endpoint}?page=${currentPage + 1}`}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className={`${currentPage == totalPage ? 'bg-gray-100' : ''}`}
                isActive={currentPage == totalPage}
                href={`${endpoint}?page=${totalPage}`}
              >
                {totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${currentPage === totalPage ? 'opacity-50 pointer-events-none' : ''}`}
                href={`${endpoint}?page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PaginationCustom;
