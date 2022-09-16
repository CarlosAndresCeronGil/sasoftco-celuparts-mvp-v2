import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/ticket/TicketData';

const initialState = {
  tickets: [],
  currentFilter: 'total_tickets',
  ticketSearch: '',
};

export const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    getTickets: (state, action) => {
      state.tickets = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchTicket: (state, action) => {
      state.ticketSearch = action.payload;
    },
    DeleteTicket: (state, action) => {
      const index = state.tickets.findIndex((ticket) => ticket.Id === action.payload);
      state.tickets.splice(index, 1);
    },
  },
});

export const { getTickets, setVisibilityFilter, SearchTicket, DeleteTicket } = TicketSlice.actions;

export const fetchTickets = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getTickets(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default TicketSlice.reducer;
