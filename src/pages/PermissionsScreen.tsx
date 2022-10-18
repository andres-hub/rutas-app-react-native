import React from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'

export const PermissionsScreen = () => {

    const checkLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        permissionStatus = (Platform.OS === 'ios')
            ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        console.log(permissionStatus);
    }


    return (
        <View style={styles.container} >
            <Text>PermissionsScreen</Text>
            <Button
                title='Permis'
                onPress={checkLocationPermission}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
