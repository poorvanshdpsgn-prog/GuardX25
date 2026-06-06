import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export type BagConnection = 'Connected' | 'Disconnected';
export type SecurityStatus = 'Secure' | 'Alert';
export type BleStatus = 'Connected' | 'Pairing' | 'Offline';
export type AuthStatus = 'Verified' | 'Failed';
export type SystemHealth = 'Online' | 'Offline';
export type AlertType =
  | 'Bag Left Behind'
  | 'Unauthorized Movement'
  | 'RFID Failure'
  | 'Low Battery'
  | 'BLE Disconnected'
  | 'Location Change';

export type SmartAlert = {
  id: string;
  type: AlertType;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  time: string;
  resolved: boolean;
};

export type EventLog = {
  id: string;
  label: string;
  detail: string;
  time: string;
  status: 'success' | 'warning' | 'danger' | 'info';
};

export type Settings = {
  ownerName: string;
  email: string;
  bagName: string;
  emergencyContact: string;
  notifications: boolean;
  ownerMode: boolean;
  autoLock: boolean;
  theme: 'dark' | 'light';
};

export type SmartBagState = {
  bagStatus: BagConnection;
  securityStatus: SecurityStatus;
  bleStatus: BleStatus;
  battery: number;
  currentLocation: string;
  lastKnownLocation: string;
  ownerAuthentication: AuthStatus;
  systemHealth: SystemHealth;
  rfidStatus: 'Ready' | 'Verified' | 'Failed';
  signalStrength: number;
  deviceName: string;
  firmwareVersion: string;
  lastSync: string;
  securityScore: number;
  settings: Settings;
  alerts: SmartAlert[];
  events: EventLog[];
  connectionHistory: EventLog[];
  connectedDeviceId?: string;
};

type SmartBagContextValue = {
  state: SmartBagState;
  simulate: (action: DemoAction) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  dismissAlert: (id: string) => void;
  addToast: (message: string) => void;
  toasts: string[];
  removeToast: (index: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  connectBleDevice: (deviceId: string, deviceName: string) => Promise<void>;
};

export type DemoAction =
  | 'rfidSuccess'
  | 'rfidFailure'
  | 'bleDisconnect'
  | 'theftAlert'
  | 'locationChange'
  | 'batteryDrain'
  | 'deviceRecovery';

const now = () =>
  new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());

const createAlert = (type: AlertType, message: string, severity: SmartAlert['severity']): SmartAlert => ({
  id: crypto.randomUUID(),
  type,
  message,
  severity,
  time: now(),
  resolved: false,
});

const createEvent = (label: string, detail: string, status: EventLog['status']): EventLog => ({
  id: crypto.randomUUID(),
  label,
  detail,
  time: now(),
  status,
});

const defaultSettings: Settings = {
  ownerName: 'Poorvansh Sahni',
  email: 'owner@smartbagconnect.dev',
  bagName: 'SmartBag Alpha',
  emergencyContact: '+91 98765 43210',
  notifications: true,
  ownerMode: true,
  autoLock: true,
  theme: 'dark',
};

const defaultState: SmartBagState = {
  bagStatus: 'Connected',
  securityStatus: 'Secure',
  bleStatus: 'Offline',
  battery: 86,
  currentLocation: 'Classroom B-204',
  lastKnownLocation: 'Main Courtyard',
  ownerAuthentication: 'Verified',
  systemHealth: 'Offline',
  rfidStatus: 'Ready',
  signalStrength: 0,
  deviceName: 'No Device Connected',
  firmwareVersion: 'v1.4.2-demo',
  lastSync: now(),
  securityScore: 94,
  settings: defaultSettings,
  alerts: [
    createAlert('Location Change', 'Bag moved from Library Entry to Classroom B-204.', 'low'),
    createAlert('Low Battery', 'Battery optimization recommended under 90%.', 'medium'),
  ],
  events: [
    createEvent('Owner verified', 'RFID token accepted in Owner Mode.', 'success'),
    createEvent('GPS refresh', 'Location timeline updated from campus route.', 'info'),
    createEvent('Motion scan', 'No abnormal movement detected.', 'success'),
  ],
  connectionHistory: [
    createEvent('System initialized', 'Waiting for BLE device connection.', 'info'),
  ],
};

