import { queryUsageStats } from '@brighthustle/react-native-usage-stats-manager';
import React, {createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import UsageStats from 'react-native-usage-stats';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UsageStatsContextProps {
    usageStats: any;
    setUsageStats: React.SetStateAction<any>;
    energy: any,
    setEnergy: SetStateAction<any>;
};

const UsageStatsContext = createContext<UsageStatsContextProps | undefined>(undefined);

export const UsageStatsProvider = ( {children} ) => {
    const [usageStats, setUsageStats] = useState<any>("");
    const [energy, setEnergy] = useState<any>("");

    useEffect(() => {
        const interval = setInterval(async () => {
            await fetchAndUpdateUsageStats(setUsageStats, setEnergy);
        }, 1000);
    }, []);

    return (
        <UsageStatsContext.Provider value={{usageStats, setUsageStats, energy, setEnergy}}>
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

async function fetchAndUpdateUsageStats(setUsageStats: React.Dispatch<React.SetStateAction<any>>, setEnergy:React.Dispatch<React.SetStateAction<any>>) {

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();//new Date(currentDate.setHours(0, 0, 0, 0)).getTime();

    const result2 = await UsageStats.queryUsageStats(startOfDay, currentTime);
    
    const result3 = await queryUsageStats(0, startOfDay, currentTime );

    const apps = Object.entries(result3).map(([packageName, appData]) => ({
        packageName,
        ...appData
      }));

    const sortedApps = apps.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);

    const sortedApps2 = result2?.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);
    setUsageStats(apps)

    const calculateEnergy = () => {
        let energi = 100 - apps[1].totalTimeInForeground/1000;

        if (energi <= 0) {
            energi = 1
        }

        

        return energi.toString();
    }

    console.log("calculateEnergy.toString", calculateEnergy());
    AsyncStorage.setItem("energy", calculateEnergy());
    console.log("AsyncStorage.getItem('energy'); ", AsyncStorage.getItem("energy"));

    let x;
    AsyncStorage.getItem("energy").then((item) => {
        console.log("item: ", item);
        x = item;
    });

    console.log("x: ", x);
    
    setEnergy(calculateEnergy)
    
}
