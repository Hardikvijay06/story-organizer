import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Tag } from 'lucide-react';
import { useStoryContext } from '../context/StoryContext';

export default function Editor({ onNavigate, storyId }) {
    const { getStory, updateStory } = useStoryContext();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (storyId) {
            const story = getStory(storyId);
            if (story) {
                setTitle(story.title);
                setContent(story.content);
                setTags(story.tags ? story.tags.join(', ') : '');
            }
        }
    }, [storyId, getStory]);

    const handleSave = () => {
        if (!storyId) return;

        updateStory(storyId, {
            title,
            content,
            excerpt: content.slice(0, 150), // Auto-generate excerpt
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        });

        setIsDirty(false);
        // Optional: visual feedback
    };

    const handleChange = (setter, value) => {
        setter(value);
        setIsDirty(true);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', height: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                    onClick={() => onNavigate('dashboard')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <button
                    className="glass-button"
                    onClick={handleSave}
                    disabled={!isDirty}
                    style={{
                        opacity: isDirty ? 1 : 0.5,
                        cursor: isDirty ? 'pointer' : 'default',
                        borderColor: isDirty ? 'var(--accent-primary)' : 'var(--border-glass)'
                    }}
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            {/* Editor Panel */}
            <div className="glass-panel" style={{ padding: '3rem', minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    placeholder="Story Title..."
                    value={title}
                    onChange={(e) => handleChange(setTitle, e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        width: '100%',
                        marginBottom: '1.5rem',
                        outline: 'none'
                    }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                    <Tag size={16} />
                    <input
                        type="text"
                        placeholder="Add tags (separated by comma)..."
                        value={tags}
                        onChange={(e) => handleChange(setTags, e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            width: '100%',
                            outline: 'none'
                        }}
                    />
                </div>

                <textarea
                    placeholder="Once upon a time..."
                    value={content}
                    onChange={(e) => handleChange(setContent, e.target.value)}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'Georgia, serif' // Better for writing
                    }}
                />
            </div>
        </div>
    );
}
