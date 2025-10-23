import type { Route } from "./+types/route";
import { SimulatorPage } from "../../pages/simulator";

export const meta: Route.MetaFunction = ({ params }) => {
    return [
        {
            title: `Урок ${params.lessonId} - Симулятор ${params.simulatorId} | MySimulator`,
        },
        {
            name: "description",
            content: "Интерактивный симулятор для практического обучения",
        },
    ];
};

export default function Simulator({ params }: Route.ComponentProps) {
    const { lessonId, simulatorId } = params;

    return <SimulatorPage lessonId={lessonId} simulatorId={simulatorId} />;
}

