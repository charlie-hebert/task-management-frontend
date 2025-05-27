import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MobXStoreContext } from '../stores/MobXStoreContext';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

const TasksFilters = () => {
  const { tasksStore } = useContext(MobXStoreContext);

  const [status, setStatus] = useState(tasksStore.filters.status);
  const [search, setSearch] = useState(tasksStore.filters.search);

  const filters$ = useRef(new Subject()).current;

  useEffect(() => {
    const sub = filters$
      .pipe(debounceTime(500))
      .subscribe((filters) => {
        tasksStore.updateFilters(filters);
      });

    return () => sub.unsubscribe();
  }, [filters$, tasksStore]);

  useEffect(() => {
    filters$.next({ status, search });
  }, [status, search, filters$]);

  return (
    <FiltersContainer>
      <Grid container justifyContent="space-between">
        <Grid>
          <ControlContainer>
            <FormControl style={{ width: '220px' }}>
              <TextField
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </ControlContainer>
        </Grid>

        <Grid>
          <ControlContainer>
            <FormControl style={{ width: '220px' }}>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">No status filter</MenuItem>
                <MenuItem value="OPEN">Open</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="DONE">Done</MenuItem>
              </Select>
            </FormControl>
          </ControlContainer>
        </Grid>
      </Grid>
    </FiltersContainer>
  );
};

export default TasksFilters;
