'use client';

import { useEffect, useState } from 'react';
import { Analytics, logEvent } from 'firebase/analytics';
import { analytics } from '@/lib/firebase';

export function useAnalytics() {
    const [analyticsInstance, setAnalyticsInstance] = useState<Analytics | null>(null);

    useEffect(() => {
        if (analytics) {
            Promise.resolve(analytics)
                .then((instance) => { if (instance) setAnalyticsInstance(instance); })
                .catch(() => { /* Analytics not available */ });
        }
    }, []);

    const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
        if (analyticsInstance) {
            try { logEvent(analyticsInstance, eventName, params); } catch { /* silent */ }
        }
    };

    const trackPageView = (pageName: string) => trackEvent('page_view', { page_title: pageName });
    const trackLogin = (method: string) => trackEvent('login', { method });
    const trackSignUp = (method: string) => trackEvent('sign_up', { method });
    const trackButtonClick = (name: string) => trackEvent('button_click', { button_name: name });

    return { trackEvent, trackPageView, trackLogin, trackSignUp, trackButtonClick };
}
