import React, { useEffect } from 'react';

function ChatBot() {
    useEffect(() => {
    
        const scriptInject = document.createElement('script');
        scriptInject.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
        scriptInject.async = true;
        document.body.appendChild(scriptInject);


        scriptInject.onload = () => {
            const scriptConfig = document.createElement('script');
            scriptConfig.src = 'https://files.bpcontent.cloud/2025/04/10/15/20250410150045-TXI5MHNQ.js';
            scriptConfig.async = true;
            document.body.appendChild(scriptConfig);
        };

        return () => {
    
            if (document.body.contains(scriptInject)) {
                document.body.removeChild(scriptInject);
            }

            const scriptConfig = document.querySelector('script[src="https://files.bpcontent.cloud/2025/04/10/15/20250410150045-TXI5MHNQ.js"]');
            if (scriptConfig && document.body.contains(scriptConfig)) {
                document.body.removeChild(scriptConfig);
            }

           
            if (window.botpressWebChat) {
                window.botpressWebChat.destroy();
            }
        };
    }, []);

    return null;
}

export default ChatBot;