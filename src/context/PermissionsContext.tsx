import { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';

export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable'
}

type PermissionsContextProps ={
    permissions: PermissionsState;
    askLocationPermission: ()=> void;
    checkLocationPermission: ()=> void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', state =>{
           if(state !== 'active') return;
           checkLocationPermission();
        })
       }, [])

    const askLocationPermission = async()=>{
        let permissionStatus: PermissionStatus;

        permissionStatus = (Platform.OS === 'ios')
            ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if(permissionStatus === 'blocked'){
                openSettings();
            }

            setPermissions({
                ...permissions,
                locationStatus: permissionStatus
            });
    }

    const checkLocationPermission = async()=>{
        let permissionStatus: PermissionStatus;

        permissionStatus = (Platform.OS === 'ios')
            ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            setPermissions({
                ...permissions,
                locationStatus: permissionStatus
            });
            console.log(permissionStatus)
    }

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            {children}
        </PermissionsContext.Provider>
    )

}