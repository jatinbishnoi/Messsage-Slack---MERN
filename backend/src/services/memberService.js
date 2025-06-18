import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import workspaceRepository from '../repositories/workspaceRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { isUserMemberOfWorkspace } from './workspaceService.js';

export const isMemberPartOfWorkspaceService = async (workspaceId, memberId) => {
  const workspace = await workspaceRepository.getById(workspaceId);

  if (!workspace) {
    throw new ClientError({
      explanation: 'Workspace not found',
      message: 'Workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }

  const isUserAMember = isUserMemberOfWorkspace(workspace, memberId);

  if (!isUserAMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
  const user = await userRepository.getById(memberId);
  return user;
};