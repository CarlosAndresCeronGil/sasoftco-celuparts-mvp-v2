import React, { useEffect } from 'react';
import { Nav } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import EmailListItem from './EmailListItem';
import {
  fetchEmails,
  SelectEmail,
  starEmail,
  importantEmail,
  deleteEmail,
  checkEmail,
} from '../../../store/apps/email/EmailSlice';

const EmailList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);
  const getVisibleEmail = (emails, filter, emailSearch) => {
    switch (filter) {
      case 'inbox':
        return emails.filter(
          (c) => c.inbox && !c.trash && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'sent':
        return emails.filter(
          (c) => c.sent && !c.trash && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'draft':
        return emails.filter(
          (c) => !c.trash && c.draft && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'spam':
        return emails.filter(
          (c) => !c.trash && c.spam && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'trash':
        return emails.filter((c) => c.trash && c.from.toLocaleLowerCase().includes(emailSearch));

      case 'starred':
        return emails.filter(
          (c) => !c.trash && c.starred && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'important':
        return emails.filter(
          (c) => !c.trash && c.important && c.from.toLocaleLowerCase().includes(emailSearch),
        );

      case 'Social':
        return emails.filter(
          (c) =>
            !c.trash && c.label === 'Social' && c.from.toLocaleLowerCase().includes(emailSearch),
        );
      case 'Health':
        return emails.filter(
          (c) =>
            !c.trash && c.label === 'Health' && c.from.toLocaleLowerCase().includes(emailSearch),
        );
      case 'Promotional':
        return emails.filter(
          (c) =>
            !c.trash &&
            c.label === 'Promotional' &&
            c.from.toLocaleLowerCase().includes(emailSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const emails = useSelector((state) =>
    getVisibleEmail(
      state.emailReducer.emails,
      state.emailReducer.currentFilter,
      state.emailReducer.emailSearch,
    ),
  );
  const active = useSelector((state) => state.emailReducer.emailContent);
  return (
    <>
      <Nav>
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            active={active}
            {...email}
            handlechecked={() => dispatch(checkEmail(email.id))}
            onDelete={() => dispatch(deleteEmail(email.id))}
            onEmailClick={() => dispatch(SelectEmail(email.id))}
            onStar={() => dispatch(starEmail(email.id))}
            onImportant={() => dispatch(importantEmail(email.id))}
          />
        ))}
      </Nav>
    </>
  );
};

export default EmailList;
