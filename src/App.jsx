import { useState } from 'react';
import { StoryProvider } from './context/StoryContext';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeStoryId, setActiveStoryId] = useState(null);

  const handleNavigate = (view, storyId = null) => {
    setCurrentView(view);
    if (storyId) setActiveStoryId(storyId);
  };

  return (
    <StoryProvider>
      <Layout currentView={currentView} onNavigate={handleNavigate}>
        {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentView === 'editor' && <Editor onNavigate={handleNavigate} storyId={activeStoryId} />}
      </Layout>
    </StoryProvider>
  );
}

export default App;
