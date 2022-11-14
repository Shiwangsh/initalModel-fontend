import Pagination from "react-bootstrap/Pagination";

// type PaginationProps = {
//   usersPerPage: number;
//   totalUsers: number;
//   paginate: any;
// };

const CustomPagination = ({ dataPerPage, totalData, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Pagination>
        {pageNumbers.map((number, index) => (
          <Pagination.Item key={index} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </nav>
  );
};

export default CustomPagination;
