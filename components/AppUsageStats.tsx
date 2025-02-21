import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, ScrollView } from 'react-native';
import UsageStats from 'react-native-usage-stats';

const AppUsageStats = () => {
  const [loading, setLoading] = useState(false);
  const [usageStats, setUsageStats] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        checkPermissionAndFetchStats();
    }, 5000);
    
    return () => clearInterval(interval);
    //checkPermissionAndFetchStats();
  }, []);

  const checkPermissionAndFetchStats = async () => {
    setLoading(true);
    try {
      const hasPermission = await UsageStats.checkPermission();
      setPermissionGranted(hasPermission);
      if (hasPermission) {
        const startDate = new Date('2025-02-21').getTime();
        const endDate = new Date('2025-02-22').getTime();

        const endTime = new Date().getTime();  // Current time in milliseconds
        const startTime = endTime - (60 * 60 * 1000);
        const result = await UsageStats.queryUsageStats( startTime, endTime);
        setUsageStats(result);
      } else {
        console.error("Permission not granted");
      }
    } catch (error) {
      console.error("Failed to fetch usage stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Usage Stats for 2025:02:01 - 2025:02:28:</Text>
      {loading ? <ActivityIndicator /> : (
        permissionGranted ? (
            <ScrollView>
                <Text>{JSON.stringify(usageStats, null, 2)}</Text>
            </ScrollView>
        ) : (
          <Text>Permission required to access usage stats</Text>
        )
      )}
    </View>
  );
};

export default AppUsageStats;
