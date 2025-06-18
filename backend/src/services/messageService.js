import { StatusCodes } from 'http-status-codes';

import channelRepository from '../repositories/channelRepostiory.js';
import messageRepository from '../repositories/messageRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

export const getMessagesService = async (messageParams, page, limit, user) => {
  const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(
    messageParams.channelId
  );

  const workspace = channelDetails.workspaceId;

  const isMember = isUserMemberOfWorkspace(workspace, user);

  if (!isMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }

  const messages = await messageRepository.getPaginatedMessaged(
    messageParams,
    page,
    limit
  );
  return messages;
};

export const createMessageService = async (message) => {
  const newMessage = await messageRepository.create(message);

  const messageDetails = await messageRepository.getMessageDetails(
    newMessage._id
  );

  return messageDetails;
};