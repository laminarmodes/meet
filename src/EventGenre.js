import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({ events }) => {

    // const colors = ['#440154', '#443a83', '#2c728e', '#20a486', '#75d054'];
    const colors = ['#0d1787', '#4d1fa1', '#8022a8', '#ac2494', '#cc4976'];

    // useEffect will listen for changes
    // This will run when there is a change to the 'events' prop
    useEffect(() => {
        setData(() => getData());
    }, [events]);

    const [data, setData] = useState([]);

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) =>
                summary.split(' ').includes(genre)).length;
            return {
                genreName: genre,
                value
            }
        });
        return data;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        innerRadius={20}
                        dataKey="value"
                        fill="#8884d8"
                        label={({ genreName, percent }) => `${genreName} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    {/* <Legend layout="horizontal" verticalAlign="top" align="center" height={45} /> */}
                </PieChart>
            </ResponsiveContainer>
        </div>

    );
};

export default EventGenre;

