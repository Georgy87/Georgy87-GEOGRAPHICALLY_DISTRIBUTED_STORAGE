type TableProps = {
  data: { [key: string]: { users: number; [key: string]: number } };
};

export const Table: React.FC<TableProps> = ({ data }) => {
  const columns = Object.keys(data);

  const renderHeader = (header: string) => {
    return (
      <>
        <tr>
          <th>{header}</th>
        </tr>
      </>
    );
  };

  const renderRows = (latency: number) => {
    return (
      <>
        <tr>
          <th>Latency</th>
          <td>{latency}</td>
        </tr>
        <tr>
          <th>Download time</th>
          <td>{`${latency * 10} sec`}</td>
        </tr>
        <tr>
          <th>Video streaming</th>
          <td>Video streaming 4K/2160p Ultra HD</td>
        </tr>
      </>
    );
  };

  return (
    <>
      {columns.map((header: string, idx) => {
        const latency = data[header][header];
        return (
          <div key={idx}>
            <table>
              <thead>{renderHeader(header)}</thead>
              <tbody>{renderRows(latency)}</tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};
