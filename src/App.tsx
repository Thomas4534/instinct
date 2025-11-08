function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-overlay blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-overlay blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gray-700 rounded-full mix-blend-overlay blur-3xl opacity-8"></div>
      </div>

      <div className="relative z-10">
      <header className="border-b border-purple-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Startup</h1>
            <div className="flex gap-8">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">About</a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-6xl font-bold mb-6">
          Building the Future
        </h2>
        <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-12">
          Innovative solutions for tomorrow's challenges
        </p>
        <button className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-full transition-colors">
          Get Started
        </button>
      </main>

      <footer className="border-t border-purple-500/20 mt-auto">
        <div className="container mx-auto px-6 py-8 text-center text-purple-300 text-sm">
          <p>© 2025 Startup. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
