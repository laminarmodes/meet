import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

    const colors = ['#d0427f', '#f8a01f', '#528272', '#f15f4b', '#7dbeb8', '#5c69a0'];

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

    //const colors = ['#4b2991', '#952ea0', '#d44292', '#f66d7a', '#f6a97a'];

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        label={({ genreName, percent }) => `${genreName} ${(percent * 100).toFixed(0)}%`}>
                        {
                            data.map((entry, index) => {
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]} />
                            })
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

    );
};

export default EventGenre;

