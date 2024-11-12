import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

// Registra los componentes de Chart.js necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                const data = await response.json();
                setDocentes(data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Datos para la gráfica
    const chartData = {
        labels: docentes.map((docente) => docente.nombre),
        datasets: [
            {
                label: 'ID de Docentes',
                data: docentes.map((docente) => docente.id),  
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true, // Empieza desde 0 para evitar que todas las barras estén demasiado altas
                suggestedMax: Math.max(...docentes.map(docente => docente.id)) + 10, // Ajusta el máximo del eje y basado en los datos
                ticks: {
                    stepSize: Math.round(Math.max(...docentes.map(docente => docente.id)) / 5), // Divide en 5 pasos
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            <h1 className="App App-link">DOCENTES INGENIERÍA INFORMÁTICA TESSFP</h1>
            <div className="docentes-container">
                {docentes.map((docente) => (
                    <div className="docente-card" key={docente.id}> {/* Cambié issemyn por id */}
                        <div>
                            Clave ID: <strong>{docente.id}</strong> {/* Cambié issemyn por id */}
                        </div>
                        <div>
                            <p>Nombre: <strong>{docente.nombre}</strong></p>
                        </div>
                        <div>
                            <p>Sexo: <strong>{docente.sexo}</strong></p>
                        </div>
                        <div>
                            <p>Teléfono: <strong>{docente.telefono}</strong></p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ width: '80%', margin: '30px auto' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default ListaDocentes;
