import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ReactPaginate from "react-paginate";
import "./task.css";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const itemsPerPage = 1; // Number of items per page
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(tasks.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = tasks.slice(startIndex, endIndex);

  return (
    <div className="mx-4 lg:mx-0 ">
      <Table className="border">
        <Thead>
          <Tr className="border-b bg-slate-600">
            <Th className="p-2 text-white">Title</Th>
            <Th className="p-2 text-white">Description</Th>
            <Th className="p-2 text-white">Status</Th>
            <Th className="p-2 text-white">Auctions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {displayedData.length > 0 ? (
            displayedData.map((task, index) => (
              <Tr className="border-b">
                <Td className="py-2">{task.title}</Td>
                <Td className="py-2">{task.description}</Td>
                <Td className="py-2">{task.status}</Td>
                <Td className="py-2">
                  <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mx-2 my-1 rounded self-center"
                      onClick={() => onUpdateTask(task, index)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mx-2 my-1 rounded self-center"
                      onClick={() => onDeleteTask(task, index)}
                    >
                      Delete
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colspan="4" className="border h-48 w-full text-lg">
                No Records Found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {pageCount > 0 && (
        <div className="flex flex-row justify-between">
          <div className="pagination my-4">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={0}
              marginPagesDisplayed={0}
              onPageChange={handlePageChange}
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              containerClassName="pagination"
              pageClassName="mx-2 p-2 cursor-pointer"
              activeClassName="text-white"
              disabledClassName="opacity-50"
              previousClassName="mx-2  cursor-pointer"
              nextClassName="mx-2  cursor-pointer"
            />
          </div>
          <div className="flex items-center mr-2">{`${
            currentPage + 1
          } of ${pageCount}`}</div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
