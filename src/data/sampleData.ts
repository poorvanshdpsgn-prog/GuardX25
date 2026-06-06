import {
  Activity,
  BellRing,
  Bluetooth,
  BrainCircuit,
  Cpu,
  MapPinned,
  Radar,
  RadioTower,
  Satellite,
  ShieldCheck,
  Smartphone,
  Waves,
} from 'lucide-react';

export const features = [
  { title: 'BLE Proximity', description: 'Low-energy connection awareness with signal history and recovery states.', icon: Bluetooth },
  { title: 'RFID Owner Mode', description: 'Fast bag access verification through a trusted embedded RFID module.', icon: RadioTower },
  { title: 'GPS Tracking', description: 'Location-ready architecture for current, last known, and historical routes.', icon: MapPinned },
  { title: 'Theft Protection', description: 'Unauthorized movement detection with instant dashboard alerts.', icon: ShieldCheck },
  { title: 'Motion Detection', description: 'Movement telemetry designed for activity analytics and safety triggers.', icon: Activity },
  { title: 'Smart Alerts', description: 'Prioritized alerts for battery, BLE, location, and authentication events.', icon: BellRing },
];

export const techStack = [
  { title: 'Arduino UNO R4 WiFi', description: 'Primary embedded controller for future cloud-connected firmware.', icon: Cpu },
  { title: 'Bluetooth Low Energy', description: 'Efficient phone and dashboard pairing with live status updates.', icon: Bluetooth },
  { title: 'RFID Module', description: 'Owner verification and access event capture.', icon: RadioTower },
  { title: 'GPS Module', description: 'Positioning layer for tracking, maps, and location timelines.', icon: Satellite },
  { title: 'Ultrasonic Sensor', description: 'Distance and proximity monitoring for smarter bag awareness.', icon: Waves },
  { title: 'Motion Monitoring', description: 'Activity signals for movement history and theft indicators.', icon: Radar },
  { title: 'Smart Dashboard', description: 'React-powered command center for students and guardians.', icon: Smartphone },
  { title: 'Future AI Features', description: 'Predictive safety scoring and anomaly detection roadmap.', icon: BrainCircuit },
];

export const team = [
  {
    name: 'Poorvansh Sahni',
    role: 'Founder',
    bio: 'Product vision, embedded systems direction, and full SmartBag Connect ecosystem strategy.',
  },
  {
    name: 'Yashvardhan',
    role: 'Co-Founder',
    bio: 'Hardware integration, testing workflows, and practical deployment planning.',
  },
];

export const movementData = [34, 48, 61, 52, 74, 66, 89, 58, 77, 92, 70, 84];
export const weeklyData = [82, 78, 91, 88, 94, 76, 69];
export const securityData = [2, 1, 0, 3, 1, 0, 2];
export const uptimeData = [96, 98, 97, 99, 94, 98, 100];

export const mapPoints = [
  { label: 'Science Block', time: '08:12', x: 18, y: 68 },
  { label: 'Library Entry', time: '09:45', x: 36, y: 46 },
  { label: 'Main Courtyard', time: '11:05', x: 58, y: 52 },
  { label: 'Cafeteria', time: '12:31', x: 72, y: 31 },
  { label: 'Classroom B-204', time: '13:20', x: 84, y: 56 },
];
