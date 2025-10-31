import React from 'react';
import {
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import DateFilter from './DateFilter';
import { DashboardFilters as Filters, DatePreset } from '@models/index';

interface DashboardFiltersProps {
  filters: Filters;
  regions: string[];
  products: string[];
  onFiltersChange: (filters: Partial<Filters>) => void;
  onRefresh: () => void;
  onExport: () => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  regions,
  products,
  onFiltersChange,
  onRefresh,
  onExport,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <DateFilter
            preset={filters.preset}
            startDate={filters.startDate}
            endDate={filters.endDate}
            onPresetChange={(preset) => onFiltersChange({ preset })}
            onDateChange={(startDate, endDate) =>
              onFiltersChange({ preset: 'custom', startDate, endDate })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Region</InputLabel>
            <Select
              value={filters.region || ''}
              label="Region"
              onChange={(e) => onFiltersChange({ region: e.target.value || undefined })}
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Product</InputLabel>
            <Select
              value={filters.product || ''}
              label="Product"
              onChange={(e) => onFiltersChange({ product: e.target.value || undefined })}
            >
              <MenuItem value="">All Products</MenuItem>
              {products.map((product) => (
                <MenuItem key={product} value={product}>
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={onRefresh}
              fullWidth
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={onExport}
              fullWidth
            >
              Export
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DashboardFilters;