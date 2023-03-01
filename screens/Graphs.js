import { Button, Center, ScrollView, Text } from "native-base";
// import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { LineChart } from "react-native-gifted-charts";


export default function Graphs({ route }) {

    const data = [
        { label: new Date(2009, 0, 1).toLocaleDateString(), value: 7 },
        { label: new Date(2009, 1, 1).toLocaleDateString(), value: 6 },
        { label: new Date(2009, 2, 1).toLocaleDateString(), value: 8 },
        { label: new Date(2009, 3, 1).toLocaleDateString(), value: 10 },
        { label: new Date(2009, 4, 1).toLocaleDateString(), value: 8 },
        // { label: 6, value: 12 },
        // { label: 7, value: 14 },
        // { label: 8, value: 12 },
        // { label: 9, value: 13.5 },
        // { label: 10, value: 18 },
    ]
    return (
        <Center flex={1} px={7} flexDirection="column" justifyContent="center">
            <LineChart data={data} isAnimated={true} spacing={45} rotateLabel={true} xAxisLabelTextStyle={{ fontSize: 10 }} />
            {/* <Chart
                style={{ height: 200, width: 400 }}
                data={[
                    { x: new Date(2009, 0, 1), y: 15 },
                    { x: new Date(2009, 1, 1), y: 10 },
                    { x: new Date(2009, 2, 1), y: 12 },
                    // { x: 1, y: 7 },
                    // { x: 2, y: 6 },
                    // { x: 3, y: 8 },
                    // { x: 4, y: 10 },
                    // { x: 5, y: 8 },
                    // { x: 6, y: 12 },
                    // { x: 7, y: 14 },
                    // { x: 8, y: 12 },
                    // { x: 9, y: 13.5 },
                    // { x: 10, y: 18 },
                ]}
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: -2, max: 10 }}
                yDomain={{ min: 0, max: 20 }}
            >
                <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                <HorizontalAxis tickCount={5} />
                <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
            </Chart> */}
        </Center>
    )

}