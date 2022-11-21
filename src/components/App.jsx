import React from 'react';
import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitHandler = newContact => {
    const ContactExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (ContactExist) {
      alert(newContact.name + 'is already in contacts.');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterHandler = value => {
    this.setState({
      filter: value,
    });
  };

  generateContactList = () => {
    const { contacts, filter } = this.state;
    let contactList;

    if (filter) {
      contactList = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      contactList = contacts;
    }
    return contactList;
  };

  deleteContact = contactID => {
    const newArray = this.state.contacts.filter(
      contact => contact.id !== contactID
    );
    this.setState({
      contacts: newArray,
    });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          color: '#010101',
        }}
      >
        <Section title={'Phonebook'}>
          <ContactForm onSubmit={contact => this.submitHandler(contact)} />
        </Section>

        <Section title={'Contacts'}>
          <Filter onChange={value => this.filterHandler(value)} />
          <ContactList
            contacts={this.generateContactList()}
            onClickDelete={contactID => this.deleteContact(contactID)}
          />
        </Section>
      </div>
    );
  }
}
