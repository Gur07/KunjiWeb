import React, { useState } from "react";
import { Search, Filter, Building2, Tag } from "lucide-react";

const schemeGenres = [
  "Agriculture", "Education", "Employment", "Healthcare", "Housing",
  "Small Business", "Women Empowerment", "Skill Development", "Rural Development",
  "Social Security", "Technology", "Environment", "Infrastructure", "Tourism",
  "Financial Inclusion"
];

const genericImages = [
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&q=80&w=500"
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState("Finance");
  const [selectedGenre, setSelectedGenre] = useState("Finance");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&genre=${encodeURIComponent(selectedGenre)}`);
      const response = await fetch("/schemes.json");
      const data = await response.json();
      const schemesWithImages = data.map((scheme) => ({
        ...scheme,
        image: genericImages[Math.floor(Math.random() * genericImages.length)]
      }));
      setSchemes(schemesWithImages);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSchemes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white py-6 text-center text-3xl font-bold">Opportunities</header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-black"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full md:w-64 pl-10 pr-3 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-black"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Categories</option>
              {schemeGenres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="md:w-32 py-3 px-6 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" /> Search
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-r-transparent"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <a
              key={scheme.id}
              href={`/scheme/${scheme.id}`}
              className="block bg-white rounded-lg border-2 border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all"
            >
              <img src={scheme.image} alt={scheme.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{scheme.govtBody}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{scheme.title}</h3>
                <p className="text-gray-600 line-clamp-2">{scheme.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Tag className="h-4 w-4 text-gray-600" />
                  {scheme.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
