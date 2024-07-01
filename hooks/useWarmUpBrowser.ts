/* Significantly improves performance on Android devices! */

import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync(); // Cool down async once we are done warming up browser
        };
    }, []);
};

export default useWarmUpBrowser;