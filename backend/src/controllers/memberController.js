
import { StatusCodes } from 'http-status-codes';

import { isMemberPartOfWorkspaceService } from '../services/memberService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const isMemberPartOfWorkspaceController = async function (req, res) {
  try {
    const response = await isMemberPartOfWorkspaceService(
      req.params.workspaceId,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User is a member of the workspace'));
  } catch (error) {
    console.log('User controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
