import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, issameUser } from '../../../config/ChatLogics'
import { ChatState } from '../../../Context/ChatProvider'
import { Tooltip } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'

import { useRef } from 'react';

const ScrolableChat = ({ messages }) => {
  const { user } = ChatState();
  const messageContainerRef = useRef();

  return (
    <div
      ref={messageContainerRef}
      style={{
        height: "400px",
        overflowY: "auto", // Allow scrolling
        display: "flex",
        flexDirection: "column", // Align messages in a column
      }}
    >
      <ScrollableFeed>
        {messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F500"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: issameUser(messages, m, i) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrolableChat;

