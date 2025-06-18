import { useQueryClient } from '@tanstack/react-query';

import { getPreginedUrl, uploadImageToAWSpresignedUrl } from '@/apis/s3';
import { Editor } from '@/components/atoms/Editor/Edtior';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

export const ChatInput = () => {

    const { socket, currentChannel } = useSocket();
    const { auth } = useAuth();
    const { currentWorkspace } = useCurrentWorkspace();
    const queryClient = useQueryClient();

    async function handleSubmit({ body, image }) {
        console.log(body, image);
        let fileUrl = null;
        if(image) {
            const preSignedUrl = await queryClient.fetchQuery({
                queryKey: ['getPresignedUrl'],
                queryFn: () => getPreginedUrl({ token: auth?.token }),
            });

            console.log('Presigned url', preSignedUrl);

            const responseAws = await uploadImageToAWSpresignedUrl({
                url: preSignedUrl,
                file: image
            });
            console.log("file upload success", responseAws);
            fileUrl = preSignedUrl.split('?')[0];
        }
        socket?.emit('NewMessage', {
            channelId: currentChannel,
            body,
            image: fileUrl,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?._id
        }, (data) => {
            console.log('Message sent', data);
        });
    }

    return (
        <div
            className="px-5 w-full"
        >
            <Editor 
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
                
            />

            
        </div>
    );
};