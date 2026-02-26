import { Cpu, Target, Shield, Zap, Layout, Activity } from 'lucide-react';

export const chapterData = [
    {
        id: 1,
        title: "AUTONOMY IN EXTREME ENVIRONMENTS",
        text: "Sensor fusion + planning + fail-safe logic designed for the most hostile terrains in the solar system.",
        startProgress: 0,
        endProgress: 0.2
    },
    {
        id: 2,
        title: "MARS-TERRAIN MOBILITY",
        text: "Stability, traction, and dust mitigation systems that ensure mission continuity in uneven lunar and martian soil.",
        startProgress: 0.2,
        endProgress: 0.4
    },
    {
        id: 3,
        title: "VISION & PERCEPTION",
        text: "Real-time object detection and 3D mapping using edge-computing neural networks for instantaneous decision making.",
        startProgress: 0.4,
        endProgress: 0.6
    },
    {
        id: 4,
        title: "EMBEDDED CONTROL",
        text: "Low latency control loops running on RTOS-hardened hardware with minimal power constraints.",
        startProgress: 0.6,
        endProgress: 0.8
    },
    {
        id: 5,
        title: "SYSTEM INTEGRATION",
        text: "Seamless end-to-end software + hardware testing pipeline ensuring 99.9% mission reliability.",
        startProgress: 0.8,
        endProgress: 1.0
    }
];

export const projectData = [
    {
        id: 1,
        title: "Rover Navigation Stack",
        description: "Fully autonomous pathway planning for multi-terrain rovers.",
        tags: ["AI", "Robotics"],
        icon: Target
    },
    {
        id: 2,
        title: "Vision-based Avoidance",
        description: "Real-time obstacle detection using stereoscopic vision.",
        tags: ["Vision", "Edge AI"],
        icon: Activity
    },
    {
        id: 3,
        title: "Embedded Motor Control",
        description: "High-precision servo control for robotic limbs.",
        tags: ["Embedded", "Control"],
        icon: Cpu
    },
    {
        id: 4,
        title: "Simulation Digital Twin",
        description: "High-fidelity physics simulation for pre-mission testing.",
        tags: ["Sim", "Web"],
        icon: Layout
    },
    {
        id: 5,
        title: "Robotics Telemetry",
        description: "Real-time dashboard for remote monitoring and diagnostics.",
        tags: ["Web", "Systems"],
        icon: Zap
    },
    {
        id: 6,
        title: "Dataset Tooling",
        description: "Automated labeling and augmentation for robotics data.",
        tags: ["AI", "Tooling"],
        icon: Shield
    }
];
