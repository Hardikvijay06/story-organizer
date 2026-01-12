import { useState, useEffect } from 'react';

const STORAGE_KEY = 'story-organizer-data';

export function useStories() {
    const [stories, setStories] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Failed to load stories:', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
        } catch (e) {
            console.error('Failed to save stories:', e);
        }
    }, [stories]);

    const createStory = (storyData) => {
        const newStory = {
            id: crypto.randomUUID(),
            title: storyData.title || 'Untitled Story',
            content: storyData.content || '',
            excerpt: storyData.excerpt || '',
            tags: storyData.tags || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...storyData
        };

        setStories(prev => [newStory, ...prev]);
        return newStory;
    };

    const updateStory = (id, updates) => {
        setStories(prev => prev.map(story =>
            story.id === id
                ? { ...story, ...updates, updatedAt: new Date().toISOString() }
                : story
        ));
    };

    const deleteStory = (id) => {
        setStories(prev => prev.filter(story => story.id !== id));
    };

    const getStory = (id) => {
        return stories.find(s => s.id === id);
    };

    return {
        stories,
        createStory,
        updateStory,
        deleteStory,
        getStory
    };
}
