import { createContext, useState } from 'react';

const NewFeedContext = createContext({});

export const NewFeedContextProvider = ({ children }) => {
    const [isMountedNewFeed, setIsMountedNewFeed] = useState(true);

    return (
        <NewFeedContext.Provider value={{ isMountedNewFeed, setIsMountedNewFeed }}>{children}</NewFeedContext.Provider>
    );
};

export default NewFeedContext;
