import React from 'react';
import Svg, { Polygon, Line, Text } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

type PlayerStats = {
    Pace: number;
    Shooting: number;
    Passing: number;
    Dribble: number;
    Defending: number;
    Physical: number;
};

type StatsKey = keyof PlayerStats;

interface SpiderChartProps {
    data: PlayerStats;
}

const SpiderChart: React.FC<SpiderChartProps> = ({ data }) => {
    const numberOfAxes = 6;
    const radius = 100;
    const centerX = 150; // Adjust center as needed
    const centerY = 150; // Adjust center as needed
    const labelOffset = 110; // Offset for labels to be outside the hexagon
    const textMargin = 10;  // Margin to prevent clipping

    const angle = (2 * Math.PI) / numberOfAxes;
    const points = Array.from({ length: numberOfAxes }, (_, i) => {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        return { x, y };
    });

    const dataPoints = points.map((point, index) => {
        const key = Object.keys(data)[index] as StatsKey;
        const statValue = data[key];
        const normalizedValue = (statValue / 100) * radius; // Assuming max value is 100
        return {
            x: centerX + normalizedValue * Math.cos(index * angle),
            y: centerY + normalizedValue * Math.sin(index * angle),
        };
    });

    const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <View style={styles.container}>
            <Svg height="300" width="300" viewBox="0 0 300 300">
                <Polygon
                    points={points.map(p => `${p.x},${p.y}`).join(' ')}
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                />
                <Polygon
                    points={polygonPoints}
                    stroke="rgba(252, 186, 3, 1)"
                    strokeWidth="3"
                    fill="rgba(252, 186, 3, 0.3)"
                />
                {points.map((point, index) => (
                    <Line
                        key={index}
                        x1={centerX}
                        y1={centerY}
                        x2={point.x}
                        y2={point.y}
                        stroke="black"
                        strokeWidth="2"
                    />
                ))}
                {points.map((point, index) => {
                    // Calculate label position for spider chart
                    const labelX = centerX + (labelOffset + textMargin) * Math.cos(index * angle);
                    const labelY = centerY + (labelOffset + textMargin) * Math.sin(index * angle);
                    return (
                        <Text
                            key={index}
                            x={labelX}
                            y={labelY}
                            fontFamily='pop-sb'
                            fontSize="18"
                            fill="black"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {Object.keys(data)[index]}
                        </Text>
                    )
                })}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SpiderChart;
