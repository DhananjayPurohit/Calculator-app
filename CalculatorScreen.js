import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Flex, NativeBaseProvider, Button, Box } from 'native-base';

export default function CalculatorScreen() {
    const numopsArray = [
        ['C', '+/-', '%', '/'],
        ['7', '8', '9', 'X'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '', '.', '=']
    ];

    const [equation, setEquation] = useState('0');
    const [operation, setOperation] = useState('');
    const [firstVal, setFirstVal] = useState('');
    const [secondVal, setSecondVal] = useState('');

    const OnCellPress = (cell) => {
        switch (cell) {
            case 'C': setEquation('0');
                      setFirstVal('');
                      setSecondVal('');
                      setOperation('');
                      break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9': setEquation((equation === '0') ? cell : equation + cell);
                (operation === '') ? setFirstVal(firstVal + cell) : setSecondVal(secondVal + cell);
                break;
            case '/':
            case 'X':
            case '-':
            case '+':
            case '%': setEquation((equation === '0') ? '0' : equation + cell);
                setOperation(cell);
                break;
            case '=': if (secondVal!==''){
                let finalOperation = (operation==='X') ? '*' : operation;
                let finalRes = eval(firstVal + finalOperation + secondVal);
                setFirstVal(finalRes);
                setSecondVal('');
                setEquation(finalRes);
                setOperation('');
                break;
            }
        }
    };

    return (
        <View>
            <NativeBaseProvider>
                <Box p={20}><Text style={styles.textRes}>{equation}</Text></Box>
                {numopsArray.map(row => {
                    return (
                        <Flex key={row} direction={"row"} h={100}>
                            {
                                row.map(cell => {
                                    return (
                                        <Button key={cell} style={styles.button} onPress={() => { OnCellPress(cell) }}>
                                            <Text style={styles.textCell}>{cell}</Text>
                                        </Button>
                                    );
                                })
                            }
                        </Flex>
                    )
                })}
            </NativeBaseProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '25%',
        height: '100%',
        borderRadius: 0,
        borderWidth: 0.3,
        borderColor: '#fff'
    },
    textCell: {
        fontSize: 30,
        color: '#fff'
    },
    textRes: {
        fontSize: 40,
        textAlign: 'right'
    }
});