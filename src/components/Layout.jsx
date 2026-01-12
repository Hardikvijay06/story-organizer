import React from 'react';
import { Book, Layout as LayoutIcon, Settings } from 'lucide-react';

export default function Layout({ children, currentView, onNavigate }) {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar */}
            <aside
                className="glass-panel"
                style={{
                    width: '260px',
                    margin: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-lg)'
                }}
            >
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, var(--accent-primary), violet)',
                        borderRadius: '8px'
                    }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.5px' }}>StoryMind</h2>
                </div>

                <nav style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavItem
                        icon={<LayoutIcon size={20} />}
                        label="Dashboard"
                        isActive={currentView === 'dashboard'}
                        onClick={() => onNavigate('dashboard')}
                    />
                    <NavItem
                        icon={<Book size={20} />}
                        label="Stories"
                        isActive={false}
                        onClick={() => { }}
                    />
                </nav>

                <div style={{ marginTop: 'auto', padding: '1rem' }}>
                    <NavItem
                        icon={<Settings size={20} />}
                        label="Settings"
                        isActive={false}
                        onClick={() => { }}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '1rem 1rem 1rem 0', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}

function NavItem({ icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.75rem 1rem',
                background: isActive ? 'hsla(var(--hue), 60%, 50%, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.2s ease',
                textAlign: 'left'
            }}
            onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'hsla(var(--hue), 20%, 30%, 0.3)';
            }}
            onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
        >
            {icon}
            {label}
        </button>
    );
}
