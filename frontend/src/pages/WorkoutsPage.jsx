import { useState, useEffect } from "react";
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../api/workoutService";
import WorkoutTemplateForm from "../components/templates/WorkoutTemplateForm";
import WorkoutTemplateList from "../components/templates/WorkoutTemplateList";

export default function WorkoutsPage() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(
        () => {
            (async () => {
                try {
                    const allWorkouts = await getWorkouts();
                    const templates = allWorkouts.filter(workout => !workout.date);
                    setTemplates(templates);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            })();
        }, []
    );

    const handleCreateTemplate = async (templateData) => {
        const res = await createWorkout(templateData);
        setTemplates([...templates, res]);
    };

    const handleUpdateTemplate = async (templateData) => {
        const res = await updateWorkout(templateData.id, templateData);
        const updatedTemplates = templates.map((template) => {
            if (template.id === res.id) {
                return res;
            } else {
                return template;
            }
        });
        setTemplates(updatedTemplates);
    }

    const handleDeleteTemplate = async (id) => {
        await deleteWorkout(id);
        const updatedTemplates = templates.filter((template) => template.id !== id);
        setTemplates(updatedTemplates);
    }
}