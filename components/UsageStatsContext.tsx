import { queryUsageStats } from '@brighthustle/react-native-usage-stats-manager';
import React, {createContext, useContext, useEffect, useState } from 'react';

interface UsageStatsContextProps {
    usageStats: any;
    setUsageStats: React.SetStateAction<any>;
};

const UsageStatsContext = createContext<UsageStatsContextProps | undefined>(undefined);

export const UsageStatsProvider = ( {children} ) => {
    const [usageStats, setUsageStats] = useState<any>("");

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetchAndUpdateUsageStats(setUsageStats);
        }, 1000);
    }, []);

    return (
        <UsageStatsContext.Provider value={{usageStats, setUsageStats}}>
            {children}
        </UsageStatsContext.Provider>
    )
};

export const useUsageStats = (): UsageStatsContextProps => {
    const context = useContext(UsageStatsContext);

    if(!context) {
        throw new Error ("useUsageStats must be used within a UsageStatsProvider");
    }

    return context;
}

async function fetchAndUpdateUsageStats(setUsageStats: React.Dispatch<React.SetStateAction<any>>) {

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();//new Date(currentDate.setHours(0, 0, 0, 0)).getTime();

    
    const result3 = await queryUsageStats(0, startOfDay, currentTime );

    const apps = Object.entries(result3).map(([packageName, appData]) => ({
        packageName,
        ...appData
      }));

    const sortedApps = apps.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);

    setUsageStats(sortedApps)
    
    
}
