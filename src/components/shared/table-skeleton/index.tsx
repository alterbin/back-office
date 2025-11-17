import React from 'react';
import {Loader2} from 'lucide-react';

interface SkeletonProps {
  rows: number;
  columns: number;
}

export const TableSkeleton: React.FC<SkeletonProps> = ({rows, columns}) => {
  const rowsArray = Array.from({length: rows});
  const colsArray = Array.from({length: columns});

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center mb-4">
        <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
      <div className="table-responsive d-none d-lg-block">
        <table className="table">
          <thead>
            <tr>
              {colsArray.map((_, colIdx) => (
                <th key={colIdx} scope="col">
                  <div className="sr-only">Loading</div>
                  <div
                    className="bg-body-secondary rounded"
                    style={{width: '100%', height: '1.5rem'}}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowsArray.map((_, rowIdx) => (
              <tr key={rowIdx}>
                {colsArray.map((__, colIdx) => (
                  <td key={colIdx}>
                    <div
                      className="bg-body-secondary rounded"
                      style={{width: '100%', height: '1.5rem'}}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const MobileSkeleton: React.FC<Pick<SkeletonProps, 'rows'>> = ({
  rows,
}) => {
  const rowsArray = Array.from({length: rows});

  return (
    <div className="d-flex gap-4 flex-column d-lg-none">
      <Loader2 className="w-6 h-6 text-gray-500 animate-spin mb-2" />

      {rowsArray.map((__, colIdx) => (
        <div key={colIdx}>
          <div
            className="bg-body-secondary rounded"
            style={{width: '100%', height: '3rem'}}
          />
        </div>
      ))}
    </div>
  );
};
