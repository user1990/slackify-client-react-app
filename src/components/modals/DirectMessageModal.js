import React from 'react';

import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'semantic-ui-react';
import Downshift from 'downshift';
import { getTeamMembersQuery } from '../../graphql/queries/queries';

const DirectMessageModal = ({
  history,
  open,
  onClose,
  teamId,
  data: { loading, getTeamMembers },
}) => (
  <Modal open={open} onClose={onClose} className="center-modal">
    <Modal.Header>Add Users</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          {!loading && (
            <Downshift
              onChange={selectUser => {
                history.push(`/view-team/user/${teamId}/${selectUser.id}`);
                onClose();
              }}
              render={({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
              }) => (
                <div>
                  <Input
                    {...getInputProps({ placeholder: 'Favorite fruit ?' })}
                  />
                  {isOpen ? (
                    <div style={{ border: '1px solid #ccc' }}>
                      {getTeamMembers
                        .filter(
                          i =>
                            !inputValue ||
                            i.username
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <div
                            {...getItemProps({ item })}
                            key={item.id}
                            style={{
                              backgroundColor:
                                highlightedIndex === index ? 'gray' : 'white',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal',
                            }}
                          >
                            {item.username}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              )}
            />
          )}
        </Form.Field>
        <Form.Group widths="equal">
          <Button fluid onClick={onClose}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default withRouter(graphql(getTeamMembersQuery)(DirectMessageModal));
