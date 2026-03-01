import { useState, useEffect } from 'react';
import { IconSpeakerphone } from '@tabler/icons-react';
import { useThemeColor } from '../../context/ThemeContext';

/**
 * ThemedAnnouncementBar — A news ticker component.
 * Displays one announcement at a time, cross-fading between them.
 */
export default function ThemedAnnouncementBar() {
    const { theme } = useThemeColor();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fake news items for demonstration
    const news = [
        "🚀 Welcome to Orbit Desk! Enjoy your new admin layout.",
        "✨ System Update Scheduled: 2AM EST Sunday Maintenance.",
        "📱 Download our new mobile companion app for iOS and Android.",
    ];

    useEffect(() => {
        // Cycle to the next announcement every 4 seconds
        const interval = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % news.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [news.length]);

    return (
        <div className="hidden lg:flex items-center bg-white rounded-[16px] shadow-sm border border-gray-100 pr-4 pl-1.5 overflow-hidden w-full h-[50px]">
            {/* Loudspeaker Icon */}
            <div
                className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 mr-3 shadow-sm z-10 bg-white"
                style={{ border: `1px solid ${theme.primary}20` }}
            >
                <IconSpeakerphone size={18} style={{ color: theme.primary }} />
            </div>

            {/* Single Announcement Display */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-0">
                <style>{`
                    @keyframes slideUpFade {
                        0% { opacity: 0; transform: translateY(15px); }
                        15% { opacity: 1; transform: translateY(0); }
                        85% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-15px); }
                    }
                    .news-item {
                        position: absolute;
                        left: 0;
                        right: 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        animation: slideUpFade 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                `}</style>

                {/* React 'key' forces the element to re-mount and re-trigger the CSS animation */}
                <div key={currentIndex} className="news-item text-sm font-medium text-gray-600">
                    {news[currentIndex]}
                </div>
            </div>
        </div>
    );
}
