import React from 'react';
import { Edit2, Trash2, Calendar, FileText } from 'lucide-react';
import { useStoryContext } from '../context/StoryContext';

export default function Dashboard({ onNavigate }) {
    const { stories, createStory, deleteStory } = useStoryContext();

    const handleCreate = () => {
        const newStory = createStory({ title: '', content: '' });
        onNavigate('editor', newStory.id);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Your Stories</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage and organize your creative writing.</p>
                </div>
                <button className="glass-button" onClick={handleCreate} style={{ backgroundColor: 'hsla(var(--hue), 70%, 60%, 0.2)', borderColor: 'var(--accent-primary)' }}>
                    <Edit2 size={18} />
                    <span>New Story</span>
                </button>
            </header>

            {stories.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3>No stories yet</h3>
                    <p>Create your first story to get started.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {stories.map(story => (
                        <StoryCard
                            key={story.id}
                            story={story}
                            onEdit={() => onNavigate('editor', story.id)}
                            onDelete={() => deleteStory(story.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function StoryCard({ story, onEdit, onDelete }) {
    const handleDelete = (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this story?')) {
            onDelete();
        }
    };

    return (
        <div
            className="glass-panel"
            onClick={onEdit}
            style={{
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                height: '240px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ marginBottom: 'auto' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    {story.title || 'Untitled Story'}
                </h3>
                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {story.excerpt || story.content.slice(0, 150) || 'No content...'}
                </p>
            </div>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Calendar size={14} />
                    <span>{new Date(story.updatedAt).toLocaleDateString()}</span>
                </div>

                <button
                    onClick={handleDelete}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(255, 100, 100)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
