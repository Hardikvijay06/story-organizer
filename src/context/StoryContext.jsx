import { createContext, useContext } from 'react';
import { useStories } from '../hooks/useStories';

const StoryContext = createContext(null);

export function StoryProvider({ children }) {
    const storyData = useStories();

    return (
        <StoryContext.Provider value={storyData}>
            {children}
        </StoryContext.Provider>
    );
}

export function useStoryContext() {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error('useStoryContext must be used within a StoryProvider');
    }
    return context;
}
