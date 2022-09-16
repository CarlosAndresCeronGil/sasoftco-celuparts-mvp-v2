import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Badge, UncontrolledTooltip, Input } from 'reactstrap';
import { fetchTickets, DeleteTicket, SearchTicket } from '../../../store/apps/ticket/TicketSlice';

const TicketListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    switch (filter) {
      case 'total_tickets':
        return tickets.filter(
          (c) => !c.deleted && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Pending':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Pending' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Closed':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Closed' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Open':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Open' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch,
    ),
  );

  return (
    <div>
      <div className="col-lg-3 mb-4">
        <Input
          type="text"
          onChange={(e) => dispatch(SearchTicket(e.target.value))}
          placeholder="Search Ticket..."
        />
      </div>
      <Table className="align-middle">
        <thead>
          <tr>
            <th>No</th>
            <th>Ticket</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.Id}>
              <td>{ticket.Id}</td>
              <td>
                <h5 className="mb-0 mt-2">
                  <Link to="/apps/ticket-detail" className="text-dark text-decoration-none">
                    {ticket.ticketTitle}
                  </Link>
                </h5>
                <small className="text-muted d-block text-truncate mb-2" style={{ width: '300px' }}>
                  {ticket.ticketDescription}
                </small>
              </td>
              <td>
                <Badge color={ticket.Label}>{ticket.Status}</Badge>
              </td>
              <td>{ticket.AgentName}</td>
              <td>{ticket.Date}</td>
              <td>
                <i
                  className="bi bi-trash cursor-pointer"
                  id="TooltipExample"
                  onClick={() => dispatch(DeleteTicket(ticket.Id))}
                />
                <UncontrolledTooltip placement="left" target="TooltipExample">
                  Delete
                </UncontrolledTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketListing;
