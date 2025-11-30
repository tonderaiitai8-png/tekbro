import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useMarketMoodStore } from '../store/useMarketMoodStore';
import { generateMissions } from '../utils/missionEngine';
import * as Haptics from 'expo-haptics';

export const useMissionEngine = () => {
    const { missions, setMissions } = useStore();
    const {
        earningsSeason,
        fedMeeting,
        whaleAlert,
        altSeason,
        marketCyclePhase
    } = useMarketMoodStore();

    // Check for new missions when events change
    useEffect(() => {
        const checkMissions = () => {
            const newMissions = generateMissions();
            const currentMissions = useStore.getState().missions;

            // 1. Identify truly new missions (not already active/completed/failed)
            // We use a simple check based on type/description similarity for now
            const uniqueNewMissions = newMissions.filter(nm =>
                !currentMissions.some(cm => cm.type === nm.type && cm.status !== 'FAILED')
            );

            if (uniqueNewMissions.length > 0) {
                let updatedMissions = [...currentMissions];

                // 2. Add new missions, but respect the LIMIT of 5
                uniqueNewMissions.forEach(newMission => {
                    const activeCount = updatedMissions.filter(m => m.status === 'ACTIVE').length;

                    if (updatedMissions.length < 5) {
                        // If we have space, just add it
                        updatedMissions.push(newMission);
                    } else {
                        // If full, try to replace a COMPLETED or FAILED mission first
                        const completedIndex = updatedMissions.findIndex(m => m.status === 'COMPLETED' || m.status === 'FAILED');

                        if (completedIndex !== -1) {
                            // Replace the old one
                            updatedMissions.splice(completedIndex, 1);
                            updatedMissions.push(newMission);
                        } else {
                            // If all are ACTIVE, we don't add the new one (or we could replace the oldest active, but that's annoying for users)
                            // For now, we only replace if there's "dead weight" (completed/failed)
                        }
                    }
                });

                // Only update if changed
                if (updatedMissions.length !== currentMissions.length || updatedMissions.some((m, i) => m !== currentMissions[i])) {
                    setMissions(updatedMissions);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            }
        };

        checkMissions();
    }, [earningsSeason, fedMeeting, whaleAlert, altSeason, marketCyclePhase]);

    // Check for expiry every minute
    useEffect(() => {
        const interval = setInterval(() => {
            const { missions, setMissions } = useStore.getState();
            const now = Date.now();
            let changed = false;

            const updatedMissions = missions.map(m => {
                if (m.status === 'ACTIVE' && m.expiresAt < now) {
                    changed = true;
                    return { ...m, status: 'FAILED' as const };
                }
                return m;
            });

            if (changed) {
                setMissions(updatedMissions);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);
};
