import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useItemContext } from '../../context/ItemContext.jsx';

export function VideoPlayer() {
    const { videos } = useItemContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    useEffect(() => {
        videos.map((v) => {
          if (v.id == id) {
            setVideo(v);
          }
        });
    }, [videos, id]);
 console.log(video)

if (!videos || videos.length === 0) {
  return <div>Loading...</div>;
}

if (!video) {
  return <div>Video not found</div>;
}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/Courses')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to courses
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            
          </div>
          
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoUrl}`}
              className="w-full h-full rounded-lg shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
