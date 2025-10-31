import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';
import { DatePreset } from '@models/index';
import { formatDate } from '@utils/dateUtils';

interface DateFilterProps {
  preset: DatePreset;
  startDate?: Date;
  endDate?: Date;
  onPresetChange: (preset: DatePreset) => void;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  preset,
  startDate,
  endDate,
  onPresetChange,
  onDateChange,
}) => {
  const handlePresetChange = (value: DatePreset) => {
    onPresetChange(value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = new Date(e.target.value);
    if (endDate) {
      onDateChange(newStart, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = new Date(e.target.value);
    if (startDate) {
      onDateChange(startDate, newEnd);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Period</InputLabel>
            <Select
              value={preset}
              label="Period"
              onChange={(e) => handlePresetChange(e.target.value as DatePreset)}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {preset === 'custom' && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Start Date"
                value={startDate ? formatDate(startDate) : ''}
                onChange={handleStartDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="End Date"
                value={endDate ? formatDate(endDate) : ''}
                onChange={handleEndDateChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DateFilter;