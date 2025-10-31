import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SalesData } from '@models/index';
import { formatCurrency, formatNumber } from '@utils/formatters';
import { formatDateTime } from '@utils/dateUtils';

interface SalesTableProps {
  sales: SalesData[];
  title?: string;
}

const SalesTable: React.FC<SalesTableProps> = ({ sales, title = 'Recent Sales' }) => {
  const getSourceBadge = (source: string) => {
    const badges: Record<string, string> = {
      organic: 'success',
      paid: 'info',
      referral: 'warning',
      direct: 'danger',
    };
    return badges[source] || 'info';
  };

  return (
    <Box className="chart-wrapper">
      <Typography className="chart-title">
        {title}
      </Typography>
      <TableContainer className="stunning-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {formatDateTime(sale.timestamp)}
                  </Typography>
                </TableCell>
                <TableCell>{sale.region}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell align="right">{formatNumber(sale.quantity)}</TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={700}>
                    {formatCurrency(sale.amount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <span className={`badge ${getSourceBadge(sale.source)}`}>
                    {sale.source}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;