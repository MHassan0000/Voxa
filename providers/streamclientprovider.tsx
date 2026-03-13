import { useEffect, useState } from "react";
import {

    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


export const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
    const [client, setClient] = useState<StreamVideoClient>();

    useEffect(() => {
        const myClient = new StreamVideoClient({ apiKey, user, token });
        setClient(myClient);

        return () => {
            myClient.disconnectUser().catch(console.error);
            setClient(undefined);
        };
    }, []);

    if (!client) return null;

    return (
        <StreamVideo client={client}>
        </StreamVideo>
    );
};

