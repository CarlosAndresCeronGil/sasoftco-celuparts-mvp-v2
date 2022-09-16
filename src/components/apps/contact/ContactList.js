import React, { useEffect } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
  fetchContacts,
  DeleteContact,
  toggleStarredContact,
} from '../../../store/apps/contacts/ContactSlice';
import ContactListItem from './ContactListItem';

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getVisibleContacts = (contacts, filter, contactSearch) => {
    switch (filter) {
      case 'show_all':
        return contacts.filter(
          (c) => !c.deleted && c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'frequent_contact':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'starred_contact':
        return contacts.filter(
          (c) => !c.deleted && c.starred && c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'engineering_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Engineering' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'support_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Support' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      case 'sales_department':
        return contacts.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Sales' &&
            c.firstname.toLocaleLowerCase().includes(contactSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const contacts = useSelector((state) =>
    getVisibleContacts(
      state.contactsReducer.contacts,
      state.contactsReducer.currentFilter,
      state.contactsReducer.contactSearch,
    ),
  );

  const active = useSelector((state) => state.contactsReducer.contactContent);
  console.log(active);
  return (
    <Nav>
      {contacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          active={active}
          {...contact}
          onContactClick={() => dispatch(SelectContact(contact.id))}
          onDeleteClick={() => dispatch(DeleteContact(contact.id))}
          onStarredClick={() => dispatch(toggleStarredContact(contact.id))}
        />
      ))}
    </Nav>
  );
};

export default ContactList;
