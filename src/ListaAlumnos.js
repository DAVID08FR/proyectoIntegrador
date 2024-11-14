import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiAlumnos.php');
                const data = await response.json();
                setAlumnos(data);
            } catch (error) {
                console.error('Error al obtener datos de alumnos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Calificaciones y Promedio por Alumno</h2>
            <div className="alumnos-container">
                {alumnos.map((alumno) => {
                    const calificaciones = alumno.calificaciones || [];
                    const promedio = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length || 0;

                    const chartData = {
                        labels: calificaciones.map((_, index) => `Materia ${index + 1}`),
                        datasets: [
                            {
                                label: 'Calificaciones',
                                data: calificaciones,
                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            },
                            {
                                label: 'Promedio',
                                data: Array(calificaciones.length).fill(promedio),
                                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                type: 'line',
                            },
                        ],
                    };

                    const chartOptions = {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                enabled: true,
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    };

                    return (
                        <div key={alumno.id} className="alumno-card">
                            <h3>{alumno.nombre}</h3>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListaAlumnos;
