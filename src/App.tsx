import React, { useState, useCallback } from 'react';
import { NewspaperIcon, BookmarkIcon, ShareIcon, Settings2Icon, CheckCircleIcon } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  imageUrl: string;
  isRead: boolean;
  isSaved: boolean;
}

interface Topic {
  id: string;
  name: string;
  isSelected: boolean;
}

interface NewsSource {
  id: string;
  name: string;
  isSelected: boolean;
}

function App() {
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Future of AI in Healthcare',
      summary: 'Artificial Intelligence is revolutionizing healthcare with breakthrough innovations in diagnosis and treatment.',
      sentiment: 'positive',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500',
      isRead: false,
      isSaved: false
    },
    {
      id: '2',
      title: 'Global Climate Summit Results',
      summary: 'World leaders agree on ambitious new targets to combat climate change in latest summit.',
      sentiment: 'neutral',
      imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=500',
      isRead: false,
      isSaved: false
    }
  ]);

  const [topics] = useState<Topic[]>([
    { id: '1', name: 'Technology', isSelected: true },
    { id: '2', name: 'Health', isSelected: true },
    { id: '3', name: 'Climate', isSelected: false },
    { id: '4', name: 'Business', isSelected: false },
  ]);

  const [newsSources, setNewsSources] = useState<NewsSource[]>([
    { id: '1', name: 'Reuters', isSelected: true },
    { id: '2', name: 'Associated Press', isSelected: true },
    { id: '3', name: 'Bloomberg', isSelected: false },
  ]);

  const handleNewsSourceChange = useCallback((sourceId: string) => {
    setNewsSources(prevSources =>
      prevSources.map(source =>
        source.id === sourceId
          ? { ...source, isSelected: !source.isSelected }
          : source
      )
    );
  }, []);

  const getSentimentColor = useCallback((sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <NewspaperIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">NewsFlow</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings2Icon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-6">Latest News</h2>
            <div className="space-y-6">
              {articles.map(article => (
                <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img src={article.imageUrl} alt="" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(article.sentiment)}`}>
                        {article.sentiment}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>Mark as read</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                        <BookmarkIcon className="h-5 w-5" />
                        <span>Save</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                        <ShareIcon className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Your Preferences</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Topics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {topics.map(topic => (
                    <button
                      key={topic.id}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${topic.isSelected 
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                      {topic.name}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">News Sources</h3>
                  <div className="space-y-3">
                    {newsSources.map(source => (
                      <label key={source.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={source.isSelected}
                          onChange={() => handleNewsSourceChange(source.id)}
                        />
                        <span>{source.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;