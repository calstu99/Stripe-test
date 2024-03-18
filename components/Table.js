import React from 'react';

import styles from "@/styles/Table.module.css";



const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ columnId, Header }) => (
            <th key={columnId}>{Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(({ columnId }) => (
              <td key={columnId}>{row[columnId]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;