import { createMessageService } from '../services/messageService.js';
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT
} from '../utils/common/eventConstants.js';

export default function messageHandlers(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    console.log(data, typeof data);
    const { channelId } = data;
    const messageResponse = await createMessageService(data);
    // socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    console.log('Channel',channelId);
    io.to(channelId).emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse); // Implementation of rooms
    cb({
      success: true,
      message: 'Successfully created the message',
      data: messageResponse
    });
  });
}