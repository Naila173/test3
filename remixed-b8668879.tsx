import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Heart, Sparkles, ArrowLeft, MoreHorizontal } from 'lucide-react';

const FootballMoodJar = () => {
  const [currentView, setCurrentView] = useState('jar');
  const [entries, setEntries] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [droppingBall, setDroppingBall] = useState(null);

  // Pre-written affirmations by Naila♡
  const affirmations = [
    "You're improving every single day, 勇輝工藤! 💚 - Naila♡",
    "Your dedication to football inspires me so much! ⚽️ - Naila♡", 
    "Remember: every champion started as a beginner! 🏆 - Naila♡",
    "I'm so proud of how hard you work! 💪 - Naila♡",
    "Bad practices make good players even better! 📈 - Naila♡",
    "Your passion for football lights up my world! ✨ - Naila♡",
    "Trust the process, trust yourself! 🌟 - Naila♡",
    "You've got this, my amazing footballer! ⚡ - Naila♡"
  ];

  const moods = [
    { emoji: '😫', label: 'Awful', gradient: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-300' },
    { emoji: '😞', label: 'Bad', gradient: 'from-blue-500 to-blue-700', shadow: 'shadow-blue-300' },
    { emoji: '😐', label: 'Neutral', gradient: 'from-cyan-400 to-teal-600', shadow: 'shadow-cyan-300' },
    { emoji: '😊', label: 'Good', gradient: 'from-green-400 to-emerald-600', shadow: 'shadow-green-300' },
    { emoji: '🤩', label: 'Great', gradient: 'from-pink-400 to-red-500', shadow: 'shadow-pink-300' },
    { emoji: '💪', label: 'Strong', gradient: 'from-orange-400 to-red-500', shadow: 'shadow-orange-300' },
    { emoji: '⚡', label: 'Energized', gradient: 'from-yellow-400 to-orange-500', shadow: 'shadow-yellow-300' },
    { emoji: '🏆', label: 'Proud', gradient: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-300' }
  ];

  const [newEntry, setNewEntry] = useState({
    mood: '',
    description: '',
    improvement: '',
    affirmation: ''
  });

  const getRandomAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  };

  const addEntry = () => {
    if (!newEntry.mood) return;
    
    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      ...newEntry,
      affirmation: getRandomAffirmation(),
      timestamp: Date.now()
    };
    
    // Show dropping animation
    setDroppingBall(entry);
    setTimeout(() => {
      setEntries([...entries, entry]);
      setDroppingBall(null);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }, 800);
    
    setNewEntry({ mood: '', description: '', improvement: '', affirmation: '' });
    setShowEntryForm(false);
  };

  const MoodBall = ({ entry, index, isDropping = false, style = {} }) => {
    const mood = moods.find(m => m.label === entry.mood);
    
    return (
      <div 
        className={`absolute w-12 h-12 rounded-full bg-gradient-to-br ${mood?.gradient || 'from-gray-400 to-gray-600'} 
          flex items-center justify-center text-lg shadow-lg ${mood?.shadow || 'shadow-gray-300'}
          transition-all duration-700 ease-out backdrop-blur-sm
          ${isDropping ? 'animate-bounce' : ''}
          ${isShaking && !isDropping ? 'animate-pulse' : ''}`}
        style={{
          left: isDropping ? '50%' : `${25 + (index * 18) % 50}%`,
          bottom: isDropping ? '85%' : `${15 + Math.floor(index / 3) * 15}%`,
          transform: isDropping ? 'translateX(-50%)' : 'none',
          zIndex: isDropping ? 100 : 20 - index,
          ...style
        }}
        title={`${mood?.emoji} ${entry.mood} - ${entry.date} ${entry.time}`}
      >
        <span className="filter drop-shadow-sm">{mood?.emoji}</span>
      </div>
    );
  };

  const GlassJar = ({ children }) => (
    <div className="relative">
      {/* Jar Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 rounded-full blur-xl opacity-30 transform translate-y-8 scale-110"></div>
      
      {/* Main Jar Container */}
      <div className={`relative transition-all duration-300 ${isShaking ? 'animate-pulse' : ''}`}>
        {/* Jar Body */}
        <div className="w-64 h-80 bg-gradient-to-br from-blue-50/30 to-white/50 
          backdrop-blur-md border border-white/30 shadow-2xl
          rounded-t-3xl rounded-b-full relative overflow-hidden">
          
          {/* Glass reflection effect */}
          <div className="absolute top-8 left-6 w-16 h-32 bg-gradient-to-br from-white/40 to-transparent 
            rounded-full blur-sm transform -rotate-12"></div>
          
          {/* Inner shadow */}
          <div className="absolute inset-2 rounded-t-3xl rounded-b-full 
            shadow-inner shadow-gray-200/50"></div>
          
          {children}
        </div>
        
        {/* Jar Lid */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-72 h-8 
          bg-gradient-to-r from-gray-300 to-gray-100 rounded-full shadow-lg
          border border-gray-200"></div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-72 h-6 
          bg-gradient-to-r from-gray-400 to-gray-200 rounded-full shadow-xl"></div>
      </div>
    </div>
  );

  const JarView = () => (
    <div className="flex flex-col items-center space-y-8 p-6 min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-8 text-green-400 text-2xl animate-pulse">✨</div>
      <div className="absolute top-32 right-12 text-pink-400 text-xl animate-bounce">💫</div>
      <div className="absolute top-48 left-12 text-blue-400 text-lg animate-pulse">⭐</div>
      
      {/* Jar Container */}
      <GlassJar>
        {/* Mood Balls inside jar */}
        {entries.map((entry, index) => (
          <MoodBall key={entry.id} entry={entry} index={index} />
        ))}
        
        {/* Dropping ball animation */}
        {droppingBall && (
          <MoodBall entry={droppingBall} index={0} isDropping={true} />
        )}
        
        {/* Empty state */}
        {entries.length === 0 && !droppingBall && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-4 animate-bounce">⚽</div>
              <p className="text-sm font-medium">Start your football<br/>mood journey!</p>
            </div>
          </div>
        )}
      </GlassJar>

      {/* Progress Counter */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
        <div className="text-gray-700 text-center">
          <span className="text-2xl font-bold text-green-600">{entries.length}</span>
          <span className="text-sm ml-2">mood{entries.length !== 1 ? 's' : ''} collected</span>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="w-full max-w-sm">
        <div className="flex justify-center space-x-4 mb-6">
          {moods.slice(0, 5).map((mood) => (
            <button
              key={mood.label}
              onClick={() => {
                setNewEntry({...newEntry, mood: mood.label});
                setShowEntryForm(true);
              }}
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${mood.gradient} 
                flex items-center justify-center text-lg shadow-lg ${mood.shadow}
                hover:scale-110 transform transition-all duration-200 backdrop-blur-sm`}
              title={mood.label}
            >
              <span className="filter drop-shadow-sm">{mood.emoji}</span>
            </button>
          ))}
        </div>
        
        {/* Mood Labels */}
        <div className="flex justify-center space-x-4 text-xs text-gray-600 font-medium">
          {['Awful', 'Bad', 'Neutral', 'Good', 'Great'].map(label => (
            <span key={label} className="w-14 text-center">{label}</span>
          ))}
        </div>
      </div>

      {/* Latest Affirmation */}
      {entries.length > 0 && (
        <div className="bg-gradient-to-r from-green-100/80 to-pink-100/80 backdrop-blur-md 
          p-4 rounded-2xl border border-white/30 max-w-sm mx-auto shadow-lg">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{entries[entries.length - 1].affirmation}"
            </p>
          </div>
        </div>
      )}

      {/* Share Message */}
      <div className="text-center text-green-600 font-medium text-sm bg-white/60 
        backdrop-blur-md px-4 py-2 rounded-full border border-green-200">
        Share moods & send gifts to each other! 💝
      </div>
    </div>
  );

  const EntryForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setShowEntryForm(false)}
            className="p-2 rounded-full bg-white/80 shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">How was practice?</h2>
          <button className="p-2 rounded-full bg-white/80 shadow-md">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
          {/* Selected Mood Display */}
          {newEntry.mood && (
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${
                moods.find(m => m.label === newEntry.mood)?.gradient
              } flex items-center justify-center text-2xl shadow-lg mb-3`}>
                {moods.find(m => m.label === newEntry.mood)?.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{newEntry.mood}</h3>
            </div>
          )}

          {/* Mood Selection Grid */}
          {!newEntry.mood && (
            <div className="space-y-4 mb-6">
              <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">
                How are you feeling? ⚽
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setNewEntry({...newEntry, mood: mood.label})}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${mood.gradient} 
                      hover:scale-105 transform transition-all duration-200 shadow-lg ${mood.shadow}`}
                  >
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div className="text-xs text-white font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          {newEntry.mood && (
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What happened in practice? 📝
                </label>
                <textarea
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                  placeholder="Tell me about your practice today..."
                  className="w-full p-4 border border-gray-200 rounded-2xl resize-none h-24 text-sm
                    bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-green-300 focus:border-transparent
                    transition-all duration-200"
                />
              </div>

              {/* Improvement */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What can you improve next time? 🎯
                </label>
                <textarea
                  value={newEntry.improvement}
                  onChange={(e) => setNewEntry({...newEntry, improvement: e.target.value})}
                  placeholder="Ideas for your next practice..."
                  className="w-full p-4 border border-gray-200 rounded-2xl resize-none h-20 text-sm
                    bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-green-300 focus:border-transparent
                    transition-all duration-200"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={addEntry}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 
                  text-white rounded-2xl font-semibold text-lg shadow-lg
                  hover:from-green-600 hover:to-emerald-700 
                  transform hover:scale-[1.02] transition-all duration-200"
              >
                Add to Mood Jar ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const CalendarView = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setCurrentView('jar')}
            className="p-2 rounded-full bg-white/80 shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Your Journey</h2>
          <button className="p-2 rounded-full bg-white/80 shadow-md">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No entries yet</p>
              <p className="text-sm">Start your football mood journey!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.slice().reverse().map((entry) => {
                const mood = moods.find(m => m.label === entry.mood);
                return (
                  <div key={entry.id} className="bg-white/60 rounded-2xl p-4 shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${mood?.gradient} 
                          flex items-center justify-center shadow-md`}>
                          <span className="text-lg">{mood?.emoji}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">{entry.mood}</span>
                          <p className="text-xs text-gray-500">{entry.date} • {entry.time}</p>
                        </div>
                      </div>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    {entry.description && (
                      <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded-xl">
                        {entry.description}
                      </p>
                    )}
                    
                    {entry.improvement && (
                      <div className="bg-blue-50 p-3 rounded-xl mb-3">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">Next time:</span> {entry.improvement}
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-gradient-to-r from-pink-50 to-green-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-700 italic">
                        💕 {entry.affirmation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      {!showEntryForm && currentView !== 'calendar' && (
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-pink-100 sticky top-0 z-50">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 
                bg-clip-text text-transparent mb-1">
                MOOD JAR
              </h1>
              <div className="flex justify-center items-center space-x-2 text-green-600">
                <span className="text-green-500">✨</span>
                <span className="text-sm font-medium">勇輝工藤's Football Journey</span>
                <span className="text-green-500">⚽</span>
                <span className="text-pink-400">💫</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      {showEntryForm ? <EntryForm /> : currentView === 'jar' ? <JarView /> : <CalendarView />}

      {/* Bottom Navigation */}
      {!showEntryForm && (
        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md 
          rounded-t-3xl shadow-2xl border-t border-gray-100 px-8 py-4 w-full max-w-md">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setCurrentView('jar')}
              className={`p-3 rounded-2xl transition-all ${
                currentView === 'jar' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl">🏺</div>
            </button>
            <button
              onClick={() => setShowEntryForm(true)}
              className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                rounded-2xl shadow-xl hover:scale-105 transform transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`p-3 rounded-2xl transition-all ${
                currentView === 'calendar' 
                  ? 'bg-green-500 text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default FootballMoodJar;