const SmartBagContext = createContext<SmartBagContextValue | undefined>(undefined);

export const SmartBagProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<SmartBagState>(() => loadFromStorage('smartbag-state', defaultState));
  const [toasts, setToasts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveToStorage('smartbag-state', state);
    document.documentElement.classList.toggle('light', state.settings.theme === 'light');
    document.documentElement.classList.toggle('dark', state.settings.theme === 'dark');
  }, [state]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((current) => ({
        ...current,
        battery: Math.max(12, Math.min(100, current.battery + (Math.random() > 0.68 ? 1 : -1))),
        signalStrength:
          current.bleStatus === 'Connected'
            ? Math.max(42, Math.min(99, current.signalStrength + Math.round(Math.random() * 8 - 4)))
            : current.bleStatus === 'Pairing'
              ? 38
              : 0,
        lastSync: current.bleStatus === 'Connected' ? now() : current.lastSync,
      }));
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const addToast = (message: string) => {
    setToasts((current) => [message, ...current].slice(0, 4));
  };

  const removeToast = (index: number) => {
    setToasts((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const pushEvent = (event: EventLog, connection = false) => {
    setState((current) => ({
      ...current,
      events: [event, ...current.events].slice(0, 12),
      connectionHistory: connection ? [event, ...current.connectionHistory].slice(0, 10) : current.connectionHistory,
    }));
  };

  const connectBleDevice = async (deviceId: string, deviceName: string) => {
    try {
      setState((current) => ({
        ...current,
        bleStatus: 'Pairing',
        connectedDeviceId: deviceId,
        connectionHistory: [
          createEvent('Connecting...', `Attempting to connect to ${deviceName}`, 'info'),
          ...current.connectionHistory,
        ].slice(0, 10),
      }));

      addToast(`Connecting to ${deviceName}...`);

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setState((current) => ({
        ...current,
        bleStatus: 'Connected',
        deviceName,
        connectedDeviceId: deviceId,
        systemHealth: 'Online',
        bagStatus: 'Connected',
        signalStrength: 82,
        connectionHistory: [
          createEvent('BLE connected', `Successfully connected to ${deviceName}`, 'success'),
          ...current.connectionHistory,
        ].slice(0, 10),
      }));

      addToast(`Successfully connected to ${deviceName}`);
    } catch (error) {
      setState((current) => ({
        ...current,
        bleStatus: 'Offline',
        connectionHistory: [
          createEvent('Connection failed', (error as Error).message, 'danger'),
          ...current.connectionHistory,
        ].slice(0, 10),
      }));

      addToast('Failed to connect to device');
    }
  };

  const simulate = (action: DemoAction) => {
    setState((current) => {
      const next = { ...current, lastSync: now() };

      if (action === 'rfidSuccess') {
        next.rfidStatus = 'Verified';
        next.ownerAuthentication = 'Verified';
        next.securityStatus = 'Secure';
        next.securityScore = Math.min(100, current.securityScore + 3);
        next.events = [createEvent('RFID success', 'Owner authentication verified.', 'success'), ...current.events].slice(0, 12);
      }

      if (action === 'rfidFailure') {
        next.rfidStatus = 'Failed';
        next.ownerAuthentication = 'Failed';
        next.securityStatus = 'Alert';
        next.securityScore = Math.max(42, current.securityScore - 12);
        next.alerts = [createAlert('RFID Failure', 'RFID scan failed. Owner verification required.', 'high'), ...current.alerts].slice(0, 12);
        next.events = [createEvent('RFID failure', 'Unrecognized RFID token rejected.', 'danger'), ...current.events].slice(0, 12);
      }

      if (action === 'bleDisconnect') {
        next.bleStatus = 'Offline';
        next.bagStatus = 'Disconnected';
        next.systemHealth = 'Offline';
        next.signalStrength = 0;
        next.alerts = [createAlert('BLE Disconnected', 'Bluetooth link lost. Reconnect from BLE Control Center.', 'high'), ...current.alerts].slice(0, 12);
        next.connectionHistory = [createEvent('BLE disconnected', 'Signal dropped below operating threshold.', 'danger'), ...current.connectionHistory].slice(0, 10);
      }

      if (action === 'theftAlert') {
        next.securityStatus = 'Alert';
        next.securityScore = Math.max(28, current.securityScore - 22);
        next.alerts = [createAlert('Unauthorized Movement', 'Motion detected while owner mode was active.', 'critical'), ...current.alerts].slice(0, 12);
        next.events = [createEvent('Theft alert', 'Unauthorized movement detected by motion monitor.', 'danger'), ...current.events].slice(0, 12);
      }

      if (action === 'locationChange') {
        next.lastKnownLocation = current.currentLocation;
        next.currentLocation = current.currentLocation === 'Classroom B-204' ? 'Cafeteria' : 'Classroom B-204';
        next.alerts = [createAlert('Location Change', `Bag location updated to ${next.currentLocation}.`, 'medium'), ...current.alerts].slice(0, 12);
        next.events = [createEvent('Location changed', `GPS mock updated to ${next.currentLocation}.`, 'info'), ...current.events].slice(0, 12);
      }

      if (action === 'batteryDrain') {
        next.battery = Math.max(8, current.battery - 18);
        next.alerts = [createAlert('Low Battery', 'Battery drained during simulation. Charge soon.', 'medium'), ...current.alerts].slice(0, 12);
      }

      if (action === 'deviceRecovery') {
        next.bagStatus = 'Connected';
        next.securityStatus = 'Secure';
        next.bleStatus = 'Connected';
        next.ownerAuthentication = 'Verified';
        next.systemHealth = 'Online';
        next.rfidStatus = 'Ready';
        next.signalStrength = 86;
        next.securityScore = 96;
        next.battery = Math.max(current.battery, 76);
        next.alerts = current.alerts.map((alert) => ({ ...alert, resolved: true }));
        next.events = [createEvent('Device recovered', 'All primary systems returned to nominal.', 'success'), ...current.events].slice(0, 12);
        next.connectionHistory = [createEvent('BLE reconnected', 'Stable connection restored.', 'success'), ...current.connectionHistory].slice(0, 10);
      }

      return next;
    });

    const labelMap: Record<DemoAction, string> = {
      rfidSuccess: 'RFID success simulated',
      rfidFailure: 'RFID failure simulated',
      bleDisconnect: 'BLE disconnect simulated',
      theftAlert: 'Theft alert simulated',
      locationChange: 'Location change simulated',
      batteryDrain: 'Battery drain simulated',
      deviceRecovery: 'Device recovery simulated',
    };
    addToast(labelMap[action]);
  };

  const updateSettings = (settings: Partial<Settings>) => {
    setState((current) => ({ ...current, settings: { ...current.settings, ...settings } }));
    addToast('Settings updated');
  };

  const dismissAlert = (id: string) => {
    setState((current) => ({
      ...current,
      alerts: current.alerts.map((alert) => (alert.id === id ? { ...alert, resolved: true } : alert)),
    }));
    addToast('Alert resolved');
  };

  const value = useMemo(
    () => ({ state, simulate, updateSettings, dismissAlert, addToast, toasts, removeToast, searchQuery, setSearchQuery, connectBleDevice }),
    [state, toasts, searchQuery],
  );

  return <SmartBagContext.Provider value={value}>{children}</SmartBagContext.Provider>;
};

export const useSmartBag = () => {
  const context = useContext(SmartBagContext);
  if (!context) {
    throw new Error('useSmartBag must be used within SmartBagProvider');
  }
  return context;
};
