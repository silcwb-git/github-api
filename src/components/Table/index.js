import React, { useState, useEffect, useCallback } from "react";

import apis from "../../services/api";

import {
  Container,
  PTable,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "./styles";

function Table() {
  const [project, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProjects() {
      {
          const api = async () => {
              const response = await fetch('https://api.github.com/users/globocom/repos');
              const data = await response.json();

              return data;
          }
  
          const api_data = await api();
  
          console.log(api_data);
  
      }
      
     // setTotal(api.headers["x-total-count"]);
      const totalPages = Math.ceil(total / limit);

      const arrayPages = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setProjects(apis);
    }

    loadProjects();
  }, [currentPage, limit, total]);

  const limits = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, []);
  
  return (
    <Container>
      <h3>Projetos Globo.com no GitHub</h3>
      <select onChange={limits}>
        <option value="20">20</option>
      </select>
      <PTable>
        <thead>
          <tr>
             <th>Id</th> 
            <th>Nome</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {[project].map((repos, index) => (
            <tr key={index}>
              <td>{repos.id}</td>
              <td>{repos.name}</td>
              <td>{repos.stargazers_count}</td>
            </tr>
          ))} 
        </tbody>
      
      </PTable>
      <Pagination>
        <div>Qtd {total}</div>
        <PaginationButton>
          {currentPage > 1 && (
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem
              isSelect={page === currentPage}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length && (
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </PaginationItem>
          )}
        </PaginationButton>
      </Pagination>
    </Container>
  );
}

export default Table;
