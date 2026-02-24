import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { Terminal, Database, Code, Lightbulb, Box, Wrench, Settings } from 'lucide-react';

const timelineData = [
    {
        id: 1,
        title: "Programming",
        date: "Core",
        content: "Python, JavaScript, TypeScript, SQL",
        category: "Languages",
        icon: Terminal,
        relatedIds: [2, 3, 5],
        status: "completed" as const,
        energy: 95,
    },
    {
        id: 2,
        title: "RAG & Graph Tech",
        date: "Advanced",
        content: "FAISS, ChromaDB, PGVector, GraphDB, Vector Embeddings, Similarity Search",
        category: "AI Data",
        icon: Database,
        relatedIds: [1, 3, 4],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 3,
        title: "Libraries & Frameworks",
        date: "Ecosystem",
        content: "LangGraph, LangChain, FastAPI, Streamlit, React.js, CrewAI",
        category: "Frameworks",
        icon: Code,
        relatedIds: [1, 2, 4],
        status: "completed" as const,
        energy: 85,
    },
    {
        id: 4,
        title: "Concepts",
        date: "Architecture",
        content: "RAG Systems, Multi-agent Architectures, A2A Communication, MCP, Prompt Engineering, Workflow Orchestration (DAGs), ETL Pipelines, Machine Learning",
        category: "Theory",
        icon: Lightbulb,
        relatedIds: [2, 3],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 5,
        title: "Database Management",
        date: "Storage",
        content: "PostgreSql, SQL, SQLite",
        category: "Databases",
        icon: Box,
        relatedIds: [1, 2],
        status: "completed" as const,
        energy: 85,
    },
    {
        id: 6,
        title: "Developer Tools",
        date: "Productivity",
        content: "Claude, OpenAI Codex, GitHub Copilot, HuggingFace",
        category: "Tools",
        icon: Wrench,
        relatedIds: [1, 3, 7],
        status: "completed" as const,
        energy: 95,
    },
    {
        id: 7,
        title: "Tools & DevOps",
        date: "Infrastructure",
        content: "Git, GitHub, Docker, Kubernetes, CI/CD Pipelines, LangSmith, Postman, VS Code, DBeaver, Airflow, Databricks",
        category: "DevOps",
        icon: Settings,
        relatedIds: [6, 1],
        status: "completed" as const,
        energy: 80,
    }
];

export default function Skills() {
    return (
        <section id="skills" className="w-full bg-white relative">
            <RadialOrbitalTimeline timelineData={timelineData} />
        </section>
    );
}
