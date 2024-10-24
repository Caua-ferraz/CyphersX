import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * VideoProps interface defines the expected props for the Video component.
 * 
 * @property videoId - The YouTube video ID (the part after "v=" in a YouTube URL)
 * @property title - The title of the video (used for accessibility and SEO)
 * @property aspectRatio - The aspect ratio of the video (default is 16:9)
 * @property className - Custom classes for styling
 * @property autoplay - Whether the video should autoplay (default is false)
 * @property muted - Whether the video should be muted (default is false)
 * @property posterUrl - The URL of the poster image (optional)
 * @property lazyLoad - Whether the iframe should use lazy loading (default is true)
 */
interface VideoProps {
    videoId: string;
    title: string;
    aspectRatio?: "16:9" | "4:3";
    className?: string;
    autoplay?: boolean;
    muted?: boolean;
    posterUrl?: string;
    lazyLoad?: boolean;
}

/**
 * Video Component
 * 
 * This component embeds a YouTube video using an iframe.
 * It's responsive by default, maintaining a 16:9 aspect ratio.
 * 
 * @param {VideoProps} props - The props for the Video component
 */
const Video: React.FC<VideoProps> = ({
    videoId,
    title,
    aspectRatio = "16:9",
    className,
    autoplay = false,
    muted = false,
    posterUrl,
    lazyLoad = true,
}) => {
    const [showVideo, setShowVideo] = useState(!posterUrl);
    const [error, setError] = useState(false);

    const aspectRatioStyles = {
        "16:9": { paddingBottom: "56.25%" },
        "4:3": { paddingBottom: "75%" },
    };

    const handlePosterClick = () => setShowVideo(true);

    const iframeProps = {
        className: "absolute top-0 left-0 w-full h-full",
        src: `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}${muted ? '&mute=1' : ''}`,
        title,
        frameBorder: "0",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        loading: lazyLoad ? ("lazy" as const) : undefined,
        onError: () => setError(true),
    };

    return (
        <div className={cn("relative", className)} style={aspectRatioStyles[aspectRatio]}>
            {error ? (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
                    <p>Failed to load video. Please try again later.</p>
                </div>
            ) : showVideo ? (
                <iframe {...iframeProps}></iframe>
            ) : (
                <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${posterUrl})` }}
                    onClick={handlePosterClick}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Video;

// Usage example:
// <Video videoId="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" aspectRatio="16:9" className="my-4 shadow-lg rounded-lg overflow-hidden" autoplay={false} muted={true} posterUrl="/path-to-poster-image.jpg" lazyLoad={true} />

// Customization options:

// 1. Change the aspect ratio
// To change the aspect ratio, modify the paddingBottom in the style prop:
// <div className="relative" style={{ paddingBottom: "75%" }}> {/* 4:3 aspect ratio */}

// 2. Add custom styles
// You can add additional classes to the wrapper div for custom styling:
// <div className="relative pb-9/16 my-4 shadow-lg rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%" }}>

// 3. Modify iframe parameters
// You can add or change YouTube player parameters in the src URL:
// src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}

// 4. Add a poster image
// To add a poster image that shows before the video loads, you can create a custom wrapper:
// const VideoWithPoster: React.FC<VideoProps & { posterUrl: string }> = ({ videoId, title, posterUrl }) => {
//   const [showVideo, setShowVideo] = React.useState(false);
//   return (
//     <div className="relative pb-9/16" style={{ paddingBottom: "56.25%" }}>
//       {showVideo ? (
//         <iframe ... />
//       ) : (
//         <div 
//           className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-pointer"
//           style={{ backgroundImage: `url(${posterUrl})` }}
//           onClick={() => setShowVideo(true)}
//         >
//           <div className="absolute inset-0 flex items-center justify-center">
//             <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M8 5v10l8-5-8-5z" />
//             </svg>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// 5. Lazy loading
// To implement lazy loading, you can use the loading attribute on the iframe:
// <iframe
//   ...
//   loading="lazy"
// ></iframe>

// 6. Error handling
// You can add error handling to display a fallback message if the video fails to load:
// const [error, setError] = React.useState(false);
// ...
// {error ? (
//   <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
//     <p>Failed to load video. Please try again later.</p>
//   </div>
// ) : (
//   <iframe
//     ...
//     onError={() => setError(true)}
//   ></iframe>
// )}

// Remember to adjust the import statement if you move this component to a different directory.
