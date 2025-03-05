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
    const [energy, setEnergy] = useState<any>(100);

    const [newStat, setNewStat] = useState(); // may be removed, is not
    const [prevStat, setPrevStat] = useState();

    useEffect(() => {
        const interval = setInterval(async () => {
            //await fetchAndUpdateUsageStats(setUsageStats, setEnergy);

            console.log("newStatBefore: ", newStat);
            const newStat1 = await fetchAndUpdateUsageStats(setUsageStats, setEnergy);
            console.log("newStat1: ", newStat1);


            let totalEnergyLoss = 0;

            const usageDifference = newStat1 - prevStat;
            console.log("prevStat: ", prevStat)

            if(usageDifference > 0 ) {
                totalEnergyLoss += usageDifference/1
            }

            console.log("usageDifference: " , usageDifference)
            console.log("totalEnergyLoss: ", totalEnergyLoss)
            setEnergy(prevEnergy => Math.max(1, prevEnergy - totalEnergyLoss));

            AsyncStorage.setItem("energy1", energy.toString())

            const currentEnergy = await AsyncStorage.getItem("energy1");
            console.log("async currentEnergy: ", currentEnergy)

            setPrevStat(newStat1);
            setNewStat(newStat1);

        }, 1000);

        return ()=> clearInterval(interval); // without the clearInterval, prevStat and newStat will fluctuate

    }, [prevStat]);

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

    const YT = Object.values(result3).filter(item => item.appName === "YouTube").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Instagram = Object.values(result3).filter(item => item.appName === "Instagram").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const TikTok = Object.values(result3).filter(item => item.appName === "TikTok").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Snapchat = Object.values(result3).filter(item => item.appName === "Snapchat").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Triller = Object.values(result3).filter(item => item.appName === "Triller").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Roblox = Object.values(result3).filter(item => item.appName === "Roblox").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const Fortnite = Object.values(result3).filter(item => item.appName === "Fortnite").reduce((sum, item) => sum + item.totalTimeInForeground, 0);
    const AmongUs = Object.values(result3).filter(item => item.appName === "Among Us").reduce((sum, item) => sum + item.totalTimeInForeground, 0);

    const badAppsTotalTimeInForeground = YT + Instagram + TikTok + Snapchat + Triller + Roblox + Fortnite + AmongUs; 

    
    const apps = Object.entries(result3).map(([packageName, appData]) => ({
        packageName,
        ...appData
      }));

    const sortedApps = apps.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);

    const sortedApps2 = result2?.sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);
    setUsageStats(result3);

    const calculateEnergy = () => {
        let energi = 100 - badAppsTotalTimeInForeground/1000;

        //console.log("apps[1]: ", apps[1])

        if (energi <= 0) {
            energi = 1
        }

        

        return energi.toFixed(2).toString();
    }

    //console.log("calculateEnergy.toString", calculateEnergy());
    AsyncStorage.setItem("energy", calculateEnergy());
   // console.log("AsyncStorage.getItem('energy'); ", AsyncStorage.getItem("energy"));

    let x;
    AsyncStorage.getItem("energy").then((item) => {
        //console.log("item: ", item);
        x = item;
    });

    //console.log("x: ", x);
    
    //setEnergy(calculateEnergy)

    return badAppsTotalTimeInForeground;
    
}
