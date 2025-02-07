
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
  title: string;
  content: string;
  date: string;
  image?: string;
  video?: string;
  instagramMedia?: { url: string; type: 'post' | 'video' }[];
}

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return '';
  
  // If it's already an embed URL, return as is
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\s]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  return url; // Return original if no match
};

const NewsCard = ({ title, content, date, image, video, instagramMedia = [] }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(video || '');

  // Convert line breaks to paragraphs
  const formattedContent = content.split('\n').map((paragraph, index) => (
    paragraph.trim() ? <p key={index} className="mb-4">{paragraph}</p> : null
  ));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {video ? (
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            title={title}
          />
        </div>
      ) : image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : null}
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        
        <div className={`prose prose-sm max-w-none ${!isExpanded && "line-clamp-3"}`}>
          {formattedContent}
        </div>

        {instagramMedia && instagramMedia.length > 0 && (
          <div className="mt-4 space-y-4">
            {instagramMedia.map((media, index) => (
              <div key={index} className="instagram-embed">
                <iframe
                  src={media.url}
                  className="w-full aspect-square"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
        
        <Button
          variant="ghost"
          className="mt-2 w-full flex items-center justify-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Ver menos
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Ver mais
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewsCard;
