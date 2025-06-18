import axios from 'axios';

import axiosConfig from '../../config/axiosConfig';

export const uploadImageToAWSpresignedUrl = async ({ url, file }) => {
    try {
        const response = await axios.put(url, file, {
            headers: {
                'Content-Type': file.type
            }
        });

        console.log('Response in uploading image to s3', response);
        return response;
    } catch(error) {
        console.log('Error in uploading image to s3', error);
    }
};

export const getPreginedUrl = async ({ token }) => {
    try {
        const response = await axiosConfig.get('/messages/pre-signed-url', {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.log('Error in getting presigned url', error);
    }
};